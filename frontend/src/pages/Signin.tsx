import { useRef } from "react";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import purplebrain from "../iconImages/purplebrain.png";
import logout from "../iconImages/login.png";
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
    console.log("Token stored:", jwt);
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
            <SignUpIconcomponent2 src={logout} className="mt max-[640px]:w-24 max-[640px]:h-24" />
            <div className="flex flex-col p-4 items-center space-y-6 max-[640px]:space-y-4">
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
      <footer className="py-8 bg-gradient-to-t from-gray-100 to-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-gray-700">
          <p className="text-sm font-medium tracking-tight">© 2025 Your Second Brain. All rights reserved.</p>
          <div className="flex gap-8 sm:gap-10">
            <a
              href="https://x.com/GauravKapurr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-[#7950f2] transition-all duration-300 group"
            >
              {/* <svg className="w-5 h-5 text-gray-600 group-hover:text-[#7950f2] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg> */}
              <span className="text-sm font-medium">Twitter</span>
            </a>
            <a
              href="https://github.com/Acid-OP/second-brain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-[#7950f2] transition-all duration-300 group"
            >
              {/* <svg className="w-5 h-5 text-gray-600 group-hover:text-[#7950f2] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-1.338.09-2.584-.896-3.256-1.607-1.338-.708-.113-1.467.324-1.467.868 0 .367.134.713.405.883 1.14 0 2.01-.896 2.01-.896.405 1.727 2.01 1.228 2.504.896.174-.668.67-1.228 1.223-1.51-4.27-.486-8.754-2.13-8.754-9.48 0-2.09.896-3.854 2.367-5.21-.24-.58-.435-1.54.09-3.206 0 0 1.013-.324 3.32 1.24 1.934-.54 4.013-.54 5.947 0 2.306-1.564 3.32-1.24 3.32-1.24.526 1.666.33 2.626.09 3.206 1.47 1.356 2.367 3.12 2.367 5.21 0 7.373-4.49 8.99-8.77 9.47.69.6 1.305 1.77 1.305 3.57 0 2.58-.015 4.66-.015 5.29 0 .32.21.69.825.577C20.565 22.087 24 17.59 24 12.297c0-6.627-5.373-12-12-12" />
              </svg> */}
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}