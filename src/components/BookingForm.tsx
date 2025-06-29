
import React, { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    preferredTime: '',
    mobileNumber: '',
    countryCode: '+1'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.pickupLocation || !formData.dropLocation || !formData.preferredTime || !formData.mobileNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ride Request Submitted!",
      description: "We're finding the best cab options for you. Please wait a moment.",
    });

    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Where do you want to go?</h2>
        <p className="text-gray-600 text-sm">Fill in your details and we'll handle the rest</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pickup Location */}
        <div className="space-y-2">
          <Label htmlFor="pickup" className="text-sm font-medium text-blue-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Pickup Location
          </Label>
          <div className="relative">
            <Input
              id="pickup"
              type="text"
              placeholder="Enter your pickup location"
              value={formData.pickupLocation}
              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
              className="pl-10 py-6 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* Drop Location */}
        <div className="space-y-2">
          <Label htmlFor="drop" className="text-sm font-medium text-green-600 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Drop Location
          </Label>
          <div className="relative">
            <Input
              id="drop"
              type="text"
              placeholder="Enter your destination"
              value={formData.dropLocation}
              onChange={(e) => handleInputChange('dropLocation', e.target.value)}
              className="pl-10 py-6 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          </div>
        </div>

        {/* Preferred Time */}
        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-medium text-purple-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Preferred Time
          </Label>
          <div className="relative">
            <Input
              id="time"
              type="datetime-local"
              value={formData.preferredTime}
              onChange={(e) => handleInputChange('preferredTime', e.target.value)}
              className="pl-10 py-6 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
            />
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium text-orange-600 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Mobile Number
          </Label>
          <div className="flex gap-2">
            <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
              <SelectTrigger className="w-24 py-6 rounded-2xl border-gray-200 bg-gray-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+1">US +1</SelectItem>
                <SelectItem value="+44">UK +44</SelectItem>
                <SelectItem value="+91">IN +91</SelectItem>
                <SelectItem value="+61">AU +61</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="pl-10 py-6 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit"
          className="w-full py-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          Request Cab Options
        </Button>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 ml-3">Step 1 of 3: Booking Details</p>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
