import ShoeModel from "../models/shoeModel.js";
import UserModel from "../models/userModel.js";
import OrderModel from "../models/orderModel.js";

const addShoe = async (req, res) => {
  try {
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const shoeType = String(req.body.type || "")
      .trim()
      .toUpperCase();

    const category = String(req.body.category || "")
      .trim();

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Product category is required",
      });
    }

    let finalType = "";

    if (shoeType === "MEN") {
      finalType = "MEN";
    } else if (shoeType === "WOMEN") {
      finalType = "WOMEN";
    } else if (
      shoeType === "KID" ||
      shoeType === "KIDS"
    ) {
      finalType = "KID";
    }

    if (!finalType) {
      return res.status(400).json({
        success: false,
        message: "Valid product type is required",
      });
    }

    const requiresSize =
      req.body.requiresSize === "true" ||
      req.body.requiresSize === true;

    const image_filenames = req.files.map(
      (file) => file.filename
    );

    const sizes = req.body.sizes
      ? String(req.body.sizes)
          .split(",")
          .map((size) => size.trim())
          .filter((size) => size !== "")
      : [];

    if (requiresSize && sizes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Sizes are required for this product",
      });
    }

    const finalSizes = requiresSize ? sizes : [];

    const shoe = new ShoeModel({
      name: String(req.body.name || "").trim(),

      type: finalType,

      category: category,

      images: image_filenames,

      price: Number(req.body.price || 0),

      discount: Number(req.body.discount || 0),

      description: String(
        req.body.description || ""
      ).trim(),

      requiresSize: requiresSize,

      sizes: finalSizes,

      popular:
        req.body.popular === "true" ||
        req.body.popular === true,

      isNewArrival:
        req.body.isNewArrival === "true" ||
        req.body.isNewArrival === true,

      isOffer:
        req.body.isOffer === "true" ||
        req.body.isOffer === true,

      offerPrice: Number(
        req.body.offerPrice || 0
      ),
    });

    const savedShoe = await shoe.save();

    console.log(
      "Product saved:",
      savedShoe
    );

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      shoe: savedShoe,
    });
  } catch (error) {
    console.error(
      "Add product error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getShoes = async (req, res) => {
  try {
    const shoes = await ShoeModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    console.error(
      "Get shoes error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getShoeById = async (req, res) => {
  try {
    const shoe = await ShoeModel.findById(
      req.params.id
    );

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
    console.error(
      "Error getting shoe:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getNewArrivals = async (req, res) => {
  try {
    const shoes = await ShoeModel.find({
      isNewArrival: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      shoes,
    });
  } catch (error) {
    console.error(
      "Error getting new arrivals:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOffers = async (req, res) => {
  try {
    const shoes = await ShoeModel.find({
      isOffer: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      shoes,
    });
  } catch (error) {
    console.error(
      "Error getting offers:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchAdmin = async (req, res) => {
  try {
    const { q } = req.query;

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

    res.status(200).json({
      success: true,
      shoes,
      users,
      orders,
    });
  } catch (error) {
    console.error(
      "Admin search error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteShoe = async (req, res) => {
  try {
    const shoe = await ShoeModel.findById(
      req.params.id
    );

    if (!shoe) {
      return res.status(404).json({
        success: false,
        message: "Shoe not found",
      });
    }

    await ShoeModel.findByIdAndDelete(
      req.params.id
    );

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
  searchAdmin,
  deleteShoe,
};
