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
  Heart, 
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

  const getPersonaIcon = (personaId: string) => {
    const iconMap = {
      'tech': Laptop,
      'family': Users,
      'senior': Heart,
      'bleisure': Globe,
      'student': GraduationCap
    };
    return iconMap[personaId as keyof typeof iconMap];
  };

  const getMaterialIcon = (personaId: string) => {
    const materialIconMap = {
      'tech': MdComputer,
      'family': MdFamilyRestroom,
      'senior': MdAccessible,
      'bleisure': MdTravelExplore,
      'student': MdSchool
    };
    return materialIconMap[personaId as keyof typeof materialIconMap];
  };

  return (
    <div className="h-viewport flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 container-responsive-padding">
      <Card className="w-full max-w-md h-[600px] shadow-2xl">
        <CardContent className="p-0 h-full relative">
          {/* Fixed positioning for all elements */}
          
          {/* Image - Fixed at top */}
          <div className="absolute top-8 left-0 right-0 text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-3xl overflow-hidden bg-blue-50">
              <img 
                src={cheerfulPilotImage} 
                alt="AirBuddy Pilot" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Title - Fixed position */}
          <div className="absolute top-28 left-6 right-6 text-center">
            <h1 className="h1-responsive-small text-gray-900">
              AirBuddy Assistant
            </h1>
          </div>
          
          {/* Subtitle - Fixed position */}
          <div className="absolute top-44 left-6 right-6 text-center">
            <p className="text-gray-600">
              Select your profile to continue
            </p>
          </div>
          
          {/* Content - Fixed position */}
          <div className="absolute top-64 left-6 right-6 space-y-4">
            <div>
              <Label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
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
              <Label htmlFor="personaSelect" className="block text-sm font-medium text-gray-700 mb-1">
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

            {selectedPersona && (
              <div 
                className="p-2 rounded-lg border"
                style={{ 
                  backgroundColor: `${selectedPersona.colors.primary}20`,
                  borderColor: `${selectedPersona.colors.primary}40`,
                  width: `${100 / (selectedPersona.typography.scale || 1)}%`,
                  transform: `scale(${selectedPersona.typography.scale || 1})`,
                  transformOrigin: 'left center'
                }}
              >
                <div className="flex items-start space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: `${selectedPersona.colors.primary}` }}
                  >
                    {(() => {
                      const IconComponent = getPersonaIcon(selectedPersona.id);
                      const MaterialIconComponent = getMaterialIcon(selectedPersona.id);
                      
                      if (IconComponent) {
                        return <IconComponent className="w-3 h-3" />;
                      } else if (MaterialIconComponent) {
                        return <MaterialIconComponent className="w-3 h-3" />;
                      } else {
                        return selectedPersona.title.charAt(0);
                      }
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-gray-900 text-sm mb-1"
                      style={{ 
                        fontFamily: selectedPersona.typography.headingFont
                      }}
                    >
                      {selectedPersona.title}
                    </h3>
                    <p 
                      className="text-xs text-gray-600 leading-tight"
                      style={{ 
                        fontFamily: selectedPersona.typography.fontFamily
                      }}
                    >
                      {selectedPersona.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Button - Fixed at bottom */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button 
              onClick={handleStart}
              disabled={!selectedPersonaId || !userName.trim()}
              className="w-full py-3 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start the journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}