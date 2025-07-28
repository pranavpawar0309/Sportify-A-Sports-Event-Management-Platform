import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;

  const [paymentMethod, setPaymentMethod] = useState("card");

  const token = localStorage.getItem("token");

  const handlePayment = async () => {
    if (!event || !event._id) {
      toast.error("❌ Event info missing");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/payment-success",
        {
          eventId: event._id,
          paymentMethod,
          amount: 350,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Payment & booking confirmed!");
      navigate("/success");
    } catch (err) {
      console.error("Payment failed:", err);
      if (err.response?.status === 403) {
        toast.error("🚫 You cannot book your own event");
      } else if (err.response?.status === 400) {
        toast.error("⚠️ Invalid booking request");
      } else {
        toast.error("❌ Booking failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] px-4">
      <ToastContainer />
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Confirm Payment</h2>
        <p className="mb-4">You're booking: <strong>{event?.title || "N/A"}</strong></p>

        <select
          className="w-full p-2 border rounded mb-6"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Pay ₹350 & Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
