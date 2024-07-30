const Stripe = require("../config/stripe");
const UserModel = require("../models/userModel");

const Payment = async (req, res) => {
  try {
    const user = req.user;
    const { cartItems } = req.body;

    console.log("User Details:", user);
    console.log("Product Details:", cartItems);
    // if (!cartItems || cartItems.length === 0) {
    //   throw new Error("Cart items are empty.");
    // }

    // cartItems.forEach((item, index) => {
    //   if (!item.quantity) {
    //     throw new Error(`Quantity is missing for cart item at index ${index}`);
    //   }
    //   if (!item.productName || !item.image || !item.price || !item._id) {
    //     throw new Error(`Invalid cart item structure at index ${index}`);
    //   }
    // });

    const params = {
      submit_type: "pay",
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1PVumGC6qYPttZBGtw30NstP",
        },
      ],
      customer_email: user.email,
      line_items: cartItems?.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productName,
              images: [item.image],
              metadata: {
                productId: item._id,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    };

    const session = await Stripe.checkout.sessions.create(params);
    res.status(200).json(session);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = Payment;
