// Import necessary modules
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
// Set up Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_KEY);

// Create an Express router
const router = express.Router();

// Define a route for creating a checkout session
router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
  const {
    userid,
    guideid,
    Location,
    startDate,
    endDate,
    userEmail,
    guideName,
    Days,
    totalAmount,
  } = req.body;
  try {
    // Create a checkout session using Stripe API
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: guideName,
            },
            unit_amount: totalAmount*100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",


      success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
    });
    console.log("Session URL:", session.url);
    // Redirect the client to the checkout session URL
    res.send({ url: session.url });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router

router.get("/create-confirmation-session", async (req, res) => {
  console.log("jew");
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    paymentId: session.id,
    customer_email: session.customer_details.email,
  });
});
export default router;
