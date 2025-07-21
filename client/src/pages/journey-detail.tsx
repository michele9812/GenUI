import { useLocation } from 'wouter';
import { ArrowLeft, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlareCard } from '@/components/ui/glare-card';
import { usePersona } from '@/hooks/use-persona';

export default function JourneyDetail() {
  const { selectedPersona, currentStep } = usePersona();
  const [, setLocation] = useLocation();

  if (!selectedPersona || !currentStep) {
    setLocation('/welcome');
    return null;
  }

  const step = selectedPersona.journeySteps.find(s => s.id === currentStep);
  const actions = selectedPersona.actions[currentStep] || [];

  const handleBack = () => {
    setLocation('/welcome');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className="shadow-sm border-b"
        style={{ backgroundColor: selectedPersona.colors.bg }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Journey
            </Button>
            <h1 
              className="text-xl font-semibold"
              style={{ color: selectedPersona.colors.primary }}
            >
              {step?.name}
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[120px]">
          {/* Contextual Actions */}
          <div className="mb-10 sm:mb-16 lg:mb-20">
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: selectedPersona.colors.primary }}
            >
              Available Actions
            </h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4">
                {actions.map((action, index) => (
                  <GlareCard 
                    key={index}
                    className="min-w-80 text-center flex-shrink-0"
                    style={{ 
                      backgroundColor: selectedPersona.colors.bg,
                      borderColor: selectedPersona.colors.primary + '30'
                    }}
                  >
                    <span 
                      className="material-icons text-4xl mb-4"
                      style={{ color: selectedPersona.colors.primary }}
                    >
                      {action.icon}
                    </span>
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: selectedPersona.colors.primary }}
                    >
                      {action.title}
                    </h3>
                    <p 
                      className="text-sm opacity-75 mb-4"
                      style={{ color: selectedPersona.colors.primary }}
                    >
                      {action.description}
                    </p>
                    <Button
                      className="text-white transition-colors"
                      style={{ backgroundColor: selectedPersona.colors.primary }}
                    >
                      Start Action
                    </Button>
                  </GlareCard>
                ))}
              </div>
            </div>
          </div>

          {/* Always Available Services */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: selectedPersona.colors.primary }}
            >
              Always Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlareCard className="text-center">
                <span className="material-icons text-blue-600 text-4xl mb-4 block">wc</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Restrooms</h3>
                <p className="text-gray-600 text-sm">Find nearest facilities</p>
              </GlareCard>

              <GlareCard className="text-center">
                <Shield className="w-10 h-10 text-red-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
                <p className="text-gray-600 text-sm">Emergency assistance</p>
              </GlareCard>

              <GlareCard className="text-center">
                <Headphones className="w-10 h-10 text-green-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assistance</h3>
                <p className="text-gray-600 text-sm">Get help from staff</p>
              </GlareCard>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <div className="flex-1">
            <Input 
              type="text" 
              placeholder="Ask me anything about your journey..." 
              className="w-full"
            />
          </div>
          <Button 
            className="text-white"
            style={{ backgroundColor: selectedPersona.colors.primary }}
          >
            <span className="material-icons">send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
