// WCAG 2.1 AA accessibility utilities for persona theming
export interface AccessibilityColors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  textSecondary: string;
  link: string;
  linkHover: string;
  focus: string;
  error: string;
  success: string;
  warning: string;
}

// Calculate relative luminance according to WCAG 2.1
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculate contrast ratio according to WCAG 2.1
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
export function isAccessibleContrast(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

// Check if contrast meets WCAG AAA standards (7:1 for normal text, 4.5:1 for large text)
export function isAAAccessibleContrast(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Generate accessible color variants for better contrast
export function generateAccessibleColors(baseColor: string, backgroundColor: string): AccessibilityColors {
  const isLight = getLuminance(backgroundColor) > 0.5;
  
  return {
    primary: baseColor,
    secondary: isLight ? darkenColor(baseColor, 0.2) : lightenColor(baseColor, 0.2),
    accent: isLight ? darkenColor(baseColor, 0.1) : lightenColor(baseColor, 0.1),
    bg: backgroundColor,
    text: isLight ? '#111827' : '#F9FAFB',
    textSecondary: isLight ? '#4B5563' : '#D1D5DB',
    link: isLight ? darkenColor(baseColor, 0.3) : lightenColor(baseColor, 0.3),
    linkHover: isLight ? darkenColor(baseColor, 0.4) : lightenColor(baseColor, 0.4),
    focus: '#3B82F6', // Always use blue for focus for consistency
    error: '#DC2626',
    success: '#16A34A',
    warning: '#D97706'
  };
}

function darkenColor(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const newR = Math.round(r * (1 - factor));
  const newG = Math.round(g * (1 - factor));
  const newB = Math.round(b * (1 - factor));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

function lightenColor(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const newR = Math.round(r + (255 - r) * factor);
  const newG = Math.round(g + (255 - g) * factor);
  const newB = Math.round(b + (255 - b) * factor);
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// Accessibility check for personas
export function validatePersonaAccessibility(colors: any): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check primary text contrast
  if (!isAccessibleContrast(colors.primary, colors.bg)) {
    issues.push(`Primary color ${colors.primary} on background ${colors.bg} doesn't meet WCAG AA contrast requirements`);
  }
  
  // Check secondary text contrast
  if (!isAccessibleContrast(colors.secondary, colors.bg)) {
    issues.push(`Secondary color ${colors.secondary} on background ${colors.bg} doesn't meet WCAG AA contrast requirements`);
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

// Typography accessibility utilities
export interface AccessibleTypography {
  fontFamily: string;
  headingFont: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  scale: number;
  minFontSize: string;
  maxFontSize: string;
}

export function getAccessibleTypography(baseTypography: any, userNeedsLargerText = false): AccessibleTypography {
  const baseSize = userNeedsLargerText ? 18 : 16; // WCAG recommends 16px minimum
  const scale = userNeedsLargerText ? (baseTypography.scale || 1) * 1.25 : (baseTypography.scale || 1);
  
  return {
    fontFamily: baseTypography.fontFamily || 'system-ui, -apple-system, sans-serif',
    headingFont: baseTypography.headingFont || baseTypography.fontFamily || 'system-ui, -apple-system, sans-serif',
    fontSize: `${baseSize * scale}px`,
    lineHeight: '1.5', // WCAG recommends 1.5 minimum
    letterSpacing: userNeedsLargerText ? '0.02em' : 'normal',
    scale,
    minFontSize: '14px', // Never go below 14px
    maxFontSize: '24px' // Cap for readability
  };
}

// Focus management utilities
export function createFocusRing(color: string): string {
  return `0 0 0 2px ${color}, 0 0 0 4px rgba(59, 130, 246, 0.15)`;
}

// Generate ARIA-compliant color descriptions for screen readers
export function getColorDescription(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'Unknown color';
  
  const { r, g, b } = rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  if (brightness > 200) return 'Light color';
  if (brightness > 100) return 'Medium color';
  return 'Dark color';
}