
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-green-600" />
            <span>Scrap-to-Credits Platform Demo</span>
          </DialogTitle>
          <DialogDescription>
            Watch how our platform transforms scrap into carbon credits
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Demo Video Placeholder */}
          <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="bg-white/80 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <Play className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Demo Video Coming Soon</h3>
                <p className="text-gray-600">Interactive demo walkthrough will be available here</p>
              </div>
            </div>
          </div>

          {/* Demo Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🔄 Scrap Trading</h4>
              <p className="text-sm text-green-700">
                See how kabadiwalas can list scrap materials and connect with recyclers
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">🌱 Carbon Credits</h4>
              <p className="text-sm text-blue-700">
                Watch automatic carbon credit calculation using verified methodologies
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">🔐 Blockchain</h4>
              <p className="text-sm text-purple-700">
                Experience transparent verification with Hyperledger technology
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">📊 EPR Compliance</h4>
              <p className="text-sm text-orange-700">
                Learn about automated Extended Producer Responsibility reporting
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg text-white text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to Start?</h3>
            <p className="mb-4">Join thousands of users already transforming waste into value</p>
            <Button 
              variant="secondary" 
              onClick={onClose}
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
