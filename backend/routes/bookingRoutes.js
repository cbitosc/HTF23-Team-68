const express = require("express");
require("dotenv").config();
const router = express.Router();

const Booking = require("../models/bookingModel");
const fetchUser = require("../middleware/authMiddleware");

// Function to create example booking documents
const createExampleBookings = async () => {
  try {
    const exampleBookings = [
      {
        studentId: "6521878b3b34298e3bf0522f", 
        sport: "basketball",
        quantity:2, 
        timeSlot: {
          startTime: new Date("2023-10-10T09:00:00.000Z"),
          endTime: new Date("2023-10-10T09:30:00.000Z"),
        },
        status: true,
      },
      {
        
        studentId: "652198d38feddd58359664f0", 
        sport: "basketball",
        quantity:2, 
        timeSlot: {
          startTime: new Date("2023-10-10T10:00:00.000Z"),
          endTime: new Date("2023-10-10T10:30:00.000Z"),
        },
        status: false,
      },
      // Add more example bookings as needed
    ];

    // Insert the example bookings into the database
    await Booking.insertMany(exampleBookings);
  } catch (error) {
    console.error("Error creating example bookings:", error);
  }
};



router.get("/getslots/:sport", async (req, res) => {
  try {
    const sport = req.params.sport;
    // Call the function to create example bookings (you can place this call in your server initialization code)
    // createExampleBookings();
    // Assuming you want to find all bookings for the specified sport where status is true (booked)
    const slots = await Booking.find(
      { sport, status: true }// Projection to include only timeSlot and status
    );
      console.log(slots)
    res.json(slots);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.post("/book", fetchUser, async (req, res) => {
    try {
      const bookings = req.body.map((booking) => {
        return {
          studentId: req.user.id,
          sport: booking.sport,
          quantity: booking.quantity,
          timeStamps: booking.timeStamps,
          status: true,
        };
      });
  
      const createdBookings = await Booking.create(bookings);
  
      res.json(createdBookings);
    } catch (error) {
      console.error("Error creating booking slots:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  

  router.get("/pastReq", fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const bookings = await Booking.find(
          {studentId: id}
        );
        console.log(bookings)
        res.json(bookings);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        res.status(500).json({ error: "An error occurred" });
      }
  })

module.exports = router;
