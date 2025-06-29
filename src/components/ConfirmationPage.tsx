
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationPageProps {
  onStartOver: () => void;
}

const ConfirmationPage = ({ onStartOver }: ConfirmationPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-pulse" />
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Ride Request Submitted!
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-2">
            We're finding the best cab options for you.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            You'll receive a call shortly.
          </p>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Request Processed
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Drivers Notified
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Call Incoming
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onStartOver}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          Book Another Ride
        </Button>

        {/* Step Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 ml-3">Step 3 of 3: Confirmation</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
