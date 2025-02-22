import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export function Home() {
    return (
        <div className="flex flex-col bg-white min-h-screen w-full">
            <Navbar />
            <Hero/>
        </div>
    );
}

