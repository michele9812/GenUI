import React from 'react';
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

  if (!items || items.length === 0) {
    return <div>No items available</div>;
  }

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue={items[0]?.id} className="w-full">
        {/* Tab List */}
        <TabsList 
          className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 p-1 mb-4"
          style={{
            backgroundColor: `${selectedPersona?.colors.primary}20` || '#f3f4f6',
            border: `1px solid ${selectedPersona?.colors.primary}30` || '#e5e7eb'
          }}
        >
          {items.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="flex items-center gap-2 py-2 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              style={{
                fontFamily: personaTypography?.fontFamily || 'system-ui, -apple-system, sans-serif',
                fontSize: personaTypography?.scale ? `calc(0.875rem * ${personaTypography.scale})` : undefined
              }}
            >
              {/* Icon */}
              <span 
                className="material-icons text-base"
                style={{
                  color: selectedPersona?.colors.secondary || secondaryColor
                }}
              >
                {item.icon}
              </span>
              {/* Tab Name */}
              <span 
                className="hidden sm:inline text-xs font-medium"
                style={{
                  color: selectedPersona?.colors.text || '#111827'
                }}
              >
                {item.title}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        {items.map((item) => (
          <TabsContent key={item.id} value={item.id} className="w-full">
            <div 
              className="bg-white rounded-lg border shadow-sm p-6"
              style={{
                borderColor: selectedPersona?.colors.primary || accentColor,
                borderWidth: '1px'
              }}
            >
              {/* Header with Icon and Title */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: selectedPersona?.colors.primary || accentColor
                  }}
                >
                  <span 
                    className="material-icons text-xl text-white"
                  >
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p 
                    className="text-xs uppercase tracking-wider font-medium mb-1"
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
                className="text-sm leading-relaxed mb-6"
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
                className="w-full py-3 font-medium rounded-lg transition-colors hover:opacity-90"
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}