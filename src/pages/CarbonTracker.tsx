
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import CarbonCalculator from '@/components/carbon/CarbonCalculator';

const CarbonTracker = () => {
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
                Carbon Credit Tracker
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Carbon Credit Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track and manage your automatically generated carbon credits from scrap recycling activities
          </p>
        </div>

        <CarbonCalculator />
      </main>
    </div>
  );
};

export default CarbonTracker;
