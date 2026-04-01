import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroBannerProps {
  onShopClick: () => void;
}

export default function HeroBanner({ onShopClick }: HeroBannerProps) {
  return (
    <section
      className="relative h-[85vh] min-h-[520px] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-living-room.dim_1400x700.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/70 uppercase tracking-[0.3em] text-sm font-medium mb-4"
          >
            New Collection 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display font-extrabold text-white text-5xl md:text-7xl uppercase leading-none tracking-tight mb-6"
          >
            Modern Living
            <br />
            <span className="text-accent">Redefined</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-lg mb-10 leading-relaxed max-w-xl"
          >
            Curated furniture and decor that transforms your space into a
            sanctuary of style and comfort.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button
              onClick={onShopClick}
              data-ocid="hero.primary_button"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold uppercase tracking-widest px-8 py-6 text-sm rounded-none group"
            >
              Shop All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
