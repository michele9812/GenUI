import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/hooks/use-persona';
import { Carousel3D } from '@/components/ui/carousel-3d';
import { PromptInputBox } from '@/components/ui/ai-prompt-box';
import { motion } from 'framer-motion';

export default function JourneyDetail() {
  const { selectedPersona, currentStep } = usePersona();
  const [, setLocation] = useLocation();

  if (!selectedPersona || !currentStep) {
    setLocation('/welcome');
    return null;
  }

  const handleBack = () => {
    setLocation('/welcome');
  };

  const handleSendMessage = (message: string, files?: File[]) => {
    console.log('AirBuddy message:', message);
    console.log('Files:', files);
    // Here you would handle the AI assistant interaction
  };

  const handleCarouselItemSelect = (item: any) => {
    console.log('Selected item:', item);
    // Here you would handle item selection action
  };

  // Sample carousel items (these would come from your data)
  const carouselItems = [
    {
      id: '1',
      title: 'Find My Gate',
      description: 'Get directions to your departure gate with real-time updates',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
      icon: 'flight_takeoff'
    },
    {
      id: '2', 
      title: 'Security Checkpoint',
      description: 'Find the fastest security line and estimated wait times',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      icon: 'security'
    },
    {
      id: '3',
      title: 'Dining Options',
      description: 'Discover restaurants and cafes near your gate or terminal',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', 
      icon: 'restaurant'
    },
    {
      id: '4',
      title: 'Shopping',
      description: 'Browse duty-free shops and retail stores in your area',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      icon: 'shopping_bag'
    },
    {
      id: '5',
      title: 'Wi-Fi & Charging',
      description: 'Find free Wi-Fi zones and charging stations nearby',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
      icon: 'wifi'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 text-gray-700 hover:text-gray-900"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to journey selection</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 w-full px-4 sm:px-6 lg:px-8 pt-[40px] pb-[40px]">
          
          {/* Title */}
          <motion.div 
            className="text-center mb-6 md:mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Ciao{' '}
              <span style={{ color: selectedPersona.colors.primary }}>
                {selectedPersona.name}
              </span>
              ,
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-gray-700">
              I am your AirBuddy and I am here to assist you!
            </p>
          </motion.div>

          {/* 3D Carousel */}
          <motion.div 
            className="mb-6 md:mb-8 lg:mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Carousel3D 
              items={carouselItems}
              onItemSelect={handleCarouselItemSelect}
              accentColor={selectedPersona.colors.primary}
              className="h-[400px] sm:h-[450px] lg:h-[500px]"
            />
          </motion.div>

          {/* AI Prompt Input */}
          <motion.div 
            className="max-w-4xl mx-auto mb-6 md:mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PromptInputBox 
              onSend={handleSendMessage}
              placeholder="Ask me anything about your journey..."
              className="w-full"
            />
          </motion.div>

      </main>
    </div>
  );
}
