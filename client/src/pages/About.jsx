import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight border-b-4 border-purple-600 inline-block pb-2">
          The Sportify Story
        </h1>
      </div>

      {/* Split layout */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img
            src="https://images.pexels.com/photos/935835/pexels-photo-935835.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Sport setup"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            It’s 2025, and we called B.S. on finding players nearby.
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Sportify was born out of frustration with empty fields, missing players,
            and disconnected communities. We set out to build a better way to join, host,
            and relive sports events.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            No more endless WhatsApp groups. No more “who’s in?” confusion.
            Just real sports, real players right around you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
