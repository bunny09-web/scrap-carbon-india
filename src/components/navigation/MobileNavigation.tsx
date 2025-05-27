
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Home, Package, BarChart3, Leaf, Bell, User, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: number;
}

const MobileNavigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'marketplace', label: 'Marketplace', icon: Package, path: '/marketplace' },
    { id: 'carbon', label: 'Carbon Tracker', icon: Leaf, path: '/carbon-tracker' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/dashboard?tab=notifications', badge: 3 },
    { id: 'profile', label: 'Profile', icon: User, path: '/dashboard?tab=profile' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-gradient-to-b from-green-50 to-blue-50">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Scrap-to-Credits
            </span>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-12 text-left"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-lg text-white text-center">
              <h3 className="font-semibold mb-2">Go Green!</h3>
              <p className="text-sm opacity-90">
                Every transaction helps reduce carbon footprint
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
