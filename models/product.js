"use strict";
const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    tittle: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: String, required: true },
    availableQty: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Product", ProductSchema);

// const Product = mongoose.model("Product", ProductSchema);
//setTimeout(() => mongoose.model("Product").findOne(), 5000);

// module.exports = Product;
// export default mongoose.models.Product ||
//   mongoose.models("Product", ProductSchema);
