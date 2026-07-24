import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const cartModel =
  mongoose.models.cart ||
  mongoose.model("cart", cartSchema);

export default cartModel;