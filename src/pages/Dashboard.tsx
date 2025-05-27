
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
import DataVisualization from '@/components/analytics/DataVisualization';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Recycle, ArrowLeft, User, Building, Factory, TrendingUp, Package, Leaf, DollarSign, BarChart3, Bell, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being prepared and will be downloaded shortly.",
    });
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your transaction data has been downloaded successfully.",
      });
    }, 2000);
  };

  // Create tabs list based on user role
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'history', label: 'History' },
    { id: 'carbon', label: 'Carbon Credits' },
    { id: 'notifications', label: 'Notifications' },
  ];

  // Add EPR tab only for corporate users
  if (profile?.role === 'corporate') {
    tabs.splice(-1, 0, { id: 'epr', label: 'EPR Reports' });
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
      value: "6.7 tCO2e",
      change: "+13%",
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

  const recentActivity = [
    {
      id: 1,
      type: 'transaction',
      title: 'Aluminum Scrap Sold',
      description: '50kg sold to Mumbai Recyclers',
      time: '2 hours ago',
      amount: '₹6,000'
    },
    {
      id: 2,
      type: 'carbon',
      title: 'Carbon Credits Earned',
      description: '0.125 tCO2e from recent transaction',
      time: '2 hours ago',
      amount: '+0.125 tCO2e'
    },
    {
      id: 3,
      type: 'price',
      title: 'Price Alert',
      description: 'Copper prices increased by 5.2%',
      time: '4 hours ago',
      amount: '₹600/kg'
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
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${profile?.role === 'corporate' ? 'grid-cols-8' : 'grid-cols-7'} mb-8`}>
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

            {/* Activity Feed and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                          <Package className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-gray-600">{activity.description}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                        <div className="font-semibold text-green-600">{activity.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <Button 
                      className="bg-gradient-to-r from-green-600 to-blue-600 h-20 text-left flex-col items-start"
                      onClick={() => setActiveTab('transactions')}
                    >
                      <Package className="h-6 w-6 mb-2" />
                      <span className="font-medium">Create Transaction</span>
                      <span className="text-xs opacity-90">List new scrap for recycling</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 text-left flex-col items-start"
                      onClick={() => setActiveTab('carbon')}
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
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Comprehensive insights into your trading performance</p>
            </div>
            <DataVisualization />
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

          <TabsContent value="notifications" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Notification Center</h2>
              <p className="text-gray-600">Stay updated with your transactions and market insights</p>
            </div>
            <NotificationCenter />
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
