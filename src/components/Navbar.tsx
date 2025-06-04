import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FiMenu, FiBell, FiSettings, FiLogOut } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  openSidebar: () => void;
}

const Navbar = ({ openSidebar }: NavbarProps) => {
  const { profile, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={openSidebar}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          
          <div className="hidden lg:block ml-2 text-xl font-bold text-primary">
            ProductHub
          </div>
        </div>
        
        {/* Right side - User menu */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent">
            <FiBell className="h-5 w-5" />
          </button>
          
          <div className="relative" ref={userMenuRef}>
            <button
              className="flex items-center space-x-2"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden md:inline-block font-medium">
                {profile?.full_name || profile?.email || 'User'}
              </span>
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-card rounded-md shadow-lg border border-border z-10">
                <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">
                  Signed in as<br />
                  <span className="font-medium text-foreground">{profile?.email}</span>
                </div>
                
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <FiSettings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
                
                <button
                  className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent text-destructive"
                  onClick={() => {
                    signOut();
                    setUserMenuOpen(false);
                  }}
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
