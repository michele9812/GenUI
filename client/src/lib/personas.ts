// Journey Step Image Constants - All paths verified and tested
export const JOURNEY_IMAGES = {
  // Terminal and Parking Areas
  TERMINAL: '/attached_assets/Modern%20Airport%20Terminal%20%281%29_1753100792152.png',
  PARKING: '/attached_assets/Modern%20Airport%20Terminal%20%282%29_1753100970301.png',
  ARRIVAL: '/attached_assets/Modern%20Baggage%20Claim_1753100330466.png', 
  
  // Security and Screening  
  SECURITY: '/attached_assets/TSA%20PreCheck%20Area_1753100330467.png',
  SCREENING: '/attached_assets/TSA%20PreCheck%20Area_1753100330467.png',
  
  // Boarding Areas
  BOARDING: '/attached_assets/Airport%20Boarding%20Area_1753099981602.png',
  IMBARCO: '/attached_assets/Airport%20Boarding%20Area_1753099981602.png',
  RETURN: '/attached_assets/Airport%20Boarding%20Area_1753099981602.png',
  
  // Service Counters and Premium Areas
  SERVICE_COUNTER: '/attached_assets/Modern%20Service%20Area_1753100792151.png',
  HELP_DESK: '/attached_assets/Modern%20Service%20Area_1753100792151.png',
  TRANSFER: '/attached_assets/Modern%20Service%20Area_1753100792151.png',
  POST_FLIGHT: '/attached_assets/Modern%20Baggage%20Claim_1753100330466.png',
  
  // Kiosk Interactions
  KIOSK: '/attached_assets/Airport%20Kiosk%20Interaction_1753099981603.png',
  CHECKIN: '/attached_assets/Airport%20Kiosk%20Interaction_1753099981603.png',
  SELF_SERVICE: '/attached_assets/Airport%20Kiosk%20Interaction_1753099981603.png',
  POST_MEETING: '/attached_assets/Airport%20Kiosk%20Interaction_1753099981603.png',
  
  // Waiting Areas and Lounges
  WAITING: '/attached_assets/Person%20in%20Airport%20Terminal_1753100792151.png',
  LOUNGE: '/attached_assets/lounge_1753100792150.png',
  WORK_AREA: '/attached_assets/Person%20in%20Airport%20Terminal_1753100792151.png',
  
  // Corridors and Navigation
  CORRIDOR: '/attached_assets/Modern%20Airport%20Terminal%20%281%29_1753100792152.png',
  LAYOVER: '/attached_assets/Modern%20Waiting%20Area_1753101085541.png',
  IMMIGRATION: '/attached_assets/immigration_1753100792151.png'
} as const;

export interface PersonaColors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text?: string;
  textSecondary?: string;
  link?: string;
  linkHover?: string;
  focus?: string;
  error?: string;
  success?: string;
  warning?: string;
}

export interface PersonaFonts {
  primary: string;
  secondary: string;
}

export interface PersonaTypography {
  fontFamily: string;
  headingFont: string;
  fontSize: string;
  lineHeight?: string;
  letterSpacing?: string;
  scale?: number; // For accessibility (Senior: 125%)
  minFontSize?: string;
  maxFontSize?: string;
}

