import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import { Lock, Mail, User, Key, Upload } from "lucide-react";
import AUTH_IMG from "../../assets/auth-character.png";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [info, setInfo] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Calculate password strength
  const getPasswordStrength = () => {
    if (!password) return { width: "0%", color: "bg-gray-200", text: "" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { width: "25%", color: "bg-red-400", text: "Weak" },
      { width: "50%", color: "bg-orange-400", text: "Fair" },
      { width: "75%", color: "bg-yellow-400", text: "Good" },
      { width: "100%", color: "bg-emerald-400", text: "Strong" }
    ];
    return levels[Math.min(strength, 3)];
  };

  // Handle SignUp Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (fullName.length < 2 || fullName.length > 50) {
      setError("Name must be between 2 and 50 characters.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password.length > 100) {
      setError("Password must not exceed 100 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setInfo("");
    setIsSubmitting(true);

    //SignUp API Call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      // Backend now requires email verification before login
      setVerificationSent(true);
      setRegisteredEmail(email);
      setInfo("We've sent a verification link to your email. Please verify to log in.");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerification = async () => {
    setError("");
    setInfo("");
    try {
      await axiosInstance.post(API_PATHS.AUTH.RESEND_VERIFICATION, { email: registeredEmail || email });
      setInfo("Verification email resent. Please check your inbox.");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to resend verification email. Please try again.");
      }
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="w-[90vw] md:w-[75vw] lg:w-[65vw] flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-xl">
      {/* Left Section with Illustration */}
      <div className="hidden md:flex flex-col justify-center items-center p-8 bg-gradient-to-br from-peach/30 to-lavender/30 md:w-1/3">
        <img
          src={AUTH_IMG}
          alt="Sign up illustration"
          className="w-48 h-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 text-center">Build Your Dream</h2>
      </div>

      {/* Center Form Section */}
      <div className="bg-white p-8 flex-1">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Create Your Free Account</h3>

        {!verificationSent ? (
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Profile Photo Upload */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="profile-photo"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfilePic(e.target.files[0]);
                    }
                  }}
                />
                <label
                  htmlFor="profile-photo"
                  className="cursor-pointer block"
                >
                  <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-200 hover:border-indigo-400 transition-colors">
                    {profilePic ? (
                      <img
                        src={URL.createObjectURL(profilePic)}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-indigo-400" />
                    )}
                  </div>
                  {/* Upload Badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center border-2 border-white shadow-md">
                    <Upload className="w-3.5 h-3.5 text-white" />
                  </div>
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                placeholder="Full Name"
                className="form-input"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Email Address"
                className="form-input pr-10"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                placeholder="Password"
                className="form-input"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                placeholder="Confirm Password"
                className="form-input pr-10"
              />
              <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-1">
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: passwordStrength.width }}
                  />
                </div>
                <p className="text-xs text-gray-500">{passwordStrength.text}</p>
              </div>
            )}

            {error && <p className="text-red-500 text-xs">{error}</p>}
            {info && <p className="text-emerald-600 text-xs">{info}</p>}

            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Please Wait..." : "Sign Up"}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="font-semibold text-coral hover:underline"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm p-4 rounded-lg mb-4">
              {info || "We've sent a verification link to your email. Please verify to log in."}
            </div>
            <button
              type="button"
              className="btn-small mb-4"
              onClick={handleResendVerification}
            >
              Resend Verification Email
            </button>
            <p className="text-sm text-gray-600">
              Back to{" "}
              <button
                className="font-semibold text-coral hover:underline"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex flex-col justify-center items-center p-8 bg-gray-50 grid-pattern md:w-1/3">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Join Thousands.</h3>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Build Your Dream</h3>
        {/* <p className="text-gray-500 text-sm mb-4">Sign in with</p>
        <div className="flex gap-3">
          <button className="social-btn">
            Google
          </button>
          <button className="social-btn">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default SignUp