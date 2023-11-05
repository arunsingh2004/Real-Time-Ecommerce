"use strict";
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paytmInfo: { type: String, default: "" },

    product: { type: Object, required: true },
    address: { type: String, required: true },
    totalPrice: { type: Number, default: 0 },
    status: { type: String, deafult: "Initiated", required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
//mongoose.model is not a function
// export default mongoose.models.Order || mongoose.models("Order", OrderSchema);
export default mongoose.model("Order", OrderSchema);
