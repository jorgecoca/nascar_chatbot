import React from 'react';

interface RaceTrackLoadingProps {
  message?: string;
}

export const RaceTrackLoading: React.FC<RaceTrackLoadingProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-32 h-16 mb-4">
        {/* Race track */}
        <div className="absolute inset-0 bg-gray-800 rounded-full border-4 border-gray-600"></div>
        <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
        
        {/* Racing car */}
        <div className="absolute top-2 left-2 w-4 h-2 bg-red-600 rounded-sm animate-spin origin-center transform-gpu"></div>
      </div>
      
      <p className="text-yellow-400 font-semibold animate-pulse">{message}</p>
      
      {/* Racing stripes */}
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-6 bg-red-600 animate-pulse"></div>
        <div className="w-2 h-6 bg-white animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-6 bg-yellow-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
  );
};

export const CheckeredFlag: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="checkered-bg w-full h-full opacity-20"></div>
    </div>
  );
};
