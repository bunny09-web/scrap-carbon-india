
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { FileText, Download, Calendar, CheckCircle } from 'lucide-react';

interface EPRReport {
  id: string;
  reporting_period: string;
  total_scrap_processed: number;
  total_credits_generated: number;
  compliance_status: string;
  filed_date: string | null;
  created_at: string;
}

const EPRReportingDashboard = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<EPRReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  
  const [newReport, setNewReport] = useState({
    reporting_period: '',
    total_scrap_processed: '',
    total_credits_generated: ''
  });

  useEffect(() => {
    if (profile && profile.role === 'corporate') {
      fetchEPRReports();
    }
  }, [profile]);

  const fetchEPRReports = async () => {
    try {
      const { data, error } = await supabase
        .from('epr_reports')
        .select('*')
        .eq('company_id', profile?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching EPR reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEPRReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setCreating(true);
    try {
      const { data, error } = await supabase
        .from('epr_reports')
        .insert({
          company_id: profile.id,
          reporting_period: newReport.reporting_period,
          total_scrap_processed: parseFloat(newReport.total_scrap_processed),
          total_credits_generated: parseFloat(newReport.total_credits_generated),
          compliance_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "EPR Report Created",
        description: `Report for ${newReport.reporting_period} has been created successfully.`,
      });

      setNewReport({
        reporting_period: '',
        total_scrap_processed: '',
        total_credits_generated: ''
      });

      fetchEPRReports();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (profile?.role !== 'corporate') {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">EPR Reporting is available only for Corporate users.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Create EPR Report</span>
          </CardTitle>
          <CardDescription>
            Generate Extended Producer Responsibility reports for CPCB compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createEPRReport} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reporting_period">Reporting Period</Label>
                <Select 
                  value={newReport.reporting_period} 
                  onValueChange={(value) => setNewReport({...newReport, reporting_period: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q1-2024">Q1 2024</SelectItem>
                    <SelectItem value="Q2-2024">Q2 2024</SelectItem>
                    <SelectItem value="Q3-2024">Q3 2024</SelectItem>
                    <SelectItem value="Q4-2024">Q4 2024</SelectItem>
                    <SelectItem value="Q1-2025">Q1 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="total_scrap_processed">Total Scrap Processed (kg)</Label>
                <Input
                  id="total_scrap_processed"
                  type="number"
                  step="0.01"
                  placeholder="Enter total weight"
                  value={newReport.total_scrap_processed}
                  onChange={(e) => setNewReport({...newReport, total_scrap_processed: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total_credits_generated">Total Credits Generated (tCO2e)</Label>
                <Input
                  id="total_credits_generated"
                  type="number"
                  step="0.0001"
                  placeholder="Enter total credits"
                  value={newReport.total_credits_generated}
                  onChange={(e) => setNewReport({...newReport, total_credits_generated: e.target.value})}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600"
              disabled={creating}
            >
              {creating ? 'Creating Report...' : 'Create EPR Report'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>EPR Reports History</CardTitle>
          <CardDescription>
            Your submitted Extended Producer Responsibility reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No EPR reports created yet.</p>
              <p className="text-sm">Create your first report above to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(report.compliance_status)}>
                        {report.compliance_status.charAt(0).toUpperCase() + report.compliance_status.slice(1)}
                      </Badge>
                      <span className="font-medium">{report.reporting_period}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {report.filed_date && (
                        <div className="flex items-center space-x-1 text-sm text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Filed</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-600">Scrap Processed</p>
                      <p>{report.total_scrap_processed} kg</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Credits Generated</p>
                      <p className="text-green-600 font-medium">{report.total_credits_generated} tCO2e</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Created Date</p>
                      <p>{new Date(report.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Filed Date</p>
                      <p>{report.filed_date ? new Date(report.filed_date).toLocaleDateString() : 'Not filed'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EPRReportingDashboard;
