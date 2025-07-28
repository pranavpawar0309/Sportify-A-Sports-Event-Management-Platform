import React from "react";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf8f3] dark:bg-gray-900 px-6 transition-colors">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-xl overflow-hidden">

        {/* Left Side - Blue Gradient */}
        <div className="bg-gradient-to-br from-blue-300 to-blue-600 text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Success!</h1>
          <p className="text-sm mb-6">
            You’ve successfully registered and joined the Sportify community.
          </p>
          <a
            href="/login"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition"
          >
            Go to Login
          </a>
        </div>

        {/* Right Side - Illustration */}
        <div className="flex items-center justify-center p-6 bg-white dark:bg-gray-800">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1234/1234567.png" 
            alt="Success Graphic"
            className="w-full max-w-md object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default Success;
