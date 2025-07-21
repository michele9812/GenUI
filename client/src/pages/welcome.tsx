import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import MacOSDock from '@/components/ui/mac-os-dock';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { getPersonaBackgroundColors } from '@/lib/background-colors';
import { usePersona } from '@/hooks/use-persona';

export default function Welcome() {
  const { selectedPersona, selectStep, userName } = usePersona();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isZooming, setIsZooming] = useState(false);
  const [, setLocation] = useLocation();
  const [screenWidth, setScreenWidth] = useState<number>(0);

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
    setLocation('/');
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
          setLocation('/journey-detail');
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
    setLocation('/');
  };

  const backgroundColors = getPersonaBackgroundColors(selectedPersona);

  return (
    <BackgroundGradientAnimation
      {...backgroundColors}
      size="90%"
      blendingValue="soft-light"
      interactive={true}
      containerClassName="h-viewport"
      className="flex flex-col"
    >
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
        {/* AirBuddy Logo Square - Separate button */}
        <motion.div
          className="backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            border: '1px solid rgba(107, 114, 128, 0.3)',
            width: '48px',
            height: '48px',
            backgroundImage: "url('/attached_assets/Cheerful%20Pilot%20Character_1753110261655.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
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
          marginTop: window.innerWidth <= 320 ? '48px' : '64px', // iPhone SE: 48px, others: 64px
          marginBottom: window.innerWidth <= 320 ? '4px' : // iPhone SE: 4px
                        window.innerWidth < 768 ? '8px' : '24px', // Mobile: 8px, Desktop: 24px
          paddingBottom: window.innerWidth <= 320 ? '4px' : // iPhone SE: 4px  
                         window.innerWidth < 768 ? '8px' : '8px' // Mobile/Desktop: 8px
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
            color: 'white',
            width: '100%',
            display: 'block',
            boxSizing: 'border-box',
            marginBottom: window.innerWidth <= 320 ? '4px' : // iPhone SE: 4px
                          window.innerWidth < 768 ? '8px' : (
              selectedPersona.typography?.scale && selectedPersona.typography.scale > 1.1 
              ? '24px' // More space for Senior persona on desktop
              : '8px' // Standard spacing between title and subtitle
            )
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
            width: '100%',
            display: 'block',
            boxSizing: 'border-box'
          }}
        >
          Select your journey phase as {selectedPersona.title}
        </p>
      </div>
      {/* Central Image - Full width with responsive padding */}
      <div className="flex-1 flex items-center justify-center container-responsive-padding">
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
          <img
            src={currentImage || defaultImage}
            alt="Journey step preview"
            className="w-full h-full object-cover pointer-events-none"
            style={{
              // Ensure image maintains quality during zoom and proper border radius
              imageRendering: isZooming ? 'auto' : 'crisp-edges',
              borderRadius: isZooming ? '0' : '8px',
              // Anchor scaling to center of viewport
              transformOrigin: 'center center',
              // Add subtle brightness increase during zoom for smoother transition
              filter: isZooming ? 'brightness(1.1) contrast(0.95)' : 'none',
              transition: isZooming ? 'filter 0.3s ease-out' : 'none'
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
