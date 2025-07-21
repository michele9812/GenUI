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
      { id: 'arrival', name: 'Arrivo', icon: 'local_parking', image: '/attached_assets/Modern Airport Terminal_1753098968199.png' },
      { id: 'security', name: 'Sicurezza', icon: 'security', image: '/attached_assets/Airport Security Scene_1753098968200.png' },
      { id: 'lounge', name: 'Lounge', icon: 'airline_seat_recline_normal', image: 'https://www.lummi.ai/photo/airport-terminal-view-hdj6n' },
      { id: 'boarding', name: 'Imbarco', icon: 'flight_takeoff', image: '/attached_assets/Airport Boarding Area_1753098968199.png' },
      { id: 'post_flight', name: 'Post-volo', icon: 'flight_land', image: '/attached_assets/Airport Service Counter_1753098968198.png' }
    ],
    actions: {
      arrival: [
        { title: 'App Parcheggio', description: 'Scansione QR per apertura automatica', icon: 'qr_code_scanner' },
        { title: 'Varco Priority', description: 'Accesso veloce tramite app compagnia', icon: 'fast_forward' }
      ],
      security: [
        { title: 'e-Gate Biometrico', description: 'Passaggio con Face-ID', icon: 'face' },
        { title: 'Conferma Smartwatch', description: 'Notifica immediata OK', icon: 'watch' }
      ],
      lounge: [
        { title: 'Barista Self-Service', description: 'Ordinazione automatica bevande', icon: 'local_cafe' },
        { title: 'Prenotazione Doccia', description: 'Touch-screen e sblocco NFC', icon: 'shower' }
      ],
      boarding: [
        { title: 'Self-Scan NFC', description: 'Smartwatch al lettore gate', icon: 'nfc' },
        { title: 'Boarding Complete', description: 'Notifica live su app', icon: 'notifications' }
      ],
      post_flight: [
        { title: 'Mobile Lost & Found', description: 'Segnalazione oggetti smarriti', icon: 'search' },
        { title: 'Tracking Bagaglio', description: 'Stato ritrovamento e delivery', icon: 'luggage' }
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
      { id: 'parking', name: 'Parcheggio', icon: 'local_parking', image: '/attached_assets/Modern Airport Terminal_1753098968199.png' },
      { id: 'checkin', name: 'Check-in', icon: 'how_to_reg', image: '/attached_assets/Airport Kiosk Interaction_1753098968200.png' },
      { id: 'security', name: 'Sicurezza', icon: 'security', image: '/attached_assets/Airport Security Scene_1753098968200.png' },
      { id: 'waiting', name: 'Attesa', icon: 'schedule', image: 'https://www.lummi.ai/photo/airport-terminal-view-hdj6n' },
      { id: 'boarding', name: 'Imbarco', icon: 'flight_takeoff', image: '/attached_assets/Airport Boarding Area_1753098968199.png' }
    ],
    actions: {
      parking: [
        { title: 'Shuttle Call Point', description: 'Chiamata automatica shuttle', icon: 'airport_shuttle' },
        { title: 'Family Vehicle', description: 'Caricamento passeggino e bagagli', icon: 'luggage' }
      ],
      checkin: [
        { title: 'Counter Famiglia', description: 'Etichette bagagli colorate per membri', icon: 'color_lens' },
        { title: 'Posto Prioritario', description: 'Assegnazione cabina immediata', icon: 'airline_seat_recline_normal' }
      ],
      security: [
        { title: 'Family Lane', description: 'Corsia larga dedicata', icon: 'family_restroom' },
        { title: 'Scanning Passeggino', description: 'Controllo senza smontaggio', icon: 'scanner' }
      ],
      waiting: [
        { title: 'Playground', description: 'Giochi interattivi pre-gate', icon: 'toys' },
        { title: 'Story-telling App', description: 'Intrattenimento per bambini', icon: 'menu_book' }
      ],
      boarding: [
        { title: 'Pre-boarding Famiglie', description: 'Chiamata dedicata', icon: 'family_restroom' },
        { title: 'Accompagnamento Staff', description: 'Assistenza personale gate', icon: 'support_agent' }
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
      { id: 'terminal', name: 'Terminal', icon: 'domain', image: '/attached_assets/Modern Airport Terminal_1753098968199.png' },
      { id: 'screening', name: 'Screening', icon: 'security', image: '/attached_assets/Airport Security Scene_1753098968200.png' },
      { id: 'waiting', name: 'Attesa', icon: 'event_seat', image: 'https://www.lummi.ai/photo/airport-terminal-view-hdj6n' },
      { id: 'transfer', name: 'Transfer', icon: 'transfer_within_a_station', image: '/attached_assets/Airport Service Counter_1753098968198.png' }
    ],
    actions: {
      terminal: [
        { title: 'Call Pillar PRM', description: 'Richiesta assistenza immediata', icon: 'support_agent' },
        { title: 'Sala Amica', description: 'Sedute ergonomiche e font leggibile', icon: 'accessible' }
      ],
      screening: [
        { title: 'Corsia Dedicata PRM', description: 'Controllo con sedia mobile', icon: 'wheelchair_pickup' },
        { title: 'Assistenza Personalizzata', description: 'Staff dedicato per controlli', icon: 'personal_injury' }
      ],
      waiting: [
        { title: 'Gate Seating', description: 'Posti con braccioli ergonomici', icon: 'event_seat' },
        { title: 'Display Large Font', description: 'Informazioni volo ingrandite', icon: 'zoom_in' }
      ],
      transfer: [
        { title: 'Ambu-lift', description: 'Assistenza per salita aereo', icon: 'elevator' },
        { title: 'Golf-car', description: 'Trasporto per gate distanti', icon: 'directions_car' }
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
      { id: 'post_meeting', name: 'Post-meeting', icon: 'business_center', image: '/attached_assets/Airport Kiosk Interaction_1753098968200.png' },
      { id: 'work', name: 'Work', icon: 'laptop', image: 'https://www.lummi.ai/photo/airport-terminal-view-hdj6n' },
      { id: 'leisure', name: 'Leisure', icon: 'explore', image: '/attached_assets/Modern Airport Terminal_1753098968199.png' },
      { id: 'return', name: 'Rientro', icon: 'flight_takeoff', image: '/attached_assets/Airport Boarding Area_1753098968199.png' }
    ],
    actions: {
      post_meeting: [
        { title: 'Smart Locker Bagagli', description: 'Deposito contactless flessibile', icon: 'lock' },
        { title: 'Business Lounge', description: 'Spazio dedicato post-meeting', icon: 'business_center' }
      ],
      work: [
        { title: 'Coworking Lounge', description: 'Spazio produttivo air-side', icon: 'work' },
        { title: 'Phone-booth', description: 'Chiamate private e video call', icon: 'phone' }
      ],
      leisure: [
        { title: 'City-pass App', description: 'Tour ed esperienze locali', icon: 'map' },
        { title: 'Cultural Guide', description: 'Offerte culturali in terminal', icon: 'museum' }
      ],
      return: [
        { title: 'Shower Pod', description: 'Docce veloci pre-volo', icon: 'shower' },
        { title: 'Yoga Room', description: 'Relax e stretching', icon: 'self_improvement' }
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
      { id: 'checkin_origin', name: 'Check-in', icon: 'how_to_reg', image: '/attached_assets/Airport Kiosk Interaction_1753098968200.png' },
      { id: 'layover', name: 'Scalo', icon: 'transfer_within_a_station', image: 'https://www.lummi.ai/photo/modern-airport-corridor-epzzw' },
      { id: 'immigration', name: 'Immigrazione', icon: 'badge', image: 'https://www.lummi.ai/photo/modern-airport-corridor-epzzw' },
      { id: 'exit', name: 'Uscita', icon: 'exit_to_app', image: '/attached_assets/Modern Airport Terminal_1753098968199.png' }
    ],
    actions: {
      checkin_origin: [
        { title: 'Kiosk Multi-lang', description: 'Check-in con supporto staff', icon: 'translate' },
        { title: 'Document Help', description: 'Assistenza compilazione moduli', icon: 'description' }
      ],
      layover: [
        { title: 'Wayfinding Universale', description: 'Icone comprensibili globalmente', icon: 'place' },
        { title: 'Transit Guide', description: 'Guida passo-passo connessioni', icon: 'map' }
      ],
      immigration: [
        { title: 'APC Kiosk USA', description: 'Chiosco automatico + agente', icon: 'computer' },
        { title: 'Immigration Support', description: 'Assistenza domande CBP', icon: 'support_agent' }
      ],
      exit: [
        { title: 'Pick-up e-SIM', description: 'Connettività immediata', icon: 'sim_card' },
        { title: 'Shuttle Campus', description: 'Trasporto verso università', icon: 'school' }
      ]
    }
  }
};
