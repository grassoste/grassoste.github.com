import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Conference {
  year: number;
  conference: string;
  location: string;
  type: string;
  title: string;
}

interface ConferencesSectionProps {
  conferences: Conference[];
}

const ConferencesSection: React.FC<ConferencesSectionProps> = ({ conferences }) => {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {conferences.map((conf, index) => (
          <AccordionItem key={index} value={conf.title.replace(/\s+/g, '-').toLowerCase() + index}>
            <AccordionTrigger className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left hover:no-underline">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {conf.title}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mt-2">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-medium">{conf.conference}</span> ({conf.year})
              </p>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-gray-600 dark:text-gray-400">
                  {conf.location}
                </p>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  {conf.type}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ConferencesSection;