
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import ScrapTransactionForm from '@/components/scrap/ScrapTransactionForm';
import CarbonCalculator from '@/components/carbon/CarbonCalculator';
import EPRReportingDashboard from '@/components/epr/EPRReportingDashboard';
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Credits</TabsTrigger>
            {profile?.role === 'corporate' && (
              <TabsTrigger value="epr">EPR Reports</TabsTrigger>
            )}
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Scrap Transactions</h2>
              <p className="text-gray-600">Create and manage your scrap trading activities</p>
            </div>
            <ScrapTransactionForm />
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
            
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your account details and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-lg">{profile?.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(profile?.role || 'kabadiwala')}`}>
                      {getRoleIcon(profile?.role || 'kabadiwala')}
                      <span className="capitalize">{profile?.role}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-lg">{profile?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">KYC Status</label>
                    <p className={`text-lg ${profile?.kyc_verified ? 'text-green-600' : 'text-yellow-600'}`}>
                      {profile?.kyc_verified ? 'Verified' : 'Pending'}
                    </p>
                  </div>
                  {profile?.business_name && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Business Name</label>
                      <p className="text-lg">{profile.business_name}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    <p className="text-lg">{profile?.address || 'Not provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
