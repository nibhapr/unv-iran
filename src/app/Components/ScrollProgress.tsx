'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx || 0;
      setProgress(scrolled);
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
          style={{ 
            originX: 0,
            scaleX: progress 
          }}
        />
      </div>
    </div>
  );
}