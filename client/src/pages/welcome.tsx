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
          marginTop: '64px', // 64px top margin
          marginBottom: window.innerWidth < 768 ? '8px' : '24px', // 8px mobile, 24px desktop
          paddingBottom: window.innerWidth < 768 ? '8px' : '8px' // 8px mobile, 8px desktop
        }}
      >
        <h1 
          className="h1-responsive-small text-white w-full"
          style={{ 
            fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit',
            transform: selectedPersona.typography?.scale ? `scale(${selectedPersona.typography.scale})` : undefined,
            lineHeight: selectedPersona.typography?.lineHeight || '1.2',
            color: 'white',
            marginBottom: window.innerWidth < 768 ? '8px' : (
              selectedPersona.typography?.scale && selectedPersona.typography.scale > 1.1 
              ? '24px' // More space for Senior persona on desktop
              : '8px' // Standard spacing between title and subtitle
            )
          }}
        >
          Hello {userName || 'User'}
        </h1>
        <p 
          className="text-white/80 text-responsive w-full"
          style={{
            transform: selectedPersona.typography?.scale ? `scale(${selectedPersona.typography.scale})` : undefined,
            lineHeight: selectedPersona.typography?.lineHeight || '1.4',
            fontFamily: selectedPersona.typography?.fontFamily || 'inherit'
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
              'calc(100vw - 32px)' : // Mobile: full width minus responsive margins
              screenWidth <= 768 ? 
                'calc(100vw - 80px)' : // Tablet: 40px margins each side
                'calc(100vw - 128px)', // Desktop: 64px margins each side
            height: screenWidth <= 640 ? 
              'calc((100vw - 32px) * 0.6)' : // Mobile: maintain aspect ratio
              screenWidth <= 768 ? 
                '320px' : // Tablet
                '375px', // Desktop
            maxWidth: screenWidth <= 640 ? 
              'calc(100vw - 32px)' : 
              screenWidth <= 768 ? 
                'calc(100vw - 80px)' : 
                'calc(100vw - 128px)',
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
      {/* Interactive Dock Navigation - Full width with responsive padding */}
      <div 
        className="container-responsive-padding"
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
