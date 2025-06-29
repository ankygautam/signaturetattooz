// src/components/TattooGallery.tsx
import React from "react";
import { motion } from "framer-motion";

// Sample images (replace with your own image URLs)
const images = [
  { url: "https://source.unsplash.com/400x500/?tattoo,1", artist: "Raven" },
  { url: "https://source.unsplash.com/400x500/?tattoo,2", artist: "Jinx" },
  { url: "https://source.unsplash.com/400x500/?tattoo,3", artist: "Blaze" },
  { url: "https://source.unsplash.com/400x500/?tattoo,4", artist: "Storm" },
  { url: "https://source.unsplash.com/400x500/?tattoo,5", artist: "Nova" },
];

const TattooGallery = () => {
  return (
    <section className="bg-[#212121] text-white py-16 px-4" id="gallery">
      <h2 className="text-3xl md:text-4xl font-thin text-center mb-10">
        Tattoo Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((item, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={item.url}
              alt={`Tattoo by ${item.artist}`}
              className="w-full h-72 object-cover"
            />
            <div className="p-2 bg-[#1a1a1a] text-center">
              <p className="text-sm text-gray-400 font-thin">{item.artist}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TattooGallery;
