import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardContent className="pt-8 sm:pt-12 lg:pt-16">
          <div className="text-center mb-10 sm:mb-16 lg:mb-20">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane className="text-white text-3xl" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Airport Navigation</h1>
            <p className="text-gray-600">Personalized journey assistant</p>
          </div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
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

            {selectedPersona && (
              <div 
                className="p-4 rounded-lg border-2 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${selectedPersona.colors.primary}15, ${selectedPersona.colors.secondary}15)`,
                  borderColor: selectedPersona.colors.primary,
                  color: selectedPersona.colors.primary
                }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: selectedPersona.colors.primary }}
                  >
                    <span className="material-icons text-xl text-white">{selectedPersona.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedPersona.title}</h3>
                    <p className="text-sm opacity-75">{userName || 'Enter your name'}</p>
                  </div>
                </div>
                <p className="text-sm">{selectedPersona.description}</p>
              </div>
            )}

            <Button 
              onClick={handleStart}
              disabled={!selectedPersonaId || !userName.trim()}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start the journey
              <span className="material-icons ml-2 text-sm">arrow_forward</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
