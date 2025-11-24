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
}

const CVSection: React.FC<CVSectionProps> = ({ title, children, className = '', id }) => {
  return (
    <section id={id} className={`mb-12 ${className}`}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={id || title.replace(/\s+/g, '-').toLowerCase()}>
          <AccordionTrigger className="text-2xl font-bold pb-2 border-b-2 border-blue-300 dark:border-blue-700 text-gray-900 dark:text-white hover:no-underline">
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