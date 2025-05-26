
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, TrendingUp, Award, ArrowLeft, Calendar, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CarbonData {
  totalCredits: number;
  totalValue: number;
  monthlyCredits: { month: string; credits: number }[];
  creditsByType: { type: string; credits: number; transactions: number }[];
  recentActivity: {
    id: string;
    credits_generated: number;
    created_at: string;
    scrap_type: string;
    weight_kg: number;
  }[];
}

const CarbonTracker = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [carbonData, setCarbonData] = useState<CarbonData>({
    totalCredits: 0,
    totalValue: 0,
    monthlyCredits: [],
    creditsByType: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchCarbonData();
    }
  }, [profile]);

  const fetchCarbonData = async () => {
    try {
      // Fetch carbon credits with transaction details
      const { data: credits, error } = await supabase
        .from('carbon_credits')
        .select(`
          *,
          scrap_transactions!inner(
            scrap_type,
            weight_kg,
            seller_id
          )
        `)
        .eq('scrap_transactions.seller_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalCredits = credits.reduce((sum, credit) => sum + credit.credits_generated, 0);
      const totalValue = totalCredits * 500; // Average market price ₹500 per tCO2e

      // Group by month for chart
      const monthlyCredits = credits.reduce((acc: any[], credit) => {
        const month = new Date(credit.created_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short' 
        });
        const existing = acc.find(item => item.month === month);
        if (existing) {
          existing.credits += credit.credits_generated;
        } else {
          acc.push({ month, credits: credit.credits_generated });
        }
        return acc;
      }, []).slice(-6); // Last 6 months

      // Group by scrap type
      const creditsByType = credits.reduce((acc: any[], credit) => {
        const type = credit.scrap_transactions.scrap_type;
        const existing = acc.find(item => item.type === type);
        if (existing) {
          existing.credits += credit.credits_generated;
          existing.transactions += 1;
        } else {
          acc.push({ 
            type, 
            credits: credit.credits_generated, 
            transactions: 1 
          });
        }
        return acc;
      }, []).sort((a, b) => b.credits - a.credits);

      setCarbonData({
        totalCredits,
        totalValue,
        monthlyCredits,
        creditsByType,
        recentActivity: credits.slice(0, 10).map(credit => ({
          id: credit.id,
          credits_generated: credit.credits_generated,
          created_at: credit.created_at,
          scrap_type: credit.scrap_transactions.scrap_type,
          weight_kg: credit.scrap_transactions.weight_kg
        }))
      });
    } catch (error) {
      console.error('Error fetching carbon data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatScrapType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading carbon data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Carbon Credit Tracker
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-medium">{profile?.full_name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Credits Generated</p>
                  <p className="text-3xl font-bold text-green-600">{carbonData.totalCredits.toFixed(4)}</p>
                  <p className="text-sm text-gray-500">tCO2e</p>
                </div>
                <Leaf className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Estimated Value</p>
                  <p className="text-3xl font-bold text-blue-600">₹{carbonData.totalValue.toFixed(0)}</p>
                  <p className="text-sm text-gray-500">at ₹500/tCO2e</p>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Transactions</p>
                  <p className="text-3xl font-bold text-purple-600">{carbonData.creditsByType.reduce((sum, item) => sum + item.transactions, 0)}</p>
                  <p className="text-sm text-gray-500">total trades</p>
                </div>
                <Award className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Credits by Scrap Type */}
          <Card>
            <CardHeader>
              <CardTitle>Credits by Scrap Type</CardTitle>
              <CardDescription>Your carbon credit generation breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {carbonData.creditsByType.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No carbon credits generated yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carbonData.creditsByType.map((item, index) => (
                    <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-green-500' : 
                          index === 1 ? 'bg-blue-500' : 
                          index === 2 ? 'bg-purple-500' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <p className="font-medium">{formatScrapType(item.type)}</p>
                          <p className="text-sm text-gray-600">{item.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{item.credits.toFixed(4)}</p>
                        <p className="text-sm text-gray-500">tCO2e</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Carbon Credits</CardTitle>
              <CardDescription>Latest credit generation activity</CardDescription>
            </CardHeader>
            <CardContent>
              {carbonData.recentActivity.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent activity.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {carbonData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{formatScrapType(activity.scrap_type)}</p>
                        <p className="text-sm text-gray-600">
                          {activity.weight_kg} kg • {new Date(activity.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        +{activity.credits_generated.toFixed(4)} tCO2e
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Your contribution to carbon reduction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {(carbonData.totalCredits * 1000).toFixed(0)}
                </div>
                <div className="text-sm text-green-700">kg CO2 equivalent saved</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(carbonData.totalCredits / 0.4)}
                </div>
                <div className="text-sm text-blue-700">trees worth of CO2 absorption</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(carbonData.totalCredits * 2.3)}
                </div>
                <div className="text-sm text-purple-700">km of car emissions offset</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CarbonTracker;
