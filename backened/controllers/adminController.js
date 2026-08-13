import userModel from "../models/userModel.js";
import shoeModel from "../models/shoeModel.js";
import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";

export const searchAdmin = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.json({
        success: true,
        shoes: [],
        users: [],
        orders: [],
      });
    }

    const shoes = await shoeModel.find({
      name: { $regex: q, $options: "i" },
    });

    const users = await userModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    });

    const orders = await orderModel.find({
      $or: [
        { _id: q.match(/^[0-9a-fA-F]{24}$/) ? q : null },
        { "customer.name": { $regex: q, $options: "i" } },
      ],
    });

    res.json({
      success: true,
      shoes,
      users,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardData();

    return res.json({
      success: true,
      dashboard,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          id: "admin",
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

    return res.json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({}, "-password")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    return res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


const getAnalytics = async (req, res) => {
  try {
    const dashboard = await getDashboardData();

    return res.json({
      success: true,
      analytics: dashboard,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


const getDailySales = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const sales = await orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: "Cancelled" },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const dailySales = [];

    for (let i = 6; i >= 0; i--) {

      const date = new Date();
      date.setDate(date.getDate() - i);
      const day = date.getDate();
      const month = date.getMonth() + 1;

      const found = sales.find(
        (item) =>
          item._id.day === day &&
          item._id.month === month &&
          item._id.year === date.getFullYear()
      );

      dailySales.push({
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        value: found ? found.revenue : 0,
      });
    }

    res.json({
      success: true,
      dailySales,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const getDashboardData = async () => {
  const totalUsers = await userModel.countDocuments();
  const totalShoes = await shoeModel.countDocuments();

  const orders = await orderModel.find({
    status: { $ne: "Cancelled" },
  });

  const totalOrders = orders.length;

  const revenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
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
  let max = 0;

  for (const key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      topSellingCategory = key;
    }
  }

  const recentOrders = await orderModel
  .find({})
  .populate("userId", "name email")
  .sort({ createdAt: -1 })
  .limit(5);

  return {
    totalUsers,
    totalShoes,
    totalOrders,
    revenue,
    averageOrderValue,
    topSellingCategory,
    recentOrders,
  };
};

export {
  adminLogin,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  getAnalytics,
  getDailySales,
};