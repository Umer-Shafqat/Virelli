import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["MEN", "WOMEN", "KID"],
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },

    sizes: {
      type: [Number],
      default: [],
    },

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

const ShoeModel = mongoose.model("Shoe", shoeSchema);

export default ShoeModel;