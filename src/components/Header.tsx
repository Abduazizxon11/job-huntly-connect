
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-effect">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-brand-500">HeadHunter</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium ${
              isActive('/') ? 'text-brand-500' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Bosh sahifa
          </Link>
          <Link
            to="/jobs"
            className={`text-sm font-medium ${
              isActive('/jobs') ? 'text-brand-500' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Barcha ishlar
          </Link>
          <Link
            to="/companies"
            className={`text-sm font-medium ${
              isActive('/companies') ? 'text-brand-500' : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Kompaniyalar
          </Link>
          
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Kirish</Link>
              </Button>
              <Button asChild className="bg-brand-500 hover:bg-brand-600">
                <Link to="/register">Ro'yxatdan o'tish</Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {userRole === 'COMPANY' && (
                <Button asChild className="bg-brand-500 hover:bg-brand-600">
                  <Link to="/company/post-job">+ Ish e'lon qilish</Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Menu</span>
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profil</Link>
                  </DropdownMenuItem>
                  {userRole === 'JOB_SEEKER' && (
                    <DropdownMenuItem asChild>
                      <Link to="/my-applications">Arizalarim</Link>
                    </DropdownMenuItem>
                  )}
                  {userRole === 'COMPANY' && (
                    <DropdownMenuItem asChild>
                      <Link to="/company/jobs">Ish e'lonlarim</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Chiqish</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link to="/">Bosh sahifa</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/jobs">Barcha ishlar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/companies">Kompaniyalar</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">Kirish</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register">Ro'yxatdan o'tish</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profil</Link>
                  </DropdownMenuItem>
                  {userRole === 'JOB_SEEKER' && (
                    <DropdownMenuItem asChild>
                      <Link to="/my-applications">Arizalarim</Link>
                    </DropdownMenuItem>
                  )}
                  {userRole === 'COMPANY' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/company/jobs">Ish e'lonlarim</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/company/post-job">Ish e'lon qilish</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Chiqish</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
