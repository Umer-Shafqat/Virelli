import ShoeModel from "../models/shoeModel.js";

const addShoe = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const shoeType = String(req.body.type || "").trim().toUpperCase();

    const shoe = new ShoeModel({
      name: req.body.name,

      type:
        shoeType === "MEN"
          ? "MEN"
          : shoeType === "WOMEN"
          ? "WOMEN"
          : shoeType === "KID" || shoeType === "KIDS"
          ? "KID"
          : "",

      category: req.body.category,

      image: req.file.filename,

      price: Number(req.body.price),

      discount: Number(req.body.discount || 0),

      description: req.body.description,

      sizes: req.body.sizes
        .split(",")
        .map((size) => Number(size.trim())),

      popular: req.body.popular === "true",

      isNewArrival: req.body.isNewArrival === "true",

      isOffer: req.body.isOffer === "true",

      offerPrice: Number(req.body.offerPrice || 0),
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

// ===============================
// GET ALL SHOES
// ===============================
const getShoes = async (req, res) => {
  try {
    const shoes = await ShoeModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE SHOE
// ===============================
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
      message: error.message,
    });
  }
};

import shoeModel from "../models/shoeModel.js";


// New Arrivals
const getNewArrivals = async (req, res) => {
  try {
    const shoes = await shoeModel.find({
      isNewArrival: true
    });

    console.log("New Arrivals:", shoes);

    res.json({
      success: true,
      shoes: shoes
    });

  } catch (error) {
    console.log("Error getting new arrivals:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Offers
const getOffers = async (req, res) => {
  try {
    const shoes = await shoeModel.find({
      isOffer: true
    });

    console.log("Offers:", shoes);

    res.json({
      success: true,
      shoes: shoes
    });

  } catch (error) {
    console.log("Error getting offers:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ===============================
// DELETE SHOE
// ===============================
const deleteShoe = async (req, res) => {
  try {
    const shoe = await ShoeModel.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    await ShoeModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Shoe deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addShoe,
  getShoes,
  getShoeById,
  getNewArrivals,
  getOffers,
  deleteShoe,
};