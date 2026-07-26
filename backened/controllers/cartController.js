import cartModel from "../models/cartModel.js";


// =================================
// ADD TO CART
// =================================

const addToCart = async (req, res) => {
  try {

    const userId = req.userId;

    const { shoeId, size } = req.body;


    // Check user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }


    // Check shoe ID and size
    if (!shoeId || !size) {
      return res.status(400).json({
        success: false,
        message: "Shoe ID and size are required",
      });
    }


    // =================================
    // CREATE CART KEY
    // =================================

    const key = `${shoeId}-${size}`;


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


      // Important when using dynamic object keys
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
      message: "Shoe added to cart",
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
        cartData: {},
      });

    }


    // =================================
    // RETURN COMPLETE CART
    // =================================

    return res.status(200).json({
      success: true,
      cartData: cart.items || {},
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
// REMOVE ONE QUANTITY
// =================================

const removeFromCart = async (req, res) => {

  try {

    const userId = req.userId;

    const {
      shoeId,
      size,
    } = req.body;


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
    // CART KEY
    // =================================

    const key =
      `${shoeId}-${size}`;


    // =================================
    // DECREASE QUANTITY
    // =================================

    if (cart.items?.[key]) {

      cart.items[key] -= 1;


      // If quantity reaches 0
      // remove item completely

      if (cart.items[key] <= 0) {

        delete cart.items[key];

      }

    }


    // Important
    cart.markModified("items");


    // =================================
    // SAVE
    // =================================

    await cart.save();


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
// CLEAR ENTIRE CART
// =================================

const clearCart = async (req, res) => {

  try {

    const userId = req.userId;


    const cart =
      await cartModel.findOne({
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



export {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};