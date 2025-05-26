
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Package, Clock, Eye, MapPin, CheckCircle } from 'lucide-react';

interface Transaction {
  id: string;
  scrap_type: string;
  weight_kg: number;
  price_per_kg: number;
  total_amount: number;
  status: string;
  location: string;
  notes: string;
  created_at: string;
  buyer_id: string | null;
  carbon_credits: {
    credits_generated: number;
    status: string;
  }[];
}

const TransactionHistory = () => {
  const { profile } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchTransactions();
    }
  }, [profile]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('scrap_transactions')
        .select(`
          *,
          carbon_credits(credits_generated, status)
        `)
        .eq('seller_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span>Your Transactions</span>
          </CardTitle>
          <CardDescription>
            View all your scrap transactions and their carbon credit generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No transactions found.</p>
              <p className="text-sm">Create your first transaction to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                      <span className="font-medium text-lg">{formatScrapType(transaction.scrap_type)}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Weight</p>
                      <p className="text-lg">{transaction.weight_kg} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Price per kg</p>
                      <p className="text-lg">₹{transaction.price_per_kg}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-green-600">₹{transaction.total_amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Carbon Credits</p>
                      <p className="text-lg text-blue-600">
                        {transaction.carbon_credits?.[0]?.credits_generated?.toFixed(4) || '0'} tCO2e
                      </p>
                    </div>
                  </div>

                  {transaction.location && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{transaction.location}</span>
                    </div>
                  )}

                  {transaction.notes && (
                    <div className="text-sm text-gray-600 mb-4">
                      <p className="font-medium">Notes:</p>
                      <p>{transaction.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {transaction.buyer_id ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Buyer Found</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Looking for buyer</span>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
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

export default TransactionHistory;
