
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import { User, Building, Factory, Save, Edit3 } from 'lucide-react';

const UserProfile = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
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
      await updateProfile(formData);
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
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
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${getRoleColor(profile?.role || 'kabadiwala')}`}>
                {getRoleIcon(profile?.role || 'kabadiwala')}
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details and verification status</CardDescription>
              </div>
            </div>
            <Button
              variant={editing ? "outline" : "default"}
              onClick={() => editing ? handleCancel() : setEditing(true)}
              disabled={loading}
            >
              {editing ? "Cancel" : <><Edit3 className="h-4 w-4 mr-2" />Edit</>}
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
                />
              ) : (
                <p className="text-lg">{profile?.full_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${getRoleColor(profile?.role || 'kabadiwala')}`}>
                {getRoleIcon(profile?.role || 'kabadiwala')}
                <span className="capitalize">{profile?.role}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {editing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              ) : (
                <p className="text-lg">{profile?.phone || 'Not provided'}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>KYC Status</Label>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                profile?.kyc_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {profile?.kyc_verified ? 'Verified' : 'Pending Verification'}
              </div>
            </div>

            {(profile?.role !== 'kabadiwala' || editing) && (
              <div className="space-y-2">
                <Label htmlFor="business_name">Business Name</Label>
                {editing ? (
                  <Input
                    id="business_name"
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                  />
                ) : (
                  <p className="text-lg">{profile?.business_name || 'Not provided'}</p>
                )}
              </div>
            )}

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
                <p className="text-lg">{profile?.upi_id || 'Not provided'}</p>
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
              <p className="text-lg">{profile?.address || 'Not provided'}</p>
            )}
          </div>

          {editing && (
            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={handleSave}
                disabled={loading}
                className="flex-1"
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
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-orange-600">KYC Verification Required</CardTitle>
            <CardDescription>
              Complete your KYC verification to access full platform features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-2">Required Documents:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Aadhaar Card</li>
                  <li>• PAN Card</li>
                  {profile?.role !== 'kabadiwala' && <li>• Business Registration Certificate</li>}
                  {profile?.role !== 'kabadiwala' && <li>• GST Certificate (if applicable)</li>}
                </ul>
              </div>
              <Button className="w-full" variant="outline">
                Start KYC Verification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
