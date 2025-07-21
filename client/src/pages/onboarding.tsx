import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import cheerfulPilotPath from '@assets/Cheerful Pilot Character_1753105244175.png';

export default function OnboardingPage() {
  const [, navigate] = useLocation();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="h-viewport flex flex-col bg-gray-200">
      {/* Navbar - Full width with horizontal layout */}
      <div className="w-full px-2 py-2 flex items-center justify-start relative gap-2">
        {/* AirBuddy Logo Square */}
        <div
          className="backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '12px',
            border: '1px solid rgba(107, 114, 128, 0.3)',
            width: '48px',
            height: '48px',
            backgroundImage: "url('/attached_assets/Cheerful%20Pilot%20Character_1753110261655.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center container-responsive-padding">
        <Card className="w-full max-w-md h-[600px] sm:h-[600px] md:h-[600px] shadow-2xl animation-scale-in">
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
            <h1 className="h1-responsive-small text-gray-900">
              Welcome to AirBuddy
            </h1>
          </div>
          
          <div className="absolute top-36 sm:top-44 md:top-44 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <p className="text-sm sm:text-base md:text-base text-gray-600">
              Your intelligent navigation companion
            </p>
          </div>
          
          <div className="absolute top-44 sm:top-56 md:top-56 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6 text-center">
            <p className="text-content-responsive text-gray-600 leading-tight sm:leading-relaxed md:leading-relaxed">
              AirBuddy is a Generative UI prototype applied to airport and travel experience. 
              By sensing who you are — whether you're a frequent flyer, a family traveler — 
              AirBuddy dynamically build and adapt interface and features to fit your context.
            </p>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:left-6 md:right-6">
            <Button 
              onClick={handleContinue}
              className="w-full py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-base font-medium bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transform hover:scale-105"
            >
              Continue
            </Button>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}