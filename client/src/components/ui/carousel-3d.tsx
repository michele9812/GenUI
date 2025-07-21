import { useState, useEffect, useRef, useCallback } from 'react';
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

  accentColor?: string;
  secondaryColor?: string;
  personaTypography?: {
    fontFamily: string;
    headingFont: string;
    fontSize: string;
    scale?: number;
    lineHeight?: string;
  };
  selectedPersona?: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      bg: string;
      text?: string;
    };
    typography?: {
      fontFamily: string;
      headingFont: string;
      fontSize: string;
      lineHeight?: string;
      scale?: number;
    };
  };
}

export function Carousel3D({ 
  items, 
  onItemSelect, 
  accentColor = '#3B82F6',
  secondaryColor = '#10B981',
  personaTypography,
  selectedPersona
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const handlePrevious = useCallback(() => {
    if (isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, isDragging, items.length]);

  const handleNext = useCallback(() => {
    if (isAnimating || isDragging) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, isDragging, items.length]);

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
  }, [handlePrevious, handleNext]);

  // Auto-scroll pause on hover (currently unused but kept for future features)
  const [isPaused, setIsPaused] = useState(false);

  // Get visible cards (center + 2 on each side) - responsive
  const getVisibleCards = useCallback(() => {
    const visibleCards = [];
    const totalCards = Math.min(5, items.length); // Show max 5 cards
    const startOffset = Math.floor(totalCards / 2);
    
    for (let i = 0; i < totalCards; i++) {
      const index = (currentIndex - startOffset + i + items.length) % items.length;
      const position = i - startOffset; // -2, -1, 0, 1, 2
      visibleCards.push({ item: items[index], originalIndex: index, position });
    }
    
    return visibleCards;
  }, [currentIndex, items]);

  const getCardStyle = useCallback((position: number) => {
    const isCenter = position === 0;
    
    // Get current screen width for responsive calculations
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const isMobile = screenWidth < 640;
    const isTablet = screenWidth < 1024;
    
    let baseWidth, centerWidth, spacing, containerPadding;
    
    if (isMobile) {
      if (screenWidth <= 320) {
        // iPhone SE configuration (≤320px) - optimized for 320px screen
        baseWidth = 160;
        centerWidth = 200;
        spacing = 16; // Reduced spacing for tighter fit
        containerPadding = 4;
      } else if (screenWidth <= 375) {
        // Small mobile devices (321px-375px)
        baseWidth = 180;
        centerWidth = 220;
        spacing = 20; 
        containerPadding = 6;
      } else {
        // Larger mobile devices (376px+)
        baseWidth = 260;
        centerWidth = 280;
        spacing = 24; 
        containerPadding = 16;
      }
    } else if (isTablet) {
      baseWidth = 200;
      centerWidth = 240;
      spacing = 24; // Maintained 24px spacing
      containerPadding = 24;
    } else {
      // Desktop configuration
      baseWidth = 240;
      centerWidth = 280;
      spacing = 24; // Updated spacing to 24px
      containerPadding = 40;
    }
    
    // Enhanced positioning with responsive adjustments
    const offsetMultiplier = isCenter ? 0 : Math.sign(position) * 0.2;
    const responsiveScale = isCenter ? (isMobile ? 1.05 : 1.1) : (isMobile ? 0.9 : 0.85);
    const verticalOffset = isCenter ? (isMobile ? -5 : -10) : Math.abs(position) * (isMobile ? 3 : 5);
    
    // Improved spacing calculation - consistent gaps for all positions
    const cardWidth = isCenter ? centerWidth : baseWidth;
    const uniformGap = spacing; // Base gap between cards
    const baseTranslateX = position * (centerWidth + uniformGap); // Use center width as reference for consistent spacing
    
    // Smooth fading based on distance from center
    const distanceFromCenter = Math.abs(position);
    const fadeOpacity = Math.max(0.1, 1 - (distanceFromCenter * 0.3)); // Gradual fade instead of sharp cutoff
    
    // iPhone SE height calculation - optimized for small screens
    const cardHeight = isMobile ? 
      (screenWidth <= 320 ? 200 : // iPhone SE: 200px
       screenWidth <= 375 ? 240 : // Small mobile: 240px
       320) : 320; // Large mobile/desktop: 320px
    
    return {
      width: cardWidth,
      height: cardHeight, // iPhone SE: 240px, others: 320px
      scale: responsiveScale,
      translateX: baseTranslateX + offsetMultiplier * (isMobile ? 6 : 12),
      translateY: verticalOffset,
      opacity: 1, // Keep card container fully opaque
      zIndex: isCenter ? 10 : Math.max(1, 8 - distanceFromCenter),
      blur: 'blur(0px)', // No blur on card container
      brightness: 1, // Full brightness for card container
      contentOpacity: fadeOpacity, // Opacity for content only
      contentBlur: distanceFromCenter > 1 ? `blur(${Math.min(4, distanceFromCenter)}px)` : 'blur(0px)',
      contentBrightness: Math.max(0.6, 1 - (distanceFromCenter * 0.15)),
      containerPadding
    };
  }, []); // Empty dependency array since this function gets screen width dynamically

  const visibleCards = getVisibleCards();

  // Current screen dimensions for responsive container
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const isMobile = screenWidth < 640;
  const isIPhoneSE = screenWidth <= 320;

  return (
    <div 
      className="relative w-full"
      style={{
        height: screenWidth <= 320 ? '240px' : // iPhone SE: 240px container (reduced from 280px)
                screenWidth <= 375 ? '320px' : // Small mobile: 320px (reduced from 360px)
                (isMobile ? '480px' : '418px'), // Large mobile/desktop
        maxHeight: screenWidth <= 320 ? '240px' : 
                   screenWidth <= 375 ? '320px' : 
                   (isMobile ? '480px' : '418px')
      }}
    >
      <div 
        ref={containerRef}
        className="container-responsive relative w-full flex justify-center"
        style={{
          alignItems: 'center', // Center alignment for both mobile and desktop
          paddingTop: window.innerWidth <= 320 ? '8px' : '16px', // iPhone SE: 8px, others: 16px
          paddingLeft: window.innerWidth <= 320 ? '4px' : // iPhone SE: 4px
                       window.innerWidth < 640 ? '8px' : '80px', // Mobile: 8px, Desktop: 80px
          paddingRight: window.innerWidth <= 320 ? '4px' : // iPhone SE: 4px
                        window.innerWidth < 640 ? '8px' : '80px', // Mobile: 8px, Desktop: 80px
          overflow: 'visible',
          // Remove gradient masks to prevent content clipping
          maskImage: 'none',
          WebkitMaskImage: 'none',
          height: window.innerWidth <= 320 ? 'calc(100% - 32px)' : // iPhone SE: minimal gap (32px total)
                  window.innerWidth < 640 ? 'calc(100% - 48px)' : 'calc(100% - 32px)' // Mobile: 48px total, Desktop: 32px total
        }}

        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Cards Container */}
        <motion.div 
          className="relative flex justify-center w-full h-full"
          style={{
            alignItems: 'center' // Center alignment for both mobile and desktop
          }}
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
              
              return (
                <motion.div
                  key={`${item.id}-${originalIndex}`}
                  className={cn(
                    "absolute rounded-lg bg-white shadow-lg select-none",
                    isCenter ? "shadow-2xl cursor-pointer" : "shadow-md cursor-default",
                    isDragging ? "pointer-events-none" : (isCenter ? "pointer-events-auto" : "pointer-events-none"),
                    !isCenter && "backdrop-blur-none"
                  )}
                  style={{
                    width: screenWidth <= 320 ? Math.max(200, style.width) : // iPhone SE: min 200px
                           screenWidth <= 375 ? Math.max(220, style.width) : // Small mobile: min 220px
                           style.width,
                    height: screenWidth <= 320 ? 200 : // iPhone SE: 200px
                            screenWidth <= 375 ? 240 : // Small mobile: 240px
                            style.height,
                    zIndex: style.zIndex,
                    borderColor: isCenter ? accentColor : 'transparent',
                    background: isCenter ? (selectedPersona?.colors?.bg || '#ffffff') : '#f8fafc',
                    borderWidth: isCenter ? '1px' : '0px',
                    borderStyle: 'solid'
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
                  <div 
                    className={cn(
                      "w-full h-full rounded-lg overflow-hidden flex flex-col",
                      isCenter ? "glare-card" : ""
                    )}
                    style={{
                      opacity: style.contentOpacity,
                      filter: `${style.contentBlur} brightness(${style.contentBrightness})`
                    }}
                  >

                    <div 
                      className="px-4 py-2 sm:px-6 sm:py-3 text-center"
                      style={{
                        backgroundColor: isCenter ? (selectedPersona?.colors?.primary || accentColor) : '#f9fafb',
                        borderBottom: isCenter ? `2px solid ${selectedPersona?.colors?.secondary || secondaryColor}` : '1px solid #e5e7eb'
                      }}
                    >
                      <p 
                        className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-1 sm:mb-2"
                        style={{
                          color: isCenter ? 'white' : '#6b7280',
                          fontFamily: personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                          fontWeight: '600',
                          fontSize: selectedPersona?.typography?.scale && selectedPersona.typography.scale > 1.1 ? 
                            `calc(0.75rem * ${selectedPersona.typography.scale})` : undefined
                        }}
                      >
                        NAVIGATION
                      </p>
                      
                      {/* Icon */}
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center"
                        style={{
                          backgroundColor: isCenter ? (selectedPersona?.colors?.secondary || secondaryColor) : '#e5e7eb'
                        }}
                      >
                        <span 
                          className="material-icons text-base sm:text-lg"
                          style={{
                            color: isCenter ? 'white' : '#6b7280'
                          }}
                        >
                          {item.icon}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div 
                      className="flex-1 px-4 py-2 sm:px-6 sm:py-3 flex flex-col justify-between"
                      style={{
                        backgroundColor: 'white'
                      }}
                    >
                      <div className="text-center">
                        <h3 
                          className="text-sm sm:text-base font-semibold mb-1 sm:mb-2"
                          style={{
                            color: isCenter ? (selectedPersona?.colors?.text || '#111827') : '#111827',
                            fontFamily: personaTypography?.headingFont || personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                            fontSize: personaTypography?.scale ? `calc(0.9rem * ${personaTypography.scale})` : undefined,
                            lineHeight: personaTypography?.lineHeight || '1.5'
                          }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className="text-xs leading-relaxed line-clamp-2 overflow-hidden"
                          style={{
                            color: isCenter ? (selectedPersona?.colors?.text || '#111827') : '#6b7280',
                            fontFamily: personaTypography?.fontFamily || 'inherit',
                            fontSize: personaTypography?.scale ? `calc(0.75rem * ${personaTypography.scale})` : undefined
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-2 sm:mt-4">
                        {isCenter ? (
                          <motion.button
                            className="w-full py-3 font-medium rounded-lg transition-colors hover:opacity-90 max-h-[56px] md:max-h-none"
                            style={{ 
                              backgroundColor: selectedPersona?.colors?.secondary || accentColor,
                              color: 'white', // Always white text for better contrast on colored backgrounds
                              fontFamily: personaTypography?.fontFamily || 'inherit',
                              fontSize: personaTypography?.scale ? `calc(1rem * ${personaTypography.scale})` : undefined,
                              border: 'none'
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
                            className="w-full py-3 font-medium rounded-lg cursor-not-allowed opacity-60 max-h-[56px] md:max-h-none"
                            style={{ 
                              border: 'none',
                              backgroundColor: '#f3f4f6',
                              color: '#6b7280'
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
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Navigation Controls - Mobile: horizontal flexbox, Desktop: positioned */}
      {/* Mobile Layout: Bottom horizontal flexbox with dots left, arrows right */}
      <div className="md:hidden absolute inset-x-0 px-4 z-[1000]" style={{ bottom: '24px' }}>
        <div className="flex justify-between items-center">
          {/* Pagination Indicators - Left side on mobile */}
          <div className="flex gap-2">
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
                  backgroundColor: index === currentIndex ? 
                    (selectedPersona?.colors?.primary || accentColor) : '#d1d5db'
                }}
              />
            ))}
          </div>

          {/* Arrow Controls - Right side on mobile */}
          <div className="flex gap-2">
            <motion.button
              onClick={handlePrevious}
              disabled={isAnimating}
              className="w-8 h-8 rounded-lg backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 shadow-md"
              style={{
                backgroundColor: selectedPersona?.colors?.bg || '#ffffff',
                color: selectedPersona?.colors?.secondary || accentColor,
                border: 'none'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-8 h-8 rounded-lg backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 shadow-md"
              style={{
                backgroundColor: selectedPersona?.colors?.bg || '#ffffff',
                color: selectedPersona?.colors?.secondary || accentColor,
                border: 'none'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Side arrows and centered indicators */}
      <div className="hidden md:block">
        {/* Left Arrow */}
        <div 
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ zIndex: 1000 }}
        >
          <motion.button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="w-10 h-10 rounded-lg backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 shadow-md"
            style={{
              backgroundColor: selectedPersona?.colors?.bg || '#ffffff',
              color: selectedPersona?.colors?.secondary || accentColor,
              border: 'none'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Right Arrow */}
        <div 
          className="absolute right-4 top-1/2 -translate-y-1/2"
          style={{ zIndex: 1000 }}
        >
          <motion.button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-10 h-10 rounded-lg backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-50 shadow-md"
            style={{
              backgroundColor: selectedPersona?.colors?.bg || '#ffffff',
              color: selectedPersona?.colors?.secondary || accentColor,
              border: 'none'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Centered Indicators */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex gap-2"
          style={{ zIndex: 1000, bottom: '24px' }}
        >
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
                backgroundColor: index === currentIndex ? 
                  (selectedPersona?.colors?.primary || accentColor) : '#d1d5db'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}