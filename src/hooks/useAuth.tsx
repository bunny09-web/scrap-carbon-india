
import { useState, useEffect, createContext, useContext } from 'react';

interface Profile {
  id: string;
  full_name: string;
  role: string;
  email: string;
  phone: string;
  business_name?: string;
  address?: string;
}

interface AuthContextType {
  user: any;
  profile: Profile | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock authentication for MVP demo
  useEffect(() => {
    // Simulate a logged-in user for demo purposes
    const mockUser = { id: 'demo-user-1', email: 'demo@example.com' };
    const mockProfile: Profile = {
      id: 'demo-user-1',
      full_name: 'Demo User',
      role: 'kabadiwala',
      email: 'demo@example.com',
      phone: '+91 9876543210',
      business_name: 'Demo Scrap Business',
      address: 'Mumbai, Maharashtra'
    };

    setUser(mockUser);
    setProfile(mockProfile);
    setSession({ user: mockUser });
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Mock sign in
    setTimeout(() => {
      const mockUser = { id: 'demo-user-1', email: email };
      const mockProfile: Profile = {
        id: 'demo-user-1',
        full_name: 'Demo User',
        role: 'kabadiwala',
        email: email,
        phone: '+91 9876543210',
        business_name: 'Demo Scrap Business',
        address: 'Mumbai, Maharashtra'
      };
      setUser(mockUser);
      setProfile(mockProfile);
      setSession({ user: mockUser });
      setLoading(false);
    }, 1000);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    // Mock sign up
    setTimeout(() => {
      const mockUser = { id: 'demo-user-1', email: email };
      const mockProfile: Profile = {
        id: 'demo-user-1',
        full_name: userData.full_name || 'Demo User',
        role: userData.role || 'kabadiwala',
        email: email,
        phone: userData.phone || '+91 9876543210',
        business_name: userData.business_name,
        address: userData.address
      };
      setUser(mockUser);
      setProfile(mockProfile);
      setSession({ user: mockUser });
      setLoading(false);
    }, 1000);
  };

  const signOut = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser(null);
      setProfile(null);
      setSession(null);
      setLoading(false);
    }, 500);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) throw new Error('No user logged in');
    
    setProfile({ ...profile, ...updates });
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
