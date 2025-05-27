
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, TrendingUp, Award, Clock, Download, Eye } from 'lucide-react';

interface CarbonCredit {
  id: string;
  credits_generated: number;
  methodology: string;
  emission_factor: number;
  status: string;
  created_at: string;
  scrap_type: string;
  weight_kg: number;
  total_amount: number;
}

const CarbonCalculator = () => {
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for MVP
  const mockCredits: CarbonCredit[] = [
    {
      id: '1',
      credits_generated: 0.412,
      methodology: 'VM0011',
      emission_factor: 8.24,
      status: 'verified',
      created_at: new Date().toISOString(),
      scrap_type: 'aluminum',
      weight_kg: 50,
      total_amount: 6000
    },
    {
      id: '2',
      credits_generated: 0.093,
      methodology: 'PM0090',
      emission_factor: 3.1,
      status: 'calculated',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      scrap_type: 'pet_plastic',
      weight_kg: 30,
      total_amount: 750
    },
    {
      id: '3',
      credits_generated: 0.25,
      methodology: 'VM0011',
      emission_factor: 2.5,
      status: 'minted',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      scrap_type: 'steel',
      weight_kg: 100,
      total_amount: 3500
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setCredits(mockCredits);
      setLoading(false);
    }, 1000);
  }, []);

  const totalCredits = credits.reduce((sum, credit) => sum + credit.credits_generated, 0);
  const totalValue = credits.reduce((sum, credit) => {
    const marketPrice = 500; // ₹500 per tCO2e average
    return sum + (credit.credits_generated * marketPrice);
  }, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'calculated': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'minted': return 'bg-green-100 text-green-800';
      case 'traded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatScrapType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Credits Generated</p>
                <p className="text-3xl font-bold text-green-600">{totalCredits.toFixed(4)} tCO2e</p>
                <p className="text-xs text-green-600 mt-1">Environmental Impact Verified</p>
              </div>
              <Leaf className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Estimated Market Value</p>
                <p className="text-3xl font-bold text-blue-600">₹{totalValue.toFixed(0)}</p>
                <p className="text-xs text-blue-600 mt-1">@ ₹500/tCO2e average</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Verified Credits</p>
                <p className="text-3xl font-bold text-purple-600">
                  {credits.filter(c => c.status === 'verified' || c.status === 'minted').length}
                </p>
                <p className="text-xs text-purple-600 mt-1">Ready for Trading</p>
              </div>
              <Award className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits List */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Credits Portfolio</CardTitle>
          <CardDescription>
            Your automatically calculated carbon credits from scrap transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {credits.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Leaf className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No carbon credits generated yet</h3>
              <p className="text-sm">Create a scrap transaction to start earning credits!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {credits.map((credit) => (
                <div key={credit.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(credit.status)}>
                        {credit.status.charAt(0).toUpperCase() + credit.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {credit.methodology}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Credit ID: {credit.id}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(credit.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="font-medium text-gray-600 text-sm">Scrap Type</p>
                      <p className="text-lg">{formatScrapType(credit.scrap_type)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600 text-sm">Weight</p>
                      <p className="text-lg">{credit.weight_kg} kg</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600 text-sm">Credits Generated</p>
                      <p className="text-lg text-green-600 font-semibold">{credit.credits_generated.toFixed(4)} tCO2e</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600 text-sm">Emission Factor</p>
                      <p className="text-lg">{credit.emission_factor} kgCO2e/kg</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600 text-sm">Market Value</p>
                      <p className="text-lg text-blue-600 font-semibold">₹{(credit.credits_generated * 500).toFixed(0)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Transaction Value: <span className="font-medium">₹{credit.total_amount}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonCalculator;
