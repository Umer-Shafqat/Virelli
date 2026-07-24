import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

// ================================
// PLACE ORDER - COD
// ================================

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      items,
      amount,
      address,
    } = req.body;

    // Check user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Check items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Check address
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    // Create order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,

      paymentMethod: "COD",

      payment: false,

      status: "Order Placed",
    });

    // Save order
    const savedOrder = await newOrder.save();

    // Clear user's cart
    await cartModel.findOneAndUpdate(
      { userId },
      {
        items: {},
      }
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.log("Place Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};


// ================================
// GET USER ORDERS
// ================================

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};


export {
  placeOrder,
  getUserOrders,
};