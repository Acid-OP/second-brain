import { useRef, useState, useEffect } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import purplebrain from "../iconImages/purplebrain.png";
import logout from "../iconImages/login.png"; // Assuming this is intended (logout vs. login)
import { motion } from "framer-motion";
import { SignUpIconcomponent, SignUpIconcomponent2 } from "../components/SignupiconComponent";
import { SignupInput } from "../components/SignupInput";
import { Toast } from "../components/Toastcomponent";
import { z } from "zod";

const signinSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Username must start with a letter and contain only letters, numbers, or underscores"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // Fixed typo: [-a] -> [a-z]
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character (!@#$%^&*)"),
});

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showSignupToast, setShowSignupToast] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fromSignup = location.state?.fromSignup;
    if (fromSignup) {
      setShowSignupToast(true);
    }
  }, [location]);

  async function signin() {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    setErrors({});

    const validation = signinSchema.safeParse({ username, password });
    if (!validation.success) {
      const errorMap: { username?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "username") errorMap.username = err.message;
        if (err.path[0] === "password") errorMap.password = err.message;
      });
      setErrors(errorMap);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      console.log("Token stored:", jwt);
      navigate("/dashboard", { state: { fromSignin: true } });
    } catch (error: any) {
      const message = error.response?.data?.message || "Signin failed. Please try again.";
      setErrors({ general: message });
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      {/* Top: Enhanced Header */}
      <div className="flex flex-col items-center pt-2">
        <motion.div
          className="flex items-center gap-2 max-[640px]:gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 max-[640px]:w-20 max-[640px]:h-20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <SignUpIconcomponent src={purplebrain} className="w-16 h-16 max-[640px]:w-12 max-[640px]:h-12" />
          </motion.div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-gray-900 max-[640px]:text-xl">Your Second Brain</h1>
            <p className="text-base text-gray-600 mt-1 max-[640px]:text-xs">Capture, Organize, Thrive</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center p-8 max-[640px]:p-2">
        <div className="flex items-center justify-center bg-white rounded-3xl shadow-lg overflow-hidden max-w-6xl w-full h-[550px] max-[640px]:flex-col max-[640px]:w-[90%] max-[640px]:h-auto">
          {/* Left Side: Image and Text */}
          <div className="flex flex-col items-center justify-around bg-gradient-to-br from-[#7950f2] to-[#6a42c1] text-white w-1/2 max-[640px]:w-full h-full max-[640px]:h-auto p-10 max-[640px]:p-6">
            <SignUpIconcomponent2 src={logout} className="p-6" />
            <div className="flex flex-col items-center space-y-6 max-[640px]:space-y-4">
              <h1 className="text-5xl font-extrabold text-center max-[640px]:text-2xl">Welcome Back</h1>
              <p className="text-xl text-center text-gray-100 max-[640px]:text-sm">Access your organized links with Second Brain.</p>
            </div>
          </div>

          {/* Right Side: Signin Form */}
          <div className="flex flex-col items-center justify-center p-10 w-1/2 max-[640px]:w-full h-full max-[640px]:h-auto max-[640px]:p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center max-[640px]:text-xl max-[640px]:mb-6">Log In</h2>
            {errors.general && <div className="mb-4 text-red-500 text-sm text-center max-[640px]:text-xs max-[640px]:mb-3">{errors.general}</div>}
            <div className="flex flex-col justify-center items-center space-y-6 w-[70%] max-w-md max-[640px]:w-full max-[640px]:space-y-4">
              <div className="w-full">
                <SignupInput
                  reference={usernameRef}
                  placeholder="Username"
                  className="text-center px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-[#7950f2] transition-all duration-200 max-[640px]:text-sm max-[640px]:px-4 max-[640px]:py-1.5"
                />
                {errors.username && <div className="mt-1 text-red-500 text-sm text-center max-[640px]:text-xs">{errors.username}</div>}
              </div>
              <div className="w-full">
                <SignupInput
                  reference={passwordRef}
                  placeholder="Password"
                  className="text-center px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-[#7950f2] transition-all duration-200 max-[640px]:text-sm max-[640px]:px-4 max-[640px]:py-1.5"
                />
                {errors.password && <div className="mt-1 text-red-500 text-sm text-center max-[640px]:text-xs">{errors.password}</div>}
              </div>
              <div className="w-full h-full">
                <Button
                  onClick={signin}
                  loading={false}
                  variant="primary"
                  text="Log In"
                  fullWidth={true}
                  className="py-4 text-lg cursor-pointer max-[640px]:py-2.5 max-[640px]:text-sm bg-[#7950f2] hover:bg-[#6a42c1] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                />
              </div>
              <div>
                <p className="text-md text-gray-600 text-center max-[640px]:text-xs">
                  Don’t have an account?{" "}
                  <span
                    className="text-[#7950f2] cursor-pointer hover:text-[#6a42c1] transition duration-300"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast for successful signup */}
      {showSignupToast && (
        <Toast
          message="Signed up successfully!"
          duration={3000}
          onClose={() => setShowSignupToast(false)}
        />
      )}

      {/* Footer */}
      <footer className="py-4 bg-gradient-to-t from-gray-100 to-gray-50 border-t border-gray-200 max-[640px]:py-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-gray-700 max-[640px]:gap-4">
          <p className="text-sm font-medium tracking-tight max-[640px]:text-xs">© 2025 Your Second Brain. All rights reserved.</p>
          <div className="flex gap-8 sm:gap-10 max-[640px]:gap-6">
            <a
              href="https://x.com/GauravKapurr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-[#7950f2] transition-all duration-300 group"
            >
              <span className="text-sm font-medium max-[640px]:text-xs">Twitter</span>
            </a>
            <a
              href="https://github.com/Acid-OP/second-brain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-[#7950f2] transition-all duration-300 group"
            >
              <span className="text-sm font-medium max-[640px]:text-xs">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}