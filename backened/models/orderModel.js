import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Shoe",
  required: true,
},

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    discount: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);


const orderSchema = new mongoose.Schema(
  {
    // =====================================
    // USER
    // =====================================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    // =====================================
    // CUSTOMER INFORMATION
    // =====================================

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


    // =====================================
    // ORDER ITEMS
    // =====================================

    items: {
      type: [orderItemSchema],
      required: true,
    },


    // =====================================
    // PRICE INFORMATION
    // =====================================

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


    // =====================================
    // ORDER STATUS
    // =====================================

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