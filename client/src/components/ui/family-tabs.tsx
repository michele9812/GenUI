import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersona } from '@/hooks/use-persona';

interface FamilyTabsProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  onItemSelect?: (item: any) => void;
  className?: string;
  accentColor?: string;
  secondaryColor?: string;
}

export default function FamilyTabs({ 
  items, 
  onItemSelect, 
  className = '',
  accentColor = '#047857',
  secondaryColor = '#E66100'
}: FamilyTabsProps) {
  const { selectedPersona } = usePersona();
  const personaTypography = selectedPersona?.typography;
  const [activeTab, setActiveTab] = useState(items[0]?.id);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!items || items.length === 0) {
    return <div>No items available</div>;
  }

  return (
    <div className={`w-full ${className}`}>
        {/* Horizontal Tab List - Hug Content with Active Label */}
        <div 
          className="flex items-stretch w-full gap-1 p-2 mb-2 md:mb-8 rounded-lg"
          style={{
            backgroundColor: `${selectedPersona?.colors.primary}10` || '#f9fafb'
          }}
        >
          {items.map((item) => (
            <motion.button
              key={item.id}
              className="flex items-center justify-center gap-1 md:gap-2 py-1.5 md:py-2 px-2 md:px-3 rounded-lg transition-all min-w-0 max-h-[56px] md:max-h-none"
              style={{
                backgroundColor: activeTab === item.id ? 
                  (selectedPersona?.colors.primary || accentColor) : 
                  'transparent',
                color: activeTab === item.id ? 'white' : (selectedPersona?.colors.text || '#374151'),
                fontFamily: personaTypography?.fontFamily || 'inherit',
                flex: !isMobile ? '1' : (activeTab === item.id ? 'auto' : '1')
              }}
              onClick={() => {
                setActiveTab(item.id);
                // Mobile: Auto expand active tab, Desktop: always expanded
                if (isMobile) {
                  setExpandedTab(item.id);
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {/* Icon Always Visible */}
              <span 
                className="material-icons text-lg flex-shrink-0"
                style={{
                  color: activeTab === item.id ? 'white' : (selectedPersona?.colors.secondary || secondaryColor)
                }}
              >
                {item.icon}
              </span>
              
              {/* Label - Responsive visibility with full content */}
              {(isMobile ? activeTab === item.id : true) && (
                <motion.span 
                  className="text-sm font-medium whitespace-nowrap"
                  initial={isMobile ? { width: 0, opacity: 0 } : false}
                  animate={isMobile ? { width: 'auto', opacity: 1 } : {}}
                  exit={isMobile ? { width: 0, opacity: 0 } : {}}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    fontSize: personaTypography?.scale ? `calc(0.875rem * ${personaTypography.scale})` : undefined
                  }}
                >
                  {item.title}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        {items.map((item) => 
          activeTab === item.id ? (
          <motion.div 
            key={item.id} 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="bg-white rounded-lg border shadow-sm px-4 py-2 md:px-6 md:py-2 lg:px-8 h-fit"
              style={{
                borderColor: selectedPersona?.colors.primary || accentColor,
                borderWidth: '1px'
              }}
            >
              {/* Header with Icon and Title */}
              <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 h-fit">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: selectedPersona?.colors.primary || accentColor
                  }}
                >
                  <span 
                    className="material-icons text-lg md:text-xl text-white"
                  >
                    {item.icon}
                  </span>
                </div>
                <div className="h-fit">
                  <p 
                    className="text-xs uppercase tracking-wider font-medium mb-0 md:mb-1"
                    style={{
                      color: selectedPersona?.colors.secondary || secondaryColor,
                      fontFamily: personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                      fontSize: personaTypography?.scale && personaTypography.scale > 1.1 ? 
                        `calc(0.75rem * ${personaTypography.scale})` : undefined
                    }}
                  >
                    NAVIGATION
                  </p>
                  <h3 
                    className="text-lg font-semibold"
                    style={{
                      color: selectedPersona?.colors.text || '#111827',
                      fontFamily: personaTypography?.headingFont || personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                      fontSize: personaTypography?.scale ? `calc(1.125rem * ${personaTypography.scale})` : undefined,
                      lineHeight: personaTypography?.lineHeight || '1.5'
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p 
                className="text-sm leading-relaxed mb-4 md:mb-6"
                style={{
                  color: selectedPersona?.colors.text || '#111827',
                  fontFamily: personaTypography?.fontFamily || 'inherit',
                  fontSize: personaTypography?.scale ? `calc(0.875rem * ${personaTypography.scale})` : undefined
                }}
              >
                {item.description}
              </p>

              {/* Action Button */}
              <motion.button
                className="w-full py-2.5 md:py-3 font-medium rounded-lg transition-colors hover:opacity-90 max-h-[56px] md:max-h-none"
                style={{ 
                  backgroundColor: selectedPersona?.colors.secondary || secondaryColor,
                  color: 'white',
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
            </div>
          </motion.div>
          ) : null
        )}
    </div>
  );
}