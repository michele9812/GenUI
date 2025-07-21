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

  // Generate contextual actions based on current journey step and persona
  const getContextualActions = () => {
    const generalServices = [
      {
        id: 'security_assistance',
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

    // Persona-specific actions by journey step - mapped to actual persona journey step IDs
    const personaStepActions: { [personaId: string]: { [stepId: string]: any[] } } = {
      'tech': {
        // Tech persona journey: parking -> security -> lounge -> boarding -> post_flight
        'parking': [
          {
            id: 'parking_app_scan',
            title: 'Parking App Gate Scan',
            description: 'Scan parking app to open automatic gate',
            icon: 'qr_code_scanner'
          },
          {
            id: 'priority_access',
            title: 'Priority Access QR',
            description: 'Access Priority lane with airline app QR code',
            icon: 'verified'
          }
        ],
        'security': [
          {
            id: 'biometric_gate',
            title: 'Biometric e-Gate',
            description: 'Pass through e-Gate using face-ID authentication',
            icon: 'face'
          },
          {
            id: 'smartwatch_confirm',
            title: 'Smartwatch Confirmation',
            description: 'Receive instant OK confirmation on smartwatch',
            icon: 'watch'
          }
        ],
        'lounge': [
          {
            id: 'auto_barista',
            title: 'Self-Service Barista',
            description: 'Order protein drink from automatic barista',
            icon: 'local_cafe'
          },
          {
            id: 'shower_nfc',
            title: 'NFC Shower Booking',
            description: 'Book shower via touchscreen, unlock with NFC',
            icon: 'shower'
          }
        ],
        'boarding': [
          {
            id: 'nfc_boarding',
            title: 'NFC Self-Scan',
            description: 'Self-scan NFC at gate with smartwatch or phone',
            icon: 'nfc'
          },
          {
            id: 'live_boarding_status',
            title: 'Live Boarding Updates',
            description: 'Receive live boarding completion in app',
            icon: 'notifications_active'
          }
        ],
        'post_flight': [
          {
            id: 'mobile_lost_found',
            title: 'Mobile Lost & Found',
            description: 'Report lost items via in-app form',
            icon: 'find_in_page'
          },
          {
            id: 'baggage_tracking',
            title: 'Auto Baggage Tracking',
            description: 'Automatic tracking and delivery status updates',
            icon: 'track_changes'
          }
        ]
      },
      
      'family': {
        // Family persona journey: parking -> checkin -> security -> waiting -> boarding
        'parking': [
          {
            id: 'shuttle_call_point',
            title: 'PRM Shuttle Call',
            description: 'Book shuttle via call point for family assistance',
            icon: 'phone'
          },
          {
            id: 'family_vehicle',
            title: 'Family-Friendly Vehicle',
            description: 'Load stroller and bags on family vehicle',
            icon: 'family_restroom'
          }
        ],
        'checkin': [
          {
            id: 'family_counter',
            title: 'Dedicated Family Counter',
            description: 'Check-in at family counter with colored bag tags',
            icon: 'counter_1'
          },
          {
            id: 'priority_seating',
            title: 'Priority Cabin Assignment',
            description: 'Get priority seat assignment with instant tag print',
            icon: 'airline_seat_recline_normal'
          }
        ],
        'security': [
          {
            id: 'family_lane',
            title: 'Family Security Lane',
            description: 'Use wide family lane for easier passage',
            icon: 'family_restroom'
          },
          {
            id: 'stroller_scan',
            title: 'Complete Stroller Scan',
            description: 'Scan stroller without disassembly',
            icon: 'baby_changing_station'
          }
        ],
        'waiting': [
          {
            id: 'playground_access',
            title: 'Pre-Gate Playground',
            description: 'Access playground with interactive games',
            icon: 'child_friendly'
          },
          {
            id: 'storytelling_app',
            title: 'Story-Telling App',
            description: 'Entertain children with interactive stories',
            icon: 'auto_stories'
          }
        ],
        'boarding': [
          {
            id: 'family_preboard',
            title: 'Family Pre-Boarding',
            description: 'Priority boarding call with staff assistance',
            icon: 'escalator_warning'
          }
        ]
      },

      'senior': {
        // Senior persona journey: terminal -> screening -> waiting -> transfer
        'terminal': [
          {
            id: 'prm_call_pillar',
            title: 'PRM Call Pillar',
            description: 'Request immediate assistance via call pillar',
            icon: 'support_agent'
          },
          {
            id: 'sala_amica',
            title: 'Sala Amica Access',
            description: 'Direct access to comfortable seating with large fonts',
            icon: 'accessible'
          }
        ],
        'screening': [
          {
            id: 'prm_security_lane',
            title: 'PRM Security Lane',
            description: 'Dedicated lane with mobile chair option',
            icon: 'accessible'
          },
          {
            id: 'onsite_bag_check',
            title: 'On-Site Bag Check',
            description: 'Hand baggage check without traveler movement',
            icon: 'luggage'
          }
        ],
        'waiting': [
          {
            id: 'ergonomic_seating',
            title: 'Ergonomic Gate Seating',
            description: 'Seating with raised armrests and cane space',
            icon: 'chair'
          },
          {
            id: 'lounge_refreshments',
            title: 'Assisted Refreshments',
            description: 'Request light refreshments from lounge staff',
            icon: 'room_service'
          }
        ],
        'transfer': [
          {
            id: 'ambu_lift',
            title: 'Ambu-Lift Transfer',
            description: 'Transfer via ambu-lift to baggage claim',
            icon: 'accessible'
          },
          {
            id: 'golf_cart',
            title: 'Golf Cart Service',
            description: 'Electric golf cart to arrival terminal shuttle',
            icon: 'directions_car'
          }
        ]
      },

      'bleisure': {
        // Bleisure persona journey: post_meeting -> work -> leisure -> return
        'post_meeting': [
          {
            id: 'smart_locker',
            title: 'Contactless Smart Locker',
            description: 'Store backpack and trolley in app-controlled locker',
            icon: 'lock'
          },
          {
            id: 'sms_pin',
            title: 'SMS Recovery PIN',
            description: 'Receive temporary PIN via SMS for bag retrieval',
            icon: 'sms'
          }
        ],
        'work': [
          {
            id: 'coworking_space',
            title: 'Air-Side Coworking',
            description: 'Access coworking space with lounge pass authentication',
            icon: 'work'
          },
          {
            id: 'phone_booth',
            title: 'Soundproof Phone Booth',
            description: 'Use soundproof booth for calls and video conferences',
            icon: 'call'
          }
        ],
        'leisure': [
          {
            id: 'city_pass_app',
            title: 'City-Pass Activation',
            description: 'Activate city-pass app directly from terminal totem',
            icon: 'location_city'
          },
          {
            id: 'local_tours_qr',
            title: 'Local Tours QR Scan',
            description: 'Scan QR codes for tour info and local discounts',
            icon: 'tour'
          }
        ],
        'return': [
          {
            id: 'shower_pod',
            title: 'Shower Pod Booking',
            description: 'Book and unlock shower pod with lounge badge',
            icon: 'shower'
          },
          {
            id: 'yoga_room',
            title: 'Yoga Room Access',
            description: 'Access yoga room with temporary app code',
            icon: 'self_improvement'
          }
        ]
      },

      'student': {
        // Student persona journey: checkin_origin -> layover -> immigration -> exit
        'checkin_origin': [
          {
            id: 'multilingual_kiosk',
            title: 'Multilingual Kiosk',
            description: 'Use Chinese/English kiosk with dedicated staff support',
            icon: 'translate'
          },
          {
            id: 'document_verification',
            title: 'Document Verification',
            description: 'Verify documentation and print boarding pass with clear instructions',
            icon: 'verified'
          }
        ],
        'layover': [
          {
            id: 'universal_wayfinding',
            title: 'Universal Wayfinding',
            description: 'Follow universal icons on floor and overhead displays',
            icon: 'directions_walk'
          },
          {
            id: 'help_totems',
            title: 'Multilingual Help Totems',
            description: 'Access help totems with language selection every few meters',
            icon: 'help'
          }
        ],
        'immigration': [
          {
            id: 'apc_kiosk',
            title: 'APC Immigration Kiosk',
            description: 'Pre-enter data and print receipt at APC kiosk',
            icon: 'print'
          },
          {
            id: 'translation_service',
            title: 'CBP Translation Service',
            description: 'Interact with CBP agent using simultaneous translator totem',
            icon: 'hearing'
          }
        ],
        'exit': [
          {
            id: 'esim_pickup',
            title: 'e-SIM Pickup Point',
            description: 'Collect and activate e-SIM at dedicated pickup point',
            icon: 'sim_card'
          },
          {
            id: 'campus_shuttle',
            title: 'Campus Shuttle',
            description: 'Board campus shuttle showing mobile ticket to driver',
            icon: 'directions_bus'
          }
        ]
      }
    };

    const currentPersonaActions = personaStepActions[selectedPersona?.id || ''] || {};
    const stepActions = currentPersonaActions[currentStep?.id || ''] || [];
    
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
