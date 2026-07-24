import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        shoeId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        size: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    address: {
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

      street: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      zipCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      default: "Order Placed",
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    payment: {
      type: Boolean,
      default: false,
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