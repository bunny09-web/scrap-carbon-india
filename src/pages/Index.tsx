import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { 
  Leaf, 
  Recycle, 
  TrendingUp, 
  Users, 
  Shield, 
  Coins,
  BarChart3,
  Globe,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  LogOut
} from 'lucide-react';
import Dashboard from './Dashboard';
import CarbonTracker from './CarbonTracker';
import ScrapMarketplace from './ScrapMarketplace';
import AuthPage from '@/components/auth/AuthPage';

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // If user is logged in, show protected content
  if (user && activeTab === 'dashboard') {
    return <Dashboard />;
  }

  if (user && activeTab === 'carbon-tracker') {
    return <CarbonTracker />;
  }

  if (user && activeTab === 'marketplace') {
    return <ScrapMarketplace />;
  }

  const stats = [
    { label: 'Scrap Processed', value: '50 MT', icon: Recycle },
    { label: 'Carbon Credits', value: '200 tCO2e', icon: Leaf },
    { label: 'Active Users', value: '500+', icon: Users },
    { label: 'Revenue', value: '₹22.5K', icon: TrendingUp }
  ];

  const features = [
    {
      icon: BarChart3,
      title: 'AI-Powered Pricing',
      description: 'Real-time price benchmarking using MMTC data, local kabadiwala rates, and global commodity indices'
    },
    {
      icon: Shield,
      title: 'Blockchain Verification',
      description: 'Hyperledger-based immutable records preventing double-counting with IoT sensor integration'
    },
    {
      icon: Coins,
      title: 'Carbon Credit Engine',
      description: 'Auto-calculation using VM0011, PM0090 methodologies with REC Mechanism compliance'
    },
    {
      icon: Globe,
      title: 'Regulatory Compliance',
      description: 'VERRA/VCS registration, CPCB authorization, and EPR reporting automation'
    }
  ];

  const roadmap = [
    {
      phase: 'Phase 1 (0-6 Months)',
      targets: ['100 Kabadiwalas', '10 MSMEs', '₹22.5K/month'],
      color: 'bg-green-100 text-green-800'
    },
    {
      phase: 'Phase 2 (6-18 Months)',
      targets: ['Data Monetization', 'Premium Features', 'ULB Partnerships'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      phase: 'Phase 3 (18+ Months)',
      targets: ['Pan-India Scale', 'Carbon Market Launch', 'IPO Readiness'],
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const handleDashboardClick = () => {
    if (user) {
      setActiveTab('dashboard');
    } else {
      // Scroll to auth section or show modal
      const authSection = document.getElementById('auth-section');
      if (authSection) {
        authSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Scrap-to-Credits
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">
                    Welcome, {profile?.full_name || user.email}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {profile?.role || 'User'}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      variant={activeTab === 'overview' ? 'default' : 'ghost'}
                      onClick={() => setActiveTab('overview')}
                      className="text-sm"
                    >
                      Overview
                    </Button>
                    <Button
                      variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                      onClick={() => setActiveTab('dashboard')}
                      className="text-sm"
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant={activeTab === 'marketplace' ? 'default' : 'ghost'}
                      onClick={() => setActiveTab('marketplace')}
                      className="text-sm"
                    >
                      Marketplace
                    </Button>
                    <Button
                      variant={activeTab === 'carbon-tracker' ? 'default' : 'ghost'}
                      onClick={() => setActiveTab('carbon-tracker')}
                      className="text-sm"
                    >
                      Carbon Tracker
                    </Button>
                  </div>
                  <Button variant="outline" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex space-x-1">
                  <Button
                    variant={activeTab === 'overview' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('overview')}
                    className="text-sm"
                  >
                    Overview
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('auth')}
                    className="text-sm"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Show auth page if not logged in and auth tab is selected */}
      {!user && activeTab === 'auth' && <AuthPage />}

      {/* Show overview content */}
      {activeTab === 'overview' && (
        <>
          {/* Hero Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                🇮🇳 India's First Blockchain Carbon Trading Platform
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transform Scrap into
                <br />Carbon Credits
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Revolutionizing India's ₹20B scrap industry with AI-powered trading, blockchain verification, 
                and automated carbon credit generation. Student-built, industry-ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  onClick={handleDashboardClick}
                >
                  Launch Platform <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
          </section>

          {/* Show auth section if not logged in */}
          {!user && (
            <section id="auth-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
              <div className="max-w-3xl mx-auto">
                <AuthPage />
              </div>
            </section>
          )}

          {/* Stats Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Triple-Value Proposition</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Combining scrap trading, carbon credits, and blockchain technology for maximum impact
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg w-fit">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Execution Plan</h2>
                <p className="text-xl text-gray-600">Academic integration with real-world impact</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {roadmap.map((phase, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <Badge className={phase.color}>{phase.phase}</Badge>
                      <CardTitle className="text-lg mt-4">Milestone Targets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.targets.map((target, targetIndex) => (
                          <li key={targetIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{target}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Architecture */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Student-Friendly Tech Stack</h2>
                <p className="text-xl text-gray-600">Built with open-source technologies for maximum learning</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-blue-600" />
                      <span>MVP Stack (₹0 Cost)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Frontend:</span>
                        <span className="text-blue-600">Flutter + Dart</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Backend:</span>
                        <span className="text-blue-600">Node.js + Hyperledger</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Database:</span>
                        <span className="text-blue-600">MongoDB Atlas</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Hosting:</span>
                        <span className="text-blue-600">GitHub + Vercel</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-green-600" />
                      <span>Revenue Projections</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Transaction Fees:</span>
                        <span className="text-green-600">₹15,000/month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Credit Listings:</span>
                        <span className="text-green-600">₹7,500/month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Data Monetization:</span>
                        <span className="text-green-600">₹10,000/month</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between items-center font-bold">
                          <span>Total (Phase 1):</span>
                          <span className="text-green-600">₹32,500/month</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform India's Recycling Economy?
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Join the student revolution in carbon trading. Start building today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100"
                  onClick={() => setActiveTab('dashboard')}
                >
                  Start Building Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Download Business Plan
                </Button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Scrap-to-Credits
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Blockchain-Powered Carbon Trading Platform for India's Recycling Ecosystem
              </p>
              <p className="text-sm text-gray-500">
                SDG 12 (Responsible Consumption) • SDG 13 (Climate Action) • Made with 💚 by Students
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
