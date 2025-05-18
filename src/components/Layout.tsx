import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuIcon, X } from "lucide-react";

const Navigation = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Digital Literacy", path: "/digital-literacy" },
    { name: "CV Builder", path: "/cv-builder" },
    { name: "Science", path: "/science" },
    { name: "About", path: "/about" }
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">School is Cool</span>
          </Link>

          {isMobile ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>

              {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white p-4 pt-16">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeMenu}
                    className="absolute top-4 right-4"
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="text-lg py-2 px-4 hover:bg-primary/10 rounded-md"
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="pt-4">
                      <Button asChild className="w-full">
                        <Link to="/dashboard" onClick={closeMenu}>
                          My Dashboard
                        </Link>
                      </Button>
                    </div>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="hidden md:flex space-x-6 items-center">
              <nav className="flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-600 hover:text-primary font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Button asChild>
                <Link to="/dashboard">My Dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">© 2025 School is Cool. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Use</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
