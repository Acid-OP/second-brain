import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

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
                password
            });
            alert("You have signed up!");
            navigate("/signin");
        } else {
            alert("Please fill out both fields.");
        }
    }
    return (
        <div>
            <div className="h-screen w-screen bg-white flex justify-center items-center">
                <div className="flex items-center justify-center w-full">
                    {/* Left Content */}
                    <div className="flex items-center justify-center pr-10">
                        <div>hi</div>
                    </div>
    
                    {/* Middle Line */}
                    <div className="border-l-2 border-gray-300 h-48 mx-10"></div>
    
                    {/* Right Content (Signup Form) */}
                    <div className="bg-white rounded-xl border min-w-48 p-8">
                        <Input reference={usernameRef} placeholder="Username" />
                        <Input reference={passwordRef} placeholder="Password" />
                        <div className="flex justify-center pt-4">
                            <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
}
