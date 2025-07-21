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
      className="h-viewport relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${selectedPersona.colors.primary}, ${selectedPersona.colors.secondary})`,
        fontFamily: selectedPersona.typography?.fontFamily || 'system-ui, -apple-system, sans-serif',
        fontSize: selectedPersona.typography?.fontSize || '16px',
        lineHeight: selectedPersona.typography?.lineHeight || '1.5',
        letterSpacing: selectedPersona.typography?.letterSpacing || 'normal',
        backgroundColor: selectedPersona.colors.bg
      }}
    >
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <motion.button
          onClick={handleBackToPersonaSelection}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 text-gray-700 hover:text-gray-900"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to profile selection</span>
        </motion.button>
      </div>
      {/* Header Section */}
<div className="absolute top-12 sm:top-20 lg:top-24 left-0 right-0 text-center z-10 px-4 sm:px-6 lg:px-8 w-full">
        <h1 
          className="h1-responsive-small text-white mb-2 sm:mb-4"
          style={{ 
            fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit',
            fontSize: selectedPersona.typography?.scale ? `calc(32pt * ${selectedPersona.typography.scale})` : undefined,
            lineHeight: selectedPersona.typography?.lineHeight || '1.2',
            color: 'white'
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
      {/* Central Image */}
      <div className="absolute inset-4 flex items-center justify-center z-10">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: isZooming ? [1, 1.5, 4] : 1
          }}
          transition={{ 
            duration: isZooming ? 0.9 : 0.3,
            ease: isZooming ? [0.25, 0.46, 0.45, 0.94] : "easeOut",
            times: isZooming ? [0, 0.3, 1] : undefined
          }}
          className="rounded-lg overflow-hidden shadow-2xl"
          style={{
            transformOrigin: 'center center',
            zIndex: isZooming ? 9999 : 10,
            // Responsive dimensions with 16px margins from viewport edges
            // Calculate dimensions to maintain aspect ratio while fitting viewport with margins
            width: screenWidth <= 640 ? 
              'calc(100vw - 32px)' : // Mobile: full width minus 16px margins
              screenWidth <= 768 ? 
                'min(480px, calc(100vw - 32px))' : // Tablet: max 480px or viewport minus margins
                'min(560px, calc(100vw - 32px))', // Desktop: max 560px or viewport minus margins
            height: screenWidth <= 640 ? 
              'calc((100vw - 32px) * 0.6)' : // Mobile: maintain aspect ratio
              screenWidth <= 768 ? 
                'min(320px, calc((100vw - 32px) * 0.67))' : // Tablet: maintain aspect ratio
                'min(375px, calc((100vw - 32px) * 0.67))', // Desktop: maintain aspect ratio
            // Ensure zoom animation fills viewport with 16px margins
            ...(isZooming && {
              position: 'fixed',
              top: '16px',
              left: '16px',
              right: '16px',
              bottom: '16px',
              width: 'calc(100vw - 32px)',
              height: 'calc(100vh - 32px)',
              objectFit: 'cover'
            })
          }}
        >
          <img
            src={currentImage || defaultImage}
            alt="Journey step preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      </div>
      {/* Interactive Dock Navigation */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-8 lg:bottom-12 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 w-full">
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
