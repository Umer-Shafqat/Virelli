import ShoeModel from "../models/shoeModel.js";

// ================================
// ADD SHOE
// ================================
const addShoe = async (req, res) => {
  try {
    
console.log("req.file:", req.file);
console.log("req.body:", req.body);

    const shoe = new ShoeModel({
      name: req.body.name,
      type:
  req.body.type.toUpperCase() === "MEN"
    ? "MEN"
    : req.body.type.toUpperCase() === "WOMEN"
    ? "WOMEN"
    : req.body.type.toUpperCase() === "KID" ||
      req.body.type.toUpperCase() === "KIDS"
    ? "KID"
    : "",
      category: req.body.category,
      image: req.file.filename, // ✅ FIXED
      price: req.body.price,
      discount: req.body.discount,
      description: req.body.description,
      sizes: req.body.sizes.split(",").map((size) => Number(size.trim())),
    });

    const savedShoe = await shoe.save();

    res.status(201).json({
      success: true,
      message: "Shoe added successfully",
      shoe: savedShoe,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// GET ALL SHOES
// ================================
const getShoes = async (req, res) => {
  try {
    const shoes = await ShoeModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
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
      shoe,
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
// GET /api/shoes/list
// ================================
export const listShoes = async (req, res) => {
  try {
    const shoes = await ShoeModel.find({});

    res.json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// DELETE /api/shoes/:id
// ================================
export const deleteShoe = async (req, res) => {
  try {
    await ShoeModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Shoe deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
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
};