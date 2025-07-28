import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return ( 
    <nav className="flex items-center justify-between px-8 py-4 bg-[#fdf8f3] dark:bg-[#1e1e1e] shadow transition-colors">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
        ⚽ <span>Sportify</span>
      </Link>

      <div className="space-x-6 text-md font-medium text-gray-700 dark:text-gray-200">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
        <button
          onClick={scrollToFooter}
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          Contact
        </button>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
            <button onClick={handleLogout} className="ml-2 text-red-500 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 border rounded hover:bg-blue-100 dark:border-gray-500 dark:hover:bg-gray-700">Log In</Link>
            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</Link>
          </>
        )}

        {/* 🌙/☀️ Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 text-lg hover:scale-110 transition-transform"
          title="Toggle Dark Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
