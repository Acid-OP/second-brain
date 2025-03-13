import { useRef } from "react";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import purplebrain from "../iconImages/purplebrain.png";
import welcome from "../iconImages/welcome.png";
import { motion } from "framer-motion";
import { SignUpIconcomponent, SignUpIconcomponent2 } from "../components/SignupiconComponent";
import { SignupInput } from "../components/SignupInput";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    console.log(usernameRef.current);
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      {/* Top: Enhanced Header */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 max-[640px]:w-16 max-[640px]:h-16"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <SignUpIconcomponent src={purplebrain} className="w-12 h-12 max-[640px]:w-8 max-[640px]:h-8" />
          </motion.div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-gray-900 max-[640px]:text-2xl">Your Second Brain</h1>
            <p className="text-base text-gray-600 mt-1 max-[640px]:text-sm">Capture, Organize, Thrive</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center p-8 max-[640px]:p-4">
        <div className="flex items-center justify-center bg-white rounded-3xl shadow-lg overflow-hidden max-w-6xl w-full h-[550px] max-[640px]:flex-col max-[640px]:w-[90%] max-[640px]:h-auto">
          {/* Left Side: Image and Text */}
          <div className="flex flex-col items-center justify-around bg-gradient-to-br from-[#7950f2] to-[#6a42c1] text-white w-1/2 max-[640px]:w-full h-full max-[640px]:h-auto p-10 max-[640px]:p-6">
            <SignUpIconcomponent2 src={welcome} className="mt max-[640px]:w-24 max-[640px]:h-24" />
            <div className="flex flex-col items-center space-y-6 max-[640px]:space-y-4">
              <h1 className="text-5xl font-extrabold text-center max-[640px]:text-3xl">Welcome Back</h1>
              <p className="text-xl text-center text-gray-100 max-[640px]:text-base">Access your organized links with Second Brain.</p>
            </div>
          </div>

          {/* Right Side: Signin Form */}
          <div className="flex flex-col items-center justify-center p-10 w-1/2 max-[640px]:w-full h-full max-[640px]:h-auto max-[640px]:p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center max-[640px]:text-2xl max-[640px]:mb-6">LogIn</h2>
            <div className="flex flex-col justify-center items-center space-y-6 w-[70%] max-w-md max-[640px]:w-[85%] max-[640px]:space-y-4">
              <div className="w-full">
                <SignupInput
                  reference={usernameRef}
                  placeholder="Username"
                  className="text-center px-4 py-2 text-lg max-[640px]:text-base max-[640px]:py-1.5"
                />
              </div>
              <div className="w-full">
                <SignupInput
                  reference={passwordRef}
                  placeholder="Password"
                  className="text-center px-4 py-2 text-lg max-[640px]:text-base max-[640px]:py-1.5"
                />
              </div>
              <div className="w-full">
                <Button
                  onClick={signin}
                  loading={false}
                  variant="primary"
                  text="Sign In"
                  fullWidth={true}
                  className="py-4 text-lg rounded-lg max-[640px]:py-3 max-[640px]:text-base"
                />
              </div>
              <p className="text-md text-gray-600 text-center max-[640px]:text-sm">
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

      {/* Footer: Complementary Section */}
      <div className="py-6 bg-gray-100 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 text-gray-600 text-sm max-[640px]:gap-4 max-[640px]:text-xs">
          <p>© 2025 Your Second Brain. All rights reserved.</p>
          <div className="flex gap-6 max-[640px]:gap-4">
            <a href="#" className="hover:text-[#7950f2] transition-colors duration-200">Features</a>
            <a href="#" className="hover:text-[#7950f2] transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-[#7950f2] transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}