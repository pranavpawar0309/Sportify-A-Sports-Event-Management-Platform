import React from "react";

const FollowUs = () => {
  return (
    <div className="bg-black text-white py-10 px-6 text-center">
      <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
      <div className="flex justify-center space-x-8">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/assets/icons/instagram.png" alt="Instagram" className="w-10 h-10 hover:scale-110 transition" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/assets/icons/twitter.png" alt="Twitter" className="w-10 h-10 hover:scale-110 transition" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="/assets/icons/linkedin.png" alt="LinkedIn" className="w-10 h-10 hover:scale-110 transition" />
        </a>
      </div>
    </div>
  );
};

export default FollowUs;
