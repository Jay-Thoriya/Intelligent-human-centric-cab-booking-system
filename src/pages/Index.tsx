
import React, { useState } from 'react';
import BookingForm from '@/components/BookingForm';
import RideIllustration from '@/components/RideIllustration';
import ConfirmationPage from '@/components/ConfirmationPage';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'booking' | 'confirmation'>('booking');
  const [requestId, setRequestId] = useState<string>('');

  const handleConfirmation = (newRequestId: string) => {
    setRequestId(newRequestId);
    setCurrentStep('confirmation');
  };

  const handleStartOver = () => {
    setCurrentStep('booking');
    setRequestId('');
  };

  if (currentStep === 'confirmation') {
    return <ConfirmationPage onStartOver={handleStartOver} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Plan Your <span className="text-blue-600">Perfect Ride</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Book your cab in seconds with our smart scheduling system. Fast, reliable, and always on time.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Form Section */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <BookingForm onConfirmation={handleConfirmation} />
          </div>
          
          {/* Illustration Section */}
          <RideIllustration />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 px-4">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Available 24/7
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            GPS Tracking
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Safe & Secure
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
