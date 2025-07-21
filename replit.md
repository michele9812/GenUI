# Airport Navigation Web App

## Overview

This is an intelligent airport navigation web application that provides personalized user experiences based on traveler personas. The app helps passengers navigate airport facilities through customized journey mapping and role-based interfaces.

## Recent Changes

**July 21, 2025:**
- **Updated journey step images with new high-quality assets**: Replaced all JOURNEY_IMAGES constants with new airport photos - Modern Airport Terminal for terminal/arrival areas, Airport Boarding Area for boarding/waiting areas, Airport Service Counter for service interactions, Airport Kiosk Interaction for check-in processes, and Airport Security Scene for security/screening areas
- **Fixed image visibility issue**: Converted image paths from direct URL references to proper import statements using @assets/ syntax to ensure images are visible and properly bundled by Vite
- **Enhanced journey step images with specialized airport photos**: Added 4 new high-quality images - Modern Airport Terminal (2) for terminal areas, Modern Baggage Claim for arrival/post-flight areas, TSA PreCheck Area for security/screening, and Airport Terminal Scene for service counters with luggage carts - all images use URL-encoded paths for proper accessibility
- **Fixed image visibility by configuring static file serving**: Added Express.js static middleware to serve attached_assets directory, resolving image loading issues by ensuring all uploaded images are properly served by the development server
- **Added final set of specialized airport images**: Integrated 5 new high-quality images - Premium lounge for VIP areas, Immigration corridor for immigration/layover steps, Person in Airport Terminal for waiting areas, Modern Service Area for premium service counters, and Modern Airport Terminal (1) for multi-level terminal navigation - all properly associated with specific journey step labels
- **Changed "Arrivo" to "Parcheggio" journey step**: Updated journey step label from "Arrivo" to "Parcheggio" with new parking terminal image (Modern Airport Terminal 2) showing external parking area with shuttle access - updated both frontend personas and backend routes for consistency
- **Updated layover/scalo image**: Associated Modern Waiting Area image with COMFORT ZONE seating to the LAYOVER journey step for better contextual accuracy during connection flights
- **Standardized H1 typography with responsive design tokens**: Implemented consistent H1 sizing using 48pt for desktop, 38pt for tablet, and 32pt for mobile with proper persona font scaling - replaced inconsistent rem-based classes with centralized CSS tokens
- **Updated journey selection subtitle**: Changed welcome page subtitle from generic persona title to "Seleziona la fase del journey come [Persona Title]" for better contextual guidance
- **Implemented comprehensive English translation**: Converted all interface text, labels, journey steps, and action descriptions from Italian to English for international accessibility
- **Applied viewport height constraints with 8px spacing multiples**: Updated all pages to use h-viewport class and standardized spacing using 16px, 24px, 32px intervals for consistent layout within single viewport height
- **Reduced onboarding H1 size**: Added h1-responsive-small class (24pt mobile, 28pt tablet, 32pt desktop) for login page to optimize space usage
- **Fixed carousel card spacing issue**: Corrected translateX calculation with proper card gap multipliers to ensure consistent spacing between center cards and outer cards
- **Optimized login panel spacing**: Reduced vertical spacing from large increments to 4px between elements, smaller icon sizes, and compact padding for better viewport fit
- **Enhanced carousel card spacing and fading**: Fixed inconsistent spacing between center and outer cards using uniform gap calculation, implemented smooth gradient fading for outer cards instead of abrupt opacity cutoff, added subtle mask gradient overlay for seamless edge transitions
- **Optimized carousel content fading**: Applied fading effects exclusively to card content while keeping navigation controls (arrows, indicators) fully visible and distinguishable with z-index 20
- **Completed English translation**: Translated all persona descriptions from Italian to English in the onboarding dropdown selection
- **Mobile viewport optimization**: Reduced carousel height to 320px on mobile (from 420px), decreased card height to 260px on mobile, reduced header spacing to top-12 on mobile for better single-viewport fit
- **Consistent H1 sizing for mobile**: Applied h1-responsive-small class to welcome page for consistent mobile typography across onboarding and journey pages
- **Code cleanup and bug fixes**: Fixed carousel control visibility by moving navigation elements outside masked container with z-index 1000, optimized performance with useCallback hooks, removed unused className prop, and fixed all syntax errors
- **Enhanced carousel navigation isolation**: Navigation controls (arrows and indicators) now completely independent from content fading effects, ensuring 100% visibility and functionality
- **Dark navy background for First-Time Student persona**: Implemented special dark navy blue (#0F172A) background exclusively for journey detail page when First-Time Student persona is selected, maintaining accessibility with high-contrast white text and gold accent colors
- **Comprehensive component styling for dark theme**: Updated all components on journey detail page including back button, titles, carousel cards, and input elements to use appropriate colors for dark navy background - inactive carousel cards use slate gray backgrounds with light gray text for optimal readability
- **Enhanced First-Time Student persona styling**: Updated text hierarchy with white H1 and paragraph text, yellow accent for user name display, yellow active pagination indicators, and replaced double card borders with single electric blue borders for better visual clarity
- **Fixed journey point selection image animation**: Simplified zoom animation with proper responsive scaling, consistent 16px viewport margins, centered positioning, and smooth transition effects across all breakpoints for full-frame appearance
- **Anchored floating input to viewport bottom**: Positioned AI prompt input box exactly 24px from bottom of viewport using absolute positioning with proper z-index layering and responsive padding
- **Enhanced persona preview card typography**: Applied persona-specific typefaces to title (headingFont) and name (fontFamily) in login preview card, updated background to use primary color at 20% opacity for better visual consistency
- **Implemented Senior Globetrotter accordion component**: Created specialized accordion interface to replace carousel for Senior persona, maintaining current content structure with expandable sections, integrated action buttons within accordion content, preserved persona-specific styling and typography guidelines
- **Optimized accordion spacing**: Reduced vertical padding to 8px (py-2) for both accordion trigger headers and content areas to create more compact layout
- **Implemented contextual journey actions**: Created dynamic action system that shows step-specific actions (parking info, check-in services, security guidelines, gate information, transfer assistance, baggage claim) plus universal services (security assistance, restrooms) based on current journey point for all personas
- **Enhanced with detailed persona-specific actions**: Integrated comprehensive contextual actions for each persona including Tech-Savvy (biometric gates, NFC boarding, smartwatch integration), Family Planner (family lanes, playground access, pre-boarding), Senior PRM (call pillars, ergonomic seating, ambu-lift), Bleisure Nomad (smart lockers, coworking spaces, city-pass activation), and First-Time Student (multilingual kiosks, wayfinding, translation services)
- **Maintained carousel card dimensions**: Fixed height of 320px for all carousel cards as per original specifications
- **Fixed journey detail page spacing**: Restored proper vertical spacing between elements across all breakpoints to prevent overlapping
- **Standardized H1 text sizing**: Unified H1 font size across all pages (1.75rem base) with consistent persona scaling for viewport optimization
- **Enhanced welcome page spacing for Senior persona**: Applied responsive spacing that accounts for 125% text scaling - increased header top position, adjusted central image positioning, and optimized dock bottom spacing to prevent element overlapping across all breakpoints
- **Fixed contextual actions to be persona and journey-step specific**: Updated journey-detail page to properly map persona IDs to their actual journey step IDs, ensuring each persona shows only relevant actions for their current step plus universal services like security assistance and restrooms
- **Implemented Family Planner tabs component**: Created FamilyTabs component using Radix UI tabs to replace carousel for Family Planner persona, featuring icons next to tab names, persona-specific styling, and action buttons positioned after descriptions as requested
- **Ensured contextual actions are step-specific only**: Verified that all personas show only actions relevant to their current journey step plus universal services (security assistance and accessible restrooms) - no duplicate or irrelevant actions across different journey points
- **Updated contextual actions to match detailed specifications**: Completely rewritten all persona journey actions to precisely match the provided detailed document, ensuring each persona shows only the specific actions outlined for their journey points with correct descriptions and functionality
- **Added journey phase indicator with consistent typography**: Added "You are in [touchpoint] phase" text component using persona-specific typography with maximum 18pt font size across all breakpoints for optimal readability
- **Fixed contextual actions loading issue**: Resolved currentStep being null by properly mapping step ID to step object, enabling correct loading of persona-specific contextual actions based on journey point
- **Standardized header positioning between welcome and journey detail pages**: Made header div positioning consistent with absolute positioning, proper top spacing, and guaranteed 16px spacing between header content and components below for visual coherence
- **Updated login page with cheerful pilot character**: Replaced generic airplane icon with custom cheerful pilot character image for better brand personality and visual appeal
- **Standardized component spacing across all pages**: Ensured minimum 16px spacing between all components, increased login form spacing to 24px/32px, journey detail page padding to prevent overlaps, and welcome page margins for better visual hierarchy
- **Optimized macro-component spacing**: Corrected spacing between major page sections to maintain 16px minimum - header-to-content, content-to-footer, form sections, and navigation elements now properly spaced
- **Implemented consistent 16px vertical spacing**: Standardized spacing between all div elements with 16px minimum - header sections now use pb-[16px], adjusted image positioning to ensure 16px gap from header content, increased main content paddingTop to 180px for proper carousel/accordion spacing
- **Unified bottom anchor spacing to 32px**: Both dock navigation and floating input bar now consistently positioned at 32px from bottom across all pages and personas for coherent layout anchoring
- **Fixed image positioning with calculated spacing**: Replaced percentage-based image positioning with calc() values to ensure exactly 16px spacing from header container, preventing overlay issues across all screen sizes and personas
- **Standardized header positioning to 80px**: Unified header top position to 80px across all breakpoints and personas in welcome page to match journey detail page, simplifying layout consistency and removing responsive complexity
- **Converted to relative positioning layout**: Transformed both welcome and journey detail pages from absolute positioning to flex layout with relative positioning, implementing 64px top margin and 24px bottom margin for header sections, 32px bottom margin for dock/input elements
- **Fixed tab/accordion spacing overlap**: Added 16px padding-top to main content section to prevent Family Planner tabs and Senior Globetrotter accordion from overlapping with header text, ensuring minimum 16px vertical spacing between header and interactive components
- **Updated main content padding**: Removed top padding from main content, implemented 64px lateral padding for better content centering and accordion container optimization
- **Optimized accordion spacing**: Reduced vertical spacing between accordion items to 16px for better visual density in Senior Globetrotter persona
- **Reduced accordion internal spacing**: Updated internal accordion padding to 8px (py-1) for header and content sections, reduced description margin to 8px for consistent micro-spacing
- **Implemented horizontal accordion layout**: Created responsive flexbox structure with text content and action button in horizontal autolayout, button has max-width 320px on desktop and full width on mobile breakpoints
- **Updated accordion color scheme**: Changed to use primary color for icons and buttons, implemented 10% opacity primary color backgrounds for accordion containers and 5% for content areas
- **Updated accordion to primary colors scheme**: Background uses neutral white, while text, icons and buttons use primary accent color for clean visual hierarchy
- **Refined accordion icon styling**: Icon background uses 10% opacity primary color, icon itself uses 40% opacity primary color for subtle contrast
- **Added accordion separator line**: Grey separator line (40% opacity) between header and content when accordion is expanded for visual division
- **Optimized accordion flexbox layout**: All divs now fit height with h-full, reduced spacing between title elements to 2px for compact design
- **Code cleanup and design consistency**: Standardized spacing (8px/16px system), consistent rounded-lg radius, proper gap usage, simplified structure, optimized typography scaling for persona consistency
- **Enhanced back button with AirBuddy branding**: Redesigned back button with square AirBuddy logo, responsive design - desktop shows logo + arrow + text, mobile shows compact logo with impressed arrow overlay, consistent 12px radius and grey 30% opacity elements
- **Removed carousel vertical padding**: Eliminated padding top and bottom from carousel container div for cleaner layout integration without spacing conflicts
- **Separated AirBuddy logo and action buttons**: Split back button into separate logo square and action button components, mobile version shows icon-only action button without text
- **Reduced carousel height by 64px**: Updated carousel heights to h-[256px] sm:h-[356px] md:h-[396px] lg:h-[416px] for more compact layout
- **Optimized header section spacing**: Reduced header bottom margin from 24px to 16px on both welcome and journey detail pages for tighter component integration
- **Refined responsive typography scaling**: Updated CSS tokens with optimized breakpoint scaling - mobile 20pt/28pt, tablet 24pt/34pt, desktop 28pt/42pt for H1, plus new text-responsive class (14pt/16pt/18pt) for paragraphs, replaced inline font-size with CSS transform scale for persona-specific adjustments
- **Implemented full-width responsive containers**: Added container-responsive-padding CSS class with systematic margins (16px mobile, 40px tablet, 64px desktop), updated all div containers to use full width with proper responsive spacing, removed icon overlay backgrounds from back buttons
- **Transformed Family tabs to horizontal flexbox with expandable labels**: Converted Family Planner tabs from grid layout to horizontal flexbox with icon-only buttons that expand to show labels on click, added smooth animations and persona-specific styling
- **Created mobile-optimized floating input variant**: Implemented responsive design with 56px max height mobile version featuring horizontal flexbox layout - attachment icon (left), placeholder text input (center), microphone/send button (right) - all centered vertically with proper spacing and persona typography support
- **Updated Family tabs to full-width with active label display**: Modified tab buttons to use flex-1 for equal width distribution across container, active tab always shows label while inactive tabs show only icons, automatic expansion of active tab with smooth animations
- **Implemented responsive tab label behavior**: Desktop/tablet (≥768px) always show all tab labels, mobile (<768px) shows only active tab label with smooth expand/collapse animations, maintains full-width distribution across all breakpoints
- **Updated tabs to hug content layout**: Changed from flex-1 equal distribution to content-hugging tabs that adjust width based on icon+label content, centered alignment with justify-center for better visual balance, increased horizontal padding for better touch targets
- **Implemented mobile-optimized spacing across all components**: Reduced padding/margins on mobile - Family tabs (mb-4, py-1.5, px-2), Senior accordion (gap-2, px-3, py-1.5), tab panels (p-3, gap-2, mb-3), action buttons (py-2.5), accordion triggers (py-2), removed background overlays from back buttons for consistency with mobile clean design
- **Updated AirBuddy logo with cheerful pilot character**: Replaced generic airplane SVG with custom pilot character image in both welcome and journey detail pages, implemented as background image with 80% size and center positioning for better integration with persona-colored backgrounds
- **Reduced mobile header bottom margin**: Decreased header section bottom margin from 16px to 8px on mobile devices (<768px) for tighter spacing and better viewport optimization
- **Updated logo to full-frame design**: Modified motion div logo components to match back button styling (48x48px, white background, rounded-lg borders) with new pilot character image using backgroundSize 'cover' for full-frame appearance without padding/margins, applied overflow-hidden for clean edges
- **Implemented mobile-responsive accordion sizing**: Added comprehensive mobile scaling for Senior accordion - reduced padding/margins (px-2 py-1 on mobile), smaller icon containers (w-6 h-6 mobile), responsive text sizing (text-xs mobile to text-base desktop), button scaling (py-2 px-4 mobile), and proper 125% persona scale integration for Senior accessibility preferences
- **Added responsive lateral padding to accordion**: Implemented px-4 (16px) mobile, px-6 (24px) tablet, px-8 (32px) desktop horizontal padding for Senior accordion trigger and content areas with py-2 (8px) vertical padding for content expansion
- **Standardized accordion padding across components**: Applied consistent py-2 (8px) vertical padding to all accordion content areas including Family tabs for uniform spacing hierarchy
- **Reduced header div padding/margin on mobile**: Added paddingBottom 8px on mobile (<768px) to header/title sections in both welcome and journey-detail pages for optimized mobile spacing
- **Enhanced Family tabs full-width layout**: Updated tabs container to use full width distribution with flex: '1' for desktop (equal width) and dynamic flex behavior on mobile where active tab hugs content (flex: 'auto') for optimal readability while inactive tabs distribute remaining space (flex: '1'), removed justify-center for proper full-width utilization
- **Fixed mobile carousel layout**: Restored fixed height (256px) and full width for mobile carousel container to ensure proper visibility and layout consistency across all breakpoints
- **Mobile button height optimization**: Applied max-h-[56px] to all buttons in cards, tabs, and accordions on mobile to accommodate 150% text scaling while maintaining usability within viewport constraints
- **Fixed mobile carousel container overflow**: Removed mask gradient and overflow hidden on mobile to prevent card content clipping, applied reduced 16px padding and visible overflow for complete card visibility
- **Optimized header and component spacing**: Reduced all header/title container spacing to 8px mobile and 32px desktop, updated all component margins (Family tabs, Senior accordion) from 16px to 8px mobile spacing for tighter layout hierarchy
- **Mobile carousel full viewport height**: Implemented dynamic height calculation (100vh - 200px) for mobile carousel container with min/max constraints (300px-500px), ensuring centered positioning and optimal use of available viewport space while maintaining desktop fixed heights
- **Reduced accordion vertical spacing**: Decreased accordion trigger padding to py-1 md:py-2 and standardized gap to 16px (gap-4) for more compact layout while maintaining readability
- **Fixed accordion horizontal alignment**: Updated Senior accordion to use md:items-center for proper horizontal alignment between text content and action buttons on desktop, maintaining vertical stacking on mobile
- **Mobile carousel full viewport optimization**: Updated mobile carousel to use calc(100vh - 120px) height with 24px top padding for proper viewport alignment, removed height constraints to enable full fill behavior, positioned content 24px from top edge
- **Added mobile carousel max height constraint**: Set maxHeight to 500px on mobile to prevent excessive stretching while maintaining responsive fill behavior
- **Ensured full width text containers**: Added w-full class to all title and paragraph elements in welcome page to ensure text containers fill their parent containers on mobile instead of hugging content
- **Reduced accordion gap to 16px on mobile**: Updated Senior accordion component to use 16px gap on mobile screens (<768px) while maintaining 24px gap on desktop for optimal spacing hierarchy
- **Reduced header/title margins to 8px on mobile**: Updated all heading and paragraph elements in header sections to use 8px bottom margin on mobile (<768px) for compact spacing while maintaining larger margins on desktop for Senior persona accessibility
- **Set fixed carousel height to 400px on mobile**: Simplified mobile carousel container from dynamic viewport calculation to fixed 400px height for consistent layout and better space control
- **Reduced accordion button padding to 0px on mobile**: Updated accordion trigger button vertical padding from py-1 (4px) to py-0 (0px) on mobile while maintaining py-2 (8px) on desktop for tighter spacing
- **Optimized header container spacing desktop**: Reduced desktop header container margins from 32px to 24px and padding from 32px to 8px while maintaining 8px mobile values for consistent compact design across all breakpoints
- **Enhanced image zoom animation with viewport centering**: Updated image zoom animation to anchor scaling transformation to viewport center using fixed positioning and translate(-50%, -50%) for consistent behavior across all breakpoints, ensuring image scales from and to viewport center regardless of screen size
- **Restored accordion button padding to 4px mobile**: Changed accordion trigger button vertical padding back from py-0 to py-1 (4px) on mobile for better usability while maintaining py-2 (8px) on desktop
- **Reduced accordion gap to 12px mobile**: Updated Senior accordion component gap from 16px to 12px on mobile screens for tighter spacing while maintaining 24px gap on desktop
- **Reduced header-to-content spacing to 12px mobile**: Updated margin between header/title container and accordion content from default spacing to 12px on mobile for more compact layout
- **Increased carousel height to 450px desktop**: Updated carousel container height from responsive heights (356px/396px/416px) to uniform 450px across all desktop breakpoints (sm/md/lg) for more spacious layout while maintaining 400px mobile height
- **Enhanced image scaling with center-anchored transformation**: Updated image animation to use transformOrigin 'center center' on both container and img elements, explicit scale(1) transform, and proper center anchoring for consistent scaling behavior across all breakpoints during zoom animation
- **Reduced Family tabs vertical spacing to 24px desktop**: Updated tab panel internal spacing from 32px (mb-8) to 24px (mb-6) on desktop for header and description margins while maintaining 8px mobile spacing for tighter layout
- **Aligned carousel content to top with 16px padding desktop**: Updated carousel container and cards container to use flex-start alignment instead of center on desktop, added 16px top padding for proper spacing from container top edge while maintaining center alignment on mobile
- **Maintained accordion gap at 12px mobile, increased desktop to 24px**: Updated Senior accordion gap from gap-4 (16px) to gap-6 (24px) on desktop while keeping gap-3 (12px) on mobile for optimal spacing hierarchy across breakpoints
- **Prevented carousel content clipping**: Removed overflow hidden and gradient masks to ensure complete content visibility, adjusted container height to account for top padding (calc(100% - 16px) desktop) while maintaining visible overflow for full card display
- **Increased carousel lateral padding to 80px desktop**: Fixed card clipping issue by setting fixed 80px left/right padding on desktop instead of dynamic containerPadding, ensuring sufficient space for all carousel cards including outer positioned cards
- **Reduced carousel indicators spacing to cards**: Updated bottom positioning of carousel indicators from fixed 16px (bottom-4) to responsive 16px mobile and 32px desktop for optimal spacing between cards and navigation controls
- **Increased carousel top padding to prevent content clipping**: Enhanced top padding from 16px to 32px desktop and 0px to 16px mobile, adjusted container heights accordingly (calc(100% - 48px) desktop, calc(100% - 40px) mobile) and outer container top padding to ensure complete content visibility
- **Standardized mobile carousel constraints**: Fixed mobile version to max 400px height with consistent 16px top padding across all breakpoints, simplified height calculation to calc(100% - 16px) for uniform spacing and proper content alignment
- **Reduced mobile carousel to 320px with optimized card sizing**: Updated mobile container to max 320px height with 16px top padding, reduced mobile card height from 260px to 220px for better proportions and complete visibility within the compact container
- **Added h-fit to all accordion text containers**: Applied h-fit class to text container divs in Senior accordion and Family tabs to ensure proper content hugging behavior on mobile, preventing unnecessary height expansion and improving layout consistency
- **Applied h-fit to all accordion container divs**: Added h-fit class to all nested div containers including padding containers, flexbox containers, text containers, and button containers in both Senior accordion and Family tabs for comprehensive content-hugging behavior
- **Removed mobile margins from accordion paragraphs**: Set all paragraph margins to mb-0 on mobile (<640px) in both Senior accordion and Family tabs while maintaining desktop margins (md:mb-0, md:mb-1, md:mb-6) for ultra-compact mobile spacing
- **Added minimum 16px vertical gaps in Family tab panels**: Updated mobile tab panel spacing from mb-2/mb-0 to mb-4 for header and description sections, ensuring consistent 16px minimum vertical spacing between elements while maintaining larger desktop gaps (md:mb-6)
- **Fixed image zoom animation conflicts**: Removed conflicting scale transforms between Framer Motion animate and inline transform styles, simplified to use only positioning transforms (translate) while maintaining center anchoring for smooth zoom behavior
- **Aligned carousel content to center with reduced gap**: Updated carousel container and cards container to use center alignment on both mobile and desktop, reduced gap between cards and controls to 32px desktop/16px mobile, set container dimensions to 450px desktop/360px mobile for optimized spacing
- **Enhanced image scaling with center-anchored transformation**: Updated image animation to use viewport units (50vh, 50vw) for positioning and scale animation through Framer Motion, ensuring consistent scaling behavior from viewport center across all breakpoints during zoom animation
- **Responsive carousel sizing for iPhone XR+**: Added conditional sizing for devices larger than iPhone XR (414px) - container height 400px instead of 360px, card minimum width 260px and fixed height 320px for optimal proportions on larger mobile devices
- **Fixed image zoom animation behavior**: Replaced conflicting CSS transforms with Framer Motion animate properties (scale, x, y) to ensure smooth center-anchored zoom animation, removed inline transform conflicts that prevented proper animation behavior
- **Unified iPhone XR+ carousel dimensions**: Applied consistent sizing logic for all devices from iPhone XR (414px) to iPhone 16 - all use 260px min width, 280px center width, 320px height, and 400px container height for uniform experience across modern iPhones
- **Disabled image click interaction**: Removed click handler and cursor pointer from animated image, added pointer-events-none to ensure only dock buttons can trigger zoom animation, maintaining proper interaction flow
- **Device-specific carousel dimensions**: Implemented granular sizing for iPhone SE (current 140/180px, 220px height), iPhone XR (240/260px width, 280px height, 380px container), and iPhone 16+ (260/280px width, 320px height, 400px container) for optimized experience per device type
- **Enhanced image zoom animation with viewport centering**: Updated image zoom animation to anchor scaling transformation to viewport center using calc(50vw - 50%) and calc(50vh - 50%) for consistent behavior across all breakpoints, ensuring image scales from and to viewport center regardless of screen size
- **Mobile carousel controls horizontal layout**: Restructured mobile carousel navigation to use horizontal flexbox with pagination dots aligned left and arrow controls aligned right, while maintaining desktop side-positioned arrows and centered indicators for optimal mobile usability
- **Fluidified zoom animation and page transition**: Enhanced zoom animation duration to 1.2s with smooth easing curve [0.16, 1, 0.3, 1], increased navigation delay to 1200ms, and added fluid entrance animations to journey-detail page with staggered motion effects for seamless transition across all breakpoints
- **Updated journey phase paragraph styling**: Set fixed 18pt font size for journey phase indicator paragraph across all breakpoints (mobile and desktop), removed quotation marks from touchpoint names for cleaner presentation
- **Synchronized white fade transition**: Added white overlay fade during final 300ms of zoom animation to smooth transition between welcome and journey-detail pages, with subtle brightness increase on image during zoom for enhanced visual flow
- **Fixed AirBuddy subtitle responsive sizing**: Updated "I am your AirBuddy and I am here to assist you!" paragraph to use 16pt on mobile and 18pt on desktop, removing text-responsive class and implementing custom responsive fontSize logic
- **Unified header typography with responsive scaling**: Updated journey phase paragraph to use 16pt mobile/18pt desktop and restored H1 elements to use h1-responsive class across welcome and journey-detail pages for consistent sizing hierarchy
- **Standardized journey phase text to 18px**: Updated "You are in [touchpoint] phase" paragraph to use fixed 18px font size across all breakpoints with font-thin weight for consistent typography
- **Optimized carousel container sizing**: Reduced desktop carousel height from 450px to 418px (-32px) and decreased mobile lateral padding from 16px to 8px to prevent content clipping while maintaining proper card visibility
- **Standardized mobile carousel gap**: Ensured consistent 24px vertical gap between carousel cards and navigation controls on mobile across all breakpoints, with responsive container height adjustment (calc(100% - 72px) mobile vs calc(100% - 48px) desktop)
- **Unified mobile carousel height**: Set consistent 400px height for all mobile devices (iPhone SE, XR, 16+) instead of device-specific heights, maintaining 418px for desktop for better layout consistency
- **Increased mobile carousel to 480px with iPhone 16+ configuration**: Enhanced mobile carousel height to 480px and simplified all mobile devices to use iPhone 16+ configuration (260/280px width, 320px card height, 16px spacing) eliminating device-specific variables for consistency
- **Corrected iPhone SE carousel proportions**: Fixed iPhone SE sizing to use much smaller card dimensions (120/140px width, 180px height, 360px container) to maintain proper proportions within the compact container space
- **Reduced iPhone SE container to 320px**: Further optimized iPhone SE layout by reducing container height from 360px to 320px for better viewport utilization on smallest mobile devices
- **Updated iPhone SE card height to 240px**: Fixed card height from 160px to 240px (max 320px container) for iPhone SE devices (≤375px width), maintaining ultra-compact 100/120px width and 10px spacing for optimal viewport utilization
- **Added onboarding step before persona selection**: Created new intermediate onboarding page with welcome content and AirBuddy introduction, maintaining exact structure and dimensions of login page but replacing form with placeholder text and "Continue" button that leads to persona selection
- **Increased iPhone SE card width to 240px minimum**: Updated iPhone SE card dimensions from 100/120px width to 200/240px width (240px minimum override) while maintaining 240px height and 320px container for better content visibility and usability
- **Unified onboarding design consistency**: Combined best elements from both onboarding pages - using Card component and layout from login page (second step), cheerful pilot icon from first page, gradient background inspired by logo colors (blue to purple), and neutral button styling matching login page design for consistent user experience
- **Applied consistent gradient background**: Extended blue-to-purple gradient background from first onboarding step to login page (second step) for complete visual coherence across both onboarding phases
- **Unified button styling across onboarding steps**: Applied same blue-indigo gradient button styling (`from-blue-600 to-indigo-600`) to both "Continue" and "Start the journey" buttons for consistent interaction design
- **Fixed card dimensions consistency**: Applied uniform `min-h-[480px]` height constraint and flexbox layout to both onboarding steps ensuring identical card dimensions regardless of content length
- **Aligned onboarding structure with login page**: Removed motion animations and restructured onboarding page to match exact layout pattern of login page - same header structure, same content positioning, same button placement at bottom, ensuring no visual jumps between steps
- **Simplified onboarding content**: Removed preview card section from first step to streamline user experience and focus on essential welcome message before persona selection
- **Standardized 24px vertical spacing**: Applied consistent `space-y-6` (24px) gaps between all major elements in both onboarding steps - header sections, content areas, form fields, and preview cards for uniform visual hierarchy
- **Enhanced persona preview card with icon and typography**: Added persona icon in circular container and applied persona-specific typefaces (headingFont for title, fontFamily for description) with proper font scaling to preview card for consistent persona representation
- **Fixed button spacing consistency**: Applied uniform 24px gap (`mt-6`) between content and button in both onboarding steps using flexbox layout with `flex-1` content area and separate button container for precise spacing control
- **Standardized image container dimensions**: Updated pilot character container to 56px dimensions (`w-14 h-14`) with 24px border radius (`rounded-3xl`) in both onboarding steps for consistent visual design
- **Implemented intelligent gap management**: Created three-zone layout with fixed header area (`flex-shrink-0`), flexible content area (`flex-1` with centered content), and fixed button area (`flex-shrink-0`) ensuring consistent positioning across both onboarding steps and all breakpoints
- **Enhanced persona preview card with Lucide icons**: Replaced emoji icons with professional Lucide React icons (Laptop, Users, Heart, Globe, GraduationCap) and applied persona primary color as background (20% opacity) and icon color for cohesive visual design
- **Implemented responsive card heights and fixed button positioning**: Added breakpoint-specific min-heights (400px-520px onboarding, 480px-620px login) and used `mt-auto pt-6` for button positioning to ensure consistent placement regardless of content changes or persona selection
- **Enhanced icon system with Material Design fallbacks**: Added Google Material Design icons (MdComputer, MdFamilyRestroom, MdAccessible, MdTravelExplore, MdSchool) as fallbacks to ensure all personas display professional icons, removing text-based fallbacks completely
- **Unified card heights across onboarding steps**: Standardized both onboarding cards to identical min-heights (480px mobile, 520px small, 580px medium, 620px large) calculated from login step with expanded persona preview to ensure consistent card dimensions regardless of content state
- **Fixed preview container height with responsive scaling**: Implemented fixed min-heights for persona preview container (100px-130px across breakpoints) based on Senior PRM worst-case scenario with 125% font scaling, reduced overall card heights accordingly (460px-570px) to optimize space utilization
- **Anchored button to card bottom with 24px spacing**: Updated CardContent padding from `pb-8` to `pb-6` (24px) and removed `pt-6` from button container, ensuring button is exactly 24px from card bottom edge in both onboarding steps for precise positioning
- **Separated navigation buttons design**: Split AirBuddy logo and back action into separate buttons - logo as standalone square (10x10), back button with icon+text on desktop and icon-only on mobile with responsive design and staggered animations
- **Reduced carousel height by 64px**: Decreased carousel container height across all breakpoints (256px mobile, 356px tablet, 396px medium, 416px desktop) for optimized viewport space utilization
- **Maintained carousel card dimensions**: Fixed height of 320px for all carousel cards as per original specifications
- **Fixed journey detail page spacing**: Restored proper vertical spacing between elements across all breakpoints to prevent overlapping
- **Standardized H1 text sizing**: Unified H1 font size across all pages (1.75rem base) with consistent persona scaling for viewport optimization
- **Consistent border radius**: Standardized all border radius values to `rounded-lg` (0.5rem/8px) across carousel cards, navigation buttons, input fields, and UI components for visual consistency
- **Mobile viewport optimization**: Increased top/bottom margins for mobile devices (100px top, 60px bottom) while maintaining centered content layout for better visual balance
- **Fixed carousel card radius consistency**: Updated carousel card content container from `rounded-2xl` to `rounded-lg` to match site-wide border radius standard
- **Code cleanup and consistency**: Removed borders from carousel icon containers, cleaned up unnecessary comments, standardized image border radius, and optimized CSS classes
- **Enhanced dock navigation**: Added hover labels to dock icons showing clear journey detail titles with persona-specific typography
- **Centered image positioning**: Anchored journey point selection image to the center of the viewport for better visual balance
- **Increased carousel spacing**: Enhanced spacing between carousel elements to 32px desktop, 24px tablet, 16px mobile for better visual separation
- **Updated all journey step images**: Replaced images with high-quality local airport photos that precisely match each journey point - service counters, boarding areas, terminal arrivals, kiosk interactions, and security scenes for better contextual accuracy
- **Personalized page titles**: Changed journey selection header from generic "Seleziona il punto del journey" to display the specific persona title (e.g., "Family Planner", "Tech-Savvy", "Senior PRM")
- **Updated boarding images**: Replaced all boarding area images with higher quality updated boarding gate photo showing numbered gate areas and seating
- **Created image constants**: Organized all journey step images into centralized JOURNEY_IMAGES constants mapped to specific dock button labels for better maintainability
- **Updated Post-volo image**: Associated the arrivals terminal image showing "Arrival" signage with the "Post-volo" journey step for better contextual accuracy
- **Modified zoom animation**: Reduced animation speed to 900ms and limited maximum scale to 3x to ensure image fits within viewport
- **Updated ARRIVAL image constant**: Set ARRIVAL constant to use the correct arrivals terminal image path
- Disabled interactions for inactive carousel cards (only center card is clickable and hoverable)
- Updated persona selection page to use neutral styling (gray colors) except for the persona preview card
- Enhanced journey pages (welcome and detail) to use full persona-specific theming including colors, typography, and gradients
- Applied persona-specific styling to buttons and navigation elements throughout journey flow
- Implemented advanced persona logic with complete typography customization:
  * Tech-Savvy: Manrope/Lora fonts, Midnight Navy/Electric Blue/Vivid Gold colors
  * Family Planner: Roboto/Roboto Serif fonts, Charcoal/Fresh Lime/Sunset Orange colors
  * Senior PRM: Titillium Web font with 125% text scaling for accessibility, Deep Teal/Soft Ivory/Royal Violet colors
  * Bleisure Nomad: Work Sans/Playfair Display fonts, Jet Black/Sky Cyan/Sunshine colors
  * First-Time Student: Montserrat/Nunito fonts, Oxford Blue/Lantern Yellow/Arctic White colors
- Synchronized user name display throughout journey (uses input name from login instead of hardcoded persona names)
- **Completed full persona synchronization** across all interactive elements:
  * MacOSDock component now uses persona accent colors for dock icons
  * Carousel3D component synchronized with persona colors for action buttons, navigation arrows, and pagination indicators
  * PromptInputBox component applies persona colors to send button and typography to input field
  * Fixed console errors "Dock is not defined" and undefined fontFamily properties
  * All interactive states (hover, active, disabled) now reflect persona-specific color schemes
- **Enhanced WCAG 2.1 AA/AAA accessibility compliance:**
  * Created comprehensive accessibility utilities library with contrast ratio validation
  * Implemented automatic accessibility validation for all personas with console warnings
  * Updated all persona colors to meet WCAG AA contrast requirements (4.5:1 minimum)
  * Enhanced typography with proper line-height (1.5+), letter-spacing, and minimum font sizes
  * Added focus ring management and screen reader support (aria-labels)
  * Senior persona optimized with 125% font scaling and enhanced contrast for reduced vision
  * Family persona updated with accessible green colors instead of bright lime
  * All personas now include fallback system fonts for better compatibility
  * CSS custom properties applied for consistent theming across all components
- **Complete card theming with accessibility compliance:**
  * Enhanced Card component with persona-specific backgrounds, borders, and text colors
  * Active cards use primary colors for backgrounds and borders with white text for optimal contrast
  * Inactive cards maintain neutral styling to focus attention on active elements
  * All card interactions respect WCAG AA color contrast requirements (4.5:1 minimum)
  * Carousel3D component fully synchronized with persona colors for headers, icons, and content
  * Added proper border styling and hover states with persona accent colors

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side navigation
- **UI Library**: Radix UI primitives with custom styled components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion for transitions and interactive elements
- **State Management**: React Context API with custom hooks
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints
- **Development Server**: Vite for hot module replacement and development tooling
- **Session Management**: Express sessions with PostgreSQL storage

### Component Structure
- **Design System**: shadcn/ui components with "new-york" style
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Interactive Components**: Custom dock navigation, expandable media components
- **Form Handling**: React Hook Form with Zod validation

## Key Components

### Persona System
- **Five distinct personas**: Tech-Savvy, Family Planner, Senior PRM, Bleisure Nomad, First-Time Student
- **Dynamic theming**: Each persona has custom colors, fonts, and UI adaptations
- **Journey mapping**: Persona-specific navigation steps and touchpoints
- **Behavioral profiling**: Customized experiences based on traveler type

### Navigation Flow
1. **Login/Selection**: Persona selection with preview cards
2. **Welcome Screen**: Personalized greeting with journey overview
3. **Interactive Dock**: Bottom-anchored navigation with hover effects
4. **Journey Details**: Step-specific actions and information
5. **Responsive Design**: Adaptive layouts for desktop and mobile

### UI Components
- **Dock Navigation**: Magnifying dock with smooth animations
- **Scroll Expand Media**: Full-screen media transitions
- **Themed Cards**: Persona-specific styling and layouts
- **Interactive Buttons**: Material Design influence with custom animations

## Data Flow

### Client-Side State
- **Persona Context**: Global state for selected persona and current journey step
- **Theme Management**: Dynamic CSS variable updates based on persona
- **Navigation State**: Current page and journey progress tracking

### Server-Side Data
- **Static Personas**: Predefined persona configurations with journey steps
- **Journey Steps**: Step-specific actions, icons, and images
- **API Endpoints**: RESTful routes for persona and journey data

### Data Schema
- **Users**: Basic authentication (username/password)
- **Personas**: Core persona data (name, title, description, theme)
- **Journey Steps**: Navigation points with ordering and metadata
- **Actions**: Step-specific available actions and descriptions

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18 with hooks, React Router alternative (Wouter)
- **UI Framework**: Radix UI primitives for accessibility
- **Animation**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build Tool**: Vite for fast development and optimized builds
- **TypeScript**: Full type safety across frontend and backend
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Validation**: Zod for runtime type checking

### Database Integration
- **PostgreSQL**: Primary database with Neon serverless hosting
- **Drizzle Kit**: Database migrations and schema management
- **Connection**: Neon serverless driver for edge compatibility

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles Express server to `dist/index.js`
- **Assets**: Static assets served from build directory

### Environment Configuration
- **Development**: Local development with Vite dev server and hot reload
- **Production**: Express serves static files and API routes
- **Database**: Environment variable configuration for PostgreSQL connection

### Platform Integration
- **Replit**: Native support with cartographer plugin for development
- **Error Handling**: Runtime error overlay for development debugging
- **Session Storage**: PostgreSQL-backed sessions for user state persistence

### Scaling Considerations
- **Database**: Serverless PostgreSQL for automatic scaling
- **Static Assets**: CDN-ready build output structure
- **API Design**: RESTful endpoints designed for caching and optimization