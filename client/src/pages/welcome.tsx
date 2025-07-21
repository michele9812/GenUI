import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import MacOSDock from '@/components/ui/mac-os-dock';
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
      // Navigate after zoom animation completes
      setTimeout(() => {
        setIsZooming(false); // Reset zoom state
        setLocation('/journey-detail');
      }, 900);
    }
  };

  const defaultImage = selectedPersona.journeySteps[0]?.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';

  const handleBackToPersonaSelection = () => {
    setLocation('/');
  };

  return (
    <div 
      className="h-viewport flex flex-col"
      style={{ 
        background: `linear-gradient(135deg, ${selectedPersona.colors.primary}, ${selectedPersona.colors.secondary})`,
        fontFamily: selectedPersona.typography?.fontFamily || 'system-ui, -apple-system, sans-serif',
        fontSize: selectedPersona.typography?.fontSize || '16px',
        lineHeight: selectedPersona.typography?.lineHeight || '1.5',
        letterSpacing: selectedPersona.typography?.letterSpacing || 'normal',
        backgroundColor: selectedPersona.colors.bg,
        overflow: isZooming ? 'hidden' : 'visible'
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
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(107, 114, 128, 0.3)'
              }}
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </div>
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
          marginBottom: '24px' // 24px bottom margin
        }}
      >
        <h1 
          className="h1-responsive-small text-white"
          style={{ 
            fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit',
            fontSize: selectedPersona.typography?.scale ? `calc(32pt * ${selectedPersona.typography.scale})` : undefined,
            lineHeight: selectedPersona.typography?.lineHeight || '1.2',
            color: 'white',
            marginBottom: selectedPersona.typography?.scale && selectedPersona.typography.scale > 1.1 
              ? '24px' // More space for Senior persona
              : '8px' // Standard spacing between title and subtitle
          }}
        >
          Hello {userName || 'User'}
        </h1>
        <p 
          className="text-white/80"
          style={{
            fontSize: selectedPersona.typography?.scale ? `calc(18pt * ${selectedPersona.typography.scale})` : '18pt',
            lineHeight: selectedPersona.typography?.lineHeight || '1.4',
            fontFamily: selectedPersona.typography?.fontFamily || 'inherit'
          }}
        >
          Select your journey phase as {selectedPersona.title}
        </p>
      </div>
      {/* Central Image - Relative positioning with flex centering */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: isZooming ? 3 : 1
          }}
          transition={{ 
            duration: isZooming ? 0.9 : 0.3,
            ease: isZooming ? [0.25, 0.46, 0.45, 0.94] : "easeOut"
          }}
          className="rounded-lg overflow-hidden shadow-2xl"
          style={{
            transformOrigin: 'center center',
            zIndex: isZooming ? 9999 : 10,
            // Base responsive dimensions with proper aspect ratio
            width: screenWidth <= 640 ? 
              'calc(100vw - 32px)' : // Mobile: full width minus 16px margins
              screenWidth <= 768 ? 
                '480px' : // Tablet
                '560px', // Desktop
            height: screenWidth <= 640 ? 
              'calc((100vw - 32px) * 0.6)' : // Mobile: maintain aspect ratio
              screenWidth <= 768 ? 
                '320px' : // Tablet
                '375px', // Desktop
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: 'calc(100vh - 280px)' // Leave space for header, spacing and dock
          }}
        >
          <img
            src={currentImage || defaultImage}
            alt="Journey step preview"
            className="w-full h-full object-cover rounded-lg"
            style={{
              // Ensure image maintains quality during zoom
              imageRendering: isZooming ? 'auto' : 'crisp-edges'
            }}
          />
        </motion.div>
      </div>
      {/* Interactive Dock Navigation - Bottom section with margin */}
      <div 
        className="px-4 sm:px-6 lg:px-8 w-full"
        style={{
          marginBottom: '32px' // 32px bottom margin for dock
        }}
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
    </div>
  );
}
