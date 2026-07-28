import userModel from "../models/userModel.js";
import shoeModel from "../models/shoeModel.js";
import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";

// =====================================
// DASHBOARD
// =====================================

const getDashboard = async (req, res) => {
  try {

    const totalUsers = await userModel.countDocuments();

    const totalShoes = await shoeModel.countDocuments();

    const totalOrders = await orderModel.countDocuments();

    const orders = await orderModel.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.amount || 0),
      0
    );

    res.json({
      success: true,
      data: {
        totalUsers,
        totalShoes,
        totalOrders,
        totalRevenue,
      },
    });

  } catch (error) {

    res.json({
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
                    email: email,
                    role: "admin"
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );


            return res.json({
                success: true,
                message: "Login successful",
                token
            });

        } else {

            return res.json({
                success: false,
                message: "Invalid email or password"
            });

        }


    } catch(error){

        res.json({
            success:false,
            message:error.message
        });

    }

};



// =====================================
// ALL USERS
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
// ALL ORDERS
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

    const { id } = req.params;

    const { status } = req.body;

    await orderModel.findByIdAndUpdate(id, {
      status,
    });

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

    // Monthly Sales

    const monthlySales = await orderModel.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },

          totalSales: {
            $sum: "$amount",
          },

          totalOrders: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);



    // Returning Customers

    const repeatedUsers = await orderModel.aggregate([
      {
        $group: {
          _id: "$userId",
          orders: {
            $sum: 1,
          },
        },
      },

      {
        $group: {
          _id: null,

          newUsers: {
            $sum: {
              $cond: [
                {
                  $eq: ["$orders", 1],
                },
                1,
                0,
              ],
            },
          },

          repeatedUsers: {
            $sum: {
              $cond: [
                {
                  $gt: ["$orders", 1],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);



    res.json({
      success: true,
      monthlySales,
      repeatedUsers,
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message,
    });

  }
};


// =====================================
// EXPORTS
// =====================================

export {
  getDashboard,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  getAnalytics,
  adminLogin,
};