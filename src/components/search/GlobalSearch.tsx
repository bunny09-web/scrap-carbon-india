
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Leaf, DollarSign, TrendingUp, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'transaction' | 'material' | 'user' | 'page';
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'transaction',
    title: 'Aluminum Scrap Transaction',
    description: 'Recent transaction with Mumbai Recyclers - 50kg',
    icon: Package,
    path: '/dashboard?tab=history',
    badge: '₹6,000'
  },
  {
    id: '2',
    type: 'material',
    title: 'Copper Price Alert',
    description: 'Current market rate: ₹600/kg (+5.2%)',
    icon: TrendingUp,
    path: '/marketplace',
    badge: 'Up 5.2%'
  },
  {
    id: '3',
    type: 'page',
    title: 'Carbon Credits Calculator',
    description: 'Calculate environmental impact and credits',
    icon: Leaf,
    path: '/dashboard?tab=carbon',
    badge: 'Tool'
  },
  {
    id: '4',
    type: 'user',
    title: 'Mumbai Metals Co.',
    description: 'Verified seller with 4.8 rating',
    icon: User,
    path: '/marketplace',
    badge: 'Verified'
  }
];

const GlobalSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = mockSearchResults.filter(result =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
        setShowResults(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setSearchQuery('');
    setShowResults(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'bg-blue-100 text-blue-800';
      case 'material':
        return 'bg-green-100 text-green-800';
      case 'user':
        return 'bg-purple-100 text-purple-800';
      case 'page':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search transactions, materials, users..."
          className="pl-9 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowResults(searchQuery.trim() !== '')}
        />
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            {isSearching ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Searching...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-600 mb-3">
                  Found {searchResults.length} results
                </div>
                {searchResults.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="w-full h-auto p-3 justify-start text-left"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                        <result.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{result.title}</div>
                        <div className="text-sm text-gray-600 truncate">{result.description}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(result.type)}>
                          {result.type}
                        </Badge>
                        {result.badge && (
                          <Badge variant="outline" className="text-xs">
                            {result.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No results found</p>
                <p className="text-xs text-gray-500 mt-1">
                  Try searching for transactions, materials, or users
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Overlay to close search results */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default GlobalSearch;
