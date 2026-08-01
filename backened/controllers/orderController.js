import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

// =====================================
// PLACE ORDER
// =====================================

const placeOrder = async (req, res) => {
  try {
    // Get logged-in user ID
    const userId = req.userId;

    // Get order data from frontend
    const {
      customer,
      items,
      subtotal,
      deliveryCharges,
      totalAmount,
    } = req.body;

    // =================================
    // CHECK USER
    // =================================

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // =================================
    // CHECK ORDER ITEMS
    // =================================

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // =================================
    // CREATE ORDER
    // =================================

    const newOrder = new orderModel({
      userId,
      customer,
      items,
      subtotal,
      deliveryCharges,
      totalAmount,
    });

    // =================================
    // SAVE ORDER TO MONGODB
    // =================================

    const savedOrder = await newOrder.save();

    // =================================
    // CLEAR USER CART
    // =================================

    await cartModel.findOneAndUpdate(
      {
        userId,
      },
      {
        items: {},
      }
    );

    // =================================
    // RESPONSE
    // =================================

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });

  } catch (error) {
    console.log("Place Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};


export const updateStatus = async (req, res) => {
  console.log("=========== UPDATE STATUS ===========");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "req.body is undefined",
      });
    }

    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    return res.json({
      success: true,
      message: "Order status updated",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// DELETE ORDER
// =====================================

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow deletion if Delivered or Cancelled
    if (
      order.status !== "Delivered" &&
      order.status !== "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Only Delivered or Cancelled orders can be deleted.",
      });
    }

    await orderModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {
    console.log("Delete Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET MY ORDERS
// =====================================

const getMyOrders = async (req, res) => {

  try {

    // Logged-in user ID
    const userId = req.userId;


    // Find orders belonging to this user
    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 });


    res.status(200).json({

      success: true,

      orders: orders,

    });


  } catch (error) {

    console.log(
      "Get My Orders Error:",
      error
    );


    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

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
// EXPORT CONTROLLERS
// =====================================

export {
  placeOrder,
  deleteOrder,
  getMyOrders,
  listOrders,
  updateStatus,
};