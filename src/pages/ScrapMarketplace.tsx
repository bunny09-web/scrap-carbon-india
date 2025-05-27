
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Star, Verified, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockListings = [
  {
    id: 1,
    title: "Premium Aluminum Scrap",
    seller: "Mumbai Metals Co.",
    location: "Mumbai, Maharashtra",
    price: 120,
    quantity: 500,
    type: "aluminum",
    verified: true,
    rating: 4.8,
    image: "/placeholder.svg",
    priceChange: 5.2,
    description: "High-grade aluminum scrap from manufacturing units"
  },
  {
    id: 2,
    title: "Steel Scrap Collection",
    seller: "Delhi Recyclers",
    location: "Delhi, NCR",
    price: 45,
    quantity: 1200,
    type: "steel",
    verified: true,
    rating: 4.6,
    image: "/placeholder.svg",
    priceChange: -2.1,
    description: "Mixed steel scrap from construction sites"
  },
  {
    id: 3,
    title: "Electronic Waste Lot",
    seller: "Tech Waste Solutions",
    location: "Bangalore, Karnataka",
    price: 35,
    quantity: 300,
    type: "e_waste",
    verified: false,
    rating: 4.2,
    image: "/placeholder.svg",
    priceChange: 8.7,
    description: "Certified e-waste disposal with proper documentation"
  }
];

const ScrapMarketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [activeTab, setActiveTab] = useState('buy');

  const marketInsights = [
    { material: "Aluminum", trend: "up", change: 5.2, price: 120 },
    { material: "Steel", trend: "down", change: -2.1, price: 45 },
    { material: "Copper", trend: "up", change: 8.7, price: 600 },
    { material: "E-Waste", trend: "up", change: 3.4, price: 35 }
  ];

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || listing.type === selectedType;
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
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Scrap Marketplace
              </h1>
            </div>
            <Button onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Insights */}
        <Card className="mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Market Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {marketInsights.map((insight, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {insight.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {insight.change > 0 ? '+' : ''}{insight.change}%
                    </span>
                  </div>
                  <div className="font-bold text-lg">₹{insight.price}/kg</div>
                  <div className="text-sm text-gray-600">{insight.material}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="buy">Buy Scrap</TabsTrigger>
            <TabsTrigger value="sell">Sell Scrap</TabsTrigger>
          </TabsList>

          <TabsContent value="buy">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by material, seller, or location..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Material Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  <SelectItem value="aluminum">Aluminum</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="e_waste">E-Waste</SelectItem>
                  <SelectItem value="copper">Copper</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="quantity">Quantity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{listing.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 mt-1">
                          <span>{listing.seller}</span>
                          {listing.verified && (
                            <Verified className="h-4 w-4 text-blue-600" />
                          )}
                        </CardDescription>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                        listing.priceChange > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {listing.priceChange > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>{listing.priceChange > 0 ? '+' : ''}{listing.priceChange}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{listing.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold text-green-600">₹{listing.price}/kg</div>
                          <div className="text-sm text-gray-500">{listing.quantity}kg available</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{listing.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{listing.location}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
                          Contact Seller
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sell">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Create Listing</CardTitle>
                <CardDescription>
                  List your scrap materials for sale to verified buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Start Selling Today</h3>
                  <p className="text-gray-600 mb-6">
                    Go to your dashboard to create detailed scrap listings and connect with buyers
                  </p>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ScrapMarketplace;
