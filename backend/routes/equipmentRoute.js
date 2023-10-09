const express = require("express");
require("dotenv").config();
const router = express.Router();

const Equipment = require("../models/equipmentModel"); // Assuming you have an Equipment model

// Route to get all equipment
router.get("/getallequipment", async (req, res) => {
  try {
    

    const allEquipment = await Equipment.find();
    res.json(allEquipment);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Route to post new equipment
router.post("/addequipment", async (req, res) => {
  try {
    const { sport, quantity } = req.body;

    // Create a new equipment document
    const newEquipment = new Equipment({
      sport,
      quantity,
    });

    // Save the new equipment document to the database
    await newEquipment.save();

    res.json(newEquipment);
  } catch (error) {
    console.error("Error adding new equipment:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
