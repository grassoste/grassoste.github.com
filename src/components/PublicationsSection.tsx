import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Publication {
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
}

interface PublicationsSectionProps {
  publications: Publication[];
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ publications }) => {
  // Function to render authors with Stefano Grasso in bold
  const renderAuthors = (authors: string[]) => {
    return authors.map((author, index) => (
      <span key={index}>
        {author === "S. Grasso" ? (
          <strong>{author}</strong>
        ) : (
          author
        )}
        {index < authors.length - 1 && ", "}
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {publications.map((publication, index) => (
          <AccordionItem key={index} value={publication.title.replace(/\s+/g, '-').toLowerCase() + index}>
            <AccordionTrigger className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left hover:no-underline">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {publication.title}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mt-2">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {renderAuthors(publication.authors)}
              </p>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{publication.journal}</span> ({publication.year})
                </p>
                <a 
                  href={`https://doi.org/${publication.doi}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  DOI: {publication.doi}
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PublicationsSection;