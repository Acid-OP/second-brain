import React, { useRef } from "react";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import dashboardImage1 from "../iconImages/dashboardimage2.png"; // General dashboard with cards
import dashboardImage2 from "../iconImages/dashboardimage3.png"; // Highlighting a card (formerly queryImage)

export function Home() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null); // Renamed from queryRef

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cardHover = {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen w-full">
      <Navbar
        scrollToSection={scrollToSection}
        refs={{ dashboardRef, featuresRef }} // Updated ref name
      />
      <Hero />

      {/* Dashboard Section */}
      <motion.section
        ref={dashboardRef}
        id="dashboard"
        className="py-12 px-6 bg-gray-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Explore Your Dashboard
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A powerful hub to manage and view all your saved cards at a glance.
          </p>
        </div>

        <motion.div
          className="w-full max-w-5xl mb-12 relative group"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={dashboardImage2}
            alt="Second Brain Dashboard Overview"
            className="w-full h-auto rounded-xl shadow-xl border-2 border-[#7950f2] hover:border-[#5e3fd6] transition-all duration-300"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              title: "Instant Capture",
              desc: "Add cards from Twitter, YouTube, or any site instantly.",
              icon: "M12 4v16m8-8H4",
            },
            {
              title: "Card Overview",
              desc: "See all your saved content in a clean, organized layout.",
              icon: "M3 7h18M3 12h18M3 17h18",
            },
            {
              title: "Quick Access",
              desc: "Jump to any card with a single click.",
              icon: "M4 12h16m-7-7l7 7-7 7",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={cardHover}
            >
              <svg
                className="w-8 h-8 text-[#7950f2] mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={feature.icon}
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Spacer */}
      <div className="py-12 bg-gray-50"></div>

      {/* Features Section */}
      <motion.section
        ref={featuresRef} // Updated ref name
        id="features" // Updated ID
        className="py-12 px-6 bg-gray-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Discover Key Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Unlock the tools that make Second Brain your ultimate knowledge companion.
          </p>
        </div>

        <motion.div
          className="w-full max-w-5xl mb-12 relative group"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={dashboardImage1} // Updated image name
            alt="Key Features in Second Brain"
            className="w-full h-auto rounded-xl shadow-xl border-2 border-[#7950f2] hover:border-[#5e3fd6] transition-all duration-300"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              step: "01",
              title: "Ask a Question",
              desc: "Type a query to search your saved cards by their titles or descriptions.",
            },
            {
              step: "02",
              title: "Highlight Results",
              desc: "See the exact card that answers your question.",
            },
            {
              step: "03",
              title: "Dive Deeper",
              desc: "Explore related content with one click.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={cardHover}
            >
              <span className="absolute -top-4 left-6 text-2xl font-bold text-[#7950f2] bg-white px-3 py-1 rounded-full border border-[#7950f2]/20 shadow-sm">
                {step.step}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-4 tracking-tight">Second Brain</div>
          <div className="flex gap-8 mb-4">
            <a
              href="https://x.com/GauravKapurr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-[#7950f2] transition duration-200"
            >
              <span className="text-sm font-medium">Twitter</span>
            </a>
            <a
              href="https://github.com/Acid-OP/second-brain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-[#7950f2] transition duration-200"
            >
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
          <div className="text-sm text-gray-400">© 2025 Second Brain. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}