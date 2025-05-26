
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Leaf, 
  Recycle, 
  Users, 
  Coins,
  BarChart3,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');

  const metrics = [
    { 
      label: 'Monthly Revenue', 
      value: '₹22,500', 
      change: '+15%', 
      icon: TrendingUp,
      trend: 'up'
    },
    { 
      label: 'Carbon Credits Generated', 
      value: '245 tCO2e', 
      change: '+28%', 
      icon: Leaf,
      trend: 'up'
    },
    { 
      label: 'Active Traders', 
      value: '127', 
      change: '+8%', 
      icon: Users,
      trend: 'up'
    },
    { 
      label: 'Scrap Processed', 
      value: '58.3 MT', 
      change: '+12%', 
      icon: Recycle,
      trend: 'up'
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'Aluminum Scrap',
      weight: '2.5 MT',
      credits: '20.6 tCO2e',
      trader: 'Mumbai Metals Ltd',
      status: 'Verified',
      timestamp: '2 hours ago'
    },
    {
      id: 'TXN002',
      type: 'PET Plastic',
      weight: '1.8 MT',
      credits: '5.58 tCO2e',
      trader: 'Green Recyclers',
      status: 'Pending',
      timestamp: '4 hours ago'
    },
    {
      id: 'TXN003',
      type: 'Steel Scrap',
      weight: '4.2 MT',
      credits: '10.5 tCO2e',
      trader: 'Delhi Scrap Co',
      status: 'Verified',
      timestamp: '1 day ago'
    }
  ];

  const alerts = [
    {
      type: 'success',
      message: 'Carbon credits worth ₹8,500 successfully traded',
      time: '30 min ago'
    },
    {
      type: 'warning',
      message: 'IoT sensor calibration due for Station #12',
      time: '2 hours ago'
    },
    {
      type: 'info',
      message: 'New VERRA methodology VM0015 available',
      time: '1 day ago'
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Trading Dashboard</h1>
              <p className="text-gray-600">Real-time scrap & carbon credit analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              System Online
            </Badge>
            <Button size="sm">Export Report</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="h-8 w-8 text-green-600" />
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Recent Transactions</span>
              </CardTitle>
              <CardDescription>Latest scrap trades and carbon credit generations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((txn, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Recycle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{txn.type}</div>
                        <div className="text-sm text-gray-600">{txn.trader}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{txn.weight}</div>
                      <div className="text-sm text-green-600">{txn.credits}</div>
                    </div>
                    <div className="text-right">
                      <Badge className={txn.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {txn.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">{txn.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span>Alerts & Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-1 rounded-full ${
                      alert.type === 'success' ? 'bg-green-100' :
                      alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {alert.type === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : alert.type === 'warning' ? (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{alert.message}</div>
                      <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Carbon Credit Generation</CardTitle>
              <CardDescription>Monthly progress towards targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Aluminum Recycling</span>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Plastic Processing</span>
                    <span className="text-sm text-gray-600">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Steel Recovery</span>
                    <span className="text-sm text-gray-600">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">E-Waste Processing</span>
                    <span className="text-sm text-gray-600">58%</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Scrap collection hubs across India</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Mumbai</div>
                      <div className="text-sm text-gray-600">15 Active Hubs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">18.2 MT</div>
                    <div className="text-sm text-green-600">31% of total</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Delhi NCR</div>
                      <div className="text-sm text-gray-600">12 Active Hubs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">14.7 MT</div>
                    <div className="text-sm text-green-600">25% of total</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Bangalore</div>
                      <div className="text-sm text-gray-600">8 Active Hubs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">12.1 MT</div>
                    <div className="text-sm text-green-600">21% of total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
