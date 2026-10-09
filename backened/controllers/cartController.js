import cartModel from "../models/cartModel.js";
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;

    const { shoeId, size } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // =================================
    // CHECK PRODUCT ID
    // =================================

    if (!shoeId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // =================================
    // SIZE
    // =================================
    // Products without sizes such as
    // Watches and Caps use "no-size".

    const cartSize = size || "no-size";

    // =================================
    // CREATE CART KEY
    // =================================

    const key = `${shoeId}-${cartSize}`;

    // =================================
    // FIND USER CART
    // =================================

    let cart = await cartModel.findOne({
      userId,
    });

    // =================================
    // CREATE NEW CART
    // =================================

    if (!cart) {
      cart = new cartModel({
        userId,

        items: {
          [key]: 1,
        },
      });
    }

    // =================================
    // EXISTING CART
    // =================================

    else {
      // Get current quantity
      const currentQuantity =
        cart.items?.[key] || 0;

      // Increase quantity
      cart.items[key] =
        currentQuantity + 1;

      // Important for dynamic object keys
      cart.markModified("items");
    }

    // =================================
    // SAVE CART
    // =================================

    await cart.save();

    // =================================
    // RESPONSE
    // =================================

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: cart.items,
    });
  } catch (error) {
    console.log(
      "Add Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

// =================================
// GET CART
// =================================

const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    // =================================
    // FIND USER CART
    // =================================

    const cart =
      await cartModel.findOne({
        userId,
      });

    // =================================
    // NO CART
    // =================================

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {},
      });
    }

    // =================================
    // RETURN CART
    // =================================

    return res.status(200).json({
      success: true,
      cart: cart.items || {},
    });
  } catch (error) {
    console.log(
      "Get Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error getting cart",
    });
  }
};

// =================================
// REMOVE FROM CART
// =================================

const removeFromCart = async (
  req,
  res
) => {
  try {
    const userId = req.userId;

    const { shoeId, size } =
      req.body;

    // =================================
    // CHECK PRODUCT ID
    // =================================

    if (!shoeId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // =================================
    // SIZE
    // =================================

    const cartSize =
      size || "no-size";

    // =================================
    // FIND CART
    // =================================

    const cart =
      await cartModel.findOne({
        userId,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // =================================
    // SAME KEY AS ADD TO CART
    // =================================

    const key =
      `${shoeId}-${cartSize}`;

    // =================================
    // DECREASE QUANTITY
    // =================================

    if (cart.items[key]) {
      cart.items[key]--;

      // Delete when quantity reaches 0
      if (cart.items[key] <= 0) {
        delete cart.items[key];
      }

      cart.markModified("items");

      await cart.save();
    }

    // =================================
    // RESPONSE
    // =================================

    return res.status(200).json({
      success: true,
      message: "Item removed",
      cart: cart.items,
    });
  } catch (error) {
    console.log(
      "Remove Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error removing item",
    });
  }
};

// =================================
// CLEAR CART
// =================================

const clearCart = async (
  req,
  res
) => {
  try {
    const userId = req.userId;

    // =================================
    // FIND CART
    // =================================

    const cart =
      await cartModel.findOne({
        userId,
      });

    // =================================
    // CLEAR CART
    // =================================

    if (cart) {
      cart.items = {};

      cart.markModified("items");

      await cart.save();
    }

    // =================================
    // RESPONSE
    // =================================

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart: {},
    });
  } catch (error) {
    console.log(
      "Clear Cart Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Error clearing cart",
    });
  }
};

// =================================
// EXPORT
// =================================

export {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};