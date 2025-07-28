const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  cancelBooking,
  paymentSuccessBooking, // ✅ If you need this separately
} = require("../controllers/bookingController");
const requireAuth = require("../middleware/authMiddleware");

router.post("/", requireAuth, createBooking);             // ✅ Keep only this once
router.get("/mine", requireAuth, getMyBookings);
router.delete("/:id", requireAuth, cancelBooking);

// If you want a **separate route** for payment success:
router.post("/payment-success", requireAuth, paymentSuccessBooking); // ✅ Optional

module.exports = router;
