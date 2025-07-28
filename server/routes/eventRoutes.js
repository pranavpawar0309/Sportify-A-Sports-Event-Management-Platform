const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// Create Event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, location, date, time, lat, lng, maxPlayers } = req.body;

    const event = await Event.create({
      title,
      description,
      location,
      date,
      time,
      lat,
      lng,
      maxPlayers,
      hostedBy: req.user.id,
      bookings: [],
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("❌ Event creation failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Events with bookings populated
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("bookings", "name email");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// Payment Success → Book Event
router.post("/payment-success", authMiddleware, async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.hostedBy.toString() === req.user.id) {
      return res.status(403).json({ message: "You can't book your own event" });
    }

    if (event.bookings.includes(req.user.id)) {
      return res.status(400).json({ message: "You already booked this event" });
    }

    if (event.bookings.length >= event.maxPlayers) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    event.bookings.push(req.user.id);
    await event.save();

    res.status(200).json({ message: "✅ Payment success & booking confirmed" });
  } catch (err) {
    console.error("❌ Booking failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel Booking
router.delete("/cancel/:id", authMiddleware, async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.bookings = event.bookings.filter(
      (id) => id.toString() !== req.user.id
    );
    await event.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

// Delete Event (host only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.hostedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error during delete" });
  }
});

module.exports = router;
