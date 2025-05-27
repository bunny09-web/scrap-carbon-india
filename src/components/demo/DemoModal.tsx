
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, X, ExternalLink, CheckCircle } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const features = [
    "AI-powered scrap pricing with real-time market data",
    "Automatic carbon credit calculation using verified methodologies",
    "Blockchain-based transaction verification",
    "EPR compliance reporting for corporates",
    "Direct marketplace for buyers and sellers",
    "Mobile-first design for kabadiwalas"
  ];

  const handlePlayDemo = () => {
    // In a real implementation, this would trigger a video player or guided tour
    console.log('Playing demo...');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Scrap-to-Credits Platform Demo
              </DialogTitle>
              <DialogDescription className="text-lg mt-2">
                See how we're revolutionizing India's ₹20B scrap industry with blockchain and AI
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Demo Video Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-dashed border-green-300 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-white p-6 rounded-full mb-4 mx-auto w-fit shadow-lg">
                <Play className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Platform Demo</h3>
              <p className="text-gray-600 mb-4">
                Watch how kabadiwalas, recyclers, and corporates interact on our platform
              </p>
              <Button 
                onClick={handlePlayDemo}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Play className="h-5 w-5 mr-2" />
                Play Demo Video
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Key Platform Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Statistics */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Demo Scenario Results</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">180kg</div>
                <div className="text-sm text-gray-600">Scrap Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0.755</div>
                <div className="text-sm text-gray-600">tCO2e Credits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₹10,250</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">Stakeholders</div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Student-Friendly Technology</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">React + TypeScript</Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">Supabase Backend</Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">Hyperledger Fabric</Badge>
              <Badge variant="outline" className="bg-orange-50 text-orange-700">AI/ML Models</Badge>
              <Badge variant="outline" className="bg-pink-50 text-pink-700">Real-time Analytics</Badge>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">Mobile PWA</Badge>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <Button 
              onClick={() => window.open('/dashboard', '_blank')}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Try Live Platform
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('/marketplace', '_blank')}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Close Demo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
