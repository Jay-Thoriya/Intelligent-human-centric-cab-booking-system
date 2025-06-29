
interface RideRequest {
  id: string;
  pickup_location: string;
  drop_location: string;
  preferred_time: string;
  mobile_number: string;
  country_code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface CabDriver {
  id: string;
  name: string;
  mobile_number: string;
  user_request_id: string;
  created_at: string;
  updated_at: string;
}

interface OmnidimCallRequest {
  agent_id: number;
  to_number: string;
  call_context: {
    ride_request: RideRequest;
  };
}

export const callOmnidimDispatch = async (rideRequest: RideRequest, cabDriverPhone: string): Promise<boolean> => {
  try {
    const requestData: OmnidimCallRequest = {
      agent_id: 2678,
      to_number: cabDriverPhone,
      call_context: {
        ride_request: rideRequest
      }
    };

    console.log('Making Omnidim API call with data:', requestData);

    const response = await fetch('https://backend.omnidim.io/api/v1/calls/dispatch', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 0lZ4Dcrwv9PDH_CWHLDPs7aTpaqBocR68WDLCxVp8ps',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      console.error('Omnidim API call failed:', response.status, response.statusText);
      return false;
    }

    const result = await response.json();
    console.log('Omnidim API call successful:', result);
    return true;
  } catch (error) {
    console.error('Error calling Omnidim API:', error);
    return false;
  }
};
