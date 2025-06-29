
import React, { useState } from 'react';
import { X, Plus, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Driver {
  id: string;
  name: string;
  mobileNumber: string;
  countryCode: string;
}

interface CabDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userRequestId: string;
}

const CabDriverModal = ({ isOpen, onClose, onSuccess, userRequestId }: CabDriverModalProps) => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: '', mobileNumber: '', countryCode: '+1' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addDriver = () => {
    const newDriver: Driver = {
      id: Date.now().toString(),
      name: '',
      mobileNumber: '',
      countryCode: '+1'
    };
    setDrivers([...drivers, newDriver]);
  };

  const updateDriver = (id: string, field: keyof Driver, value: string) => {
    setDrivers(drivers.map(driver => 
      driver.id === id ? { ...driver, [field]: value } : driver
    ));
    // Clear any existing errors for this field
    setErrors(prev => ({ ...prev, [`${id}-${field}`]: '' }));
  };

  const removeDriver = (id: string) => {
    if (drivers.length > 1) {
      setDrivers(drivers.filter(driver => driver.id !== id));
    }
  };

  const validateDrivers = () => {
    const newErrors: Record<string, string> = {};
    const mobileNumbers: string[] = [];

    drivers.forEach((driver, index) => {
      // Validate name
      if (!driver.name.trim()) {
        newErrors[`${driver.id}-name`] = 'Driver name is required';
      }

      // Validate mobile number
      if (!driver.mobileNumber.trim()) {
        newErrors[`${driver.id}-mobileNumber`] = 'Mobile number is required';
      } else if (!/^\d{10,}$/.test(driver.mobileNumber)) {
        newErrors[`${driver.id}-mobileNumber`] = 'Please enter a valid mobile number';
      }

      // Check for duplicate mobile numbers
      const fullNumber = driver.countryCode + driver.mobileNumber;
      if (mobileNumbers.includes(fullNumber)) {
        newErrors[`${driver.id}-mobileNumber`] = 'Each cab driver must have a unique phone number.';
      } else if (driver.mobileNumber.trim()) {
        mobileNumbers.push(fullNumber);
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateDrivers()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare driver data for Supabase
      const driverData = drivers.map(driver => ({
        name: driver.name.trim(),
        mobile_number: driver.countryCode + driver.mobileNumber.trim(),
        user_request_id: userRequestId
      }));

      // Insert drivers into Supabase
      const { error } = await supabase
        .from('cab_drivers')
        .insert(driverData);

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Error",
          description: "Failed to save driver information. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Cab driver information saved successfully.",
      });

      onSuccess();
    } catch (error) {
      console.error('Error saving drivers:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Cab Driver Information</h2>
            <p className="text-gray-600 text-sm mt-1">
              Cab driver information is usually fetched online, but here we're adding it manually.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Driver Forms */}
        <div className="p-6 space-y-6">
          {drivers.map((driver, index) => (
            <div key={driver.id} className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Driver {index + 1}</h3>
                {drivers.length > 1 && (
                  <button
                    onClick={() => removeDriver(driver.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Driver Name */}
              <div className="space-y-2">
                <Label htmlFor={`name-${driver.id}`} className="text-sm font-medium text-blue-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Driver Name
                </Label>
                <div className="relative">
                  <Input
                    id={`name-${driver.id}`}
                    type="text"
                    placeholder="Enter driver name"
                    value={driver.name}
                    onChange={(e) => updateDriver(driver.id, 'name', e.target.value)}
                    className={`pl-10 py-3 rounded-2xl border-gray-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ${
                      errors[`${driver.id}-name`] ? 'border-red-300 focus:ring-red-400' : ''
                    }`}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                </div>
                {errors[`${driver.id}-name`] && (
                  <p className="text-red-500 text-xs">{errors[`${driver.id}-name`]}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor={`mobile-${driver.id}`} className="text-sm font-medium text-orange-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </Label>
                <div className="flex gap-2">
                  <Select 
                    value={driver.countryCode} 
                    onValueChange={(value) => updateDriver(driver.id, 'countryCode', value)}
                  >
                    <SelectTrigger className="w-24 py-3 rounded-2xl border-gray-200 bg-white">
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
                      id={`mobile-${driver.id}`}
                      type="tel"
                      placeholder="Enter mobile number"
                      value={driver.mobileNumber}
                      onChange={(e) => updateDriver(driver.id, 'mobileNumber', e.target.value)}
                      className={`pl-10 py-3 rounded-2xl border-gray-200 bg-white focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 ${
                        errors[`${driver.id}-mobileNumber`] ? 'border-red-300 focus:ring-red-400' : ''
                      }`}
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                  </div>
                </div>
                {errors[`${driver.id}-mobileNumber`] && (
                  <p className="text-red-500 text-xs">{errors[`${driver.id}-mobileNumber`]}</p>
                )}
              </div>
            </div>
          ))}

          {/* Add More Driver Button */}
          <button
            onClick={addDriver}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add More Driver
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            {isSubmitting ? 'Saving...' : 'Save & Submit'}
          </Button>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500 ml-3">Step 2 of 3: Cab Driver Information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabDriverModal;
