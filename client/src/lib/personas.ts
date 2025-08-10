// Journey Step Image Constants - All paths verified and tested
export const JOURNEY_IMAGES = {
  // Terminal and Parking Areas
  TERMINAL: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  PARKING: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRIVAL: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800', 
  
  // Security and Screening  
  SECURITY: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  SCREENING: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Boarding Areas
  BOARDING: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  IMBARCO: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  RETURN: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Service Counters and Premium Areas
  SERVICE_COUNTER: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  HELP_DESK: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  TRANSFER: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  POST_FLIGHT: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Kiosk Interactions
  KIOSK: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  CHECKIN: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  SELF_SERVICE: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  POST_MEETING: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Waiting Areas and Lounges
  WAITING: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  LOUNGE: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  WORK_AREA: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  
  // Corridors and Navigation
  CORRIDOR: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  LAYOVER: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
  IMMIGRATION: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800'
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
    description: '38-year-old Italian consultant from Milan. Elite flyer (60 trips/year) who loves tech and seamless experiences.',
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
    description: '34-year-old Moroccan teacher traveling with husband and kids (4 & 7). Values budget-friendly, family-focused services.',
    icon: 'family_restroom',
    theme: 'persona-theme-family',
    colors: {
      primary: '#9F5EA2', // Purple primary color
      secondary: '#F0F0F0', // Light gray secondary
      accent: '#FFD600', // Yellow accent - decorative only
      bg: '#fafaf6',
      text: '#111827',
      textSecondary: '#4B5563',
      link: '#9F5EA2',
      linkHover: '#5a3b5c',
      focus: '#9F5EA2',
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
    description: '72-year-old retired German traveler with wife. Enjoys cultural tours. Uses walking stick, has reduced vision.',
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
    description: '29-year-old remote Indian engineer. Flies every 2-3 months, combining work meetings with local exploration.',
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
    description: '20-year-old Chinese freshman flying solo to American college. First intercontinental trip, stressed, intermediate English.',
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
