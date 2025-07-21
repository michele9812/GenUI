import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';

import { usePersona } from '@/hooks/use-persona';
import { Carousel3D } from '@/components/ui/carousel-3d';
import { SeniorAccordion } from '@/components/ui/senior-accordion';
import FamilyTabs from '@/components/ui/family-tabs';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { motion } from 'framer-motion';

export default function JourneyDetail() {
  const { selectedPersona, currentStep, userName } = usePersona();
  const [, setLocation] = useLocation();

  // Find the current step object from the persona's journey steps
  const currentStepObj = selectedPersona?.journeySteps.find(step => step.id === currentStep);

  if (!selectedPersona || !currentStep || !currentStepObj) {
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

  // Generate contextual actions based on current journey step and persona
  const getContextualActions = () => {
    // Context-aware universal services
    const getUniversalServices = (stepId: string) => {
      const baseServices = [
        {
          id: 'security_assistance',
          title: 'Security & Assistance',
          description: 'Find security personnel, police, or emergency assistance',
          icon: 'security'
        }
      ];

      // Restrooms not available in parking areas (outdoor)
      if (stepId !== 'parking') {
        baseServices.push({
          id: 'accessible_restrooms',
          title: 'Accessible Restrooms',
          description: 'Locate nearby restrooms and accessible facilities',
          icon: 'wc'
        });
      }

      return baseServices;
    };

    // Persona-specific actions by journey step - mapped to actual persona journey step IDs
    const personaStepActions: { [personaId: string]: { [stepId: string]: any[] } } = {
      'tech': {
        // Tech persona journey: parking -> security -> lounge -> boarding -> post_flight
        'parking': [
          {
            id: 'parking_app_scan',
            title: 'Parking App Scan',
            description: 'Scan parking app to automatically open gate',
            icon: 'qr_code_scanner'
          },
          {
            id: 'priority_lane_access',
            title: 'Priority Lane Access',
            description: 'Access Priority lane via QR code in airline app',
            icon: 'fast_forward'
          }
        ],
        'security': [
          {
            id: 'biometric_egate',
            title: 'Biometric e-Gate',
            description: 'Pass through e-Gate using face-ID',
            icon: 'face'
          },
          {
            id: 'smartwatch_confirmation',
            title: 'Smartwatch OK',
            description: 'Receive immediate OK confirmation on smartwatch',
            icon: 'watch'
          }
        ],
        'lounge': [
          {
            id: 'selfservice_barista',
            title: 'Self-Service Barista',
            description: 'Order protein drink from automatic barista',
            icon: 'local_cafe'
          },
          {
            id: 'shower_touchscreen_nfc',
            title: 'Shower Booking NFC',
            description: 'Book shower via touchscreen and unlock with NFC',
            icon: 'shower'
          }
        ],
        'boarding': [
          {
            id: 'nfc_selfscan_gate',
            title: 'NFC Self-Scan',
            description: 'Self-scan NFC at gate with smartwatch or phone',
            icon: 'nfc'
          },
          {
            id: 'live_boarding_complete',
            title: 'Live Boarding Status',
            description: 'Receive live "Boarding complete" notification in app',
            icon: 'notifications'
          }
        ],
        'post_flight': [
          {
            id: 'mobile_lost_found_form',
            title: 'Mobile Lost & Found',
            description: 'Report lost items via in-app lost & found form',
            icon: 'search'
          },
          {
            id: 'auto_baggage_tracking',
            title: 'Auto Baggage Tracking',
            description: 'Automatic tracking of recovery status and delivery',
            icon: 'luggage'
          }
        ]
      },
      
      'family': {
        // Family persona journey: parking -> checkin -> security -> waiting -> boarding
        'parking': [
          {
            id: 'shuttle_call_point_prm',
            title: 'PRM Light Call Point',
            description: 'Book and automatically call shuttle via call point PRM light',
            icon: 'phone'
          },
          {
            id: 'family_vehicle_loading',
            title: 'Family Vehicle Loading',
            description: 'Load stroller and luggage on family-friendly vehicle',
            icon: 'luggage'
          }
        ],
        'checkin': [
          {
            id: 'family_dedicated_counter',
            title: 'Family Dedicated Counter',
            description: 'Check-in at dedicated family counter with colored baggage tags for each member',
            icon: 'color_lens'
          },
          {
            id: 'priority_cabin_assignment',
            title: 'Priority Cabin Assignment',
            description: 'Priority cabin seat assignment with immediate tag printing',
            icon: 'airline_seat_recline_normal'
          }
        ],
        'security': [
          {
            id: 'family_wide_lane',
            title: 'Family Wide Lane',
            description: 'Use family lane with wide corridor',
            icon: 'family_restroom'
          },
          {
            id: 'stroller_complete_scan',
            title: 'Complete Stroller Scan',
            description: 'Scan complete stroller without disassembly',
            icon: 'scanner'
          }
        ],
        'waiting': [
          {
            id: 'pregate_playground',
            title: 'Pre-Gate Playground',
            description: 'Access playground with interactive games before gate',
            icon: 'toys'
          },
          {
            id: 'storytelling_app_kids',
            title: 'Story-Telling App',
            description: 'Consult story-telling app to entertain children while waiting',
            icon: 'menu_book'
          }
        ],
        'boarding': [
          {
            id: 'family_preboarding_dedicated',
            title: 'Family Pre-Boarding',
            description: 'Pre-boarding for families with dedicated call and gate staff assistance',
            icon: 'family_restroom'
          }
        ]
      },

      'senior': {
        // Senior persona journey: terminal -> screening -> waiting -> transfer
        'terminal': [
          {
            id: 'prm_call_pillar_assistance',
            title: 'PRM Call Pillar',
            description: 'Use call pillar PRM to request immediate assistance',
            icon: 'support_agent'
          },
          {
            id: 'sala_amica_direct_entry',
            title: 'Sala Amica Direct Entry',
            description: 'Direct entry to Sala Amica with ergonomic seating and readable fonts',
            icon: 'accessible'
          }
        ],
        'screening': [
          {
            id: 'prm_dedicated_lane_chair',
            title: 'PRM Dedicated Lane',
            description: 'Pass on dedicated PRM lane with option to sit on mobile chair',
            icon: 'wheelchair_pickup'
          },
          {
            id: 'onsite_handbag_control',
            title: 'On-Site Hand Bag Control',
            description: 'Hand baggage control performed on-site without moving the traveler',
            icon: 'personal_injury'
          }
        ],
        'waiting': [
          {
            id: 'gate_seating_ergonomic',
            title: 'Ergonomic Gate Seating',
            description: 'Occupy gate seating with raised armrests and space for walking stick',
            icon: 'event_seat'
          },
          {
            id: 'light_refreshment_request',
            title: 'Light Refreshment Request',
            description: 'Request light refreshments directly from lounge personnel',
            icon: 'room_service'
          }
        ],
        'transfer': [
          {
            id: 'ambulift_transfer_baggage',
            title: 'Ambu-Lift Transfer',
            description: 'Transfer with ambu-lift to baggage claim area',
            icon: 'elevator'
          },
          {
            id: 'golf_car_electric_shuttle',
            title: 'Electric Golf Car',
            description: 'Board electric golf car to arrival terminal shuttle point',
            icon: 'directions_car'
          }
        ]
      },

      'bleisure': {
        // Bleisure persona journey: post_meeting -> work -> leisure -> return
        'post_meeting': [
          {
            id: 'smart_locker_contactless',
            title: 'Contactless Smart Locker',
            description: 'Deposit backpack and trolley in contactless smart locker (app opening)',
            icon: 'lock'
          },
          {
            id: 'temporary_pin_sms',
            title: 'Temporary PIN SMS',
            description: 'Receive temporary PIN via SMS for baggage recovery',
            icon: 'sms'
          }
        ],
        'work': [
          {
            id: 'coworking_airside_lounge',
            title: 'Air-Side Coworking Space',
            description: 'Access coworking space air-side, authenticating with lounge pass',
            icon: 'work'
          },
          {
            id: 'phone_booth_soundproof',
            title: 'Soundproof Phone Booth',
            description: 'Use soundproof phone booth for calls or video conferences',
            icon: 'phone'
          }
        ],
        'leisure': [
          {
            id: 'citypass_app_terminal_totem',
            title: 'City-Pass App Activation',
            description: 'Activate city-pass app directly from in-terminal totem',
            icon: 'map'
          },
          {
            id: 'qr_scan_digital_stations',
            title: 'QR Code Tour Info',
            description: 'Scan QR codes at digital stations for tour info and local discounts',
            icon: 'museum'
          }
        ],
        'return': [
          {
            id: 'shower_pod_lounge_badge',
            title: 'Shower Pod Booking',
            description: 'Book and unlock shower pod via lounge badge',
            icon: 'shower'
          },
          {
            id: 'yoga_room_temp_code',
            title: 'Yoga Room Access',
            description: 'Access yoga room with temporary code sent via app',
            icon: 'self_improvement'
          }
        ]
      },

      'student': {
        // Student persona journey: checkin_origin -> layover -> immigration -> exit
        'checkin_origin': [
          {
            id: 'multilingual_kiosk_chinese_english',
            title: 'Multilingual Kiosk',
            description: 'Use multilingual kiosk (Chinese/English) with dedicated staff support',
            icon: 'translate'
          },
          {
            id: 'documentation_verification_clear',
            title: 'Documentation Verification',
            description: 'Verify documentation and print boarding pass with clear indications',
            icon: 'description'
          }
        ],
        'layover': [
          {
            id: 'wayfinding_universal_icons',
            title: 'Universal Icon Wayfinding',
            description: 'Wayfinding via universal icons on floor and overhead displays',
            icon: 'place'
          },
          {
            id: 'help_totems_multilingual',
            title: 'Multilingual Help Totems',
            description: 'Every few meters, mini-totems with "Need help?" and language choice',
            icon: 'map'
          }
        ],
        'immigration': [
          {
            id: 'apc_kiosk_usa_predata',
            title: 'APC Kiosk USA',
            description: 'Use APC kiosk to pre-enter data and print receipt',
            icon: 'computer'
          },
          {
            id: 'cbp_agent_simultaneous_translator',
            title: 'CBP Agent Translation',
            description: 'Interact with CBP agent assisted by simultaneous translator on audio totem',
            icon: 'support_agent'
          }
        ],
        'exit': [
          {
            id: 'esim_pickup_dedicated_activation',
            title: 'e-SIM Pickup',
            description: 'Pick up e-SIM at dedicated pickup point and immediate activation',
            icon: 'sim_card'
          },
          {
            id: 'campus_shuttle_mobile_ticket',
            title: 'Campus Shuttle',
            description: 'Board campus shuttle showing mobile ticket to driver',
            icon: 'school'
          }
        ]
      }
    };

    const currentPersonaActions = personaStepActions[selectedPersona?.id || ''] || {};
    const stepActions = currentPersonaActions[currentStep || ''] || [];
    const universalServices = getUniversalServices(currentStep || '');
    

    
    // Return step-specific actions + context-aware universal services
    return [...stepActions, ...universalServices];
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
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
        {/* AirBuddy Logo Square - Separate button */}
        <motion.div
          className="w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-md"
          style={{
            backgroundColor: selectedPersona.colors.primary,
            color: 'white'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 11.66 11.34 14 14 14V22H10V24H14H14.5C14.5 24 14.5 24 14.5 24H15V22H14V14C16.66 14 19 11.66 19 9H21Z"/>
          </svg>
        </motion.div>

        {/* Back Action Button */}
        <motion.button
          onClick={handleBack}
          className="backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200"
          style={{
            backgroundColor: isStudentPersona ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            border: '1px solid rgba(107, 114, 128, 0.3)'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Desktop Version - Icon + Text */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-3">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(107, 114, 128, 0.3)'
              }}
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </div>
            <span 
              className="text-sm font-medium"
              style={{
                color: isStudentPersona ? '#f59e0b' : buttonColor,
                fontFamily: selectedPersona.typography?.fontFamily || 'inherit'
              }}
            >
              Back to journey selection
            </span>
          </div>

          {/* Mobile Version - Icon Only */}
          <div className="flex sm:hidden items-center justify-center p-3">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(107, 114, 128, 0.3)'
              }}
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </motion.button>
      </div>
      {/* Header Section - Relative positioning with proper margins */}
      <div 
        className="text-center px-4 sm:px-6 lg:px-8 w-full"
        style={{
          marginTop: '64px', // 64px top margin
          marginBottom: '16px' // 16px bottom margin
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="h1-responsive-small"
            style={{
              fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit',
              transform: selectedPersona.typography?.scale ? `scale(${selectedPersona.typography.scale})` : undefined,
              color: primaryColor,
              lineHeight: selectedPersona.typography?.lineHeight || '1.2',
              marginBottom: selectedPersona.typography?.scale && selectedPersona.typography.scale > 1.1 
                ? '16px' // More space for Senior persona
                : '8px' // Standard spacing between title elements
            }}
          >
            Hello{' '}
            <span style={{ color: nameColor }}>
              {userName || 'User'}
            </span>
            ,
          </h1>
          <p 
            className="text-responsive"
            style={{
              transform: selectedPersona.typography?.scale ? `scale(${selectedPersona.typography.scale})` : undefined,
              lineHeight: selectedPersona.typography?.lineHeight || '1.4',
              fontFamily: selectedPersona.typography?.fontFamily || 'inherit',
              color: isStudentPersona ? 'rgba(255, 255, 255, 0.8)' : selectedPersona.colors.secondary,
              marginBottom: '8px' // Spacing before next element (atomic spacing)
            }}
          >
            I am your AirBuddy and I am here to assist you!
          </p>
          
          {/* Current Journey Phase */}
          <p 
            className="font-medium text-responsive"
            style={{
              transform: selectedPersona.typography?.scale ? `scale(${selectedPersona.typography.scale})` : undefined,
              fontFamily: selectedPersona.typography?.fontFamily || 'inherit',
              color: isStudentPersona ? '#E5E7EB' : selectedPersona.colors.text || '#374151',
              lineHeight: selectedPersona.typography?.lineHeight || '1.4',
              marginBottom: '16px' // Ensure 16px spacing with content below
            }}
          >
            You are in "{currentStepObj?.name || 'Journey Point'}" phase
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full h-full overflow-hidden" style={{ paddingLeft: '64px', paddingRight: '64px' }}>

        {/* 3D Carousel, Senior Accordion, or Family Tabs */}
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
            ) : selectedPersona.id === 'family' ? (
              <FamilyTabs 
                items={carouselItems}
                onItemSelect={handleCarouselItemSelect}
                accentColor={buttonColor}
                secondaryColor={isStudentPersona ? '#1D4ED8' : selectedPersona.colors.secondary}
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

      {/* Floating AI Prompt Input - Bottom section with margin */}
      <div 
        className="px-4 sm:px-6 lg:px-8 w-full"
        style={{ marginBottom: '32px' }}
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
