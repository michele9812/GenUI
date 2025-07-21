import { useState } from 'react';
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
      }, 1200);
    }
  };

  const defaultImage = selectedPersona.journeySteps[0]?.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';

  const handleBackToPersonaSelection = () => {
    setLocation('/');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
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
          <span className="text-sm font-medium">Back to behaviour selection</span>
        </motion.button>
      </div>
      {/* Header Section */}
      <div className="absolute top-[70px] sm:top-[80px] lg:top-[90px] left-0 right-0 text-center z-10 px-4 sm:px-6 lg:px-8 w-full">
        <h1 
          className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 leading-tight"
          style={{ 
            fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit',
            fontSize: selectedPersona.typography?.scale ? `calc(1.75rem * ${selectedPersona.typography.scale})` : '1.75rem',
            color: 'white',
            lineHeight: selectedPersona.typography?.lineHeight || '1.2'
          }}
        >
          Ciao {userName || 'Utente'}
        </h1>
        <p 
          className="text-base sm:text-lg md:text-xl text-white/80"
          style={{
            fontSize: selectedPersona.typography?.scale ? `calc(1rem * ${selectedPersona.typography.scale})` : undefined,
            lineHeight: selectedPersona.typography?.lineHeight || '1.4'
          }}
        >
          Seleziona il punto del journey
        </p>
      </div>
      {/* Central Image */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 px-4 sm:px-6 lg:px-8 top-[160px] sm:top-[170px] lg:top-[180px]">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: isZooming ? 15 : 1
          }}
          transition={{ 
            duration: isZooming ? 1.2 : 0.3,
            ease: isZooming ? [0.25, 0.46, 0.45, 0.94] : "easeOut"
          }}
          className="w-60 h-40 sm:w-64 sm:h-44 md:w-72 md:h-52 lg:w-80 lg:h-60 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            transformOrigin: 'center center',
            zIndex: isZooming ? 9999 : 10
          }}
        >
          <img
            src={currentImage || defaultImage}
            alt="Journey step preview"
            className="w-full h-full object-cover mt-[40px] mb-[40px] pt-[0px] pb-[0px]"
          />
        </motion.div>
      </div>
      {/* Interactive Dock Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 w-full">
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
