import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
  onItemSelect?: (item: CarouselItem) => void;
  className?: string;
  accentColor?: string;
}

export function Carousel3D({ items, onItemSelect, className, accentColor = '#3B82F6' }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleCardClick = (index: number) => {
    if (isAnimating) return;
    if (index === currentIndex) {
      onItemSelect?.(items[index]);
    } else {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  // Auto-rotate prevention (manual controls only)
  useEffect(() => {
    // No auto-rotate as requested
  }, []);

  const getCardTransform = (index: number) => {
    const diff = index - currentIndex;
    const totalItems = items.length;
    
    // Normalize difference to handle circular nature
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalItems / 2) {
      normalizedDiff = diff > 0 ? diff - totalItems : diff + totalItems;
    }

    const isActive = index === currentIndex;
    const baseRotation = (normalizedDiff * 360) / totalItems;
    const radius = 200;
    
    if (isActive) {
      return {
        rotateY: 0,
        translateZ: 100,
        translateX: 0,
        scale: 1.2,
        opacity: 1,
        zIndex: 10
      };
    } else {
      const x = Math.sin((normalizedDiff * Math.PI * 2) / totalItems) * radius;
      const z = Math.cos((normalizedDiff * Math.PI * 2) / totalItems) * radius - 100;
      
      return {
        rotateY: baseRotation,
        translateZ: z,
        translateX: x,
        scale: 0.8,
        opacity: Math.abs(normalizedDiff) <= 2 ? 0.7 : 0.3,
        zIndex: Math.abs(normalizedDiff) <= 2 ? 5 : 1
      };
    }
  };

  return (
    <div className={cn("relative w-full h-96 flex items-center justify-center", className)}>
      {/* 3D Carousel Container */}
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const transform = getCardTransform(index);
            const isActive = index === currentIndex;
            
            return (
              <motion.div
                key={item.id}
                className={cn(
                  "absolute w-64 h-80 rounded-2xl cursor-pointer transition-all duration-300",
                  isActive ? "shadow-2xl" : "shadow-lg"
                )}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: transform.zIndex
                }}
                animate={{
                  rotateY: transform.rotateY,
                  translateZ: transform.translateZ,
                  translateX: transform.translateX,
                  scale: transform.scale,
                  opacity: transform.opacity
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                onClick={() => handleCardClick(index)}
                whileHover={isActive ? { scale: 1.25 } : { scale: transform.scale * 1.05 }}
              >
                <div 
                  className="w-full h-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20"
                  style={{
                    background: isActive 
                      ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`
                      : 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {/* Card Image */}
                  <div className="relative h-2/3 overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Icon Overlay */}
                    <div 
                      className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      <span className="material-icons text-white text-xl">{item.icon}</span>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4 h-1/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                      >
                        <div 
                          className="w-full h-1 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={handlePrevious}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={handleNext}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "w-8" 
                : "opacity-50 hover:opacity-80"
            )}
            style={{
              backgroundColor: index === currentIndex ? accentColor : 'white'
            }}
          />
        ))}
      </div>
    </div>
  );
}