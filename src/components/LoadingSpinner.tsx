'use client';

import { useState, useEffect } from 'react';
import { CloudSun, Thermometer, Droplet, Wind } from 'lucide-react';

export default function LoadingSpinner() {
  const [funFacts] = useState([
    "Nairobi means 'cool water' in the Maasai language",
    "The city sits at 1,795 meters above sea level",
    "July is typically the coolest month in Nairobi",
    "Nairobi National Park is the only wildlife park in a capital city",
  ]);

  const [currentFact, setCurrentFact] = useState(funFacts[0]);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFact((prevFact) => {
        const currentIndex = funFacts.indexOf(prevFact);
        return funFacts[(currentIndex + 1) % funFacts.length];
      });
    }, 5000); 

    return () => clearInterval(factInterval);
  }, [funFacts]);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      <div className="relative">
        <CloudSun className="w-16 h-16 text-blue-400 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center space-x-4">
          <Thermometer className="w-6 h-6 text-blue-500" />
          <div className="w-full bg-blue-100 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full animate-pulse" 
              style={{ width: '70%' }}
            ></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Droplet className="w-6 h-6 text-blue-500" />
          <div className="w-full bg-blue-100 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full animate-pulse" 
              style={{ width: '50%' }}
            ></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Wind className="w-6 h-6 text-blue-500" />
          <div className="w-full bg-blue-100 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full animate-pulse" 
              style={{ width: '30%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-md">
        <p className="text-blue-600 font-medium">Did you know?</p>
        <p className="text-gray-600 animate-fade-in">{currentFact}</p>
      </div>
    </div>
  );
}