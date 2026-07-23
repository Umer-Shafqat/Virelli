import ShoeModel from "../models/shoeModel.js";

// ================================
// ADD SHOE
// ================================
const addShoe = async (req, res) => {
  try {
    const shoe = new ShoeModel({
      name: req.body.name,
      type: req.body.type,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      discount: req.body.discount,
      description: req.body.description,
      sizes: req.body.sizes,
    });

    const savedShoe = await shoe.save();

    res.status(201).json({
      success: true,
      message: "Shoe added successfully",
      shoe: savedShoe,
    });
  } catch (error) {
    console.error("Error adding shoe:", error);

    res.status(500).json({
      success: false,
      message: "Error adding shoe",
      error: error.message,
    });
  }
};


// ================================
// GET ALL SHOES
// ================================
const getShoes = async (req, res) => {
  try {
    const shoes = await ShoeModel.find({});

    res.status(200).json({
      success: true,
      shoes: shoes,
    });
  } catch (error) {
    console.error("Error getting shoes:", error);

    res.status(500).json({
      success: false,
      message: "Error getting shoes",
      error: error.message,
    });
  }
};


// ================================
// GET SINGLE SHOE
// ================================
const getShoeById = async (req, res) => {
  try {
    const shoe = await ShoeModel.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    res.status(200).json({
      success: true,
      shoe: shoe,
    });
  } catch (error) {
    console.error("Error getting shoe:", error);

    res.status(500).json({
      success: false,
      message: "Error getting shoe",
      error: error.message,
    });
  }
};


// ================================
// DELETE SHOE
// ================================
const deleteShoe = async (req, res) => {
  try {
    const shoe = await ShoeModel.findByIdAndDelete(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shoe deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shoe:", error);

    res.status(500).json({
      success: false,
      message: "Error deleting shoe",
      error: error.message,
    });
  }
};


// ================================
// EXPORT
// ================================
export {
  addShoe,
  getShoes,
  getShoeById,
  deleteShoe,
};