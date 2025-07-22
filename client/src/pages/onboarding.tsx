import { useLocation } from 'wouter';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import cheerfulPilotPath from '@assets/Cheerful Pilot Character_1753105244175.png';

export default function OnboardingPage() {
  const [, navigate] = useLocation();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 container-responsive-padding text-[32px]" style={{ height: '100vh', minHeight: '-webkit-fill-available' }}>
      <Card className="w-full max-w-md shadow-2xl animation-scale-in" style={{ 
        height: 'min(90vh, 600px)',
        maxHeight: '90vh'
      }}>
        <CardContent className="p-4 sm:p-6 h-full flex flex-col">
          {/* Header Section */}
          <div className="flex-shrink-0 text-center mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 mx-auto flex items-center justify-center radius-responsive overflow-hidden bg-gray-50 mb-4">
              <img 
                src={cheerfulPilotPath} 
                alt="AirBuddy Pilot" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="h1-responsive-small text-gray-900 text-[28px] sm:text-[32px] mb-2">
              Welcome to AirBuddy
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Your intelligent navigation companion
            </p>
          </div>
          
          {/* Content Section - Expandable */}
          <div className="flex-1 flex items-center justify-center px-2">
            <p className="text-content-responsive text-gray-600 text-center leading-tight sm:leading-relaxed">
              AirBuddy is a Generative UI prototype applied to airport and travel experience. 
              By sensing who you are — whether you're a frequent flyer, a family traveler — 
              AirBuddy dynamically build and adapt interface and features to fit your context.
            </p>
          </div>

          {/* Footer Section */}
          <div className="flex-shrink-0 mt-6">
            <Button 
              onClick={handleContinue}
              className="w-full py-2 sm:py-3 text-sm sm:text-base font-medium bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transform hover:scale-105"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}