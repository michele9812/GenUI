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
    <div className="h-viewport flex items-center justify-center bg-gray-200 container-responsive-padding text-[32px]">
      <Card className="w-full max-w-md h-[600px] sm:h-[680px] md:h-[680px] shadow-2xl animation-scale-in">
        <CardContent className="p-0 h-full relative">
          <div className="absolute top-6 sm:top-8 md:top-8 left-0 right-0 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 mx-auto flex items-center justify-center radius-responsive overflow-hidden bg-gray-50">
              <img 
                src={cheerfulPilotPath} 
                alt="AirBuddy Pilot" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="absolute top-24 sm:top-28 md:top-28 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <h1 className="h1-responsive-small text-gray-900 text-[32px]">
              Welcome to AirBuddy
            </h1>
          </div>
          
          <div className="absolute top-32 sm:top-44 md:top-44 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <p className="text-sm sm:text-base md:text-base text-gray-600">
              Your intelligent navigation companion
            </p>
          </div>
          
          <div className="absolute top-40 sm:top-56 md:top-56 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <p className="text-content-responsive text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">
              AirBuddy is a Generative UI prototype applied to airport and travel experience. 
              By sensing who you are — whether you're a frequent flyer, a family traveler — 
              AirBuddy dynamically build and adapt interface and features to fit your context.
            </p>
          </div>

          <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6">
            <Button 
              onClick={handleContinue}
              className="w-full py-1.5 sm:py-3 md:py-3 text-sm sm:text-base md:text-base font-medium bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transform hover:scale-105"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}