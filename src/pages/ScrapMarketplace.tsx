
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MapPin, Package, ShoppingCart, ArrowLeft, Phone, Star, Verified } from 'lucide-react';
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
  seller_name: string;
  seller_phone: string;
  seller_rating: number;
  seller_verified: boolean;
}

const ScrapMarketplace = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

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

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  // Enhanced mock data for MVP
  const mockListings: MarketplaceListing[] = [
    {
      id: '1',
      scrap_type: 'aluminum',
      weight_kg: 25,
      price_per_kg: 110,
      total_amount: 2750,
      location: 'Mumbai, Maharashtra',
      notes: 'High-grade aluminum sheets and cans, sorted and cleaned',
      created_at: new Date().toISOString(),
      seller_id: 'seller-1',
      seller_name: 'Rajesh Kumar',
      seller_phone: '+91 9876543210',
      seller_rating: 4.8,
      seller_verified: true
    },
    {
      id: '2',
      scrap_type: 'steel',
      weight_kg: 150,
      price_per_kg: 32,
      total_amount: 4800,
      location: 'Delhi, India',
      notes: 'Mixed steel scrap from construction site, ready for pickup',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      seller_id: 'seller-2',
      seller_name: 'Priya Sharma',
      seller_phone: '+91 9123456789',
      seller_rating: 4.6,
      seller_verified: true
    },
    {
      id: '3',
      scrap_type: 'pet_plastic',
      weight_kg: 40,
      price_per_kg: 22,
      total_amount: 880,
      location: 'Bangalore, Karnataka',
      notes: 'Clean PET bottles, sorted and compressed for easy transport',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      seller_id: 'seller-3',
      seller_name: 'Ahmed Khan',
      seller_phone: '+91 9876123456',
      seller_rating: 4.9,
      seller_verified: false
    },
    {
      id: '4',
      scrap_type: 'copper',
      weight_kg: 10,
      price_per_kg: 450,
      total_amount: 4500,
      location: 'Chennai, Tamil Nadu',
      notes: 'Pure copper wires and tubes, excellent quality',
      created_at: new Date(Date.now() - 10800000).toISOString(),
      seller_id: 'seller-4',
      seller_name: 'Sunita Reddy',
      seller_phone: '+91 9234567890',
      seller_rating: 4.7,
      seller_verified: true
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
      seller_rating: 4.4,
      seller_verified: false
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setListings(mockListings);
      setLoading(false);
    }, 1000);
  }, []);

  const handleShowInterest = async (listing: MarketplaceListing) => {
    toast({
      title: "Interest Registered Successfully!",
      description: `Contact ${listing.seller_name} at ${listing.seller_phone} to proceed with the purchase.`,
    });
  };

  const formatScrapType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getLocationFromString = (locationString: string) => {
    return locationString.split(',')[0].toLowerCase();
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.scrap_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.seller_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || listing.scrap_type === selectedType;
    const matchesLocation = selectedLocation === 'all' || getLocationFromString(listing.location) === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => navigate('/')} className="hover:bg-green-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Scrap Marketplace
                </h1>
                <p className="text-sm text-gray-600">Find the best scrap deals near you</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {filteredListings.length} listings available
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by type, location, or seller..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
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

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedLocation('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

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
              <h3 className="text-xl font-semibold mb-2">No listings found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters or check back later for new listings.
              </p>
              <Button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-green-600 to-blue-600">
                Create Your First Listing
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-green-600">
                        {formatScrapType(listing.scrap_type)}
                      </CardTitle>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{listing.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{listing.total_amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        ₹{listing.price_per_kg}/kg
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weight:</span>
                    <span className="font-medium">{listing.weight_kg} kg</span>
                  </div>
                  
                  {listing.notes && (
                    <div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {listing.notes}
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-700">{listing.seller_name}</span>
                        {listing.seller_verified && (
                          <Verified className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{listing.seller_rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleShowInterest(listing)}
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        Show Interest
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      Listed {new Date(listing.created_at).toLocaleDateString()}
                    </div>
                  </div>
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
