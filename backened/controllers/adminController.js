import userModel from "../models/userModel.js";
import shoeModel from "../models/shoeModel.js";
import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";

// =====================================
// DASHBOARD
// =====================================

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();

    const totalShoes = await shoeModel.countDocuments();

    const totalOrders = await orderModel.countDocuments({
      status: { $ne: "Cancelled" },
    });

    const orders = await orderModel.find({
      status: { $ne: "Cancelled" },
    });

    const revenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const averageOrderValue =
      totalOrders > 0 ? revenue / totalOrders : 0;

    const categoryMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        categoryMap[item.category] =
          (categoryMap[item.category] || 0) + item.quantity;
      });
    });

    let topSellingCategory = "N/A";
    let maxSold = 0;

    for (const category in categoryMap) {
      if (categoryMap[category] > maxSold) {
        maxSold = categoryMap[category];
        topSellingCategory = category;
      }
    }

    const now = new Date();

    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const previousMonth =
      currentMonth === 1 ? 12 : currentMonth - 1;

    const previousYear =
      currentMonth === 1
        ? currentYear - 1
        : currentYear;

    const currentRevenue = orders
      .filter((order) => {
        const date = new Date(order.createdAt);
        return (
          date.getMonth() + 1 === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const previousRevenue = orders
      .filter((order) => {
        const date = new Date(order.createdAt);
        return (
          date.getMonth() + 1 === previousMonth &&
          date.getFullYear() === previousYear
        );
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const monthlyGrowth =
      previousRevenue === 0
        ? 100
        : (
            ((currentRevenue - previousRevenue) /
              previousRevenue) *
            100
          ).toFixed(1);

    res.json({
      success: true,
      dashboard: {
        totalUsers,
        totalShoes,
        totalOrders,
        revenue,
        averageOrderValue,
        topSellingCategory,
        monthlyGrowth,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// ADMIN LOGIN
// =====================================

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token,
      });
    }

    res.json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// USERS
// =====================================

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({}, "-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// ORDERS
// =====================================

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// UPDATE ORDER STATUS
// =====================================

const updateOrderStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      }
    );

    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// ANALYTICS
// =====================================

const getAnalytics = async (req, res) => {
  try {
    const dashboard = await getDashboardData();

    res.json({
      success: true,
      analytics: dashboard,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// MONTHLY SALES
// =====================================

export const getMonthlySales = async (req, res) => {
  try {
    const sales = await orderModel.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlySales = months.map((month, index) => {
      const found = sales.find(
        (item) => item._id === index + 1
      );

      return {
        month,
        value: found ? found.revenue : 0,
      };
    });

    res.json({
      success: true,
      monthlySales,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// HELPER
// =====================================

const getDashboardData = async () => {
  const totalUsers = await userModel.countDocuments();

  const totalShoes = await shoeModel.countDocuments();

  const orders = await orderModel.find({
    status: { $ne: "Cancelled" },
  });

  const totalOrders = orders.length;

  const revenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const averageOrderValue =
    totalOrders > 0
      ? revenue / totalOrders
      : 0;

  const categoryMap = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) +
        item.quantity;
    });
  });

  let topSellingCategory = "N/A";
  let max = 0;

  for (const key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      topSellingCategory = key;
    }
  }

  return {
    totalUsers,
    totalShoes,
    totalOrders,
    revenue,
    averageOrderValue,
    topSellingCategory,
  };
};

export {
  adminLogin,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  getAnalytics,
  
};