import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CVSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  isCollapsible?: boolean;
  accordionValue?: string; // New prop for controlled accordion
  onAccordionValueChange?: (value: string) => void; // New prop for controlled accordion
  level?: 'main' | 'sub'; // New prop to differentiate main sections from subsections
}

const CVSection: React.FC<CVSectionProps> = ({ 
  title, 
  children, 
  className = '', 
  id, 
  isCollapsible = true,
  accordionValue, // Destructure new prop
  onAccordionValueChange, // Destructure new prop
  level = 'main' // Default to main if not specified
}) => {
  const titleClasses = level === 'main'
    ? "font-serif text-3xl font-extrabold" // Authoritative style for main sections
    : "font-sans text-2xl font-bold"; // Standard style for subsections

  const borderClasses = "pb-2 border-b-2 border-blue-300 dark:border-blue-700 text-gray-900 dark:text-white";

  if (!isCollapsible) {
    return (
      <section id={id} className={`mb-12 ${className}`}>
        <h2 className={`${titleClasses} ${borderClasses}`}>
          {title}
        </h2>
        <div className="pt-6">
          {children}
        </div>
      </section>
    );
  }

  const itemValue = id || title.replace(/\s+/g, '-').toLowerCase();

  return (
    <section id={id} className={`mb-12 ${className}`}>
      <Accordion 
        type="single" 
        collapsible 
        className="w-full"
        value={accordionValue} // Pass the controlled value
        onValueChange={onAccordionValueChange} // Pass the change handler
      >
        <AccordionItem value={itemValue}>
          <AccordionTrigger className={`${titleClasses} ${borderClasses} text-left hover:no-underline`}>
            {title}
          </AccordionTrigger>
          <AccordionContent className="pt-6">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default CVSection;