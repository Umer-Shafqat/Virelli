import cartModel from "../models/cartModel.js";
import ShoeModel from "../models/shoeModel.js";

// =================================
// ADD TO CART
// =================================

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { shoeId, size } = req.body;

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
    // CHECK PRODUCT ID
    // =================================

    if (!shoeId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // =================================
    // FIND PRODUCT
    // =================================

    const shoe = await ShoeModel.findById(shoeId);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =================================
    // CHECK WHETHER SIZE IS REQUIRED
    // =================================

    // true  = size required
    // false = size not required
    // undefined = old product, so size required

    const requiresSize = shoe.requiresSize !== false;

    let finalSize = size;

    if (requiresSize) {
      if (!size || String(size).trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Please select a size",
        });
      }

      finalSize = String(size).trim();
    } else {
      finalSize = "N/A";
    }

    // =================================
    // CREATE CART KEY
    // =================================

    const key = `${shoeId}-${finalSize}`;

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
      const currentQuantity = cart.items?.[key] || 0;

      cart.items[key] = currentQuantity + 1;

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
    console.log("Add Cart Error:", error);

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

    const cart = await cartModel.findOne({
      userId,
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cartData: {},
      });
    }

    return res.status(200).json({
      success: true,
      cartData: cart.items || {},
    });
  } catch (error) {
    console.log("Get Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error getting cart",
    });
  }
};

// =================================
// REMOVE FROM CART
// =================================

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { shoeId, size } = req.body;

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
    // FIND PRODUCT
    // =================================

    const shoe = await ShoeModel.findById(shoeId);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =================================
    // CHECK WHETHER SIZE IS REQUIRED
    // =================================

    const requiresSize = shoe.requiresSize !== false;

    let finalSize = size;

    if (requiresSize) {
      if (!size || String(size).trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Size is required",
        });
      }

      finalSize = String(size).trim();
    } else {
      finalSize = "N/A";
    }

    // =================================
    // FIND CART
    // =================================

    const cart = await cartModel.findOne({
      userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // =================================
    // CREATE SAME KEY USED BY ADD
    // =================================

    const key = `${shoeId}-${finalSize}`;

    // =================================
    // REMOVE ONE ITEM
    // =================================

    if (cart.items[key]) {
      cart.items[key]--;

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
    console.log("Remove Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error removing item",
    });
  }
};

// =================================
// CLEAR CART
// =================================

const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await cartModel.findOne({
      userId,
    });

    if (cart) {
      cart.items = {};

      cart.markModified("items");

      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart: {},
    });
  } catch (error) {
    console.log("Clear Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error clearing cart",
    });
  }
};

export {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};