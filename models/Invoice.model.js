const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: Number,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      trim: true,
    },
    items: [
      {
        name: {
          type: String,
          trim: true,
        },
        image: {
          type: String,
          trim: true,
        },
        amount: {
          type: Number,
          trim: true,
        },
        price: {
          type: Number,
          trim: true,
        },
      },
    ],
    discount: {
      type: Number,
      trim: true,
    },
    paid: {
      type: Number,
      trim: true,
    },
    due: {
      type: Number,
      trim: true,
    },
    totalAmount: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
