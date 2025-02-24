import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function HeroButton() {
    const navigate = useNavigate();

    function popup() {
        navigate("/dashboard");
    }

    return (
        <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }} // Added animation to match hero section
        >
            <button
                onClick={popup}
                className="bg-[#7950f2] font-medium text-white text-lg py-4 px-8 rounded-full hover:bg-[#6a42c1] focus:outline-none focus:ring-2 focus:ring-[#6a42c1] cursor-pointer transition duration-300 shadow-lg hover:shadow-xl"
            >
                Way to Dashboard
            </button>
        </motion.div>
    );
}