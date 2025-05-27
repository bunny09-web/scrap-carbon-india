
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
import { Recycle, ArrowLeft, User, Building, Factory, TrendingUp, Package, Leaf, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();

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
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'history', label: 'History' },
    { id: 'carbon', label: 'Carbon Credits' },
  ];

  // Add EPR tab only for corporate users
  if (profile?.role === 'corporate') {
    tabs.push({ id: 'epr', label: 'EPR Reports' });
  }

  tabs.push({ id: 'profile', label: 'Profile' });

  // Mock data for overview
  const overviewStats = [
    {
      title: "Total Transactions",
      value: "127",
      change: "+12%",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Carbon Credits",
      value: "1.2 tCO2e",
      change: "+8%",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Revenue",
      value: "₹45,230",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Market Growth",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

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
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Scrap-to-Credits Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{profile?.full_name}</span>
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(profile?.role || 'kabadiwala')}`}>
                {getRoleIcon(profile?.role || 'kabadiwala')}
                <span className="capitalize">{profile?.role || 'User'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className={`grid w-full ${profile?.role === 'corporate' ? 'grid-cols-6' : 'grid-cols-5'} mb-8`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Your scrap trading and carbon credit summary</p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {overviewStats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-blue-600 h-20 text-left flex-col items-start"
                    onClick={() => document.querySelector('[value="transactions"]')?.click()}
                  >
                    <Package className="h-6 w-6 mb-2" />
                    <span className="font-medium">Create Transaction</span>
                    <span className="text-xs opacity-90">List new scrap for recycling</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 text-left flex-col items-start"
                    onClick={() => document.querySelector('[value="carbon"]')?.click()}
                  >
                    <Leaf className="h-6 w-6 mb-2" />
                    <span className="font-medium">View Carbon Credits</span>
                    <span className="text-xs opacity-70">Check your environmental impact</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 text-left flex-col items-start"
                    onClick={() => navigate('/marketplace')}
                  >
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span className="font-medium">Browse Marketplace</span>
                    <span className="text-xs opacity-70">Find buyers and sellers</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Create Transaction</h2>
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
              <h2 className="text-3xl font-bold mb-2">Carbon Credits</h2>
              <p className="text-gray-600">Track your automatically generated carbon credits</p>
            </div>
            <CarbonCalculator />
          </TabsContent>

          {profile?.role === 'corporate' && (
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
              <h2 className="text-3xl font-bold mb-2">User Profile</h2>
              <p className="text-gray-600">Manage your account information and settings</p>
            </div>
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
