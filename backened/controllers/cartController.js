import cartModel from "../models/cartModel.js";


// =================================
// ADD TO CART
// =================================

const addToCart = async (req, res) => {
  try {

    const userId = req.userId;

    const {
      shoeId,
      size,
    } = req.body;


    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }


    if (!shoeId || !size) {
      return res.status(400).json({
        success: false,
        message: "Shoe ID and size are required",
      });
    }


    // Find user's cart
    let cart = await cartModel.findOne({
      userId,
    });


    // If cart doesn't exist
    if (!cart) {

      cart = new cartModel({
        userId,

        items: {
          [`${shoeId}-${size}`]: 1,
        },
      });

    } else {

      // Existing quantity
      const key = `${shoeId}-${size}`;

      const currentQuantity =
        cart.items[key] || 0;


      cart.items[key] =
        currentQuantity + 1;

    }


    await cart.save();


    res.status(200).json({
      success: true,
      message: "Shoe added to cart",
      cart: cart.items,
    });


  } catch (error) {

    console.log(
      "Add Cart Error:",
      error
    );

    res.status(500).json({
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


    if (!cart) {

      return res.status(200).json({
        success: true,
        cartData: {},
      });

    }


    res.status(200).json({
      success: true,
      cartData: cart.items,
    });


  } catch (error) {

    console.log(
      "Get Cart Error:",
      error
    );

    res.status(500).json({
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

    const {
      shoeId,
      size,
    } = req.body;


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


    const key =
      `${shoeId}-${size}`;


    if (cart.items[key]) {

      cart.items[key] -= 1;


      if (cart.items[key] <= 0) {

        delete cart.items[key];

      }

    }


    cart.markModified("items");


    await cart.save();


    res.status(200).json({
      success: true,
      message: "Item removed",
      cart: cart.items,
    });


  } catch (error) {

    console.log(
      "Remove Cart Error:",
      error
    );

    res.status(500).json({
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


    await cartModel.findOneAndUpdate(

      {
        userId,
      },

      {
        items: {},
      }

    );


    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });


  } catch (error) {

    console.log(
      "Clear Cart Error:",
      error
    );

    res.status(500).json({
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