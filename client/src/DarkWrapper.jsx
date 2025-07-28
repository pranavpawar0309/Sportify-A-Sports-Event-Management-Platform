// src/DarkWrapper.jsx
import { useEffect } from "react";

const DarkWrapper = ({ children }) => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return children;
};

export default DarkWrapper;
