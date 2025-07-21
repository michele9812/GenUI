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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between h-full"
          >
            {/* Header with pilot character */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                className="w-16 h-16 mx-auto mb-3 flex items-center justify-center rounded-full overflow-hidden bg-blue-50"
              >
                <img 
                  src={cheerfulPilotPath} 
                  alt="AirBuddy Pilot" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="h1-responsive-small text-gray-900 mb-2"
              >
                Welcome to AirBuddy
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600"
              >
                Your intelligent navigation companion
              </motion.p>
            </div>

            {/* Welcome content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4 mb-8"
            >
              <div className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  AirBuddy provides personalized airport guidance tailored to your travel style. 
                  Whether you're a tech-savvy frequent flyer, traveling with family, or exploring 
                  airports for the first time, we'll guide you every step of the way.
                </p>
              </div>
            </motion.div>

            <div className="mt-auto">
              {/* Continue button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mb-6"
              >
                <Button
                  onClick={handleContinue}
                  className="w-full py-3 font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  Continue
                </Button>
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center"
              >
                <p className="text-xs text-gray-500">
                  Powered by intelligent navigation technology
                </p>
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}