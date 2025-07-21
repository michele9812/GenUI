import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import MacOSDock from '@/components/ui/mac-os-dock';
import { usePersona } from '@/hooks/use-persona';

export default function Welcome() {
  const { selectedPersona, selectStep, userName } = usePersona();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [, setLocation] = useLocation();

  if (!selectedPersona) {
    setLocation('/');
    return null;
  }

  const handleStepHover = (image: string) => {
    setCurrentImage(image);
  };

  const handleStepClick = (stepId: string) => {
    selectStep(stepId);
    setTimeout(() => {
      setLocation('/journey-detail');
    }, 800);
  };

  const defaultImage = selectedPersona.journeySteps[0]?.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${selectedPersona.colors.primary}, ${selectedPersona.colors.secondary})` 
      }}
    >
      {/* Header Section */}
      <div className="absolute top-[120px] left-0 right-0 text-center z-10 px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Ciao {userName}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80">
          Seleziona il punto del journey
        </p>
      </div>

      {/* Central Image */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 px-4 sm:px-6 lg:px-8 top-[220px] sm:top-[244px] lg:top-[260px]"> {/* 120+40+60=220 mobile, 120+64+60=244 tablet, 120+80+60=260 desktop */}
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-72 h-52 sm:w-80 sm:h-60 md:w-96 md:h-72 lg:w-[28rem] lg:h-80 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={currentImage || defaultImage}
            alt="Journey step preview"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Interactive Dock Navigation */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-center w-full">
          <MacOSDock 
            apps={selectedPersona.journeySteps.map((step, idx) => ({
              id: step.id,
              name: step.name,
              icon: step.icon
            }))}
            onAppClick={(appId) => {
              const step = selectedPersona.journeySteps.find(s => s.id === appId);
              if (step) {
                handleStepHover(step.image);
                handleStepClick(appId);
              }
            }}
            openApps={[]}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
