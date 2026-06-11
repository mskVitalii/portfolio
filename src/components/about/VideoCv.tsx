"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export function VideoCv() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Video CV</h2>
      <div className="relative rounded-2xl overflow-hidden border bg-black aspect-video max-w-2xl">
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group"
            aria-label="Play video CV"
          >
            {/* Thumbnail overlay */}
            <img
              src="https://img.youtube.com/vi/FXIjYD56VbU/maxresdefault.jpg"
              alt="Vitalii Popov Video CV"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl">
                <Play className="w-7 h-7 text-black ml-1" fill="black" />
              </div>
            </motion.div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold text-lg drop-shadow">Vitalii Popov — Video CV</p>
              <p className="text-white/70 text-sm drop-shadow">Click to play</p>
            </div>
          </button>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/FXIjYD56VbU?autoplay=1&rel=0&modestbranding=1"
            title="Vitalii Popov Video CV"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    </section>
  );
}
