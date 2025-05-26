
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp,
  TrendingDown,
  Clock,
  User,
  Package,
  Star,
  Eye,
  MessageCircle
} from 'lucide-react';

const ScrapMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const scrapListings = [
    {
      id: 'SP001',
      title: 'High-Grade Aluminum Scrap - 5MT Available',
      category: 'Metals',
      subcategory: 'Aluminum',
      weight: '5,000 kg',
      price: '₹125/kg',
      priceChange: '+3.2%',
      trend: 'up',
      location: 'Mumbai, Maharashtra',
      seller: 'Mumbai Metals Ltd',
      rating: 4.8,
      carbonCredits: '41.2 tCO2e',
      timeLeft: '2 days',
      description: 'Clean aluminum cans and sheets, sorted and compressed',
      image: '/placeholder.svg'
    },
    {
      id: 'SP002',
      title: 'PET Plastic Bottles - Cleaned & Sorted',
      category: 'Plastics',
      subcategory: 'PET',
      weight: '2,500 kg',
      price: '₹18/kg',
      priceChange: '+1.8%',
      trend: 'up',
      location: 'Delhi NCR',
      seller: 'EcoRecycle Solutions',
      rating: 4.6,
      carbonCredits: '7.75 tCO2e',
      timeLeft: '5 hours',
      description: 'Food-grade PET bottles, de-labeled and washed',
      image: '/placeholder.svg'
    },
    {
      id: 'SP003',
      title: 'Mixed Steel Scrap - Industrial Grade',
      category: 'Metals',
      subcategory: 'Steel',
      weight: '8,000 kg',
      price: '₹32/kg',
      priceChange: '-0.5%',
      trend: 'down',
      location: 'Bangalore, Karnataka',
      seller: 'Steel Recovery Co',
      rating: 4.9,
      carbonCredits: '20 tCO2e',
      timeLeft: '1 day',
      description: 'High-quality steel sheets and rods from construction',
      image: '/placeholder.svg'
    },
    {
      id: 'SP004',
      title: 'Electronic Waste - Motherboards & Components',
      category: 'E-Waste',
      subcategory: 'Circuit Boards',
      weight: '500 kg',
      price: '₹450/kg',
      priceChange: '+5.1%',
      trend: 'up',
      location: 'Hyderabad, Telangana',
      seller: 'TechScrap Hub',
      rating: 4.7,
      carbonCredits: '3.4 tCO2e',
      timeLeft: '3 days',
      description: 'Computer motherboards, RAM, and precious metal components',
      image: '/placeholder.svg'
    }
  ];

  const priceData = [
    { material: 'Aluminum', current: '₹125/kg', change: '+3.2%', trend: 'up' },
    { material: 'Steel', current: '₹32/kg', change: '-0.5%', trend: 'down' },
    { material: 'Copper', current: '₹680/kg', change: '+2.1%', trend: 'up' },
    { material: 'PET Plastic', current: '₹18/kg', change: '+1.8%', trend: 'up' },
    { material: 'Paper', current: '₹12/kg', change: '+0.3%', trend: 'up' },
    { material: 'Glass', current: '₹8/kg', change: '-1.2%', trend: 'down' }
  ];

  const topTraders = [
    { name: 'Mumbai Metals Ltd', trades: 156, rating: 4.8, location: 'Mumbai' },
    { name: 'EcoRecycle Solutions', trades: 142, rating: 4.6, location: 'Delhi' },
    { name: 'Steel Recovery Co', trades: 134, rating: 4.9, location: 'Bangalore' },
    { name: 'Green Processors', trades: 98, rating: 4.5, location: 'Chennai' }
  ];

  const filteredListings = scrapListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <h1 className="text-2xl font-bold text-gray-900">Scrap Marketplace</h1>
              <p className="text-gray-600">AI-powered scrap trading with carbon credits</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600">
            List Your Scrap
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filters */}
        <Card className="mb-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search scrap materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="Metals">Metals</SelectItem>
                  <SelectItem value="Plastics">Plastics</SelectItem>
                  <SelectItem value="E-Waste">E-Waste</SelectItem>
                  <SelectItem value="Paper">Paper</SelectItem>
                  <SelectItem value="Glass">Glass</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Prices</SelectItem>
                  <SelectItem value="0-50">₹0 - ₹50/kg</SelectItem>
                  <SelectItem value="50-200">₹50 - ₹200/kg</SelectItem>
                  <SelectItem value="200+">₹200+/kg</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Listings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Available Listings ({filteredListings.length})</h2>
              <Select defaultValue="newest">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredListings.map((listing, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">{listing.category}</Badge>
                          <Badge className="bg-green-100 text-green-800">{listing.carbonCredits}</Badge>
                          <Badge className={`${
                            listing.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {listing.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {listing.priceChange}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                        <p className="text-gray-600 mb-3">{listing.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Package className="h-4 w-4 text-gray-400" />
                            <span>{listing.weight}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{listing.seller}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{listing.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{listing.timeLeft} left</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-green-600 mb-2">{listing.price}</div>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Prices */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Live Market Prices</span>
                </CardTitle>
                <CardDescription>Real-time pricing from MMTC & local markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {priceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.material}</div>
                        <div className="text-sm text-gray-600">{item.current}</div>
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span>{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Traders */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span>Top Traders</span>
                </CardTitle>
                <CardDescription>Most active and reliable traders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topTraders.map((trader, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{trader.name}</div>
                        <div className="text-sm text-gray-600">{trader.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{trader.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">{trader.trades} trades</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Set Price Alerts
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Bulk Purchase Request
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Trader Groups
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapMarketplace;
