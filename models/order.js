"use strict";
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    totalPrice: { type: Number, default: 0 },
    status: { type: String, deafult: "Pending", required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
//mongoose.model is not a function
// export default mongoose.models.Order || mongoose.models("Order", OrderSchema);
export default mongoose.model("Order", OrderSchema);
