// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "@/models/order";
import connectDb from "@/middleware/mongoose";
const handler = async (req, res) => {
  //validate paytm checksum
  //Update status into Orders table after checking the transsaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
  } else if (req.body.STATUS == "PENDING") {
    await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }

  //Intitate Shipping
  //Redirect user to the order confirmation page
  res.direct("/order", 200);
  res.status(200).json({ body: req.body });
};

export default connectDb(handler);
