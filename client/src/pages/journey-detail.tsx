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

  // Generate contextual actions based on current journey step
  const getContextualActions = () => {
    const generalServices = [
      {
        id: 'security',
        title: 'Security & Assistance',
        description: 'Find security personnel, police, or emergency assistance',
        icon: 'security'
      },
      {
        id: 'restrooms',
        title: 'Restrooms',
        description: 'Locate nearest restrooms and accessibility facilities',
        icon: 'wc'
      }
    ];

    const stepSpecificActions: { [key: string]: any[] } = {
      // Parking/Arrival actions
      'parking': [
        {
          id: 'parking_info',
          title: 'Parking Information',
          description: 'Find your parking location and shuttle services',
          icon: 'local_parking'
        },
        {
          id: 'terminal_directions',
          title: 'Terminal Directions',
          description: 'Get directions to your terminal and check-in area',
          icon: 'directions'
        },
        {
          id: 'shuttle_info',
          title: 'Shuttle Services',
          description: 'View shuttle schedules and pickup locations',
          icon: 'airport_shuttle'
        }
      ],
      
      // Check-in actions
      'checkin': [
        {
          id: 'online_checkin',
          title: 'Mobile Check-in',
          description: 'Complete check-in and get boarding pass on your phone',
          icon: 'smartphone'
        },
        {
          id: 'baggage_drop',
          title: 'Baggage Drop',
          description: 'Find baggage drop counters and weight limits',
          icon: 'luggage'
        },
        {
          id: 'seat_selection',
          title: 'Seat Selection',
          description: 'Change or upgrade your seat assignment',
          icon: 'airline_seat_recline_normal'
        }
      ],

      // Security screening actions
      'security': [
        {
          id: 'security_wait',
          title: 'Wait Times',
          description: 'Check current security line wait times',
          icon: 'schedule'
        },
        {
          id: 'security_rules',
          title: 'Security Guidelines',
          description: 'Review what you can and cannot bring through security',
          icon: 'rule'
        },
        {
          id: 'fast_track',
          title: 'Fast Track Options',
          description: 'Find premium security lanes and eligibility',
          icon: 'fast_forward'
        }
      ],

      // Boarding/Gate actions
      'boarding': [
        {
          id: 'gate_info',
          title: 'Gate Information',
          description: 'Get real-time gate updates and boarding status',
          icon: 'flight_takeoff'
        },
        {
          id: 'flight_status',
          title: 'Flight Status',
          description: 'Check delays, cancellations, and departure times',
          icon: 'flight'
        },
        {
          id: 'boarding_pass',
          title: 'Boarding Pass',
          description: 'Access your mobile boarding pass and seat info',
          icon: 'confirmation_number'
        }
      ],

      // Layover/Transfer actions
      'layover': [
        {
          id: 'transfer_info',
          title: 'Transfer Information',
          description: 'Get directions to your connecting flight gate',
          icon: 'transfer_within_a_station'
        },
        {
          id: 'lounge_access',
          title: 'Lounge Access',
          description: 'Find lounges you can access during your layover',
          icon: 'star'
        },
        {
          id: 'duty_free',
          title: 'Duty Free Shopping',
          description: 'Browse duty-free shops and special offers',
          icon: 'shopping_bag'
        }
      ],

      // Post-flight/Arrival actions
      'arrival': [
        {
          id: 'baggage_claim',
          title: 'Baggage Claim',
          description: 'Find your baggage carousel and claim area',
          icon: 'luggage'
        },
        {
          id: 'ground_transport',
          title: 'Ground Transportation',
          description: 'Find taxis, buses, trains, and ride-sharing options',
          icon: 'directions_car'
        },
        {
          id: 'customs_info',
          title: 'Customs & Immigration',
          description: 'Get information about customs and immigration procedures',
          icon: 'passport'
        }
      ]
    };

    const stepActions = stepSpecificActions[currentStep?.id || ''] || [];
    return [...stepActions, ...generalServices];
  };

  const carouselItems = getContextualActions();

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
