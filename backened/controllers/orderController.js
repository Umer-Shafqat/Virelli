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

// =====================================
// DELETE ORDER
// =====================================

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete order
    const deletedOrder = await orderModel.findByIdAndDelete(id);

    // Check if order exists
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      order: deletedOrder,
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
// EXPORT CONTROLLERS
// =====================================

export {
  placeOrder,
  deleteOrder,
};