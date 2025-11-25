import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string; // Job title or Degree
  company: string; // Organization or Institution
  period: string; // Dates
  description: string; // Main description or notes
  location?: string; // New: Location for both
  tags?: string[]; // Existing: For professional experience
  thesis?: string; // New: For education
  doi?: string; // New: For education
  supervisors?: string[]; // New: For education
  grade?: string; // New: For education
  notes?: string; // Additional notes for education
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900 transform translate-x-[-50%]"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.id} className="relative pl-12">
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-300 dark:bg-blue-700 border-4 border-white dark:border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-800 dark:bg-blue-200"></div>
            </div>
            
            {/* Content */}
            <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <AccordionItem value={item.id.toString()}>
                <AccordionTrigger className="flex flex-col items-start mb-2 text-left hover:no-underline">
                  <div className="flex justify-between items-start w-full">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    <span className="text-blue-600 dark:text-blue-400 font-medium text-right ml-4">{item.period}</span>
                  </div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">
                    {item.company} {item.location && <span className="text-sm text-gray-500 dark:text-gray-400">({item.location})</span>}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                  
                  {item.thesis && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-semibold">Thesis:</span> {item.thesis}
                    </p>
                  )}
                  {item.supervisors && item.supervisors.length > 0 && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-semibold">Supervisors:</span> {item.supervisors.join(', ')}
                    </p>
                  )}
                  {item.grade && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-semibold">Grade:</span> {item.grade}
                    </p>
                  )}
                  {item.doi && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                      <span className="font-semibold mr-1">DOI:</span> 
                      <a 
                        href={`https://doi.org/${item.doi}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                      >
                        {item.doi} <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                  )}
                  {item.notes && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-semibold">Notes:</span> {item.notes}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;