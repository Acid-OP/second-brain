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

      {/* Features Section - Adjusted padding for iPad */}
      <motion.section
        ref={featuresRef}
        id="features"
        className="py-6 md:py-2 px-6 bg-gray-50 flex flex-col items-center justify-center" // Changed py-6 to py-6 md:py-2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Core Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Streamlined tools designed to amplify your content mastery.
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
            className="w-full h-auto rounded-xl shadow-xl border border-gray-100"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              title: "Capture Instantly",
              desc: "Save posts, videos, and threads from any platform with a single click.",
              icon: "M12 4v16m8-8H4",
            },
            {
              title: "Organize Intuitively",
              desc: "Smart embeddings categorize your content for effortless retrieval.",
              icon: "M3 7h18M3 12h18M3 17h18",
            },
            {
              title: "Share Seamlessly",
              desc: "Distribute your curated insights with one tap.",
              icon: "M4 12h16m-7-7l7 7-7 7",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={cardHover}
            >
              <svg
                className="w-8 h-8 text-indigo-600 mb-4"
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
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Spacer between Features and How It Works */}
      <div className="py-12 bg-gray-50"></div>

      {/* How It Works Section */}
      <motion.section
        ref={howItWorksRef}
        id="how-it-works"
        className="py-12 px-6 bg-gray-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Three steps to transform chaos into clarity.
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
            className="w-full h-auto rounded-xl shadow-xl border border-gray-100"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              step: "01",
              title: "Add Your Content",
              desc: "Drop in posts, videos, or threads from anywhere.",
            },
            {
              step: "02",
              title: "Organize with Ease",
              desc: "Tags and embeddings make everything findable.",
            },
            {
              step: "03",
              title: "Share Your Brain",
              desc: "Export your collection effortlessly.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={cardHover}
            >
              <span className="absolute -top-4 left-6 text-2xl font-bold text-indigo-600 bg-white px-2 rounded-full border border-indigo-100">
                {step.step}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-4">Second Brain</div>
          <div className="flex gap-6 mb-4">
            <a
              href="#features"
              className="hover:text-gray-300 transition duration-200"
              onClick={() => scrollToSection(featuresRef)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-gray-300 transition duration-200"
              onClick={() => scrollToSection(howItWorksRef)}
            >
              How It Works
            </a>
          </div>
          <div className="text-sm text-gray-400">© 2025 Second Brain. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}