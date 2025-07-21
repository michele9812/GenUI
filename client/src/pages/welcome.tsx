import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
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
  const backgroundImage = 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080';

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc={currentImage || defaultImage}
      bgImageSrc={backgroundImage}
      title={`Journey di ${userName}`}
      scrollToExpand="Scorri per espandere e scegliere"
      textBlend={true}
    >
      {/* Content section that appears when fully expanded */}
      <div className="relative min-h-screen">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Benvenuto <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{userName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">Scegli in che punto del journey ti trovi</p>
        </div>

        {/* Interactive Dock Navigation */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-20">
            <Dock className="items-end pb-3">
              {selectedPersona.journeySteps.map((step, idx) => (
                <DockItem
                  key={idx}
                  className="aspect-square rounded-full cursor-pointer"
                  style={{ backgroundColor: selectedPersona.colors.primary }}
                  onMouseEnter={() => handleStepHover(step.image)}
                  onClick={() => handleStepClick(step.id)}
                >
                  <DockLabel>{step.name}</DockLabel>
                  <DockIcon>
                    <span className="material-icons text-white">{step.icon}</span>
                  </DockIcon>
                </DockItem>
              ))}
            </Dock>
          </div>
        </div>
      </div>
    </ScrollExpandMedia>
  );
}
