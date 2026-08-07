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

    popular: {
      type: Boolean,
      default: false,
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

     isNewArrival: {
  type: Boolean,
  default: false,
},

isOffer: {
  type: Boolean,
  default: false,
},

offerPrice: {
  type: Number,
  default: 0,
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

const shoeModel =
  mongoose.models.shoe || mongoose.model("shoe", shoeSchema);

export default shoeModel;