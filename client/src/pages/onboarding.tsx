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
      <Card className="w-full max-w-md h-[600px] shadow-2xl">
        <CardContent className="p-0 h-full relative">
          {/* Fixed positioning for all elements */}
          
          {/* Image - Fixed at top */}
          <div className="absolute top-8 left-0 right-0 text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-3xl overflow-hidden bg-blue-50">
              <img 
                src={cheerfulPilotPath} 
                alt="AirBuddy Pilot" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Title - Fixed position */}
          <div className="absolute top-28 left-6 right-6 text-center">
            <h1 className="h1-responsive-small text-gray-900">
              Welcome to AirBuddy
            </h1>
          </div>
          
          {/* Subtitle - Fixed position */}
          <div className="absolute top-44 left-6 right-6 text-center">
            <p className="text-gray-600">
              Your intelligent navigation companion
            </p>
          </div>
          
          {/* Content - Fixed position */}
          <div className="absolute top-64 left-6 right-6 text-center">
            <p className="text-gray-600 leading-relaxed">
              AirBuddy is a Generative UI prototype applied to airport and travel experience. 
              By sensing who you are — whether you're a frequent flyer, a family traveler — 
              AirBuddy dynamically build and adapt interface and features to fit your context.
            </p>
          </div>

          {/* Button - Fixed at bottom */}
          <div className="absolute bottom-6 left-6 right-6">
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