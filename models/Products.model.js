const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const productsSchema = new Schema(
  {
    category: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    purchasePrice: {
      type: Number,
      trim: true,
    },
    sellPrice: {
      type: Number,
      trim: true,
    },
    quantity: {
      type: Number,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    shop: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Products", productsSchema);
