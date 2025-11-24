import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Import Button
import { useTheme } from '@/context/ThemeContext'; // Import useTheme

interface NavItem {
  id: string;
  label: string;
  subSections?: { id: string; label: string }[];
}

interface CVNavigationProps {
  navItems: NavItem[];
  scrollToSection: (id: string) => void;
}

const CVNavigation: React.FC<CVNavigationProps> = ({ navItems, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Use theme context

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('change', handleScroll);
  }, []);

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" onClick={scrollToTop} className="flex items-center justify-center">
            <div className="w-[70px] h-[70px] rounded-full bg-gray-800 dark:bg-white border-4 border-blue-300 dark:border-blue-700 flex items-center justify-center shadow-md">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-[60px] w-[60px] object-contain"
              />
            </div>
          </a>
        </div>
        
        {/* Desktop Navigation and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            item.subSections ? (
              <div key={item.id} className="relative group">
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-md">
                  {item.label}
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform origin-top">
                  <ul className="py-1">
                    {item.subSections.map((subItem) => (
                      <li key={subItem.id}>
                        <a
                          href={`#${subItem.id}`}
                          onClick={(e) => handleNavItemClick(e, subItem.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavItemClick(e, item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2 px-3 rounded-md"
              >
                {item.label}
              </a>
            )
          ))}
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="mr-2"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <button
            className="text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 flex flex-col items-center justify-center py-20">
          <button
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={32} />
          </button>
          <div className="flex flex-col space-y-6 text-center">
            {navItems.map((item) => (
              <React.Fragment key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavItemClick(e, item.id)}
                  className="text-2xl font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </a>
                {item.subSections && (
                  <div className="flex flex-col space-y-2 mt-2">
                    {item.subSections.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={`#${subItem.id}`}
                        onClick={(e) => handleNavItemClick(e, subItem.id)}
                        className="text-xl text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CVNavigation;