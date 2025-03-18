import React, { useRef } from "react";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import dashboardImage from "../iconImages/dashboardimage.png";

export function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

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
        refs={{ featuresRef, howItWorksRef }}
      />
      <Hero />

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-12 px-6 bg-gray-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Why Second Brain?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Your all-in-one tool to save, organize, and share what matters.
          </p>
        </div>

        <motion.div
          className="w-full max-w-5xl mb-12"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={dashboardImage}
            alt="Second Brain Dashboard"
            className="w-full h-auto rounded-xl shadow-xl border border-gray-200"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              title: "Instant Capture",
              desc: "Save links from Twitter, YouTube, or anywhere in seconds.",
              icon: "M12 4v16m8-8H4",
            },
            {
              title: "Smart Organization",
              desc: "Find anything fast with intelligent categorization.",
              icon: "M3 7h18M3 12h18M3 17h18",
            },
            {
              title: "Effortless Sharing",
              desc: "Showcase your collection with a single link.",
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
              whileHover={cardHover} // Applied here
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

      {/* Spacer between Features and How It Works */}
      <div className="py-12 bg-gray-50"></div>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className="py-12 px-6 bg-gray-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Turn your favorite links into a personal knowledge hub in three simple steps.
          </p>
        </div>

        <motion.div
          className="w-full max-w-5xl mb-12"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={dashboardImage}
            alt="Second Brain Workflow"
            className="w-full h-auto rounded-xl shadow-xl border border-gray-200"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              step: "01",
              title: "Save Your Links",
              desc: "Capture tweets, videos, or any web content with a click.",
            },
            {
              step: "02",
              title: "Build Your Collection",
              desc: "Smart organization keeps everything at your fingertips.",
            },
            {
              step: "03",
              title: "Share Your Insights",
              desc: "Let others explore your curated brain with ease.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={cardHover} // Applied here
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