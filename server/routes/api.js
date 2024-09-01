const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the Shipment schema
const shipmentSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  shipment: String,
  trackId: String,
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

// POST route to handle form submission
router.post("/submit", async (req, res) => {
  const { sender, receiver, shipment, trackId } = req.body;
  const newShipment = new Shipment({ sender, receiver, shipment, trackId });

  try {
    await newShipment.save();
    res.status(200).send("Shipment data saved successfully");
  } catch (err) {
    console.error("Error saving shipment data:", err);
    res.status(500).send("Error saving shipment data");
  }
});

module.exports = router;
