
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Building, Factory, Save, Edit3, CheckCircle, AlertCircle } from 'lucide-react';

const UserProfile = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Mock profile data for MVP
  const [profile] = useState({
    id: 'demo-user-1',
    full_name: 'Demo User',
    role: 'kabadiwala',
    email: 'demo@scraptrading.com',
    phone: '+91 9876543210',
    address: 'Andheri East, Mumbai, Maharashtra 400069',
    business_name: 'Green Scrap Traders',
    upi_id: 'demo@paytm',
    kyc_verified: false
  });
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    business_name: profile?.business_name || '',
    upi_id: profile?.upi_id || ''
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'kabadiwala': return <User className="h-6 w-6" />;
      case 'recycler': return <Factory className="h-6 w-6" />;
      case 'corporate': return <Building className="h-6 w-6" />;
      default: return <User className="h-6 w-6" />;
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

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      business_name: profile?.business_name || '',
      upi_id: profile?.upi_id || ''
    });
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-lg ${getRoleColor(profile?.role || 'kabadiwala')}`}>
                {getRoleIcon(profile?.role || 'kabadiwala')}
              </div>
              <div>
                <CardTitle className="text-2xl">{profile?.full_name}</CardTitle>
                <CardDescription className="text-lg">{profile?.email}</CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getRoleColor(profile?.role || 'kabadiwala')}>
                    {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1)}
                  </Badge>
                  <Badge className={profile?.kyc_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {profile?.kyc_verified ? (
                      <><CheckCircle className="h-3 w-3 mr-1" />KYC Verified</>
                    ) : (
                      <><AlertCircle className="h-3 w-3 mr-1" />KYC Pending</>
                    )}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant={editing ? "outline" : "default"}
              onClick={() => editing ? handleCancel() : setEditing(true)}
              disabled={loading}
            >
              {editing ? "Cancel" : <><Edit3 className="h-4 w-4 mr-2" />Edit Profile</>}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              {editing ? (
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-lg py-2 px-3 bg-gray-50 rounded-md">{profile?.full_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {editing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-lg py-2 px-3 bg-gray-50 rounded-md">{profile?.phone || 'Not provided'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name</Label>
              {editing ? (
                <Input
                  id="business_name"
                  value={formData.business_name}
                  onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                  placeholder="Enter your business name"
                />
              ) : (
                <p className="text-lg py-2 px-3 bg-gray-50 rounded-md">{profile?.business_name || 'Not provided'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="upi_id">UPI ID</Label>
              {editing ? (
                <Input
                  id="upi_id"
                  value={formData.upi_id}
                  onChange={(e) => setFormData({...formData, upi_id: e.target.value})}
                  placeholder="your-upi@bank"
                />
              ) : (
                <p className="text-lg py-2 px-3 bg-gray-50 rounded-md">{profile?.upi_id || 'Not provided'}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            {editing ? (
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter your complete address"
                rows={3}
              />
            ) : (
              <p className="text-lg py-2 px-3 bg-gray-50 rounded-md">{profile?.address || 'Not provided'}</p>
            )}
          </div>

          {editing && (
            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* KYC Verification Card */}
      {!profile?.kyc_verified && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Complete KYC Verification
            </CardTitle>
            <CardDescription>
              Verify your identity to access full platform features and increase trust with buyers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-3">Required Documents:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-700">Aadhaar Card</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-700">PAN Card</span>
                  </div>
                  {profile?.role !== 'kabadiwala' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-700">Business Registration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-700">GST Certificate</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Start KYC Verification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics Card */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Your Impact Statistics</CardTitle>
          <CardDescription>
            Track your contribution to environmental sustainability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">180 kg</div>
              <div className="text-sm text-green-700">Total Scrap Processed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">0.755</div>
              <div className="text-sm text-blue-700">Carbon Credits Generated (tCO2e)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">₹10,250</div>
              <div className="text-sm text-purple-700">Total Earnings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
