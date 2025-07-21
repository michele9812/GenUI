'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  onExpand?: () => void;
  isExpanded?: boolean;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  onExpand,
  isExpanded = false,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowContent(false);
  }, [mediaType]);

  const handleExpand = () => {
    setShowContent(true);
    onExpand?.();
  };

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = isExpanded ? '100vw' : 300;
  const mediaHeight = isExpanded ? '100vh' : 400;

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <div className='absolute inset-0 z-0 h-full bg-gray-100 dark:bg-gray-900' />

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                initial={{ width: 300, height: 400 }}
                animate={{ 
                  width: mediaWidth,
                  height: mediaHeight
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  boxShadow: isExpanded ? 'none' : '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className='relative w-full h-full'>
                  <img
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    className={`w-full h-full object-cover ${isExpanded ? 'rounded-none' : 'rounded-xl'}`}
                  />

                  {!isExpanded && (
                    <motion.div
                      className='absolute inset-0 bg-black/20 rounded-xl'
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>

              {!isExpanded && title && (
                <div className='absolute top-[160px] left-0 right-0 z-10'>
                  <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-800 dark:text-white'>
                    {title}
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { ScrollExpandMedia };
