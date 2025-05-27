
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Recycle, Leaf } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', transactions: 8, revenue: 12000, carbon: 2.1 },
  { month: 'Feb', transactions: 12, revenue: 18000, carbon: 3.2 },
  { month: 'Mar', transactions: 15, revenue: 24000, carbon: 4.1 },
  { month: 'Apr', transactions: 18, revenue: 28000, carbon: 4.8 },
  { month: 'May', transactions: 22, revenue: 35000, carbon: 5.9 },
  { month: 'Jun', transactions: 25, revenue: 42000, carbon: 6.7 }
];

const materialData = [
  { name: 'Aluminum', value: 35, color: '#10b981' },
  { name: 'Steel', value: 25, color: '#3b82f6' },
  { name: 'Plastic', value: 20, color: '#8b5cf6' },
  { name: 'Copper', value: 15, color: '#f59e0b' },
  { name: 'Others', value: 5, color: '#6b7280' }
];

const priceData = [
  { material: 'Aluminum', current: 120, previous: 115, change: 4.3 },
  { material: 'Steel', current: 45, previous: 47, change: -4.3 },
  { material: 'Copper', current: 600, previous: 580, change: 3.4 },
  { material: 'Plastic', current: 25, previous: 24, change: 4.2 }
];

const DataVisualization = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹42,000</p>
                <p className="text-sm text-green-600 font-medium">+20% from last month</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-sm text-blue-600 font-medium">+14% from last month</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Recycle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Carbon Credits</p>
                <p className="text-2xl font-bold text-gray-900">6.7 tCO2e</p>
                <p className="text-sm text-green-600 font-medium">+13% from last month</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">23%</p>
                <p className="text-sm text-purple-600 font-medium">Monthly average</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  fill="url(#colorRevenue)" 
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Material Distribution */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Material Distribution</CardTitle>
            <CardDescription>Breakdown of processed materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={materialData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {materialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History and Price Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Volume */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Monthly transaction count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transactions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Trends */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Price Tracking</CardTitle>
            <CardDescription>Current market rates vs previous week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                  <div>
                    <div className="font-medium">{item.material}</div>
                    <div className="text-sm text-gray-600">₹{item.current}/kg</div>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    item.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${item.change < 0 ? 'rotate-180' : ''}`} />
                    <span>{item.change > 0 ? '+' : ''}{item.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Carbon Credits Timeline */}
      <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Carbon Credits Generation</CardTitle>
          <CardDescription>Environmental impact over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} tCO2e`, 'Carbon Credits']} />
              <Line 
                type="monotone" 
                dataKey="carbon" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
