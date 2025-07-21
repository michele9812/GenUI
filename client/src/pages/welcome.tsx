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

  // Create persona-specific dock colors with better contrast
  const getDockColors = () => {
    const persona = selectedPersona.name.toLowerCase();
    switch (persona) {
      case 'tech-savvy':
        return {
          background: 'bg-blue-900/90',
          itemColors: ['bg-blue-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-purple-500', 'bg-teal-500']
        };
      case 'family planner':
        return {
          background: 'bg-green-900/90',
          itemColors: ['bg-green-500', 'bg-emerald-500', 'bg-lime-500', 'bg-teal-500', 'bg-cyan-500']
        };
      case 'senior prm':
        return {
          background: 'bg-orange-900/90',
          itemColors: ['bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-red-500', 'bg-pink-500']
        };
      case 'bleisure nomad':
        return {
          background: 'bg-purple-900/90',
          itemColors: ['bg-purple-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500']
        };
      case 'first-time student':
        return {
          background: 'bg-rose-900/90',
          itemColors: ['bg-rose-500', 'bg-pink-500', 'bg-red-500', 'bg-orange-500', 'bg-amber-500']
        };
      default:
        return {
          background: 'bg-gray-900/90',
          itemColors: ['bg-gray-500', 'bg-slate-500', 'bg-zinc-500', 'bg-neutral-500', 'bg-stone-500']
        };
    }
  };

  const dockColors = getDockColors();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${selectedPersona.colors.primary}, ${selectedPersona.colors.secondary})` 
      }}
    >
      {/* Header Section */}
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 text-center z-10 px-4 max-w-5xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Ciao {userName}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80">
          Seleziona il punto del journey
        </p>
      </div>

      {/* Central Image */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 px-4 top-[220px] sm:top-[244px] lg:top-[260px]"> {/* 120+40+60=220 mobile, 120+64+60=244 tablet, 120+80+60=260 desktop */}
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
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20 left-1/2 transform -translate-x-1/2 z-20 px-4 w-full max-w-7xl">
        <Dock 
          className="items-end pb-3" 
          panelHeight={80}
          backgroundColor={dockColors.background}
          magnification={90}
          distance={160}
        >
          {selectedPersona.journeySteps.map((step, idx) => (
            <DockItem
              key={idx}
              className="aspect-square rounded-full cursor-pointer transition-all duration-200"
              style={{ backgroundColor: dockColors.itemColors[idx % dockColors.itemColors.length] }}
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
