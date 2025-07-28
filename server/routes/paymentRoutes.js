const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Payment simulation (no event deletion after payment)
router.post("/payment-success", authMiddleware, async (req, res) => {
  const { eventId, paymentMethod, amount } = req.body;

  // Simulate payment processing
  if (amount !== 350) {
    return res.status(400).json({ message: "Invalid payment amount" });
  }

  // Handle different payment methods (mocking successful payment)
  if (paymentMethod !== "upi" && paymentMethod !== "card") {
    return res.status(400).json({ message: "Invalid payment method" });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in user is the host (only non-host can book)
    if (event.hostedBy.toString() === req.user.id) {
      return res.status(403).json({ message: "You cannot book your own event" });
    }

    // Proceed with the successful payment without deleting the event
    res.status(200).json({
      message: "Payment successful, event booked",
    });
  } catch (err) {
    console.error("❌ Error during payment:", err);
    res.status(500).json({ message: "Error processing payment" });
  }
});

module.exports = router;
