
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ScrapTransactionForm from '@/components/scrap/ScrapTransactionForm';
import TransactionHistory from '@/components/scrap/TransactionHistory';
import CarbonCalculator from '@/components/carbon/CarbonCalculator';
import EPRReportingDashboard from '@/components/epr/EPRReportingDashboard';
import UserProfile from '@/components/profile/UserProfile';
import { Recycle, ArrowLeft, User, Building, Factory, TrendingUp, Package, Leaf, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock user data for MVP testing
  const mockProfile = {
    id: 'mock-user-1',
    full_name: 'Demo User',
    role: 'kabadiwala',
    email: 'demo@example.com',
    phone: '+91 9876543210',
    business_name: 'Green Scrap Traders',
    address: 'Mumbai, Maharashtra',
    kyc_verified: false
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'kabadiwala': return <User className="h-4 w-4" />;
      case 'recycler': return <Factory className="h-4 w-4" />;
      case 'corporate': return <Building className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'kabadiwala': return 'bg-green-100 text-green-800';
      case 'recycler': return 'bg-blue-100 text-blue-800';
      case 'corporate': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Create tabs list based on user role
  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'transactions', label: 'New Transaction', icon: Package },
    { id: 'history', label: 'History', icon: Recycle },
    { id: 'carbon', label: 'Carbon Credits', icon: Leaf },
  ];

  // Add EPR tab only for corporate users
  if (mockProfile?.role === 'corporate') {
    tabs.push({ id: 'epr', label: 'EPR Reports', icon: Award });
  }

  tabs.push({ id: 'profile', label: 'Profile', icon: User });

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
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600">Scrap-to-Credits Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Welcome, {mockProfile?.full_name}</div>
                <div className="text-xs text-gray-500">{mockProfile?.business_name}</div>
              </div>
              <Badge className={`${getRoleColor(mockProfile?.role || 'kabadiwala')} flex items-center space-x-1`}>
                {getRoleIcon(mockProfile?.role || 'kabadiwala')}
                <span className="capitalize">{mockProfile?.role || 'User'}</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className={`grid w-full mb-8 ${mockProfile?.role === 'corporate' ? 'grid-cols-6' : 'grid-cols-5'}`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-green-100 to-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Total Transactions</p>
                      <p className="text-3xl font-bold text-green-600">12</p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-blue-100 to-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Carbon Credits</p>
                      <p className="text-3xl font-bold text-blue-600">0.755</p>
                      <p className="text-xs text-blue-600">tCO2e</p>
                    </div>
                    <Leaf className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-100 to-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Total Earnings</p>
                      <p className="text-3xl font-bold text-purple-600">₹10,250</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-orange-100 to-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Scrap Processed</p>
                      <p className="text-3xl font-bold text-orange-600">180</p>
                      <p className="text-xs text-orange-600">kg</p>
                    </div>
                    <Recycle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="bg-green-500 p-2 rounded-full">
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New transaction created</p>
                        <p className="text-sm text-gray-600">50kg Aluminum - ₹6,000</p>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="bg-blue-500 p-2 rounded-full">
                        <Leaf className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Carbon credits verified</p>
                        <p className="text-sm text-gray-600">0.412 tCO2e credits minted</p>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="bg-purple-500 p-2 rounded-full">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Payment received</p>
                        <p className="text-sm text-gray-600">₹3,500 for steel transaction</p>
                      </div>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>Current scrap prices and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Aluminum</p>
                        <p className="text-sm text-gray-600">High demand</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₹120/kg</p>
                        <p className="text-xs text-green-600">↑ 5%</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Steel</p>
                        <p className="text-sm text-gray-600">Stable</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹45/kg</p>
                        <p className="text-xs text-gray-600">→ 0%</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Copper</p>
                        <p className="text-sm text-gray-600">Very high demand</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">₹600/kg</p>
                        <p className="text-xs text-green-600">↑ 12%</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> Aluminum and copper prices are trending upward. 
                        Great time to sell these materials!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create New Transaction</h2>
              <p className="text-gray-600">List your scrap for recycling and automatically generate carbon credits</p>
            </div>
            <ScrapTransactionForm />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Transaction History</h2>
              <p className="text-gray-600">View and manage your scrap trading activities</p>
            </div>
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="carbon" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Carbon Credits Portfolio</h2>
              <p className="text-gray-600">Track your automatically generated carbon credits and environmental impact</p>
            </div>
            <CarbonCalculator />
          </TabsContent>

          {mockProfile?.role === 'corporate' && (
            <TabsContent value="epr" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">EPR Reporting</h2>
                <p className="text-gray-600">Extended Producer Responsibility compliance management</p>
              </div>
              <EPRReportingDashboard />
            </TabsContent>
          )}

          <TabsContent value="profile" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Profile Settings</h2>
              <p className="text-gray-600">Manage your account information and verification status</p>
            </div>
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
