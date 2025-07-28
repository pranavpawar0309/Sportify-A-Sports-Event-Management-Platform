import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const successImage =
    "https://cdn-icons-png.flaticon.com/512/148/148767.png"; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] dark:bg-gray-900 px-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-lg max-w-2xl w-full flex flex-col md:flex-row overflow-hidden">

        {/* Left - Text */}
        <div className="flex-1 p-8 flex flex-col justify-center items-start">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Booking Successful!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You've successfully booked a spot for the event. We’ll see you there!
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Right - Image */}
        <div className="bg-blue-100 dark:bg-gray-700 p-6 flex items-center justify-center">
          <img
            src={successImage}
            alt="success"
            className="w-52 h-52 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
