import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <div className="h-viewport flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-100">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardContent className="p-4 pt-6 pb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-full overflow-hidden bg-blue-50">
              <img 
                src={cheerfulPilotImage} 
                alt="AirBuddy Pilot" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 
              className="h1-responsive-small text-gray-900 mb-2 text-[40px]"
            >AirBuddy Assistant</h1>
            <p className="text-gray-600">Personalising your trip</p>
          </div>

          <div className="space-y-4">
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
                className="p-4 rounded-lg border-2 transition-all duration-300"
                style={{
                  backgroundColor: `${selectedPersona.colors.primary}33`, // 20% opacity (33 in hex)
                  borderColor: selectedPersona.colors.primary,
                  color: selectedPersona.colors.primary
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: selectedPersona.colors.primary }}
                  >
                    <span className="material-icons text-xl text-white">{selectedPersona.icon}</span>
                  </div>
                  <div>
                    <h3 
                      className="font-semibold"
                      style={{
                        fontFamily: selectedPersona.typography?.headingFont || selectedPersona.typography?.fontFamily || 'inherit'
                      }}
                    >
                      {selectedPersona.title}
                    </h3>
                    <p 
                      className="text-sm opacity-75"
                      style={{
                        fontFamily: selectedPersona.typography?.fontFamily || 'inherit'
                      }}
                    >
                      {userName || 'Enter your name'}
                    </p>
                  </div>
                </div>
                <p 
                  className="text-sm"
                  style={{
                    fontFamily: selectedPersona.typography?.fontFamily || 'inherit'
                  }}
                >
                  {selectedPersona.description}
                </p>
              </div>
            )}

            <Button 
              onClick={handleStart}
              disabled={!selectedPersonaId || !userName.trim()}
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start the journey
              →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
