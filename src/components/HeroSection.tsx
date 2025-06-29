// src/components/HeroSection.tsx
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-[#212121] text-white py-20 px-6 text-center" id="home">
      <motion.h1
        className="text-4xl md:text-5xl font-thin"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Ink Your Story with Signature Tattooz
      </motion.h1>
      <motion.p
        className="mt-4 text-gray-400 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Custom. Clean. Creative.
      </motion.p>
    </section>
  );
};

export default HeroSection;
