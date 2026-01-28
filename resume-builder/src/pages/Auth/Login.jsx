import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Lock, User } from "lucide-react";
import AUTH_IMG from "../../assets/auth-character.png";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setNeedsVerification(false);
    setIsSubmitting(true);

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
      if (msg.toLowerCase().includes("verify your email")) {
        setNeedsVerification(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    setError("");
    try {
      await axiosInstance.post(API_PATHS.AUTH.RESEND_VERIFICATION, { email });
      setError(null);
      alert("Verification email resent. Please check your inbox.");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to resend verification email. Please try again.";
      setError(msg);
    }
  };

  return (
    <div className="w-[90vw] md:w-[70vw] lg:w-[60vw] flex flex-col md:flex-row bg-navy rounded-2xl overflow-hidden network-pattern">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center p-8 md:w-1/3">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-gray-400 text-sm text-center mb-6">Log in to continue your journey</p>
        {/* <div className="w-16 h-16 bg-navy-light rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-gray-400" />
        </div> */}
      </div>

      {/* Center Form Section */}
      <div className="bg-white p-8 md:rounded-l-3xl flex-1">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Secure Login</h3>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Email Address"
              className="form-input"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Password"
              className="form-input pr-10"
              autoComplete="current-password"
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-coral focus:ring-coral"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {needsVerification && (
            <button
              type="button"
              className="text-sm text-coral underline"
              onClick={handleResendVerification}
            >
              Resend verification email
            </button>
          )}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Please Wait..." : "Sign In"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-coral hover:underline"
              onClick={() => setCurrentPage("signup")}
            >
              SignUp
            </button>
          </p>
        </form>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex flex-col justify-center items-center p-8 bg-gray-50 grid-pattern md:w-1/3">
        <p className="text-gray-500 text-sm mb-4 font-semibold">Sign in with</p>
        <div className="flex gap-3">
          <button className="social-btn-coral">
            Google
          </button>
          <button className="social-btn-coral">
            <svg className="w-10.5 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
