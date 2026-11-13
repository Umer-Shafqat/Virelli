import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

const SIZE_REQUIRED_CATEGORIES = [
  "shoes",
  "hoodies",
  "chapal",
  "jackets",
];

const normalizeCategory = (category) =>
  String(category || "").trim().toLowerCase();

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

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // Validate and normalize sizes before passing items to Mongoose.
    // Shoes, Hoodies, Chapal, Jackets need a numeric size.
    // Caps and Watches (and other categories) do not need a size.
    const normalizedItems = [];

    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];

      if (!item || typeof item !== "object") {
        return res.status(400).json({
          success: false,
          message: `Invalid product at order item ${index + 1}.`,
        });
      }

      const category = normalizeCategory(item.category);
      const requiresSize = SIZE_REQUIRED_CATEGORIES.includes(category);

      if (requiresSize) {
        const rawSize = item.size;

        if (
          rawSize === undefined ||
          rawSize === null ||
          rawSize === "" ||
          String(rawSize).trim().toLowerCase() === "no-size" ||
          !Number.isFinite(Number(rawSize))
        ) {
          return res.status(400).json({
            success: false,
            message: `Please select a valid size for ${item.name || category} (order item ${index + 1}).`,
          });
        }

        normalizedItems.push({
          ...item,
          size: Number(rawSize),
        });
      } else {
        // Explicitly remove size from size-less products.
        const { size: ignoredSize, ...itemWithoutSize } = item;
        normalizedItems.push(itemWithoutSize);
      }
    }

    const newOrder = new orderModel({
      userId,
      customer,
      items: normalizedItems,
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

    // Validation errors are client-side data problems, not server failures.
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error while placing order",
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
      .find({ userId })
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
