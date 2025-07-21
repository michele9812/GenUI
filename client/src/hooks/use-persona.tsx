import { useState, useEffect } from 'react';
import { personas, type Persona } from '@/lib/personas';

export function usePersona() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Apply theme class to body when persona changes
    if (selectedPersona) {
      document.body.className = `min-h-screen bg-background text-foreground ${selectedPersona.theme}`;
    } else {
      document.body.className = 'min-h-screen bg-background text-foreground';
    }
  }, [selectedPersona]);

  const selectPersona = (personaId: string, name?: string) => {
    const persona = personas[personaId];
    if (persona) {
      setSelectedPersona(persona);
      setCurrentStep(null);
      if (name) {
        setUserName(name);
      }
    }
  };

  const selectStep = (stepId: string) => {
    setCurrentStep(stepId);
  };

  const resetPersona = () => {
    setSelectedPersona(null);
    setCurrentStep(null);
    setUserName('');
    document.body.className = 'min-h-screen bg-background text-foreground';
  };

  return {
    selectedPersona,
    currentStep,
    userName,
    selectPersona,
    selectStep,
    resetPersona,
    personas,
  };
}
