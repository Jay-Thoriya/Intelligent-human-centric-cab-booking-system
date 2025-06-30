
import React from 'react';

const RideIllustration = () => {
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 p-8">
      <div className="relative w-full max-w-lg">
        {/* Background circles for depth with floating animation */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 left-5 w-20 h-20 bg-green-100 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-32 left-20 w-16 h-16 bg-purple-100 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Main illustration container */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 shadow-lg">
          {/* City buildings silhouette with subtle animation */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 opacity-20">
            <div className="w-8 h-24 bg-gray-400 rounded-t animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-6 h-32 bg-gray-400 rounded-t animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="w-10 h-28 bg-gray-400 rounded-t animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <div className="w-7 h-36 bg-gray-400 rounded-t animate-pulse" style={{animationDelay: '0.8s'}}></div>
            <div className="w-9 h-24 bg-gray-400 rounded-t animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="w-5 h-30 bg-gray-400 rounded-t animate-pulse" style={{animationDelay: '1.2s'}}></div>
          </div>

          {/* Pickup location (green) with pulsing animation */}
          <div className="absolute left-12 top-20">
            <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-ping">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="text-xs font-medium text-green-700 mt-1 whitespace-nowrap animate-fade-in">Pickup</div>
          </div>

          {/* Drop location (red) with pulsing animation */}
          <div className="absolute right-8 bottom-32">
            <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-ping" style={{animationDelay: '1s'}}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="text-xs font-medium text-red-700 mt-1 whitespace-nowrap animate-fade-in" style={{animationDelay: '1s'}}>Destination</div>
          </div>

          {/* Route path (animated dashed line) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
            <path
              d="M 60 80 Q 150 40 240 130"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="8,4"
              fill="none"
              className="opacity-60"
              style={{
                strokeDashoffset: '100',
                animation: 'dash 3s linear infinite'
              }}
            />
          </svg>

          {/* Taxi/Cab illustration with movement animation */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="relative">
              {/* Taxi body */}
              <div className="w-20 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-lg border-2 border-yellow-300 hover:scale-110 transition-transform duration-300">
                {/* Taxi sign with blinking animation */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-yellow-300 rounded-sm border border-yellow-400 flex items-center justify-center animate-pulse">
                  <div className="text-xs font-bold text-yellow-800">TAXI</div>
                </div>
                {/* Windows with reflection animation */}
                <div className="absolute top-1 left-1 w-4 h-4 bg-blue-200 rounded opacity-70 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-1 right-1 w-4 h-4 bg-blue-200 rounded opacity-70 animate-pulse" style={{animationDelay: '0.7s'}}></div>
                {/* Door handle */}
                <div className="absolute top-6 left-8 w-1 h-2 bg-yellow-600 rounded"></div>
              </div>
              {/* Wheels with rotation animation */}
              <div className="absolute -bottom-1 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 animate-spin" style={{animationDuration: '2s'}}></div>
              <div className="absolute -bottom-1 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600 animate-spin" style={{animationDuration: '2s'}}></div>
            </div>
          </div>

          {/* Floating hearts with animation */}
          <div className="absolute top-4 right-4 w-4 h-4 text-pink-400 opacity-60 animate-bounce" style={{animationDelay: '0.3s'}}>
            <svg fill="currentColor" viewBox="0 0 20 20" className="hover:scale-125 transition-transform duration-200">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Motion lines behind taxi with flowing animation */}
          <div className="absolute left-16 top-24 opacity-30">
            <div className="w-8 h-0.5 bg-blue-400 rounded mb-1 animate-pulse" style={{animationDelay: '0.1s'}}></div>
            <div className="w-6 h-0.5 bg-blue-400 rounded mb-1 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-4 h-0.5 bg-blue-400 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
          </div>

          {/* Additional floating elements for more life */}
          <div className="absolute top-16 left-8 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-40" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-16 right-16 w-3 h-3 bg-green-300 rounded-full animate-bounce opacity-50" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>

      {/* Custom CSS for dash animation */}
      <style jsx>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RideIllustration;
