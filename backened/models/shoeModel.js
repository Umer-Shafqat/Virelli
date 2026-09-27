import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema(
  {
    // ===============================
    // PRODUCT NAME
    // ===============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ===============================
    // PRODUCT TYPE
    // MEN / WOMEN / KID
    // ===============================
    type: {
      type: String,
      required: true,
      enum: ["MEN", "WOMEN", "KID"],
    },

    // ===============================
    // CATEGORY
    // Shoes / Watches / Jackets /
    // Hoodies / Caps etc.
    // ===============================
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // ===============================
    // POPULAR
    // ===============================
    popular: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // PRODUCT IMAGES
    // ===============================
    images: {
      type: [String],
      required: true,
      default: [],
    },

    // ===============================
    // PRICE
    // ===============================
    price: {
      type: Number,
      required: true,
    },

    // ===============================
    // DISCOUNT
    // ===============================
    discount: {
      type: Number,
      default: 0,
    },

    // ===============================
    // DESCRIPTION
    // ===============================
    description: {
      type: String,
      required: true,
    },

    // ===============================
    // SIZES
    // ===============================
    sizes: {
      type: [String],
      default: [],
    },

    // ===============================
    // NEW ARRIVAL
    // ===============================
    isNewArrival: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // OFFER
    // ===============================
    isOffer: {
      type: Boolean,
      default: false,
    },

    // ===============================
    // OFFER PRICE
    // ===============================
    offerPrice: {
      type: Number,
      default: 0,
    },

    // ===============================
    // RATING
    // ===============================
    rating: {
      totalRatings: {
        type: Number,
        default: 0,
      },

      ratingSum: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// ===============================
// MODEL
// ===============================
const shoeModel =
  mongoose.models.shoe ||
  mongoose.model("shoe", shoeSchema);

export default shoeModel;