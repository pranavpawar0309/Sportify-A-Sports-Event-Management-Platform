const Booking = require("../models/Booking");
const Event = require("../models/Event");

exports.createBooking = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.body;

  if (!eventId) return res.status(400).json({ message: "Missing event ID" });

  try {
    const alreadyBooked = await Booking.findOne({ user: userId, event: eventId });
    if (alreadyBooked) {
      return res.status(400).json({ message: "Already booked" });
    }

    const booking = await Booking.create({ user: userId, event: eventId });
    await Event.findByIdAndUpdate(eventId, { $push: { bookings: userId } });

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("event");
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

exports.cancelBooking = async (req, res) => {
  const userId = req.user.id;
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findOneAndDelete({ _id: bookingId, user: userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Event.findByIdAndUpdate(booking.event, { $pull: { bookings: userId } });

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};

exports.paymentSuccessBooking = async (req, res) => {
  res.json({ message: "Payment success booking route hit!" });
};
