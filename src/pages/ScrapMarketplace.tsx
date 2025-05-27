
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MapPin, Package, ShoppingCart, ArrowLeft, User, Phone, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

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
  seller_name: string;
  seller_phone: string;
  seller_rating: number;
  verified: boolean;
}

const ScrapMarketplace = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { profile, loading } = useAuth();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);
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

  // Mock data for MVP testing
  const mockListings: MarketplaceListing[] = [
    {
      id: '1',
      scrap_type: 'aluminum',
      weight_kg: 25,
      price_per_kg: 110,
      total_amount: 2750,
      location: 'Mumbai, Maharashtra',
      notes: 'High-grade aluminum sheets and cans',
      created_at: new Date().toISOString(),
      seller_id: 'seller-1',
      seller_name: 'Rajesh Kumar',
      seller_phone: '+91 9876543210',
      seller_rating: 4.8,
      verified: true
    },
    {
      id: '2',
      scrap_type: 'steel',
      weight_kg: 150,
      price_per_kg: 32,
      total_amount: 4800,
      location: 'Delhi, India',
      notes: 'Mixed steel scrap from construction',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      seller_id: 'seller-2',
      seller_name: 'Priya Sharma',
      seller_phone: '+91 9123456789',
      seller_rating: 4.5,
      verified: true
    },
    {
      id: '3',
      scrap_type: 'pet_plastic',
      weight_kg: 40,
      price_per_kg: 22,
      total_amount: 880,
      location: 'Bangalore, Karnataka',
      notes: 'Clean PET bottles, sorted and compressed',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      seller_id: 'seller-3',
      seller_name: 'Ahmed Khan',
      seller_phone: '+91 9876123456',
      seller_rating: 4.9,
      verified: true
    },
    {
      id: '4',
      scrap_type: 'copper',
      weight_kg: 10,
      price_per_kg: 450,
      total_amount: 4500,
      location: 'Chennai, Tamil Nadu',
      notes: 'Pure copper wires and tubes',
      created_at: new Date(Date.now() - 10800000).toISOString(),
      seller_id: 'seller-4',
      seller_name: 'Sunita Reddy',
      seller_phone: '+91 9234567890',
      seller_rating: 4.7,
      verified: false
    },
    {
      id: '5',
      scrap_type: 'e_waste',
      weight_kg: 75,
      price_per_kg: 15,
      total_amount: 1125,
      location: 'Pune, Maharashtra',
      notes: 'Old computers, phones, and electronic components',
      created_at: new Date(Date.now() - 14400000).toISOString(),
      seller_id: 'seller-5',
      seller_name: 'Vikram Singh',
      seller_phone: '+91 9345678901',
      seller_rating: 4.6,
      verified: true
    }
  ];

  useEffect(() => {
    // Simulate loading
    setListingsLoading(true);
    setTimeout(() => {
      setListings(mockListings);
      setListingsLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleShowInterest = async (listingId: string) => {
    const listing = listings.find(l => l.id === listingId);
    if (listing) {
      toast({
        title: "Interest Registered",
        description: `Contact ${listing.seller_name} at ${listing.seller_phone} to proceed.`,
      });
    }
  };

  const formatScrapType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.scrap_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.seller_name?.toLowerCase().includes(searchTerm.toLowerCase());
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scrap Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with verified buyers and sellers across India
            </p>
          </div>
          
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
        {listingsLoading ? (
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
              <h3 className="text-xl font-semibold mb-2">No listings found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg capitalize">
                        {formatScrapType(listing.scrap_type)}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{listing.location}</span>
                      </div>
                    </div>
                    {listing.verified && (
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Weight</p>
                      <p className="text-lg font-semibold">{listing.weight_kg} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Price per kg</p>
                      <p className="text-lg font-semibold">₹{listing.price_per_kg}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">₹{listing.total_amount}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{listing.seller_name}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">{listing.seller_rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Phone className="h-4 w-4" />
                        <span className="text-xs">{listing.seller_phone}</span>
                      </div>
                    </div>
                  </div>

                  {listing.notes && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <p className="font-medium">Notes:</p>
                      <p>{listing.notes}</p>
                    </div>
                  )}

                  <Button 
                    onClick={() => handleShowInterest(listing.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600"
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
