import { useState, useEffect } from 'react';
import { personas, type Persona } from '@/lib/personas';

export function usePersona() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  useEffect(() => {
    // Apply theme class to body when persona changes
    if (selectedPersona) {
      document.body.className = `min-h-screen bg-background text-foreground ${selectedPersona.theme}`;
    } else {
      document.body.className = 'min-h-screen bg-background text-foreground';
    }
  }, [selectedPersona]);

  const selectPersona = (personaId: string) => {
    const persona = personas[personaId];
    if (persona) {
      setSelectedPersona(persona);
      setCurrentStep(null);
    }
  };

  const selectStep = (stepId: string) => {
    setCurrentStep(stepId);
  };

  const resetPersona = () => {
    setSelectedPersona(null);
    setCurrentStep(null);
    document.body.className = 'min-h-screen bg-background text-foreground';
  };

  return {
    selectedPersona,
    currentStep,
    selectPersona,
    selectStep,
    resetPersona,
    personas,
  };
}
