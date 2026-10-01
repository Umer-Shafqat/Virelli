import ShoeModel from "../models/shoeModel.js";
import UserModel from "../models/userModel.js";
import OrderModel from "../models/orderModel.js";
import cloudinary from "../config/cloudinary.js";

// ======================================================
// UPLOAD IMAGE TO CLOUDINARY
// ======================================================

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "virelli/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// ======================================================
// ADD SHOE
// ======================================================

const addShoe = async (req, res) => {
  try {
    console.log("=================================");
    console.log("ADDING NEW SHOE");
    console.log("=================================");

    console.log("req.files:", req.files);
    console.log("req.body:", req.body);

    // --------------------------------------------------
    // CHECK IMAGES
    // --------------------------------------------------

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    // --------------------------------------------------
    // CHECK CLOUDINARY ENVIRONMENT VARIABLES
    // --------------------------------------------------

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary environment variables are missing");

      return res.status(500).json({
        success: false,
        message:
          "Cloudinary configuration is missing. Please check Vercel environment variables.",
      });
    }

    // --------------------------------------------------
    // SHOE TYPE
    // --------------------------------------------------

    const shoeType = String(req.body.type || "")
      .trim()
      .toUpperCase();

    // --------------------------------------------------
    // CATEGORY
    // --------------------------------------------------

    const category = String(req.body.category || "").trim();

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }

    // --------------------------------------------------
    // UPLOAD ALL IMAGES TO CLOUDINARY
    // --------------------------------------------------

    console.log("Uploading images to Cloudinary...");

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer);

        console.log("Image uploaded:", result.secure_url);

        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      })
    );

    // Only store URLs in MongoDB
    const image_urls = uploadedImages.map(
      (image) => image.url
    );

    console.log("Cloudinary image URLs:", image_urls);

    // --------------------------------------------------
    // SIZES
    // --------------------------------------------------

    const sizes = req.body.sizes
      ? String(req.body.sizes)
          .split(",")
          .map((size) => size.trim())
          .filter((size) => size !== "")
      : [];

    // --------------------------------------------------
    // CREATE SHOE
    // --------------------------------------------------

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

      category,

      // Cloudinary URLs
      images: image_urls,

      price: Number(req.body.price),

      discount: Number(req.body.discount || 0),

      description: req.body.description || "",

      sizes,

      popular: req.body.popular === "true",

      isNewArrival:
        req.body.isNewArrival === "true",

      isOffer:
        req.body.isOffer === "true",

      offerPrice:
        Number(req.body.offerPrice || 0),
    });

    // --------------------------------------------------
    // SAVE TO MONGODB
    // --------------------------------------------------

    const savedShoe = await shoe.save();

    console.log("Shoe saved successfully");

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Shoe added successfully",
      shoe: savedShoe,
    });
  } catch (error) {
    console.error("=================================");
    console.error("ADD SHOE ERROR");
    console.error("=================================");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ALL SHOES
// ======================================================

const getShoes = async (req, res) => {
  try {
    const shoes = await ShoeModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    console.error("Get shoes error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE SHOE
// ======================================================

const getShoeById = async (req, res) => {
  try {
    const shoe = await ShoeModel.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    return res.status(200).json({
      success: true,
      shoe,
    });
  } catch (error) {
    console.error("Get shoe by ID error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET NEW ARRIVALS
// ======================================================

const getNewArrivals = async (req, res) => {
  try {
    const shoes = await ShoeModel.find({
      isNewArrival: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      shoes,
    });
  } catch (error) {
    console.error("Get new arrivals error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET OFFERS
// ======================================================

const getOffers = async (req, res) => {
  try {
    const shoes = await ShoeModel.find({
      isOffer: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      shoes,
    });
  } catch (error) {
    console.error("Get offers error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// ADMIN SEARCH
// ======================================================

const searchAdmin = async (req, res) => {
  try {
    const { q } = req.query;

    // --------------------------------------------------
    // EMPTY SEARCH
    // --------------------------------------------------

    if (!q || q.trim() === "") {
      return res.json({
        success: true,
        shoes: [],
        users: [],
        orders: [],
      });
    }

    const keyword = q.trim();
    const lowerKeyword = keyword.toLowerCase();

    let shoes = [];
    let users = [];
    let orders = [];

    // ==================================================
    // SEARCH SHOES
    // ==================================================

    if (
      lowerKeyword === "shoe" ||
      lowerKeyword === "shoes"
    ) {
      shoes = await ShoeModel.find().sort({
        createdAt: -1,
      });
    } else {
      shoes = await ShoeModel.find({
        $or: [
          {
            name: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            type: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            description: {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
      }).sort({
        createdAt: -1,
      });
    }

    // ==================================================
    // SEARCH USERS
    // ==================================================

    if (
      lowerKeyword === "user" ||
      lowerKeyword === "users"
    ) {
      users = await UserModel.find().sort({
        createdAt: -1,
      });
    } else {
      users = await UserModel.find({
        $or: [
          {
            name: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            email: {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
      }).sort({
        createdAt: -1,
      });
    }

    // ==================================================
    // SEARCH ORDERS
    // ==================================================

    if (
      lowerKeyword === "order" ||
      lowerKeyword === "orders"
    ) {
      orders = await OrderModel.find().sort({
        createdAt: -1,
      });
    } else {
      orders = await OrderModel.find({
        status: {
          $regex: keyword,
          $options: "i",
        },
      }).sort({
        createdAt: -1,
      });
    }

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,
      shoes,
      users,
      orders,
    });
  } catch (error) {
    console.error("Admin search error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// DELETE SHOE
// ======================================================

const deleteShoe = async (req, res) => {
  try {
    // --------------------------------------------------
    // FIND SHOE
    // --------------------------------------------------

    const shoe = await ShoeModel.findById(req.params.id);

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    // --------------------------------------------------
    // DELETE FROM MONGODB
    // --------------------------------------------------

    await ShoeModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Shoe deleted successfully",
    });
  } catch (error) {
    console.error("Delete shoe error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

export {
  addShoe,
  getShoes,
  getShoeById,
  getNewArrivals,
  getOffers,
  searchAdmin,
  deleteShoe,
};