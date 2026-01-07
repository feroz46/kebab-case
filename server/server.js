const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Queue = require("./Queue");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

let tokenCounter = 0;

// Generate Token
app.post("/token", async (req, res) => {
  tokenCounter++;
  const token = await Queue.create({ tokenNumber: tokenCounter });
  res.json(token);
});

// Get Queue
app.get("/queue", async (req, res) => {
  const list = await Queue.find().sort({ tokenNumber: 1 });
  res.json(list);
});

// Call Next Token
app.delete("/next", async (req, res) => {
  await Queue.findOneAndDelete({}, { sort: { tokenNumber: 1 } });
  res.json({ message: "Next token called" });
});

// REQUIRED FOR LIVE DEPLOYMENT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

