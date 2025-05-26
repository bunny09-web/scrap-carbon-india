
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MapPin, Package, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MarketplaceListing {
  id: string;
  scrap_type: string;
  weight_kg: number;
  price_per_kg: number;
  total_amount: number;
  location: string;
  notes: string;
  created_at: string;
  seller_id: string;
  profiles: {
    full_name: string;
    phone: string;
  };
}

const ScrapMarketplace = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const scrapTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'steel', label: 'Steel' },
    { value: 'pet_plastic', label: 'PET Plastic' },
    { value: 'copper', label: 'Copper' },
    { value: 'paper', label: 'Paper' },
    { value: 'glass', label: 'Glass' },
    { value: 'e_waste', label: 'E-Waste' },
    { value: 'cardboard', label: 'Cardboard' },
    { value: 'brass', label: 'Brass' },
    { value: 'iron', label: 'Iron' },
    { value: 'mixed_plastic', label: 'Mixed Plastic' },
    { value: 'textile', label: 'Textile' }
  ];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('scrap_transactions')
        .select(`
          id,
          scrap_type,
          weight_kg,
          price_per_kg,
          total_amount,
          location,
          notes,
          created_at,
          seller_id,
          profiles!seller_id(full_name, phone)
        `)
        .eq('status', 'pending')
        .neq('seller_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching marketplace listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowInterest = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('scrap_transactions')
        .update({ buyer_id: profile?.id, status: 'verified' })
        .eq('id', listingId);

      if (error) throw error;

      toast({
        title: "Interest Registered",
        description: "The seller has been notified of your interest.",
      });

      fetchListings(); // Refresh listings
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatScrapType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.scrap_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || listing.scrap_type === selectedType;
    return matchesSearch && matchesType;
  });

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
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Scrap Marketplace
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
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by scrap type, location, or seller..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {scrapTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No listings found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedType !== 'all' 
                  ? 'Try adjusting your search filters' 
                  : 'No scrap listings available at the moment'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{formatScrapType(listing.scrap_type)}</CardTitle>
                    <Badge variant="secondary">{listing.weight_kg} kg</Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.location || 'Location not specified'}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Price per kg</p>
                      <p className="text-lg font-semibold text-green-600">₹{listing.price_per_kg}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-blue-600">₹{listing.total_amount}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium text-gray-600">Seller</p>
                    <p>{listing.profiles?.full_name}</p>
                  </div>

                  {listing.notes && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-600">Notes</p>
                      <p className="text-gray-700 line-clamp-2">{listing.notes}</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    Listed {new Date(listing.created_at).toLocaleDateString()}
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => handleShowInterest(listing.id)}
                  >
                    Show Interest
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ScrapMarketplace;
