import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
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
  secondaryColor?: string;
  personaTypography?: {
    fontFamily: string;
    headingFont: string;
    fontSize: string;
    scale?: number;
  };
}

export function Carousel3D({ 
  items, 
  onItemSelect, 
  className, 
  accentColor = '#3B82F6',
  secondaryColor = '#10B981',
  personaTypography
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const handlePrevious = () => {
    if (isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleNext = () => {
    if (isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleCardClick = (index: number) => {
    if (isAnimating || isDragging) return;
    if (index === currentIndex) {
      onItemSelect?.(items[index]);
    } else {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Auto-scroll pause on hover
  const [isPaused, setIsPaused] = useState(false);

  // Get visible cards (center + 2 on each side) - responsive
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
    
    // Enhanced responsive breakpoints for better mobile experience
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const isXsPhone = screenWidth < 375;
    const isMobile = screenWidth < 640;
    const isSmTablet = screenWidth < 768; 
    const isTablet = screenWidth < 1024;
    const isSmDesktop = screenWidth < 1280;
    const isDesktop = screenWidth < 1536;
    
    let baseWidth, centerWidth, spacing, containerPadding;
    
    if (isXsPhone) {
      baseWidth = 140;
      centerWidth = 180;
      spacing = 8;
      containerPadding = 12;
    } else if (isMobile) {
      baseWidth = 160;
      centerWidth = 200;
      spacing = 10;
      containerPadding = 16;
    } else if (isSmTablet) {
      baseWidth = 180;
      centerWidth = 220;
      spacing = 12;
      containerPadding = 20;
    } else if (isTablet) {
      baseWidth = 200;
      centerWidth = 240;
      spacing = 15;
      containerPadding = 24;
    } else if (isSmDesktop) {
      baseWidth = 220;
      centerWidth = 260;
      spacing = 18;
      containerPadding = 32;
    } else if (isDesktop) {
      baseWidth = 240;
      centerWidth = 280;
      spacing = 20;
      containerPadding = 40;
    } else {
      baseWidth = 260;
      centerWidth = 300;
      spacing = 22;
      containerPadding = 48;
    }
    
    // Enhanced positioning with responsive adjustments
    const offsetMultiplier = isCenter ? 0 : Math.sign(position) * 0.2;
    const responsiveScale = isCenter ? (isMobile ? 1.05 : 1.1) : (isMobile ? 0.9 : 0.85);
    const verticalOffset = isCenter ? (isMobile ? -5 : -10) : Math.abs(position) * (isMobile ? 3 : 5);
    
    return {
      width: isCenter ? centerWidth : baseWidth,
      scale: responsiveScale,
      translateX: position * (baseWidth + spacing) + offsetMultiplier * (isMobile ? 15 : 20),
      translateY: verticalOffset,
      opacity: Math.abs(position) <= 1 ? 1 : (isMobile ? 0.2 : 0.4),
      zIndex: isCenter ? 10 : 5 - Math.abs(position),
      blur: Math.abs(position) > 1 ? (isMobile ? 'blur(2px)' : 'blur(3px)') : 'blur(0px)',
      brightness: isCenter ? 1 : (isMobile ? 0.85 : 0.8),
      containerPadding
    };
  };

  const visibleCards = getVisibleCards();

  return (
    <div 
      ref={containerRef}
      className="container-responsive relative w-full flex items-center justify-center overflow-hidden h-[420px] sm:h-[440px] md:h-[460px] lg:h-[480px] portrait-spacing landscape-spacing pt-[0px] pb-[0px]"
      style={{
        paddingLeft: `${getCardStyle(0).containerPadding}px`,
        paddingRight: `${getCardStyle(0).containerPadding}px`
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cards Container */}
      <motion.div 
        className="relative flex items-center justify-center"
        drag="x"
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <AnimatePresence>
          {visibleCards.map(({ item, originalIndex, position }) => {
            const style = getCardStyle(position);
            const isCenter = position === 0;
            const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
            const isXsPhone = screenWidth < 375;
            const isMobile = screenWidth < 640;
            const isSmTablet = screenWidth < 768; 
            const isTablet = screenWidth < 1024;
            
            return (
              <motion.div
                key={`${item.id}-${originalIndex}`}
                className={cn(
                  "absolute rounded-2xl bg-white shadow-lg select-none",
                  isCenter ? "shadow-2xl border-2 cursor-pointer" : "shadow-md cursor-default",
                  isDragging ? "pointer-events-none" : (isCenter ? "pointer-events-auto" : "pointer-events-none"),
                  // Disable glare for non-active cards
                  !isCenter && "backdrop-blur-none"
                )}
                style={{
                  width: style.width,
                  height: 320, // Altezza fissa di 320px per tutte le card
                  zIndex: style.zIndex,
                  borderColor: isCenter ? accentColor : 'transparent',
                  filter: style.blur,
                  // Remove any glare effects from non-center cards
                  background: isCenter ? 'white' : '#fafafa'
                }}
                initial={{
                  x: style.translateX,
                  y: style.translateY,
                  scale: style.scale * 0.8,
                  opacity: 0
                }}
                animate={{
                  x: style.translateX,
                  y: style.translateY,
                  scale: style.scale,
                  opacity: style.opacity
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
                onClick={isCenter ? () => handleCardClick(originalIndex) : undefined}
                whileHover={!isDragging && isCenter ? { 
                  scale: style.scale * 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                } : {}}
                whileTap={!isDragging && isCenter ? { scale: style.scale * 0.98 } : {}}
              >
                {/* Card Content */}
                <div className={cn(
                  "w-full h-full rounded-2xl overflow-hidden flex flex-col",
                  // Remove glare effect from non-active cards
                  isCenter ? "glare-card" : ""
                )}>
                  {/* Header */}
                  <div 
                    className="px-4 py-3 sm:px-6 sm:py-4 text-center"
                    style={{
                      backgroundColor: isCenter ? `${accentColor}15` : '#f9fafb'
                    }}
                  >
                    <p 
                      className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-2"
                      style={{
                        color: isCenter ? accentColor : '#6b7280',
                        fontFamily: personaTypography?.fontFamily || 'inherit'
                      }}
                    >
                      NAVIGATION
                    </p>
                    
                    {/* Icon */}
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center"
                      style={{
                        backgroundColor: isCenter ? accentColor : '#e5e7eb'
                      }}
                    >
                      <span 
                        className="material-icons text-lg sm:text-xl"
                        style={{
                          color: isCenter ? 'white' : '#6b7280'
                        }}
                      >
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-4 py-3 sm:px-6 sm:py-4 flex flex-col justify-between">
                    <div className="text-center">
                      <h3 
                        className="text-base sm:text-lg font-semibold mb-2 sm:mb-3"
                        style={{
                          color: isCenter ? accentColor : '#111827',
                          fontFamily: personaTypography?.headingFont || personaTypography?.fontFamily || 'inherit',
                          fontSize: personaTypography?.scale ? `calc(1rem * ${personaTypography.scale})` : undefined
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-xs sm:text-sm leading-relaxed line-clamp-2 overflow-hidden"
                        style={{
                          color: isCenter ? '#374151' : '#6b7280',
                          fontFamily: personaTypography?.fontFamily || 'inherit',
                          fontSize: personaTypography?.scale ? `calc(0.875rem * ${personaTypography.scale})` : undefined
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-4 sm:mt-6">
                      {isCenter ? (
                        <motion.button
                          className="w-full py-3 font-medium rounded-lg transition-colors hover:opacity-90 bg-[#a7ff4d] text-[#111827]"
                          style={{ 
                            backgroundColor: accentColor,
                            fontFamily: personaTypography?.fontFamily || 'inherit',
                            fontSize: personaTypography?.scale ? `calc(1rem * ${personaTypography.scale})` : undefined
                          }}
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
                          disabled
                          className="w-full py-3 border border-gray-300 text-gray-400 font-medium rounded-lg bg-gray-100 cursor-not-allowed opacity-60"
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
        </AnimatePresence>
      </motion.div>
      {/* Navigation Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          onClick={handlePrevious}
          disabled={isAnimating}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border flex items-center justify-center transition-all disabled:opacity-50 shadow-md hover:bg-white"
          style={{
            borderColor: accentColor,
            color: accentColor
          }}
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
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border flex items-center justify-center transition-all disabled:opacity-50 shadow-md hover:bg-white"
          style={{
            borderColor: accentColor,
            color: accentColor
          }}
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
                ? "w-6" 
                : "hover:opacity-70"
            )}
            style={{
              backgroundColor: index === currentIndex ? accentColor : '#d1d5db'
            }}
          />
        ))}
      </div>
    </div>
  );
}