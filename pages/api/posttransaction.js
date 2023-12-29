// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "@/models/order";
import Product from "../../models/product";
import connectDb from "@/middleware/mongoose";
const handler = async (req, res) => {
  let order;
  //validate paytm checksum
  //Update status into Orders table after checking the transsaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }

  //Intitate Shipping
  //Redirect user to the order confirmation page
  // res.direct("/order", 200);
  res.direct("/order?clearCart=1&id=" + order_id, 200);
  res.status(200).json({ body: req.body });
};

export default connectDb(handler);
