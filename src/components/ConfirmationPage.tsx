
import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { callOmnidimDispatch } from '@/utils/omnidimApi';

interface ConfirmationPageProps {
  onStartOver: () => void;
}

const ConfirmationPage = ({ onStartOver }: ConfirmationPageProps) => {
  useEffect(() => {
    const triggerOmnidimCall = async () => {
      try {
        console.log('Fetching latest ride request and cab driver data...');

        // Fetch the latest ride request
        const { data: rideRequest, error: rideError } = await supabase
          .from('ride_requests')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (rideError || !rideRequest) {
          console.error('Failed to fetch ride request:', rideError);
          toast({
            title: "Error",
            description: "Failed to fetch ride request data for dispatch call.",
            variant: "destructive"
          });
          return;
        }

        // Fetch the latest cab driver
        const { data: cabDriver, error: driverError } = await supabase
          .from('cab_drivers')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (driverError || !cabDriver) {
          console.error('Failed to fetch cab driver:', driverError);
          toast({
            title: "Error",
            description: "Failed to fetch cab driver data for dispatch call.",
            variant: "destructive"
          });
          return;
        }

        console.log('Fetched ride request:', rideRequest);
        console.log('Fetched cab driver:', cabDriver);

        // Make the Omnidim API call
        const success = await callOmnidimDispatch(rideRequest, cabDriver.mobile_number);

        if (success) {
          toast({
            title: "Dispatch Call Initiated",
            description: "Successfully initiated call to cab driver via Omnidim.",
          });
        } else {
          toast({
            title: "Dispatch Call Failed",
            description: "Failed to initiate call to cab driver. Please try again.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error in triggerOmnidimCall:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while initiating the dispatch call.",
          variant: "destructive"
        });
      }
    };

    // Trigger the API call when the confirmation page loads
    triggerOmnidimCall();
  }, []);

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
