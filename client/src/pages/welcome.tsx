import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import MacOSDock from '@/components/ui/mac-os-dock';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { getPersonaBackgroundColors } from '@/lib/background-colors';
import { usePersona } from '@/hooks/use-persona';

interface WelcomeProps {
  onNavigate: (page: string) => void;
}

export default function Welcome({ onNavigate }: WelcomeProps) {
  const { selectedPersona, selectStep, userName } = usePersona();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isZooming, setIsZooming] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle responsive screen width
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      updateScreenWidth();
      window.addEventListener('resize', updateScreenWidth);
      return () => window.removeEventListener('resize', updateScreenWidth);
    }
  }, []);

  if (!selectedPersona) {
    onNavigate('onboarding');
    return null;
  }

  const handleStepHover = (image: string) => {
    setCurrentImage(image);
  };

  const handleStepClick = (stepId: string) => {
    const step = selectedPersona.journeySteps.find(s => s.id === stepId);
    if (step) {
      // Set the image for the zoom effect
      setCurrentImage(step.image);
      // Start zoom animation
      setIsZooming(true);
      
      selectStep(stepId);
      
      // Add white fade overlay before navigation
      setTimeout(() => {
        // Add white overlay for smooth transition
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'white';
        overlay.style.zIndex = '10000';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease-out';
        overlay.style.pointerEvents = 'none';
        document.body.appendChild(overlay);
        
        // Fade in white overlay
        requestAnimationFrame(() => {
          overlay.style.opacity = '1';
        });
        
        // Navigate after brief white fade
        setTimeout(() => {
          setIsZooming(false); // Reset zoom state
          onNavigate('journey-detail');
          // Remove overlay after navigation
          setTimeout(() => {
            if (overlay.parentNode) {
              overlay.parentNode.removeChild(overlay);
            }
          }, 100);
        }, 300);
      }, 900); // Start fade 300ms before zoom completes
    }
  };

  const defaultImage = selectedPersona.journeySteps[0]?.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';

  const handleBackToPersonaSelection = () => {
    onNavigate('onboarding');
  };

  const backgroundColors = getPersonaBackgroundColors(selectedPersona);

  return (
    <BackgroundGradientAnimation
      {...backgroundColors}
      size="90%"
      blendingValue="soft-light"
      interactive={true}
      containerClassName="h-viewport overflow-hidden"
      className="flex flex-col"
    >
      {/* Navbar - Full width with horizontal layout */}
      <div className="w-full px-2 py-2 flex items-center justify-between relative">
        {/* AirBuddy Logo Square - Separate button */}
        <motion.div
          className="backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            border: '1px solid rgba(107, 114, 128, 0.3)',
            width: '48px',
            height: '48px',
            backgroundImage: "url('https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=100&h=100')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -24, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1
          }}
          onClick={() => onNavigate('onboarding')}
        />

        {/* Back Action Button */}
        <motion.button
          onClick={handleBackToPersonaSelection}
          className="backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            border: '1px solid rgba(107, 114, 128, 0.3)'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -24, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }}
        >
          {/* Desktop Version - Icon + Text */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-3">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
            <span 
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
              style={{
                fontFamily: selectedPersona.typography?.fontFamily || 'inherit'
              }}
            >
              Back to profile selection
            </span>
          </div>

          {/* Mobile Version - Icon Only */}
          <div className="flex sm:hidden items-center justify-center p-3">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </div>
        </motion.button>
      </div>
      {/* Header Section - Full width with responsive padding */}
      <div 
        className="text-center container-responsive-padding"
        style={{
          marginTop: window.innerWidth < 768 ? '0px' : '16px', // Mobile: 0px, Desktop: 16px
          paddingTop: window.innerWidth < 768 ? '0px' : '0px', // Mobile: 0px (reduced from 2px), Desktop: 0px
          marginBottom: window.innerWidth <= 320 ? '2px' : // iPhone SE: 2px (reduced from 4px)
                        window.innerWidth < 768 ? '4px' : '8px', // Mobile: 4px (reduced from 8px), Desktop: 8px (reduced from 16px)
          paddingBottom: window.innerWidth <= 320 ? '2px' : // iPhone SE: 2px (reduced from 4px)
                         window.innerWidth < 768 ? '2px' : '4px' // Mobile: 2px (reduced from 4px), Desktop: 4px (reduced from 8px)
        }}
      >
        <h1 
          className="h1-responsive text-white w-full block"
          style={{ 
            fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit',
            transform: selectedPersona.typography?.scale && selectedPersona.typography.scale > 1.1 ? 
              `scale(${Math.min(selectedPersona.typography.scale, 1.1)})` : undefined, // Cap scale at 1.1 to prevent overflow
            transformOrigin: 'center top',
            lineHeight: selectedPersona.typography?.lineHeight || '1.2',
            color: selectedPersona.id === 'family' ? '#2E2E2E' : 'white',
            width: '100%',
            display: 'block',
            boxSizing: 'border-box',
            marginBottom: window.innerWidth <= 320 ? '2px' : // iPhone SE: 2px (reduced from 4px)
                          window.innerWidth < 768 ? '4px' : '4px' // 4px consistent spacing (reduced from 8px)
          }}
        >
          Hello {userName || 'User'}
        </h1>
        <p 
          className="text-white/80 text-responsive w-full block"
          style={{
            transform: selectedPersona.typography?.scale && selectedPersona.typography.scale > 1.1 ? 
              `scale(${Math.min(selectedPersona.typography.scale, 1.1)})` : undefined, // Cap scale at 1.1 to prevent overflow
            transformOrigin: 'center top',
            lineHeight: selectedPersona.typography?.lineHeight || '1.4',
            fontFamily: selectedPersona.typography?.fontFamily || 'inherit',
            color: selectedPersona.id === 'family' ? '#2E2E2E' : 'rgba(255, 255, 255, 0.8)',
            width: '100%',
            display: 'block',
            boxSizing: 'border-box'
          }}
        >
          Select your journey phase as {selectedPersona.title}
        </p>
      </div>
      {/* Central Image - Full width with responsive padding */}
      <div 
        className={`flex-1 flex items-center justify-center ${window.innerWidth >= 768 ? 'container-responsive-padding' : ''}`}
        style={{
          paddingLeft: window.innerWidth < 768 ? '16px' : undefined,
          paddingRight: window.innerWidth < 768 ? '16px' : undefined,
          paddingTop: '32px',
          paddingBottom: '32px'
        }}
      >
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: isZooming ? 2.5 : 1,
            // Center-anchored positioning for zoom animation
            x: isZooming ? 'calc(50vw - 50%)' : 0,
            y: isZooming ? 'calc(50vh - 50%)' : 0
          }}
          transition={{ 
            duration: isZooming ? 1.2 : 0.6,
            ease: isZooming ? [0.16, 1, 0.3, 1] : [0.25, 0.46, 0.45, 0.94]
          }}
          className="radius-responsive-small overflow-hidden shadow-2xl"
          style={{
            transformOrigin: 'center center',
            zIndex: isZooming ? 9999 : 10,
            position: isZooming ? 'fixed' : 'relative',
            top: isZooming ? 0 : 'auto',
            left: isZooming ? 0 : 'auto',
            // Base responsive dimensions with proper aspect ratio
            width: isZooming ? '95vw' : (
              screenWidth <= 640 ? 
                'calc(100vw - 32px)' : // Mobile: full width minus responsive margins
                screenWidth <= 768 ? 
                  'calc(100vw - 80px)' : // Tablet: 40px margins each side
                  'calc(100vw - 128px)' // Desktop: 64px margins each side
            ),
            height: isZooming ? '95vh' : (
              screenWidth <= 640 ? 
                'calc((100vw - 32px) * 0.6)' : // Mobile: maintain aspect ratio
                screenWidth <= 768 ? 
                  '320px' : // Tablet
                  '375px' // Desktop
            ),
            maxWidth: isZooming ? 'none' : (
              screenWidth <= 640 ? 
                'calc(100vw - 32px)' : 
                screenWidth <= 768 ? 
                  'calc(100vw - 80px)' : 
                  'calc(100vw - 128px)'
            ),
            maxHeight: isZooming ? 'none' : 'calc(100vh - 200px)' // Leave space for header and fixed dock
          }}
        >
          <motion.img
            src={currentImage || defaultImage}
            alt="Journey step preview"
            className="w-full h-full object-cover pointer-events-none"
            style={{
              // Ensure image maintains quality during zoom and proper border radius
              imageRendering: isZooming ? 'auto' : 'crisp-edges',
              borderRadius: isZooming ? '0' : '8px',
              // Anchor scaling to center of viewport
              transformOrigin: 'center center'
            }}
            animate={{
              // Progressive blur and white fade during zoom - starts at 112% (45% of animation)
              filter: isZooming ? [
                'brightness(1.1) contrast(0.95) blur(0px)',  // Start: clear image
                'brightness(1.1) contrast(0.95) blur(0px)',  // 0-45%: still clear (112% reached)
                'brightness(1.3) contrast(0.8) blur(2px)',   // 45-60%: start blur 
                'brightness(1.6) contrast(0.6) blur(6px)',   // 60-75%: more blur
                'brightness(2.2) contrast(0.3) blur(12px)',  // 75-90%: heavy blur + white
                'brightness(3.0) contrast(0.1) blur(20px)'   // 90-100%: almost white
              ] : 'brightness(1.0) contrast(1.0) blur(0px)'
            }}
            transition={{
              duration: isZooming ? 1.2 : 0.3,
              ease: isZooming ? [0.16, 1, 0.3, 1] : 'easeOut',
              times: isZooming ? [0, 0.45, 0.6, 0.75, 0.9, 1.0] : undefined
            }}
          />
        </motion.div>
      </div>
      {/* Interactive Dock Navigation - Fixed at bottom with 32px spacing */}
      <div 
        className="fixed bottom-8 left-0 right-0 z-40 container-responsive-padding"
      >
        <div className="flex justify-center w-full">
        <MacOSDock 
            apps={selectedPersona.journeySteps.map((step, idx) => ({
              id: step.id,
              name: step.name,
              icon: step.icon
            }))}
            onAppClick={(appId) => {
              handleStepClick(appId);
            }}
            onAppHover={(appId) => {
              const step = selectedPersona.journeySteps.find(s => s.id === appId);
              if (step) {
                handleStepHover(step.image);
              }
            }}
            openApps={[]}
            className="mx-auto"
            accentColor={selectedPersona.colors.primary}
            personaTypography={selectedPersona.typography}
          />
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
