
import React from 'react';

const RideIllustration = () => {
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 p-8">
      <div className="relative w-full max-w-lg">
        {/* Background circles for depth */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-5 w-20 h-20 bg-green-100 rounded-full opacity-40"></div>
        <div className="absolute top-32 left-20 w-16 h-16 bg-purple-100 rounded-full opacity-30"></div>
        
        {/* Main illustration container */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 shadow-lg">
          {/* City buildings silhouette */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 opacity-20">
            <div className="w-8 h-24 bg-gray-400 rounded-t"></div>
            <div className="w-6 h-32 bg-gray-400 rounded-t"></div>
            <div className="w-10 h-28 bg-gray-400 rounded-t"></div>
            <div className="w-7 h-36 bg-gray-400 rounded-t"></div>
            <div className="w-9 h-24 bg-gray-400 rounded-t"></div>
            <div className="w-5 h-30 bg-gray-400 rounded-t"></div>
          </div>

          {/* Pickup location (green) */}
          <div className="absolute left-12 top-20">
            <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="text-xs font-medium text-green-700 mt-1 whitespace-nowrap">Pickup</div>
          </div>

          {/* Drop location (red) */}
          <div className="absolute right-8 bottom-32">
            <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="text-xs font-medium text-red-700 mt-1 whitespace-nowrap">Destination</div>
          </div>

          {/* Route path (dashed line) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
            <path
              d="M 60 80 Q 150 40 240 130"
              stroke="#3B82F6"
              strokeWidth="3"
              strokeDasharray="8,4"
              fill="none"
              className="opacity-60"
            />
          </svg>

          {/* Taxi/Cab illustration */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Taxi body */}
              <div className="w-20 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-lg border-2 border-yellow-300">
                {/* Taxi sign */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-yellow-300 rounded-sm border border-yellow-400 flex items-center justify-center">
                  <div className="text-xs font-bold text-yellow-800">TAXI</div>
                </div>
                {/* Windows */}
                <div className="absolute top-1 left-1 w-4 h-4 bg-blue-200 rounded opacity-70"></div>
                <div className="absolute top-1 right-1 w-4 h-4 bg-blue-200 rounded opacity-70"></div>
                {/* Door handle */}
                <div className="absolute top-6 left-8 w-1 h-2 bg-yellow-600 rounded"></div>
              </div>
              {/* Wheels */}
              <div className="absolute -bottom-1 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
              <div className="absolute -bottom-1 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
            </div>
          </div>

          {/* Floating hearts for friendliness */}
          <div className="absolute top-4 right-4 w-4 h-4 text-pink-400 opacity-60">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Motion lines behind taxi */}
          <div className="absolute left-16 top-24 opacity-30">
            <div className="w-8 h-0.5 bg-blue-400 rounded mb-1"></div>
            <div className="w-6 h-0.5 bg-blue-400 rounded mb-1"></div>
            <div className="w-4 h-0.5 bg-blue-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideIllustration;
