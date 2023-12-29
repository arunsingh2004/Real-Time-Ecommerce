const https = require("https");
import Order from "@/models/order";
import connectDb from "@/middleware/mongoose";
import Product from "../../models/product";
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
const PaytmChecksum = require("paytmchecksum");
const handler = async (req, res) => {
  if (req.method == "POST") {
    //Check if the cart is tampered with --
    let products,
      sumTotal = 0;
    let cart = req.body.cart;
    for (let item in req.body.cart) {
      let product = await Product.findOne({ slug: item });
      //Check if the cart items are out of stock --

      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          succes: false,
          error: "Item in your cart is Out of Stock. Please try again.",
        });
        return;
      }

      if (product.price != cart[item].price) {
        res.status(200).json({
          succes: false,
          error:
            "The price of some items in your cart have changes . Please try again.",
        });
        return;
      }
      sumTotal += product.price * cart[item].quantity;
    }
    if (sumTotal !== req.body.subTotal) {
      res.status(200).json({
        succes: false,
        error:
          "The price of some items in your cart have changes . Please try again.",
      });
      return;
    }

    //Check if the details are valid
    if (
      !req.body.email ||
      !req.body.oid ||
      !req.body.cart ||
      !req.body.address ||
      !req.body.subTotal
    ) {
      res.status(400).json({ error: "Something went wrong" });
    }

    //Intiante order correspponding to this order id
    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      product: req.body.cart,
      address: req.body.address,
      amount: req.body.subTotal,
    });
    await order.save((err, doc) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Something went wrong" });
      } else {
        res.status(200).json({ success: "Success" });
      }
    });

    //Insert an enrty int the Orders table wwith  status as pending
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );

    var post_data = JSON.stringify(paytmParams);
    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in"
          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}& 
          orderId= ${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            // console.log("Response: ", response);
            let ress = JSON.parse(response).body;
            ress.succes = true;
            resolve(ress);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };
    let mys = await requestAsync();
  }
};
export default connectDb(handler);
