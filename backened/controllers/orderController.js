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
        message: "Your cart is empty",
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
      {
        userId,
      },
      {
        items: {},
      }
    );


    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });

  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
});
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


const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting ID:", id);

    const deletedOrder = await orderModel.findOneAndDelete({ _id: id });

    console.log("Deleted Order:", deletedOrder);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {
    console.log("Delete Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyOrders = async (req, res) => {

  try {

    const userId = req.userId;

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

export {
  placeOrder,
  deleteOrder,
  getMyOrders,
};