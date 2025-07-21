import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import cheerfulPilotPath from '@assets/Cheerful Pilot Character_1753105244175.png';

export default function OnboardingPage() {
  const [, navigate] = useLocation();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header with pilot character */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden"
          >
            <img 
              src={cheerfulPilotPath} 
              alt="AirBuddy Pilot" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h1-responsive-small text-gray-900 font-bold mb-3"
          >
            Welcome to AirBuddy
          </motion.h1>
          
          
        </div>

        {/* Welcome content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6 mb-8"
        >
          <div className="text-center space-y-4">
            
            
            <p className="text-gray-600 leading-relaxed">
              AirBuddy provides personalized airport guidance tailored to your travel style. 
              Whether you're a tech-savvy frequent flyer, traveling with family, or exploring 
              airports for the first time, we'll guide you every step of the way.
            </p>
            
            
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            size="lg"
          >
            Continue
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-gray-500">
            Powered by intelligent navigation technology
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}