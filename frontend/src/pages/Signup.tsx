import { useRef } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import purplebrain from "../iconImages/purplebrain.png";
import welcome from "../iconImages/welcome.png";
import { NavbarIconComponent } from "../components/NavbarComponent";
import { motion } from "framer-motion";
import { SignupInput } from "../components/SignupInput";
import { SignUpIconcomponent , SignUpIconcomponent2 } from "../components/SignupiconComponent";


export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (username && password) {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password,
            });
            alert("You have signed up!");
            navigate("/signin");
        } else {
            alert("Please fill out both fields.");
        }
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-50">
            {/* Top: Logo */}
            <div className="flex flex-col items-center justify-center pt-12 space-y-4">
                <div className="flex justify-center items-center gap-4">
                    {/* Brain Icon with Shadow and Hover Effect */}
                    <motion.div
                        className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ scale: 1.05 }} // Slight scale-up on hover
                        transition={{ duration: 0.3 }} // Smooth transition
                    >
                        <SignUpIconcomponent src={purplebrain} className="w-16 h-16" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 text-center">Your Second Brain</h1>
                </div>
                {/* Tagline */}
            </div>

            {/* Main Content */}
            <div className="flex flex-1 items-center justify-center p-8">
                <div className="flex items-center justify-center bg-white rounded-3xl shadow-lg overflow-hidden max-w-6xl w-full h-[550px]">
                    {/* Left Side: Image and Text */}
                    <div className="flex flex-col items-center justify-around bg-gradient-to-br from-[#7950f2] to-[#6a42c1] text-white w-1/2 h-full p-10">
                        {/* Welcome Image */}
                        <SignUpIconcomponent2 src={welcome} className="mt" />

                        {/* Text Hierarchy */}
                        <div className="flex flex-col items-center space-y-6">
                            <h1 className="text-5xl font-extrabold text-center">Start Your Journey</h1>
                            <p className="text-xl text-center text-gray-100">Keep your links close and organized with Second Brain.</p>
                        </div>
                    </div>

                    {/* Right Side: Signup Form */}
                    <div className="flex flex-col items-center justify-center p-10 w-1/2 h-full">
                        {/* Heading */}
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Create Your Account</h2>

                        {/* Form */}
                        <div className="flex flex-col justify-center items-center space-y-6 w-[70%] max-w-md">
                            {/* Username Input */}
                            <div className="w-full">
                                <SignupInput
                                    reference={usernameRef}
                                    placeholder="Username"
                                    className="text-center px-4 py-2 text-sm" // Reduced size
                                />
                            </div>

                            {/* Password Input */}
                            <div className="w-full">
                                <SignupInput
                                    reference={passwordRef}
                                    placeholder="Password"
                                    className="text-center px-4 py-2 text-sm" // Reduced size
                                />
                            </div>

                            {/* Sign Up Button */}
                            <div className="w-full h-full">
                                <Button
                                    onClick={signup}
                                    loading={false}
                                    variant="primary"
                                    text="Sign Up"
                                    fullWidth={true}
                                    className="py-4 text-sm" // Reduced size
                                />
                            </div>

                            {/* Sign In Link */}
                            <div>
                                <p className="text-md text-gray-600 text-center">
                                    Already have an account?{" "}
                                    <span
                                        className="text-[#7950f2] cursor-pointer hover:text-[#6a42c1] transition duration-300"
                                        onClick={() => navigate("/signin")}
                                    >
                                        Sign In
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}