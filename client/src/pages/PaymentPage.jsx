import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const token = localStorage.getItem("token");
  const amount = 350;

  const handlePayment = async () => {
    if (!event || !event._id) {
      toast.error("❌ Event info missing");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          eventId: event._id,
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f0f4ff] dark:bg-gray-900 transition-colors">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-lg p-8 max-w-md w-full text-center transition-all">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Confirm Payment</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          You're booking: <strong>{event?.title || "N/A"}</strong>
        </p>

        <select
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-6 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Pay ₹{amount} & Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
