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

  // Get visible cards (center + 2 on each side)
  const getVisibleCards = () => {
    const visibleCards = [];
    const totalCards = Math.min(5, items.length); // Show max 5 cards
    const startOffset = Math.floor(totalCards / 2);
    
    for (let i = 0; i < totalCards; i++) {
      const index = (currentIndex - startOffset + i + items.length) % items.length;
      const position = i - startOffset; // -2, -1, 0, 1, 2
      visibleCards.push({ item: items[index], originalIndex: index, position });
    }
    
    return visibleCards;
  };

  const getCardStyle = (position: number) => {
    const isCenter = position === 0;
    const baseWidth = 280;
    const centerWidth = 320;
    
    return {
      width: isCenter ? centerWidth : baseWidth,
      scale: isCenter ? 1.05 : 0.95,
      translateX: position * (baseWidth + 20), // Card spacing
      opacity: Math.abs(position) <= 1 ? 1 : 0.6,
      zIndex: isCenter ? 10 : 5 - Math.abs(position)
    };
  };

  const visibleCards = getVisibleCards();

  return (
    <div className={cn("relative w-full h-[500px] flex items-center justify-center overflow-hidden", className)}>
      {/* Cards Container */}
      <div className="relative flex items-center justify-center">
        {visibleCards.map(({ item, originalIndex, position }) => {
          const style = getCardStyle(position);
          const isCenter = position === 0;
          
          return (
            <motion.div
              key={`${item.id}-${position}`}
              className={cn(
                "absolute rounded-2xl cursor-pointer transition-all duration-300 bg-white shadow-lg",
                isCenter ? "shadow-2xl border-2" : "shadow-md"
              )}
              style={{
                width: style.width,
                height: 400,
                zIndex: style.zIndex,
                borderColor: isCenter ? '#F59E0B' : 'transparent'
              }}
              animate={{
                x: style.translateX,
                scale: style.scale,
                opacity: style.opacity
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={() => handleCardClick(originalIndex)}
              whileHover={{ scale: style.scale * 1.02 }}
            >
              {/* Card Content */}
              <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className={cn(
                  "px-6 py-4 text-center",
                  isCenter ? "bg-amber-50" : "bg-gray-50"
                )}>
                  <p className={cn(
                    "text-xs font-medium uppercase tracking-wider mb-2",
                    isCenter ? "text-amber-600" : "text-gray-500"
                  )}>
                    NAVIGATION
                  </p>
                  
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center",
                    isCenter ? "bg-amber-400" : "bg-gray-200"
                  )}>
                    <span className={cn(
                      "material-icons text-xl",
                      isCenter ? "text-white" : "text-gray-600"
                    )}>
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-6 py-4 flex flex-col justify-between">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-6">
                    {isCenter ? (
                      <motion.button
                        className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onItemSelect?.(item);
                        }}
                      >
                        Start Action
                      </motion.button>
                    ) : (
                      <button 
                        className="w-full py-3 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(originalIndex);
                        }}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={handlePrevious}
          disabled={isAnimating}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-all disabled:opacity-50 shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={handleNext}
          disabled={isAnimating}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 transition-all disabled:opacity-50 shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
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
                ? "w-6 bg-amber-400" 
                : "bg-gray-300 hover:bg-gray-400"
            )}
          />
        ))}
      </div>
    </div>
  );
}