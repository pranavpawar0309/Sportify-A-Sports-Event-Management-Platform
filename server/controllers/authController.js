const Booking = require("../models/Booking");
const Event = require("../models/Event");

exports.markPaymentSuccess = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;

    if (!eventId || !userId) {
      return res.status(400).json({ message: "Missing event or user ID" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.hostedBy.toString() === userId) {
      return res.status(403).json({ message: "You cannot book your own event" });
    }

    const alreadyBooked = await Booking.findOne({ user: userId, event: eventId });
    if (alreadyBooked) {
      return res.status(400).json({ message: "Already booked" });
    }

    const booking = await Booking.create({ user: userId, event: eventId });

    event.bookings.push(userId);
    await event.save();

    res.status(200).json({ message: "Booking confirmed after payment", booking });
  } catch (err) {
    console.error("Payment booking error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};
