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
  
  return (
    <div className="w-full max-w-4xl mx-auto h-[320px] sm:h-[420px] md:h-[460px] lg:h-[480px]" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
      <Accordion 
        className="flex w-full flex-col"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id}
            className="rounded-lg border-2 shadow-lg overflow-hidden"
            style={{
              borderColor: accentColor,
              backgroundColor: '#ffffff', // White neutral background
              marginBottom: index === items.length - 1 ? '0' : '16px'
            }}
          >
            <AccordionItem 
              value={item.id} 
              className="w-full"
            >
              <AccordionTrigger 
                className="w-full text-left transition-all duration-200 hover:bg-gray-50"
              >
                <div 
                  className="w-full"
                  style={{
                    backgroundColor: '#ffffff',
                    color: accentColor
                  }}
                >
              <div className="flex items-center justify-between w-full px-4 py-1 sm:px-6 sm:py-1">
                <div className="flex items-center space-x-3">
                  {/* Icon */}
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: accentColor
                    }}
                  >
                    <span 
                      className="material-icons text-base sm:text-lg text-white"
                    >
                      {item.icon}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <div>
                    <p 
                      className="text-xs sm:text-sm font-medium uppercase tracking-wider mb-1"
                      style={{
                        color: accentColor,
                        fontFamily: personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                        fontSize: personaTypography?.scale && personaTypography.scale > 1.1 ? 
                          `calc(0.75rem * ${personaTypography.scale})` : undefined
                      }}
                    >
                      NAVIGATION
                    </p>
                    <h3 
                      className="text-sm sm:text-base font-semibold"
                      style={{
                        color: accentColor,
                        fontFamily: personaTypography?.headingFont || personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                        fontSize: personaTypography?.scale ? `calc(0.9rem * ${personaTypography.scale})` : undefined,
                        lineHeight: personaTypography?.lineHeight || '1.5'
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {/* Chevron Icon */}
                <ChevronDown 
                  className="h-5 w-5 transition-transform duration-200 group-data-[expanded]:rotate-180"
                  style={{
                    color: accentColor
                  }}
                />
                </div>
              </div>
              </AccordionTrigger>
            
            <AccordionContent className="bg-white">
              <div 
                className="px-4 py-1 sm:px-6 sm:py-1"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* Horizontal layout: text + button */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  {/* Text content */}
                  <div className="flex-1">
                    <p 
                      className="text-sm leading-relaxed"
                      style={{
                        color: selectedPersona.colors.text || '#111827',
                        fontFamily: personaTypography?.fontFamily || 'inherit',
                        fontSize: personaTypography?.scale ? `calc(0.875rem * ${personaTypography.scale})` : undefined
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <motion.button
                      className="w-full sm:w-auto py-3 px-6 font-medium rounded-lg transition-colors hover:opacity-90"
                      style={{ 
                        backgroundColor: accentColor,
                        color: 'white',
                        fontFamily: personaTypography?.fontFamily || 'inherit',
                        fontSize: personaTypography?.scale ? `calc(1rem * ${personaTypography.scale})` : undefined,
                        border: 'none',
                        maxWidth: '320px'
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