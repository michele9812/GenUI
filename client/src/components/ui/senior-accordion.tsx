import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

interface AccordionCarouselItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PersonaTypography {
  fontFamily?: string;
  headingFont?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  scale?: number;
}

interface SelectedPersona {
  id: string;
  colors: {
    primary: string;
    secondary: string;
    text?: string;
    bg?: string;
  };
  typography?: PersonaTypography;
}

interface SeniorAccordionProps {
  items: AccordionCarouselItem[];
  onItemSelect?: (item: AccordionCarouselItem) => void;
  accentColor: string;
  secondaryColor: string;
  personaTypography?: PersonaTypography;
  selectedPersona: SelectedPersona;
}

export function SeniorAccordion({
  items,
  onItemSelect,
  accentColor,
  secondaryColor,
  personaTypography,
  selectedPersona
}: SeniorAccordionProps) {
  // Helper function to create color with opacity
  const createColorWithOpacity = (color: string, opacity: number) => {
    // If it's a hex color, convert to rgba
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // If it's already rgba or other format, append opacity
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  // Create icon background (10% primary) and icon color (40% primary)
  const iconBackgroundColor = createColorWithOpacity(accentColor, 0.1);
  const iconColor = createColorWithOpacity(accentColor, 0.4);
  
  // Create grey separator line (40% opacity)
  const separatorColor = 'rgba(107, 114, 128, 0.4)'; // gray-500 with 40% opacity
  
  return (
    <div className="w-full max-w-4xl mx-auto h-[320px] sm:h-[420px] md:h-[460px] lg:h-[480px]">
      <Accordion 
        className="flex w-full flex-col gap-3 md:gap-6"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id}
            className="rounded-lg border-2 shadow-lg overflow-hidden bg-white"
            style={{
              borderColor: accentColor
            }}
          >
            <AccordionItem 
              value={item.id} 
              className="w-full"
            >
              <AccordionTrigger 
                className="w-full text-left transition-all duration-200 hover:bg-gray-50 bg-white"
              >
                <div className="flex items-center justify-between w-full h-full px-4 md:px-6 lg:px-8 py-0">
                <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                  {/* Icon */}
                  <div 
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: iconBackgroundColor
                    }}
                  >
                    <span 
                      className="material-icons text-sm sm:text-base md:text-lg"
                      style={{
                        color: iconColor
                      }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <div className="flex flex-col justify-center">
                    <p 
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{
                        marginBottom: '1px',
                        color: accentColor,
                        fontFamily: personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                        fontSize: personaTypography?.scale ? 
                          `calc(${window.innerWidth < 640 ? '0.65rem' : '0.75rem'} * ${personaTypography.scale})` : 
                          window.innerWidth < 640 ? '0.65rem' : undefined
                      }}
                    >
                      NAVIGATION
                    </p>
                    <h3 
                      className="text-xs sm:text-sm md:text-base font-semibold"
                      style={{
                        color: accentColor,
                        fontFamily: personaTypography?.headingFont || personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                        fontSize: personaTypography?.scale ? 
                          `calc(${window.innerWidth < 640 ? '0.8rem' : '0.9rem'} * ${personaTypography.scale})` : 
                          window.innerWidth < 640 ? '0.8rem' : undefined,
                        lineHeight: personaTypography?.lineHeight || '1.5'
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {/* Chevron Icon */}
                <ChevronDown 
                  className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-data-[expanded]:rotate-180"
                  style={{
                    color: accentColor
                  }}
                />
                </div>
              </AccordionTrigger>
            
            {/* Separator line when expanded */}
            <div 
              className="w-full h-px"
              style={{ backgroundColor: separatorColor }}
            />
            
            <AccordionContent className="bg-white">
              <div className="px-4 md:px-6 lg:px-8 py-2 h-fit">
                {/* Horizontal layout: text + button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3 md:gap-4 h-fit">
                  {/* Text content */}
                  <div className="flex-1 h-fit">
                    <p 
                      className="text-xs sm:text-sm leading-relaxed mb-0 md:mb-0"
                      style={{
                        color: selectedPersona.colors.text || '#111827',
                        fontFamily: personaTypography?.fontFamily || 'inherit',
                        fontSize: personaTypography?.scale ? 
                          `calc(${window.innerWidth < 640 ? '0.75rem' : '0.875rem'} * ${personaTypography.scale})` : 
                          window.innerWidth < 640 ? '0.75rem' : undefined
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex-shrink-0 h-fit">
                    <motion.button
                      className="w-full sm:w-auto py-2 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-6 font-medium rounded-lg transition-all duration-200 hover:opacity-90 max-h-[56px] md:max-h-none"
                      style={{ 
                        backgroundColor: accentColor,
                        color: 'white',
                        fontFamily: personaTypography?.fontFamily || 'inherit',
                        fontSize: personaTypography?.scale ? 
                          `calc(${window.innerWidth < 640 ? '0.875rem' : '1rem'} * ${personaTypography.scale})` : 
                          window.innerWidth < 640 ? '0.875rem' : undefined,
                        border: 'none',
                        maxWidth: window.innerWidth < 640 ? '100%' : '320px',
                        minWidth: window.innerWidth < 640 ? 'auto' : '140px'
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
                  </div>
                </div>
              </div>
            </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
}