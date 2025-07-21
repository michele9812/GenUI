import { useState, useEffect } from 'react';
import { personas, type Persona } from '@/lib/personas';
import { validatePersonaAccessibility } from '@/lib/accessibility';

export function usePersona() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(() => {
    try {
      const saved = localStorage.getItem('selectedPersona');
      if (saved) {
        const personaId = JSON.parse(saved);
        return personas[personaId] || null;
      }
    } catch (error) {
      console.warn('Error reading selectedPersona from localStorage:', error);
    }
    return null;
  });
  const [currentStep, setCurrentStep] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('currentStep');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Error reading currentStep from localStorage:', error);
      return null;
    }
  });
  const [userName, setUserName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('userName');
      return saved ? JSON.parse(saved) : '';
    } catch (error) {
      console.warn('Error reading userName from localStorage:', error);
      return '';
    }
  });

  useEffect(() => {
    // Apply theme class to body when persona changes
    if (selectedPersona) {
      // Validate accessibility compliance
      const validation = validatePersonaAccessibility(selectedPersona.colors);
      if (!validation.isValid) {
        console.warn('Accessibility issues detected for persona:', selectedPersona.name, validation.issues);
      }
      
      document.body.className = `min-h-screen bg-background text-foreground ${selectedPersona.theme}`;
      
      // Apply persona colors as CSS custom properties for better inheritance
      document.documentElement.style.setProperty('--persona-primary', selectedPersona.colors.primary);
      document.documentElement.style.setProperty('--persona-secondary', selectedPersona.colors.secondary);
      document.documentElement.style.setProperty('--persona-accent', selectedPersona.colors.accent);
      document.documentElement.style.setProperty('--persona-bg', selectedPersona.colors.bg);
      document.documentElement.style.setProperty('--persona-text', selectedPersona.colors.text || '#111827');
      document.documentElement.style.setProperty('--persona-focus', selectedPersona.colors.focus || '#3B82F6');
    } else {
      document.body.className = 'min-h-screen bg-background text-foreground';
      // Reset custom properties
      document.documentElement.style.removeProperty('--persona-primary');
      document.documentElement.style.removeProperty('--persona-secondary');
      document.documentElement.style.removeProperty('--persona-accent');
      document.documentElement.style.removeProperty('--persona-bg');
      document.documentElement.style.removeProperty('--persona-text');
      document.documentElement.style.removeProperty('--persona-focus');
    }
  }, [selectedPersona]);

  const selectPersona = (personaId: string, name?: string) => {
    const persona = personas[personaId];
    if (persona) {
      setSelectedPersona(persona);
      setCurrentStep(null);
      try {
        localStorage.setItem('selectedPersona', JSON.stringify(personaId));
        localStorage.setItem('currentStep', JSON.stringify(null));
        if (name) {
          setUserName(name);
          localStorage.setItem('userName', JSON.stringify(name));
        }
      } catch (error) {
        console.warn('Error saving to localStorage:', error);
      }
    }
  };

  const selectStep = (stepId: string) => {
    setCurrentStep(stepId);
    try {
      localStorage.setItem('currentStep', JSON.stringify(stepId));
    } catch (error) {
      console.warn('Error saving currentStep to localStorage:', error);
    }
  };

  const resetPersona = () => {
    setSelectedPersona(null);
    setCurrentStep(null);
    setUserName('');
    localStorage.removeItem('selectedPersona');
    localStorage.removeItem('currentStep');
    localStorage.removeItem('userName');
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
