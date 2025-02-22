import { useNavigate } from "react-router-dom";


export function HeroButton() {
    const navigate = useNavigate();

    function popup(){
        navigate("/dashboard")
    }
    return (
        <div className="flex justify-center">
            <button onClick= {popup}className="bg-[#7950f2] text-white py-4 px-8 rounded-full hover:bg-[#6a42c1] focus:outline-none focus:ring-2 focus:ring-[#6a42c1] cursor-pointer transition duration-300">
                Way to Dashboard
            </button>
        </div>
    );
}
