import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';

import { usePersona } from '@/hooks/use-persona';
import { Carousel3D } from '@/components/ui/carousel-3d';
import { SeniorAccordion } from '@/components/ui/senior-accordion';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { motion } from 'framer-motion';

export default function JourneyDetail() {
  const { selectedPersona, currentStep, userName } = usePersona();
  const [, setLocation] = useLocation();

  if (!selectedPersona || !currentStep) {
    setLocation('/welcome');
    return null;
  }

  const handleBack = () => {
    setLocation('/welcome');
  };

  const handleSendMessage = (message: string, files?: File[]) => {
    console.log('AirBuddy message:', message);
    console.log('Files:', files);
    // Here you would handle the AI assistant interaction
  };

  const handleCarouselItemSelect = (item: any) => {
    console.log('Selected item:', item);
    // Here you would handle item selection action
  };

  // Sample carousel items (these would come from your data)
  const carouselItems = [
    {
      id: '1',
      title: 'Find My Gate',
      description: 'Get directions to your departure gate with real-time updates',
      image: 'https://images.unsplash.com/photo-1544885935-98dd03b09034?w=400&h=300&fit=crop',
      icon: 'flight_takeoff'
    },
    {
      id: '2', 
      title: 'Security Checkpoint',
      description: 'Find the fastest security line and estimated wait times',
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&h=300&fit=crop',
      icon: 'security'
    },
    {
      id: '3',
      title: 'Dining Options',
      description: 'Discover restaurants and cafes near your gate or terminal',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop', 
      icon: 'restaurant'
    },
    {
      id: '4',
      title: 'Shopping',
      description: 'Browse duty-free shops and retail stores in your area',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop',
      icon: 'shopping_bag'
    },
    {
      id: '5',
      title: 'Wi-Fi & Charging',
      description: 'Find free Wi-Fi zones and charging stations nearby',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop',
      icon: 'wifi'
    }
  ];

  // Special dark navy background for First-Time Student persona
  const isStudentPersona = selectedPersona.id === 'student';
  const backgroundColor = isStudentPersona 
    ? '#0F172A' // Dark navy background for student persona
    : selectedPersona.colors.bg;
  const backgroundGradient = isStudentPersona
    ? 'none'
    : `linear-gradient(135deg, ${selectedPersona.colors.primary}10, ${selectedPersona.colors.secondary}10)`;
  const textColor = isStudentPersona 
    ? '#FFFFFF' // White text for dark background
    : selectedPersona.colors.text || '#111827';
  const primaryColor = isStudentPersona
    ? '#FFFFFF' // White for H1 on dark background
    : selectedPersona.colors.primary;
  const nameColor = isStudentPersona
    ? '#F59E0B' // Yellow for user name
    : selectedPersona.colors.secondary;
  const buttonColor = isStudentPersona
    ? '#F59E0B' // Yellow accent for buttons
    : selectedPersona.colors.primary;

  return (
    <div 
      className="h-viewport flex flex-col"
      style={{ 
        fontFamily: selectedPersona.typography?.fontFamily || 'system-ui, -apple-system, sans-serif',
        fontSize: selectedPersona.typography?.fontSize || '16px',
        lineHeight: selectedPersona.typography?.lineHeight || '1.5',
        letterSpacing: selectedPersona.typography?.letterSpacing || 'normal',
        background: backgroundGradient,
        backgroundColor: backgroundColor,
        color: textColor
      }}
    >
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          style={{
            backgroundColor: isStudentPersona ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: buttonColor,
            color: buttonColor,
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to journey selection</span>
        </motion.button>
      </div>
      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-16 pb-24 h-full overflow-hidden">
          
          {/* Title */}
          <motion.div 
            className="text-center mb-8 sm:mb-8 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="h1-responsive"
              style={{
                fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit',
                fontSize: selectedPersona.typography?.scale ? `calc(32pt * ${selectedPersona.typography.scale})` : undefined,
                color: primaryColor,
                lineHeight: selectedPersona.typography?.lineHeight || '1.2'
              }}
            >
              Hello{' '}
              <span
                style={{ color: nameColor }}>
                {userName || 'User'}
              </span>
              ,
            </h1>
            <p 
              className="text-lg md:text-xl lg:text-2xl font-semibold mt-1"
              style={{
                fontSize: selectedPersona.typography?.scale ? `calc(1.25rem * ${selectedPersona.typography.scale})` : undefined,
                fontFamily: selectedPersona.typography?.fontFamily || 'inherit',
                color: isStudentPersona ? '#FFFFFF' : selectedPersona.colors.secondary,
                lineHeight: selectedPersona.typography?.lineHeight || '1.4'
              }}
            >
              I am your AirBuddy and I am here to assist you!
            </p>
          </motion.div>

          {/* 3D Carousel or Senior Accordion */}
          <motion.div 
            className="mb-8 sm:mb-8 md:mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {selectedPersona.id === 'senior' ? (
              <SeniorAccordion 
                items={carouselItems}
                onItemSelect={handleCarouselItemSelect}
                accentColor={buttonColor}
                secondaryColor={isStudentPersona ? '#1D4ED8' : selectedPersona.colors.secondary}
                personaTypography={selectedPersona.typography}
                selectedPersona={selectedPersona}
              />
            ) : (
              <Carousel3D 
                items={carouselItems}
                onItemSelect={handleCarouselItemSelect}
                accentColor={buttonColor}
                secondaryColor={isStudentPersona ? '#1D4ED8' : selectedPersona.colors.secondary}
                personaTypography={selectedPersona.typography}
                selectedPersona={selectedPersona}
              />
            )}
          </motion.div>

      </main>

      {/* Floating AI Prompt Input - Fixed at bottom */}
      <div 
        className="absolute left-0 right-0 z-30 px-4 sm:px-6 lg:px-8"
        style={{ bottom: '24px' }}
      >
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PromptInputBox 
            onSend={handleSendMessage}
            placeholder="Ask me anything about your journey..."
            className="w-full"
            accentColor={buttonColor}
            personaTypography={selectedPersona.typography}
          />
        </motion.div>
      </div>
    </div>
  );
}
