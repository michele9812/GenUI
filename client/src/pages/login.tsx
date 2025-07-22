import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { personas } from '@/lib/personas';
import { usePersona } from '@/hooks/use-persona';
import cheerfulPilotImage from '@assets/Cheerful Pilot Character_1753105244175.png';
import { 
  Laptop, 
  Users, 
  Accessibility, 
  Globe, 
  GraduationCap,
  ArrowLeft 
} from 'lucide-react';

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { selectPersona } = usePersona();
  const [userName, setUserName] = useState('');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersonaId(personaId);
  };

  const handleStart = () => {
    if (selectedPersonaId && userName.trim()) {
      selectPersona(selectedPersonaId, userName);
      navigate('/welcome');
    }
  };

  const selectedPersona = selectedPersonaId ? personas[selectedPersonaId] : null;

  const renderPersonaIcon = (personaId: string) => {
    const iconMap = {
      'tech': <Laptop className="w-4 h-4" />,
      'family': <Users className="w-4 h-4" />,
      'senior': <Accessibility className="w-4 h-4" />,
      'bleisure': <Globe className="w-4 h-4" />,
      'student': <GraduationCap className="w-4 h-4" />
    };

    return iconMap[personaId as keyof typeof iconMap] || personaId.charAt(0).toUpperCase();
  };

  return (
    <div className="h-viewport flex items-center justify-center bg-gray-200 container-responsive-padding">
      <Card className="w-full max-w-md h-[680px] sm:h-[680px] md:h-[680px] shadow-2xl animation-scale-in">
        <CardContent className="p-0 h-full relative">
          <div className="absolute top-6 sm:top-8 md:top-8 left-0 right-0 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 mx-auto flex items-center justify-center radius-responsive overflow-hidden bg-gray-50">
              <img 
                src={cheerfulPilotImage} 
                alt="AirBuddy Pilot" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="absolute top-24 sm:top-28 md:top-28 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <h1 className="h1-responsive-small text-gray-900">
              AirBuddy Assistant
            </h1>
          </div>

          <div className="absolute top-36 sm:top-44 md:top-44 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <p className="text-sm sm:text-base md:text-base text-gray-600">
              Select your profile to continue
            </p>
          </div>
          <div className="absolute top-48 sm:top-56 md:top-56 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6">
            <div className="space-y-3 sm:space-y-4 md:space-y-4">
              <div>
                <Label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </Label>
                <Input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full focus:scale-105"
                />
              </div>

              <div>
                <Label htmlFor="personaSelect" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Profile
                </Label>
                <Select value={selectedPersonaId} onValueChange={handlePersonaChange}>
                  <SelectTrigger className="w-full hover:bg-gray-50 transition-colors duration-200">
                    <SelectValue placeholder="Choose your traveler profile..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(personas).map(([id, persona]) => (
                      <SelectItem key={id} value={id}>
                        {persona.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="h-48 sm:h-48 md:h-48 flex items-start overflow-hidden">
                {selectedPersona && (
                  <div 
                    key={selectedPersona.id}
                    className="border radius-responsive-small w-full transition-all duration-300 overflow-hidden"
                    style={{ 
                      backgroundColor: selectedPersona.colors.bg || `${selectedPersona.colors.primary}08`,
                      borderColor: `${selectedPersona.colors.primary}30`
                    }}
                  >
                    {/* Preview Header */}
                    <div 
                      className="px-3 py-2 border-b flex items-center justify-between"
                      style={{ 
                        backgroundColor: `${selectedPersona.colors.primary}15`,
                        borderBottomColor: `${selectedPersona.colors.primary}25`
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                          style={{ 
                            backgroundColor: selectedPersona.colors.primary,
                            minWidth: '24px',
                            minHeight: '24px'
                          }}
                        >
                          <div className="w-[18px] h-[18px] flex items-center justify-center">
                            {renderPersonaIcon(selectedPersona.id)}
                          </div>
                        </div>
                        <h3 
                          className="font-semibold text-xs"
                          style={{ 
                            color: selectedPersona.colors.text || selectedPersona.colors.primary,
                            fontFamily: selectedPersona.typography.headingFont || selectedPersona.typography.fontFamily,
                            fontSize: selectedPersona.typography.scale ? `${0.75 * selectedPersona.typography.scale}rem` : '0.75rem'
                          }}
                        >
                          {selectedPersona.title}
                        </h3>
                      </div>
                      <div 
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${selectedPersona.colors.primary}20`,
                          color: selectedPersona.colors.primary
                        }}
                      >
                        Preview
                      </div>
                    </div>

                    {/* Journey Step Preview */}
                    <div className="p-3 space-y-2">

                      {/* Profile Information */}
                      <div 
                        className="p-2 rounded border"
                        style={{ 
                          backgroundColor: `${selectedPersona.colors.secondary || selectedPersona.colors.primary}08`,
                          borderColor: `${selectedPersona.colors.secondary || selectedPersona.colors.primary}20`
                        }}
                      >
                        <div 
                          className="text-xs font-medium mb-1"
                          style={{ 
                            color: selectedPersona.colors.secondary || selectedPersona.colors.primary,
                            fontFamily: selectedPersona.typography.headingFont || selectedPersona.typography.fontFamily
                          }}
                        >
                          {(() => {
                            const getAgeAndNationality = (personaId: string) => {
                              const profiles = {
                                'tech': 'Age 38, Italian',
                                'family': 'Age 34, Moroccan',
                                'senior': 'Age 72, German',
                                'bleisure': 'Age 29, Indian',
                                'student': 'Age 20, Chinese'
                              };
                              return profiles[personaId as keyof typeof profiles] || 'Profile Info';
                            };
                            return getAgeAndNationality(selectedPersona.id);
                          })()}
                        </div>
                        <p 
                          className="text-xs leading-relaxed"
                          style={{ 
                            color: selectedPersona.colors.textSecondary || '#6b7280',
                            fontFamily: selectedPersona.typography.fontFamily,
                            fontSize: selectedPersona.typography.scale ? `${0.75 * selectedPersona.typography.scale}rem` : '0.75rem',
                            lineHeight: selectedPersona.typography.lineHeight || '1.5'
                          }}
                        >
                          {(() => {
                            const getDescription = (personaId: string) => {
                              const descriptions = {
                                'tech': 'Elite business traveler who values efficiency and cutting-edge technology for seamless airport experiences.',
                                'family': 'Organized mother prioritizing budget-friendly, family-focused services for stress-free travel with children.',
                                'senior': 'Experienced traveler requiring accessible services and clear information for comfortable journeys.',
                                'bleisure': 'Digital nomad combining business meetings with leisure exploration during flexible travel schedules.',
                                'student': 'First-time international traveler needing guidance and support for solo journey to American college.'
                              };
                              return descriptions[personaId as keyof typeof descriptions] || selectedPersona.description;
                            };
                            return getDescription(selectedPersona.id);
                          })()}
                        </p>
                      </div>

                      {/* Color and Typography Sample */}
                      <div className="flex items-center space-x-2 pt-1">
                        <div 
                          className="w-3 h-3 rounded-full border"
                          style={{ 
                            backgroundColor: selectedPersona.colors.primary,
                            borderColor: selectedPersona.colors.primary 
                          }}
                          title="Primary Color"
                        ></div>
                        <div 
                          className="w-3 h-3 rounded-full border"
                          style={{ 
                            backgroundColor: selectedPersona.colors.secondary || selectedPersona.colors.accent,
                            borderColor: selectedPersona.colors.secondary || selectedPersona.colors.accent 
                          }}
                          title="Secondary/Accent Color"
                        ></div>
                        <div className="flex-1 space-y-0.5">
                          <div 
                            className="text-xs truncate"
                            style={{ 
                              color: selectedPersona.colors.textSecondary || '#9ca3af',
                              fontFamily: selectedPersona.typography.fontFamily,
                              fontSize: '0.65rem'
                            }}
                          >
                            {selectedPersona.fonts.primary}
                          </div>
                          <div 
                            className="text-xs truncate"
                            style={{ 
                              color: selectedPersona.colors.textSecondary || '#9ca3af',
                              fontFamily: selectedPersona.typography.headingFont,
                              fontSize: '0.65rem'
                            }}
                          >
                            {selectedPersona.fonts.secondary}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6">
            <Button 
              onClick={handleStart}
              disabled={!selectedPersonaId || !userName.trim()}
              className="w-full py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-base font-medium bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
            >
              Start the journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}