
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, TrendingUp, Award, Clock } from 'lucide-react';

interface CarbonCredit {
  id: string;
  credits_generated: number;
  methodology: string;
  emission_factor: number;
  status: string;
  created_at: string;
  scrap_transactions: {
    scrap_type: string;
    weight_kg: number;
    total_amount: number;
  };
}

const CarbonCalculator = () => {
  const { profile } = useAuth();
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchCarbonCredits();
    }
  }, [profile]);

  const fetchCarbonCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('carbon_credits')
        .select(`
          *,
          scrap_transactions!inner(
            scrap_type,
            weight_kg,
            total_amount,
            seller_id
          )
        `)
        .eq('scrap_transactions.seller_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCredits(data || []);
    } catch (error) {
      console.error('Error fetching carbon credits:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits Generated</p>
                <p className="text-2xl font-bold text-green-600">{totalCredits.toFixed(4)} tCO2e</p>
              </div>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estimated Value</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalValue.toFixed(0)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Credits</p>
                <p className="text-2xl font-bold text-purple-600">
                  {credits.filter(c => c.status === 'verified' || c.status === 'minted').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits List */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Credits History</CardTitle>
          <CardDescription>
            Your automatically calculated carbon credits from scrap transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {credits.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Leaf className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No carbon credits generated yet.</p>
              <p className="text-sm">Create a scrap transaction to start earning credits!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {credits.map((credit) => (
                <div key={credit.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(credit.status)}>
                        {credit.status.charAt(0).toUpperCase() + credit.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">{credit.methodology}</Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(credit.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Scrap Type</p>
                      <p>{formatScrapType(credit.scrap_transactions.scrap_type)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Weight</p>
                      <p>{credit.scrap_transactions.weight_kg} kg</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Credits Generated</p>
                      <p className="text-green-600 font-medium">{credit.credits_generated.toFixed(4)} tCO2e</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Emission Factor</p>
                      <p>{credit.emission_factor} kgCO2e/kg</p>
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
