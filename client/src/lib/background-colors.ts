import { Persona } from './personas';

// Converte un colore hex in valori RGB separati da virgola per i CSS variables
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r}, ${g}, ${b}`;
}

// Genera colori sfumati basati sui colori primari e secondari della persona
export function getPersonaBackgroundColors(persona: Persona) {
  const primaryRgb = hexToRgb(persona.colors.primary);
  const secondaryRgb = hexToRgb(persona.colors.secondary);
  const accentRgb = hexToRgb(persona.colors.accent);
  
  return {
    gradientBackgroundStart: persona.colors.primary,
    gradientBackgroundEnd: persona.colors.secondary,
    firstColor: primaryRgb,
    secondColor: secondaryRgb,
    thirdColor: accentRgb,
    fourthColor: primaryRgb,
    fifthColor: secondaryRgb,
    pointerColor: accentRgb,
  };
}