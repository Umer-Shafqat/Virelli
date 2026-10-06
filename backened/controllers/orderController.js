import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      customer,
      items,
      subtotal,
      deliveryCharges,
      totalAmount,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const newOrder = new orderModel({
      userId,
      customer,
      items,
      subtotal,
      deliveryCharges,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    await cartModel.findOneAndUpdate(
      { userId },
      { items: {} }
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.log("Place Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    console.log("STATUS UPDATE HEADERS:", req.headers);
    console.log("STATUS UPDATE BODY:", req.body);

    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log("Update Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await orderModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("Delete Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    console.log("GET MY ORDERS USER ID:", userId);

    const orders = await orderModel
      .find({ userId: userId })
      .sort({ createdAt: -1 });

    console.log("MY ORDERS COUNT:", orders.length);

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("Get My Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("List Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  updateStatus,
  deleteOrder,
  getMyOrders,
  listOrders,
};