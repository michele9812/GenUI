import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import cheerfulPilotImage from '@assets/Cheerful Pilot Character_1753105244175.png';
import { personas } from '@/lib/personas';
import { usePersona } from '@/hooks/use-persona';

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

  return (
    <div className="h-viewport flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 container-responsive-padding">
      <Card className="w-full max-w-md min-h-[480px] shadow-2xl">
        <CardContent className="p-6 pt-8 pb-8 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full overflow-hidden bg-blue-50">
                <img 
                  src={cheerfulPilotImage} 
                  alt="AirBuddy Pilot" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 
                className="h1-responsive-small text-gray-900 mb-6"
              >AirBuddy Assistant</h1>
              <p className="text-gray-600">Select your profile to continue</p>
            </div>

            <div className="space-y-6">
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
            </div>

            {selectedPersona && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white border-2 border-blue-200">
                    <span className="text-lg">{selectedPersona.icon}</span>
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

          <Button 
            onClick={handleStart}
            disabled={!selectedPersonaId || !userName.trim()}
            className="w-full py-3 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start the journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}