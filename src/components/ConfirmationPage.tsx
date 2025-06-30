
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
    const triggerOmnidimCalls = async () => {
      try {
        console.log('Fetching latest ride request and all associated cab drivers...');

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
            description: "Failed to fetch ride request data for dispatch calls.",
            variant: "destructive"
          });
          return;
        }

        // Fetch all cab drivers associated with this ride request
        const { data: cabDrivers, error: driversError } = await supabase
          .from('cab_drivers')
          .select('*')
          .eq('user_request_id', rideRequest.id)
          .order('created_at', { ascending: false });

        if (driversError || !cabDrivers || cabDrivers.length === 0) {
          console.error('Failed to fetch cab drivers:', driversError);
          toast({
            title: "Error",
            description: "Failed to fetch cab driver data for dispatch calls.",
            variant: "destructive"
          });
          return;
        }

        console.log('Fetched ride request:', rideRequest);
        console.log(`Found ${cabDrivers.length} cab driver(s):`, cabDrivers);

        // Make Omnidim API calls to all cab drivers
        let successfulCalls = 0;
        let failedCalls = 0;

        for (const cabDriver of cabDrivers) {
          try {
            console.log(`Making dispatch call to driver: ${cabDriver.name} (${cabDriver.mobile_number})`);
            const success = await callOmnidimDispatch(rideRequest, cabDriver);
            
            if (success) {
              successfulCalls++;
              console.log(`✅ Successfully called ${cabDriver.name}`);
            } else {
              failedCalls++;
              console.log(`❌ Failed to call ${cabDriver.name}`);
            }
          } catch (error) {
            failedCalls++;
            console.error(`Error calling ${cabDriver.name}:`, error);
          }
        }

        // Show summary toast
        if (successfulCalls > 0 && failedCalls === 0) {
          toast({
            title: "All Dispatch Calls Successful",
            description: `Successfully initiated calls to all ${successfulCalls} cab driver(s) via Omnidim.`,
          });
        } else if (successfulCalls > 0 && failedCalls > 0) {
          toast({
            title: "Partial Success",
            description: `${successfulCalls} call(s) successful, ${failedCalls} call(s) failed. Please check the console for details.`,
            variant: "destructive"
          });
        } else {
          toast({
            title: "All Dispatch Calls Failed",
            description: "Failed to initiate calls to any cab drivers. Please try again.",
            variant: "destructive"
          });
        }

      } catch (error) {
        console.error('Error in triggerOmnidimCalls:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while initiating the dispatch calls.",
          variant: "destructive"
        });
      }
    };

    // Trigger the API calls when the confirmation page loads
    triggerOmnidimCalls();
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
            We're contacting all available cab drivers for you.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            You'll receive calls from interested drivers shortly.
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
              All Drivers Contacted
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Calls Incoming
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
