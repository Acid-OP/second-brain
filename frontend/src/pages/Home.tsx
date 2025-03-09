import React, { useRef } from "react";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import dashboardImage from "../iconImages/dashboardimage.png";
 // Features image
 // Update with your workflow image

export function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

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
        refs={{ featuresRef, howItWorksRef }}
      />
      <Hero />
      {/* Features Section */}
      <motion.div
        ref={featuresRef}
        id="features"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Features
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-10">
          Explore the powerful tools that make Second Brain your ultimate content management companion.
        </p>
        <motion.div
          className="w-full max-w-5xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={dashboardImage}
            alt="Second Brain Dashboard Features"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Content</h3>
            <p className="text-gray-600">
              Easily save posts from Reddit, videos from YouTube, and threads from Twitter.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Organize Smartly</h3>
            <p className="text-gray-600">
              Use intelligent embeddings to categorize and retrieve your content effortlessly.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Easily</h3>
            <p className="text-gray-600">
              Share your curated collection with others using the 'Share Brain' feature.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        ref={howItWorksRef}
        id="how-it-works"
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          How It Works
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-10">
          Follow these simple steps to master your digital knowledge with Second Brain.
        </p>
        <motion.div
          className="w-full max-w-5xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={dashboardImage}
            alt="Second Brain How It Works Workflow"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 1: Add Content</h3>
            <p className="text-gray-600">
              Start by adding your favorite Reddit posts, YouTube videos, or Twitter threads.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 2: Organize</h3>
            <p className="text-gray-600">
              Use tags or embeddings to keep your content neatly categorized and accessible.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 3: Share</h3>
            <p className="text-gray-600">
              Share your organized collection with others using the 'Share Brain' feature.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-lg font-semibold mb-4">Second Brain</div>
          <div className="flex gap-6 mb-4">
            <a href="#features" className="hover:text-gray-300 transition duration-200" onClick={() => scrollToSection(featuresRef)}>Features</a>
            <a href="#how-it-works" className="hover:text-gray-300 transition duration-200" onClick={() => scrollToSection(howItWorksRef)}>How It Works</a>
          </div>
          <div className="text-sm text-gray-400">© 2025 Second Brain. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}