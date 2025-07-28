import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-[#fdf8f3] dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center px-10 py-20 bg-[#fdf8f3] dark:bg-gray-900 transition-all">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left z-10">
          <h2 className="text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-6">
            Style That <br /> Speaks Sports.
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Elevate your game and your presence join and host events with ease. Made for the players, by the players.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Join Now
            </a>
            <a
              href="/dashboard"
              className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-white dark:border-white rounded-full font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              Host an Event
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          <div className="overflow-hidden rounded-3xl shadow-xl max-w-md mx-auto">
            <img
              src="https://images.pexels.com/photos/4761791/pexels-photo-4761791.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Sports Hero"
              className="object-cover w-full h-[500px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
