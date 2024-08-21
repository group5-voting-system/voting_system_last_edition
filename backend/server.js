const express = require("express");
const app = express();
require("dotenv").config();
const candidateRequestRoutes = require("./routes/candidateRequests");
const localListRoutes = require("./routes/localLists");
const statsRoutes = require("./routes/stats");
const votingRoutes = require("./routes/votingRoutes");
const localCandidatesRoutes = require("./routes/localCandidatesRoutes");
const partyListRoutes = require("./routes/partyListRoutes");
const partyListvoteRoutes = require("./routes/partyListvoteRoutes");
const localListvoteRoutes = require("./routes/voteRoutes");
const ChatRoutes = require("./routes/contactFormRoutes");
const resultparty = require("./routes/resultpartyroutes");
const PORT = 5000;
// const register_router = require("./routes/register_router");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/voting", votingRoutes);
app.use("/api", ChatRoutes);
app.use("/api/candidate-requests", candidateRequestRoutes);
app.use("/api/local-lists", localListRoutes);
// app.use("/db/vs", register_router);
app.use("/api/local-lists", localListRoutes);
app.use("/api", partyListRoutes);
app.use("/api", localListvoteRoutes);
app.use("/api/party_list_votes", partyListvoteRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/voting", resultparty);

// console.log("register router");
// console.log("register router");
const register_router = require("./routes/register_router");
app.use("/db/vs", register_router);
// console.log("after route");


const db = require("./db/knex");

const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-payment-intent", async (req, res) => {
//   const { amount, currency } = req.body;

//   if (!amount || isNaN(amount) || amount <= 0) {
//     return res.status(400).json({ error: "Invalid amount" });
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });

//     await db("payments").insert({
//       stripe_payment_id: paymentIntent.id,
//       amount,
//       currency,
//       status: paymentIntent.status,
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Error creating payment intent:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

app.post("/create-payment-intent", async (req, res) => {
  const { currency } = req.body;
  const amount = 350; // Static amount of 350 cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    await db("payments").insert({
      stripe_payment_id: paymentIntent.id,
      amount,
      currency,
      status: paymentIntent.status,
      created_at: new Date(), // Add created_at timestamp
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
