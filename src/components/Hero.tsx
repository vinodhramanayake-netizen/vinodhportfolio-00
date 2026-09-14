import { motion } from 'motion/react';
import FlippingTitle from './FlippingTitle';

interface HeroProps {
  onScrollDown: () => void;
}

export default function Hero({ onScrollDown }: HeroProps) {
  return (
    <section
      id="hero-screen"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center pt-16 pb-12 px-4 select-none overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-b from-black/[0.03] via-black/[0.01] to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Massive Brand Display Typography with 3D Rectangles Flipping Transition */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center max-w-[98vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center"
        >
          <FlippingTitle id="hero-vinodh-title" />
        </motion.div>

        {/* [ JUMP ] button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 sm:mt-8 md:mt-10"
        >
          <button
            id="hero-jump-btn"
            onClick={onScrollDown}
            className="group inline-flex items-center gap-2 font-mono text-[11px] sm:text-[13px] md:text-[14px] text-[#71717a] hover:text-[#111111] tracking-[0.2em] uppercase py-2 px-4 transition-colors cursor-pointer"
          >
            <span className="text-[#a1a1aa] group-hover:text-[#15803d] transition-colors">[</span>
            <span className="group-hover:tracking-[0.25em] transition-all duration-300">JUMP</span>
            <span className="text-[#a1a1aa] group-hover:text-[#15803d] transition-colors">]</span>
          </button>
        </motion.div>
      </div>

    </section>
  );
}
