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
      <Card className="w-full max-w-md min-h-[480px] shadow-2xl">
        <CardContent className="p-6 pt-8 pb-8 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full overflow-hidden bg-blue-50">
                <img 
                  src={cheerfulPilotPath} 
                  alt="AirBuddy Pilot" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <h1 className="h1-responsive-small text-gray-900 mb-6">
                Welcome to AirBuddy
              </h1>
              
              <p className="text-gray-600">
                Your intelligent navigation companion
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-600 leading-relaxed">
                AirBuddy is a Generative UI prototype applied to airport and travel experience. 
                By sensing who you are — whether you're a frequent flyer, a family traveler — 
                AirBuddy dynamically build and adapt interface and features to fit your context.
              </p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full py-3 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}