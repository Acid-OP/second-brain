import React, { useRef } from "react";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";

export function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const pricesRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      console.log(`Scrolling to ${ref.current.id}`);
      ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Ref is null");
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen w-full">
      <Navbar
        scrollToSection={scrollToSection}
        refs={{ featuresRef, solutionsRef, resourcesRef, pricesRef }}
      />
      <Hero
        featuresRef={featuresRef}
        solutionsRef={solutionsRef}
        resourcesRef={resourcesRef}
        pricesRef={pricesRef}
      />
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-4">Second Brain</div>
          <div className="flex gap-6 mb-4">
            <a href="#features" className="hover:text-gray-300 transition duration-200" onClick={() => scrollToSection(featuresRef)}>Features</a>
            <a href="#solutions" className="hover:text-gray-300 transition duration-200" onClick={() => scrollToSection(solutionsRef)}>Solutions</a>
            <a href="#resources" className="hover:text-gray-300 transition duration-200" onClick={() => scrollToSection(resourcesRef)}>Resources</a>
            <a href="#prices" className="hover:text-gray-300 transition duration-200" onClick={() => scrollToSection(pricesRef)}>Prices</a>
          </div>
          <div className="text-sm text-gray-400">© 2025 Second Brain. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}