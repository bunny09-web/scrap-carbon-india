
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Calculator, Package, MapPin, Loader2 } from 'lucide-react';

const scrapTypes = [
  { value: 'aluminum', label: 'Aluminum', price: 120 },
  { value: 'steel', label: 'Steel', price: 45 },
  { value: 'pet_plastic', label: 'PET Plastic', price: 25 },
  { value: 'copper', label: 'Copper', price: 600 },
  { value: 'paper', label: 'Paper', price: 12 },
  { value: 'glass', label: 'Glass', price: 8 },
  { value: 'e_waste', label: 'E-Waste', price: 35 },
  { value: 'cardboard', label: 'Cardboard', price: 10 },
  { value: 'brass', label: 'Brass', price: 350 },
  { value: 'iron', label: 'Iron', price: 30 },
  { value: 'mixed_plastic', label: 'Mixed Plastic', price: 18 },
  { value: 'textile', label: 'Textile', price: 15 }
];

const ScrapTransactionForm = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    scrap_type: '',
    weight_kg: '',
    price_per_kg: '',
    location: '',
    notes: ''
  });

  const [errors, setErrors] = useState({
    scrap_type: '',
    weight_kg: '',
    price_per_kg: '',
    location: ''
  });

  const selectedScrap = scrapTypes.find(s => s.value === formData.scrap_type);
  const totalAmount = formData.weight_kg && formData.price_per_kg 
    ? parseFloat(formData.weight_kg) * parseFloat(formData.price_per_kg)
    : 0;

  const validateForm = () => {
    const newErrors = {
      scrap_type: '',
      weight_kg: '',
      price_per_kg: '',
      location: ''
    };
    let isValid = true;

    if (!formData.scrap_type) {
      newErrors.scrap_type = 'Please select a scrap type';
      isValid = false;
    }

    if (!formData.weight_kg || parseFloat(formData.weight_kg) <= 0) {
      newErrors.weight_kg = 'Please enter a valid weight';
      isValid = false;
    }

    if (!formData.price_per_kg || parseFloat(formData.price_per_kg) <= 0) {
      newErrors.price_per_kg = 'Please enter a valid price';
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please enter a location';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleScrapTypeChange = (value: string) => {
    const scrap = scrapTypes.find(s => s.value === value);
    setFormData({
      ...formData,
      scrap_type: value,
      price_per_kg: scrap ? scrap.price.toString() : ''
    });
    // Clear scrap type error when user selects
    if (errors.scrap_type) {
      setErrors({ ...errors, scrap_type: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      toast({
        title: "Authentication required",
        description: "Please log in to create transactions",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scrap_transactions')
        .insert({
          seller_id: profile.id,
          scrap_type: formData.scrap_type as any,
          weight_kg: parseFloat(formData.weight_kg),
          price_per_kg: parseFloat(formData.price_per_kg),
          total_amount: totalAmount,
          location: formData.location.trim(),
          notes: formData.notes.trim() || null
        })
        .select()
        .single();

      if (error) {
        console.error('Transaction creation error:', error);
        throw new Error(error.message);
      }

      toast({
        title: "Transaction Created!",
        description: `Created scrap listing for ${formData.weight_kg}kg of ${selectedScrap?.label}. Carbon credits will be automatically calculated.`,
      });

      // Reset form
      setFormData({
        scrap_type: '',
        weight_kg: '',
        price_per_kg: '',
        location: '',
        notes: ''
      });
      setErrors({
        scrap_type: '',
        weight_kg: '',
        price_per_kg: '',
        location: ''
      });
    } catch (error: any) {
      console.error('Transaction creation failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create transaction",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-6 w-6" />
          <span>Create Scrap Transaction</span>
        </CardTitle>
        <CardDescription>
          List your scrap for recycling and automatically generate carbon credits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="scrap_type">Scrap Type</Label>
            <Select value={formData.scrap_type} onValueChange={handleScrapTypeChange}>
              <SelectTrigger className={errors.scrap_type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select scrap type" />
              </SelectTrigger>
              <SelectContent>
                {scrapTypes.map((scrap) => (
                  <SelectItem key={scrap.value} value={scrap.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{scrap.label}</span>
                      <span className="text-green-600 font-medium ml-4">₹{scrap.price}/kg</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.scrap_type && <p className="text-sm text-red-500">{errors.scrap_type}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight_kg">Weight (kg)</Label>
              <Input
                id="weight_kg"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Enter weight"
                value={formData.weight_kg}
                onChange={(e) => {
                  setFormData({...formData, weight_kg: e.target.value});
                  if (errors.weight_kg) setErrors({...errors, weight_kg: ''});
                }}
                className={errors.weight_kg ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.weight_kg && <p className="text-sm text-red-500">{errors.weight_kg}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_per_kg">Price per kg (₹)</Label>
              <Input
                id="price_per_kg"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Price per kg"
                value={formData.price_per_kg}
                onChange={(e) => {
                  setFormData({...formData, price_per_kg: e.target.value});
                  if (errors.price_per_kg) setErrors({...errors, price_per_kg: ''});
                }}
                className={errors.price_per_kg ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.price_per_kg && <p className="text-sm text-red-500">{errors.price_per_kg}</p>}
            </div>
          </div>

          {totalAmount > 0 && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Transaction Summary</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                Total Amount: ₹{totalAmount.toFixed(2)}
              </div>
              {selectedScrap && (
                <div className="text-sm text-green-700 mt-1">
                  Estimated Carbon Credits: {(parseFloat(formData.weight_kg || '0') * 
                    (selectedScrap.value === 'aluminum' ? 8.24 : 
                     selectedScrap.value === 'steel' ? 2.5 : 
                     selectedScrap.value === 'pet_plastic' ? 3.1 : 2.0)).toFixed(4)} tCO2e
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                placeholder="Enter pickup location"
                className={`pl-9 ${errors.location ? 'border-red-500' : ''}`}
                value={formData.location}
                onChange={(e) => {
                  setFormData({...formData, location: e.target.value});
                  if (errors.location) setErrors({...errors, location: ''});
                }}
                disabled={loading}
              />
            </div>
            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the scrap..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              disabled={loading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-600 to-blue-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Transaction...
              </>
            ) : (
              'Create Transaction'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScrapTransactionForm;
