import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");

  const passwordValidation = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*]/.test(formData.password),
  };

  const isFormValid = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!/^[\w.-]+@gmail\.com$/.test(formData.email)) newErrors.email = "Email must be a valid gmail.com address.";
    if (!passwordValidation.length || !passwordValidation.uppercase || !passwordValidation.number || !passwordValidation.special)
      newErrors.password = "Password does not meet the criteria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/success");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5ff] dark:bg-gray-900 px-4 transition-all">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left */}
        <div className="bg-[#eaf0ff] dark:bg-gray-700 flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's make it happen together!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">To stay connected with us please login with your personal info</p>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Sportify</h1>
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
          </p>
        </div>

        {/* Right */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">Create Account</h2>

          <button type="button" className="w-full flex items-center justify-center border rounded-md py-3 mb-6 hover:bg-gray-100 dark:hover:bg-gray-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 mr-3" />
            Sign up with Google
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {touched.name && errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {touched.email && errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-blue-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {touched.password && errors.password && <p className="text-sm text-red-500">{errors.password}</p>}

            <div className="text-sm mt-2 text-green-600 dark:text-green-400 space-y-1">
              <p className={passwordValidation.length ? "" : "text-gray-400"}>• At least 8 characters</p>
              <p className={passwordValidation.uppercase ? "" : "text-gray-400"}>• One uppercase letter</p>
              <p className={passwordValidation.number ? "" : "text-gray-400"}>• One number</p>
              <p className={passwordValidation.special ? "" : "text-gray-400"}>• One special character</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
