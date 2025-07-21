import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import cheerfulPilotPath from '@assets/Cheerful Pilot Character_1753105244175.png';

export default function OnboardingPage() {
  const [, navigate] = useLocation();

  const handleContinue = () => {
    navigate('/login');
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
                  src={cheerfulPilotPath} 
                  alt="AirBuddy Pilot" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="h1-responsive-small text-gray-900">
                Welcome to AirBuddy
              </h1>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">
                Your intelligent navigation companion
              </p>
            </div>
          </div>

          {/* Flexible Content Area */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="text-center">
              <p className="text-gray-600 leading-relaxed">
                AirBuddy is a Generative UI prototype applied to airport and travel experience. 
                By sensing who you are — whether you're a frequent flyer, a family traveler — 
                AirBuddy dynamically build and adapt interface and features to fit your context.
              </p>
            </div>
            {/* Fixed spacer to match login step preview area */}
            <div className="min-h-[120px] sm:min-h-[130px] md:min-h-[140px] lg:min-h-[150px]"></div>
          </div>

          {/* Fixed Button Area */}
          <div className="mt-auto pb-6">
            <Button
              onClick={handleContinue}
              className="w-full py-3 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}