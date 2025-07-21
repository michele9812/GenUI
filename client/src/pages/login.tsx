import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { personas } from '@/lib/personas';
import cheerfulPilotImage from '@assets/Cheerful Pilot Character_1753105244175.png';
import { usePersona } from '@/hooks/use-persona';
import { Laptop, Users, Heart, Globe, GraduationCap } from 'lucide-react';
import { MdComputer, MdFamilyRestroom, MdAccessible, MdTravelExplore, MdSchool } from 'react-icons/md';

export default function Login() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [, setLocation] = useLocation();
  const { selectPersona } = usePersona();

  const handlePersonaChange = (value: string) => {
    setSelectedPersonaId(value);
  };

  const handleStart = () => {
    if (selectedPersonaId && userName.trim()) {
      selectPersona(selectedPersonaId, userName.trim());
      setLocation('/welcome');
    }
  };

  const selectedPersona = selectedPersonaId ? personas[selectedPersonaId] : null;

  const getPersonaIcon = (personaId: string) => {
    const iconMap = {
      'marco': Laptop,
      'fatima': Users,
      'jonas': Heart,
      'nikhil': Globe,
      'liwei': GraduationCap
    };
    return iconMap[personaId as keyof typeof iconMap];
  };

  const getMaterialIcon = (personaId: string) => {
    const materialIconMap = {
      'marco': MdComputer,
      'fatima': MdFamilyRestroom,
      'jonas': MdAccessible,
      'nikhil': MdTravelExplore,
      'liwei': MdSchool
    };
    return materialIconMap[personaId as keyof typeof materialIconMap];
  };

  return (
    <div className="h-viewport flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 container-responsive-padding">
      <Card className="w-full max-w-md min-h-[500px] sm:min-h-[530px] md:min-h-[580px] lg:min-h-[620px] shadow-2xl">
        <CardContent className="p-6 pt-8 h-full flex flex-col">
          {/* Fixed Header Area */}
          <div className="flex-shrink-0 space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-3xl overflow-hidden bg-blue-50">
                <img 
                  src={cheerfulPilotImage} 
                  alt="AirBuddy Pilot" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="h1-responsive-small text-gray-900">
                AirBuddy Assistant
              </h1>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">
                Select your profile to continue
              </p>
            </div>
          </div>

          {/* Flexible Content Area */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
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

            <div className="min-h-[120px] sm:min-h-[130px] md:min-h-[140px] lg:min-h-[150px]">
              {selectedPersona && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 h-full">
                  <div className="flex items-start gap-3 h-full">
                    <div 
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-blue-200"
                      style={{ 
                        backgroundColor: `${selectedPersona.primaryColor}20`
                      }}
                    >
                      {(() => {
                        const IconComponent = getPersonaIcon(selectedPersonaId);
                        const MaterialIcon = getMaterialIcon(selectedPersonaId);
                        
                        if (IconComponent) {
                          return (
                            <IconComponent 
                              className="w-5 h-5" 
                              style={{ color: selectedPersona.primaryColor }}
                            />
                          );
                        } else if (MaterialIcon) {
                          return (
                            <MaterialIcon 
                              className="w-5 h-5" 
                              style={{ color: selectedPersona.primaryColor }}
                            />
                          );
                        }
                        
                        return null;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-semibold text-gray-900 mb-2"
                        style={{ 
                          fontFamily: selectedPersona.headingFont,
                          transform: `scale(${selectedPersona.fontScale || 1})`
                        }}
                      >
                        {selectedPersona.title}
                      </h3>
                      <p 
                        className="text-sm text-gray-600"
                        style={{ 
                          fontFamily: selectedPersona.fontFamily,
                          transform: `scale(${selectedPersona.fontScale || 1})`
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

          {/* Fixed Button Area */}
          <div className="mt-auto pb-6">
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