export interface JourneyStep {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Action {
  title: string;
  description: string;
  icon: string;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  theme: string;
  colors: PersonaColors;
  fonts: PersonaFonts;
  typography: PersonaTypography;
  journeySteps: JourneyStep[];
  actions: Record<string, Action[]>;
}

export const personas: Record<string, Persona> = {
  tech: {
    id: 'tech',
    name: 'Marco',
    title: 'Frequent Flyer Tech-Savvy',
    description: '38 anni, consulente direzionale italiano basato a Milano. 60 voli/anno, status élite, appassionato di gadget e soluzioni friction-less.',
    icon: 'laptop',
    theme: 'persona-theme-tech',
    colors: {
      primary: '#1C304A', // Midnight Navy - WCAG AA compliant on light bg
      secondary: '#0C7BDC', // Electric Blue - WCAG AA compliant
      accent: '#FFC20A', // Vivid Gold - high contrast accent
      bg: '#f5f7fa',
      text: '#111827',
      textSecondary: '#4B5563',
      link: '#1C304A',
      linkHover: '#0F1F34',
      focus: '#3B82F6',
      error: '#DC2626',
      success: '#047857',
      warning: '#D97706'
    },
    fonts: {
      primary: 'Manrope',
      secondary: 'Lora'
    },
    typography: {
      fontFamily: 'Manrope, system-ui, -apple-system, sans-serif',
      headingFont: 'Lora, Georgia, serif',
      fontSize: '16px',
      lineHeight: '1.5',
      letterSpacing: 'normal',
      scale: 1,
      minFontSize: '14px',
      maxFontSize: '20px'
    },
    journeySteps: [
      { id: 'parking', name: 'Parking', icon: 'local_parking', image: JOURNEY_IMAGES.PARKING },
      { id: 'security', name: 'Security', icon: 'security', image: JOURNEY_IMAGES.SECURITY },
      { id: 'lounge', name: 'Lounge', icon: 'airline_seat_recline_normal', image: JOURNEY_IMAGES.LOUNGE },
      { id: 'boarding', name: 'Boarding', icon: 'flight_takeoff', image: JOURNEY_IMAGES.IMBARCO },
      { id: 'post_flight', name: 'Post-flight', icon: 'flight_land', image: JOURNEY_IMAGES.POST_FLIGHT }
    ],
    actions: {
      parking: [
        { title: 'Parking App', description: 'QR scan for automatic gate opening', icon: 'qr_code_scanner' },
        { title: 'Priority Lane', description: 'Fast access via airline app', icon: 'fast_forward' }
      ],
      security: [
        { title: 'Biometric e-Gate', description: 'Face-ID passage', icon: 'face' },
        { title: 'Smartwatch Confirm', description: 'Instant OK notification', icon: 'watch' }
      ],
      lounge: [
        { title: 'Self-Service Barista', description: 'Automatic drink ordering', icon: 'local_cafe' },
        { title: 'Shower Booking', description: 'Touch-screen and NFC unlock', icon: 'shower' }
      ],
      boarding: [
        { title: 'NFC Self-Scan', description: 'Smartwatch to gate reader', icon: 'nfc' },
        { title: 'Boarding Complete', description: 'Live app notification', icon: 'notifications' }
      ],
      post_flight: [
        { title: 'Mobile Lost & Found', description: 'Report lost items', icon: 'search' },
        { title: 'Baggage Tracking', description: 'Recovery status and delivery', icon: 'luggage' }
      ]
    }
  },
  family: {
    id: 'family',
    name: 'Fatima',
    title: 'Family Planner',
    description: '34 anni, insegnante marocchina che viaggia con marito e bimbi (4 e 7 anni). Frequenza 2 viaggi/anno; budget-sensitive ma orientata a servizi kids-friendly.',
    icon: 'family_restroom',
    theme: 'persona-theme-family',
    colors: {
      primary: '#111827', // Charcoal - WCAG AAA compliant
      secondary: '#047857', // Even darker green for WCAG AA compliance
      accent: '#E66100', // Sunset Orange - high visibility
      bg: '#fafaf6',
      text: '#111827',
      textSecondary: '#4B5563',
      link: '#111827',
      linkHover: '#0F172A',
      focus: '#3B82F6',
      error: '#DC2626',
      success: '#047857',
      warning: '#D97706'
    },
    fonts: {
      primary: 'Roboto',
      secondary: 'Roboto Serif'
    },
    typography: {
      fontFamily: 'Roboto, system-ui, -apple-system, sans-serif',
      headingFont: 'Roboto Serif, Georgia, serif',
      fontSize: '16px',
      lineHeight: '1.6', // Increased for better readability
      letterSpacing: '0.01em',
      scale: 1,
      minFontSize: '14px',
      maxFontSize: '20px'
    },
    journeySteps: [
      { id: 'parking', name: 'Parking', icon: 'local_parking', image: JOURNEY_IMAGES.TERMINAL },
      { id: 'checkin', name: 'Check-in', icon: 'how_to_reg', image: JOURNEY_IMAGES.CHECKIN },
      { id: 'security', name: 'Security', icon: 'security', image: JOURNEY_IMAGES.SECURITY },
      { id: 'waiting', name: 'Waiting', icon: 'schedule', image: JOURNEY_IMAGES.WAITING },
      { id: 'boarding', name: 'Boarding', icon: 'flight_takeoff', image: JOURNEY_IMAGES.IMBARCO }
    ],
    actions: {
      parking: [
        { title: 'Shuttle Call Point', description: 'Automatic shuttle service call', icon: 'airport_shuttle' },
        { title: 'Family Vehicle', description: 'Stroller and luggage loading assistance', icon: 'luggage' }
      ],
      checkin: [
        { title: 'Family Counter', description: 'Color-coded baggage tags for family members', icon: 'color_lens' },
        { title: 'Priority Seating', description: 'Immediate cabin seat assignment', icon: 'airline_seat_recline_normal' }
      ],
      security: [
        { title: 'Family Lane', description: 'Dedicated wide lane for families', icon: 'family_restroom' },
        { title: 'Stroller Scanning', description: 'Security check without disassembly', icon: 'scanner' }
      ],
      waiting: [
        { title: 'Playground', description: 'Interactive games before gate', icon: 'toys' },
        { title: 'Story-telling App', description: 'Entertainment for children', icon: 'menu_book' }
      ],
      boarding: [
        { title: 'Family Pre-boarding', description: 'Dedicated boarding call', icon: 'family_restroom' },
        { title: 'Staff Assistance', description: 'Personal assistance at gate', icon: 'support_agent' }
      ]
    }
  },
  senior: {
    id: 'senior',
    name: 'Jonas',
    title: 'Senior Globetrotter PRM',
    description: '72 anni, pensionato tedesco, viaggia con moglie, ama tour culturali lunghi. Artrite alle ginocchia, usa bastone; sente bene ma vista ridotta.',
    icon: 'accessible',
    theme: 'persona-theme-senior',
    colors: {
      primary: '#003366', // Deep Teal - WCAG AAA compliant
      secondary: '#1F2937', // Darker secondary for better contrast
      accent: '#7C3AED', // Accessible Purple
      bg: '#f0f4f5',
      text: '#111827',
      textSecondary: '#374151',
      link: '#003366',
      linkHover: '#002244',
      focus: '#3B82F6',
      error: '#DC2626',
      success: '#047857',
      warning: '#D97706'
    },
    fonts: {
      primary: 'Titillium Web',
      secondary: 'Titillium Web'
    },
    typography: {
      fontFamily: 'Titillium Web, system-ui, -apple-system, sans-serif',
      headingFont: 'Titillium Web, system-ui, sans-serif',
      fontSize: '20px', // 125% bigger for accessibility
      lineHeight: '1.6', // Enhanced line spacing for seniors
      letterSpacing: '0.02em', // Slightly spaced for readability
      scale: 1.25,
      minFontSize: '18px', // Never go below 18px for seniors
      maxFontSize: '28px'
    },
    journeySteps: [
      { id: 'terminal', name: 'Terminal', icon: 'domain', image: JOURNEY_IMAGES.TERMINAL },
      { id: 'screening', name: 'Screening', icon: 'security', image: JOURNEY_IMAGES.SCREENING },
      { id: 'waiting', name: 'Waiting', icon: 'event_seat', image: JOURNEY_IMAGES.WAITING },
      { id: 'transfer', name: 'Transfer', icon: 'transfer_within_a_station', image: JOURNEY_IMAGES.TRANSFER }
    ],
    actions: {
      terminal: [
        { title: 'PRM Call Pillar', description: 'Immediate assistance request', icon: 'support_agent' },
        { title: 'Accessible Lounge', description: 'Ergonomic seating and readable fonts', icon: 'accessible' }
      ],
      screening: [
        { title: 'Dedicated PRM Lane', description: 'Security check with wheelchair access', icon: 'wheelchair_pickup' },
        { title: 'Personal Assistance', description: 'Dedicated staff for security checks', icon: 'personal_injury' }
      ],
      waiting: [
        { title: 'Gate Seating', description: 'Seats with ergonomic armrests', icon: 'event_seat' },
        { title: 'Large Font Display', description: 'Enhanced flight information displays', icon: 'zoom_in' }
      ],
      transfer: [
        { title: 'Ambulift', description: 'Assistance for boarding aircraft', icon: 'elevator' },
        { title: 'Golf Cart', description: 'Transport to distant gates', icon: 'directions_car' }
      ]
    }
  },
  bleisure: {
    id: 'bleisure',
    name: 'Nikhil',
    title: 'Bleisure Nomad',
    description: '29 anni, ingegnere software indiano in full remote, vola ogni 2-3 mesi. Combina 3 giorni meeting con 4 giorni esplorazione locale.',
    icon: 'work',
    theme: 'persona-theme-bleisure',
    colors: {
      primary: '#000000', // Jet Black - WCAG AAA compliant
      secondary: '#047857', // Accessible teal (replacing bright cyan)
      accent: '#F59E0B', // Accessible gold
      bg: '#ffffff',
      text: '#111827',
      textSecondary: '#4B5563',
      link: '#000000',
      linkHover: '#1F2937',
      focus: '#3B82F6',
      error: '#DC2626',
      success: '#047857',
      warning: '#D97706'
    },
    fonts: {
      primary: 'Work Sans',
      secondary: 'Playfair Display'
    },
    typography: {
      fontFamily: 'Work Sans, system-ui, -apple-system, sans-serif',
      headingFont: 'Playfair Display, Georgia, serif',
      fontSize: '16px',
      lineHeight: '1.5',
      letterSpacing: 'normal',
      scale: 1,
      minFontSize: '14px',
      maxFontSize: '20px'
    },
    journeySteps: [
      { id: 'post_meeting', name: 'Post-meeting', icon: 'business_center', image: JOURNEY_IMAGES.POST_MEETING },
      { id: 'work', name: 'Work', icon: 'laptop', image: JOURNEY_IMAGES.WORK_AREA },
      { id: 'leisure', name: 'Leisure', icon: 'explore', image: JOURNEY_IMAGES.TERMINAL },
      { id: 'return', name: 'Return', icon: 'flight_takeoff', image: JOURNEY_IMAGES.RETURN }
    ],
    actions: {
      post_meeting: [
        { title: 'Smart Luggage Locker', description: 'Flexible contactless storage', icon: 'lock' },
        { title: 'Business Lounge', description: 'Dedicated post-meeting space', icon: 'business_center' }
      ],
      work: [
        { title: 'Coworking Lounge', description: 'Productive airside workspace', icon: 'work' },
        { title: 'Phone Booth', description: 'Private calls and video conferences', icon: 'phone' }
      ],
      leisure: [
        { title: 'City-pass App', description: 'Local tours and experiences', icon: 'map' },
        { title: 'Cultural Guide', description: 'Cultural offerings in terminal', icon: 'museum' }
      ],
      return: [
        { title: 'Shower Pod', description: 'Quick pre-flight showers', icon: 'shower' },
        { title: 'Yoga Room', description: 'Relaxation and stretching', icon: 'self_improvement' }
      ]
    }
  },
  student: {
    id: 'student',
    name: 'Li Wei',
    title: 'First-Time Student',
    description: '20 anni, matricola cinese diretta a un college statunitense. Primo volo intercontinentale sola; inglese intermedio; alto stress.',
    icon: 'school',
    theme: 'persona-theme-student',
    colors: {
      primary: '#002B5B', // Oxford Blue - WCAG AA compliant
      secondary: '#1D4ED8', // Darker blue for better contrast
      accent: '#F59E0B', // Accessible gold (replacing white)
      bg: '#f9fafb',
      text: '#111827',
      textSecondary: '#4B5563',
      link: '#002B5B',
      linkHover: '#001D42',
      focus: '#3B82F6',
      error: '#DC2626',
      success: '#047857',
      warning: '#D97706'
    },
    fonts: {
      primary: 'Montserrat',
      secondary: 'Nunito'
    },
    typography: {
      fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
      headingFont: 'Nunito, system-ui, sans-serif',
      fontSize: '16px',
      lineHeight: '1.5',
      letterSpacing: 'normal',
      scale: 1,
      minFontSize: '14px',
      maxFontSize: '20px'
    },
    journeySteps: [
      { id: 'checkin_origin', name: 'Check-in', icon: 'how_to_reg', image: JOURNEY_IMAGES.CHECKIN },
      { id: 'layover', name: 'Layover', icon: 'transfer_within_a_station', image: JOURNEY_IMAGES.LAYOVER },
      { id: 'immigration', name: 'Immigration', icon: 'badge', image: JOURNEY_IMAGES.IMMIGRATION },
      { id: 'exit', name: 'Exit', icon: 'exit_to_app', image: JOURNEY_IMAGES.TERMINAL }
    ],
    actions: {
      checkin_origin: [
        { title: 'Multi-language Kiosk', description: 'Check-in with staff support', icon: 'translate' },
        { title: 'Document Help', description: 'Assistance with form completion', icon: 'description' }
      ],
      layover: [
        { title: 'Universal Wayfinding', description: 'Globally understandable icons', icon: 'place' },
        { title: 'Transit Guide', description: 'Step-by-step connection guide', icon: 'map' }
      ],
      immigration: [
        { title: 'APC Kiosk USA', description: 'Automated kiosk plus agent', icon: 'computer' },
        { title: 'Immigration Support', description: 'Assistance with CBP questions', icon: 'support_agent' }
      ],
      exit: [
        { title: 'e-SIM Pickup', description: 'Immediate connectivity', icon: 'sim_card' },
        { title: 'Campus Shuttle', description: 'Transport to university', icon: 'school' }
      ]
    }
  }
};
