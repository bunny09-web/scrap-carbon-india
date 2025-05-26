
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import ScrapTransactionForm from '@/components/scrap/ScrapTransactionForm';
import TransactionHistory from '@/components/scrap/TransactionHistory';
import CarbonCalculator from '@/components/carbon/CarbonCalculator';
import EPRReportingDashboard from '@/components/epr/EPRReportingDashboard';
import UserProfile from '@/components/profile/UserProfile';
import { Recycle, LogOut, User, Building, Factory } from 'lucide-react';

const Dashboard = () => {
  const { profile, signOut } = useAuth();

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
    { id: 'transactions', label: 'Transactions', component: ScrapTransactionForm },
    { id: 'history', label: 'History', component: TransactionHistory },
    { id: 'carbon', label: 'Carbon Credits', component: CarbonCalculator },
  ];

  // Add EPR tab only for corporate users
  if (profile?.role === 'corporate') {
    tabs.push({ id: 'epr', label: 'EPR Reports', component: EPRReportingDashboard });
  }

  tabs.push({ id: 'profile', label: 'Profile', component: UserProfile });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
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
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className={`grid w-full ${profile?.role === 'corporate' ? 'grid-cols-5' : 'grid-cols-4'} mb-8`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>

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
