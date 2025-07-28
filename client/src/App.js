// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SuccessPage from "./pages/SuccessPage";
import RegisterSuccess from "./pages/RegisterSuccess";
import PaymentPage from "./pages/PaymentPage";
import About from "./pages/About"; // ✅ About page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />

      {/* ✅ Full dark mode support with smooth transition */}
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 p-4">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/about" element={<About />} /> {/* ✅ Routed */}
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
