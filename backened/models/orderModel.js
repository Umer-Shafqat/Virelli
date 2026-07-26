import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },

      paymentMethod: {
        type: String,
        required: true,
      },
    },

    items: {
      type: Array,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharges: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);

const orderModel =
  mongoose.models.order ||
  mongoose.model("order", orderSchema);

export default orderModel;