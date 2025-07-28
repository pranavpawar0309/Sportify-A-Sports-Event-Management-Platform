import React from "react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-black text-white py-12 px-6 md:px-20 dark:bg-[#111] dark:text-gray-200"
    >
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">Sportify</h3>
          <p className="text-sm text-gray-400">
            Join, host, and relive your favorite sporting moments.
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img
                src="/assets/icons/instagram.png"
                alt="Instagram"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img
                src="/assets/icons/twitter.png"
                alt="Twitter"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <img
                src="/assets/icons/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/community" className="hover:text-white transition">Forum</a></li>
            <li><a href="/tips" className="hover:text-white transition">Tips</a></li>
            <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms of Use</a></li>
            <li><a href="/cookies" className="hover:text-white transition">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © 2025 Sportify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
