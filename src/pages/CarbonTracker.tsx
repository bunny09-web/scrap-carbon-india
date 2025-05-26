
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Leaf, 
  Calculator, 
  Shield, 
  TrendingUp,
  Award,
  Globe,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const CarbonTracker = () => {
  const [scrapType, setScrapType] = useState('');
  const [weight, setWeight] = useState('');
  const [calculatedCredits, setCalculatedCredits] = useState(0);

  const emissionFactors = {
    aluminum: 8.24,
    steel: 2.5,
    pet_plastic: 3.1,
    copper: 6.8,
    paper: 1.2,
    glass: 0.5
  };

  const calculateCredits = () => {
    if (scrapType && weight) {
      const factor = emissionFactors[scrapType as keyof typeof emissionFactors] || 0;
      const credits = parseFloat(weight) * factor;
      setCalculatedCredits(credits);
    }
  };

  const carbonPortfolio = [
    {
      id: 'CC001',
      methodology: 'VM0011',
      type: 'Aluminum Recycling',
      credits: 156.8,
      status: 'Verified',
      price: '₹2,200/tCO2e',
      expiry: '2026-12-31'
    },
    {
      id: 'CC002',
      methodology: 'PM0090',
      type: 'Steel Recovery',
      credits: 89.4,
      status: 'Pending',
      price: '₹1,800/tCO2e',
      expiry: '2026-08-15'
    },
    {
      id: 'CC003',
      methodology: 'VM0011',
      type: 'PET Plastic',
      credits: 67.2,
      status: 'Verified',
      price: '₹2,500/tCO2e',
      expiry: '2027-03-20'
    }
  ];

  const verificationSteps = [
    { step: 'IoT Weight Capture', status: 'completed', time: '2 min' },
    { step: 'Blockchain Recording', status: 'completed', time: '5 min' },
    { step: 'VERRA Validation', status: 'in-progress', time: '24 hrs' },
    { step: 'Credit Minting', status: 'pending', time: 'Pending' },
    { step: 'Market Listing', status: 'pending', time: 'Pending' }
  ];

  const methodologies = [
    {
      code: 'VM0011',
      name: 'Recycling and Composting',
      description: 'Methodology for calculating emission reductions from recycling activities',
      applicability: 'Metals, Plastics, Paper'
    },
    {
      code: 'PM0090',
      name: 'Metal Production from Waste',
      description: 'Specific methodology for metal recovery and processing',
      applicability: 'Ferrous & Non-ferrous metals'
    },
    {
      code: 'REC-IND',
      name: 'Indian REC Mechanism',
      description: 'India-specific renewable energy certificate framework',
      applicability: 'All recyclable materials (2026+)'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-green-200 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Overview</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Carbon Credit Tracker</h1>
              <p className="text-gray-600">Calculate, verify, and manage carbon credits</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <Leaf className="h-4 w-4 mr-2" />
            VERRA Certified
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Carbon Calculator */}
        <Card className="mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-green-600" />
              <span>Carbon Credit Calculator</span>
            </CardTitle>
            <CardDescription>
              Calculate potential carbon credits from your scrap materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Scrap Type</label>
                <Select value={scrapType} onValueChange={setScrapType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scrap type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluminum">Aluminum (8.24 kgCO2e/kg)</SelectItem>
                    <SelectItem value="steel">Steel (2.5 kgCO2e/kg)</SelectItem>
                    <SelectItem value="pet_plastic">PET Plastic (3.1 kgCO2e/kg)</SelectItem>
                    <SelectItem value="copper">Copper (6.8 kgCO2e/kg)</SelectItem>
                    <SelectItem value="paper">Paper (1.2 kgCO2e/kg)</SelectItem>
                    <SelectItem value="glass">Glass (0.5 kgCO2e/kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="Enter weight in kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={calculateCredits}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                  disabled={!scrapType || !weight}
                >
                  Calculate Credits
                </Button>
              </div>
            </div>
            {calculatedCredits > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-green-800">
                      {calculatedCredits.toFixed(2)} tCO2e
                    </div>
                    <div className="text-sm text-green-600">
                      Estimated Carbon Credits
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-800">
                      ₹{(calculatedCredits * 2200).toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600">
                      Estimated Value
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Current Portfolio */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span>Carbon Credit Portfolio</span>
              </CardTitle>
              <CardDescription>Your verified and pending carbon credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carbonPortfolio.map((credit, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{credit.type}</div>
                        <div className="text-sm text-gray-600">{credit.methodology} • {credit.id}</div>
                      </div>
                      <Badge className={
                        credit.status === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {credit.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold">{credit.credits} tCO2e</div>
                        <div className="text-sm text-gray-600">Expires: {credit.expiry}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{credit.price}</div>
                        <div className="text-sm text-gray-600">Current Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Process */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Verification Pipeline</span>
              </CardTitle>
              <CardDescription>Real-time tracking of credit verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : step.status === 'in-progress' ? (
                        <Clock className="h-4 w-4 text-blue-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.step}</div>
                      <div className="text-sm text-gray-600">ETA: {step.time}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      step.status === 'completed' ? 'bg-green-100 text-green-800' :
                      step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Methodologies */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Supported Methodologies</span>
            </CardTitle>
            <CardDescription>
              VERRA-approved carbon credit calculation frameworks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {methodologies.map((method, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-blue-100 text-blue-800">{method.code}</Badge>
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="font-medium mb-2">{method.name}</div>
                  <div className="text-sm text-gray-600 mb-3">{method.description}</div>
                  <div className="text-xs text-gray-500">
                    <strong>Applies to:</strong> {method.applicability}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarbonTracker;
