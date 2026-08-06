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

export const getNewArrivals = async (req, res) => {
  try {
    const shoes = await Shoe.find({
      isNewArrival: true,
    });

    res.json({
      success: true,
      shoes,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getOffers = async (req, res) => {
  try {
    const shoes = await Shoe.find({
      isOffer: true,
    });

    res.json({
      success: true,
      shoes,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

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

export {
  addShoe,
  getShoes,
  getShoeById,
};