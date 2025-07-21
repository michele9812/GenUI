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
  GraduationCap 
} from 'lucide-react';
import { 
  MdComputer,
  MdFamilyRestroom,
  MdAccessible,
  MdTravelExplore,
  MdSchool
} from 'react-icons/md';

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { setPersona } = usePersona();
  const [userName, setUserName] = useState('');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersonaId(personaId);
  };

  const handleStart = () => {
    if (selectedPersonaId && userName.trim()) {
      setPersona(personas[selectedPersonaId], userName);
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

    const materialIconMap = {
      'tech': <MdComputer className="w-4 h-4" />,
      'family': <MdFamilyRestroom className="w-4 h-4" />,
      'senior': <MdAccessible className="w-4 h-4" />,
      'bleisure': <MdTravelExplore className="w-4 h-4" />,
      'student': <MdSchool className="w-4 h-4" />
    };

    return iconMap[personaId as keyof typeof iconMap] || 
           materialIconMap[personaId as keyof typeof materialIconMap] || 
           personaId.charAt(0).toUpperCase();
  };

  return (
    <div className="h-viewport flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 container-responsive-padding">
      <Card className="w-full max-w-md h-[600px] shadow-2xl">
        <CardContent className="p-0 h-full relative">
          {/* Fixed positioning for all elements */}
          
          {/* Image - Fixed at top with responsive positioning */}
          <div className="absolute top-6 sm:top-8 md:top-8 left-0 right-0 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 mx-auto flex items-center justify-center rounded-3xl overflow-hidden bg-blue-50">
              <img 
                src={cheerfulPilotImage} 
                alt="AirBuddy Pilot" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Title - Fixed position responsive */}
          <div className="absolute top-24 sm:top-28 md:top-28 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <h1 className="h1-responsive-small text-gray-900">
              AirBuddy Assistant
            </h1>
          </div>
          
          {/* Subtitle - Fixed position responsive */}
          <div className="absolute top-36 sm:top-44 md:top-44 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <p className="text-sm sm:text-base md:text-base text-gray-600">
              Select your profile to continue
            </p>
          </div>
          
          {/* Content - Fixed position - responsive optimization */}
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
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="personaSelect" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Profile
                </Label>
                <Select value={selectedPersonaId} onValueChange={handlePersonaChange}>
                  <SelectTrigger className="w-full">
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

              {/* Fixed height container for preview - calculated for longest description with 125% scale */}
              <div className="h-24 flex items-start">
                {selectedPersona && (
                  <div 
                    className="p-3 rounded-lg border min-h-[96px] flex items-start w-full"
                    style={{ 
                      backgroundColor: `${selectedPersona.colors.primary}20`,
                      borderColor: `${selectedPersona.colors.primary}40`,
                      width: `${100 / (selectedPersona.typography.scale || 1)}%`,
                      transform: `scale(${selectedPersona.typography.scale || 1})`,
                      transformOrigin: 'left top'
                    }}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: `${selectedPersona.colors.primary}` }}
                      >
                        {renderPersonaIcon(selectedPersona.id)}
                      </div>
                      <div className="flex-1 w-full">
                        <h3 
                          className="font-semibold text-gray-900 text-sm mb-1 w-full"
                          style={{ 
                            fontFamily: selectedPersona.typography.headingFont
                          }}
                        >
                          {selectedPersona.title}
                        </h3>
                        <p 
                          className="text-xs text-gray-600 leading-relaxed w-full h-fit"
                          style={{ 
                            fontFamily: selectedPersona.typography.fontFamily,
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {selectedPersona.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Button - Fixed at bottom responsive */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6">
            <Button 
              onClick={handleStart}
              disabled={!selectedPersonaId || !userName.trim()}
              className="w-full py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-base font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start the journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}