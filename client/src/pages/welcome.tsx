import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
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
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Ciao {userName}
        </h1>
        <p className="text-xl md:text-2xl text-white/80">
          Seleziona il punto del journey
        </p>
      </div>

      {/* Central Image */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-80 h-60 md:w-96 md:h-72 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src={currentImage || defaultImage}
            alt="Journey step preview"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Interactive Dock Navigation */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <Dock className="items-end pb-3" panelHeight={80}>
          {selectedPersona.journeySteps.map((step, idx) => (
            <DockItem
              key={idx}
              className="aspect-square rounded-full cursor-pointer transition-all duration-200"
              style={{ backgroundColor: selectedPersona.colors.accent }}
              onMouseEnter={() => handleStepHover(step.image)}
              onClick={() => handleStepClick(step.id)}
            >
              <DockLabel>{step.name}</DockLabel>
              <DockIcon>
                <span className="material-icons text-white text-lg">{step.icon}</span>
              </DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    </div>
  );
}
