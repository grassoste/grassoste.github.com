import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('change', handleScroll); // Changed 'change' to 'scroll'
  }, []);

  const handleNavItemClick = (id: string) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          S. Grasso, PhD
        </div>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              item.subSections ? (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.subSections.map((subItem) => (
                        <li key={subItem.id}>
                          <NavigationMenuLink
                            // Removed navigationMenuTriggerStyle() from sub-items
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={() => handleNavItemClick(subItem.id)}
                          >
                            <div className="text-sm font-medium leading-none">{subItem.label}</div>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()} // Keep for top-level direct links
                    onClick={() => handleNavItemClick(item.id)}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {navItems.map((item) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => handleNavItemClick(item.id)}
                  className="text-left py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item.label}
                </button>
                {item.subSections && (
                  <div className="ml-4 border-l border-gray-200 dark:border-gray-700">
                    {item.subSections.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleNavItemClick(subItem.id)}
                        className="text-left py-2 pl-4 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm transition-colors w-full"
                      >
                        {subItem.label}
                      </button>
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