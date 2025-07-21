import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { ScrollExpandMedia } from '@/components/ui/scroll-expand-media';
import { usePersona } from '@/hooks/use-persona';

export default function Welcome() {
  const { selectedPersona, selectStep } = usePersona();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
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
    setIsExpanded(true);
    setTimeout(() => {
      setLocation('/journey-detail');
    }, 800);
  };

  const defaultImage = selectedPersona.journeySteps[0]?.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with sparkle effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="sparkle absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
        <div className="sparkle absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full" style={{ animationDelay: '0.5s' }}></div>
        <div className="sparkle absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Benvenuto <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{selectedPersona.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">Scegli in che punto del journey ti trovi</p>
        </div>

        {/* Preview Image Container */}
        <div className="mb-16 relative">
          <ScrollExpandMedia
            mediaSrc={currentImage || defaultImage}
            bgImageSrc=""
            title=""
            isExpanded={isExpanded}
          />
        </div>

        {/* Interactive Dock Navigation */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20">
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
    </div>
  );
}
