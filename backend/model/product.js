const mongoose = require("mongoose");

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,  
    required: [true, "Please enter your product price!"],
  },
  
  images: [
    {
      type: String,
    },
  ],

  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      createdTime: {
        type: String,
        default: getCurrentTime,
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdTime: {
    type: String,
    default: getCurrentTime,
  },
  
});

module.exports = mongoose.model("Product", productSchema);
