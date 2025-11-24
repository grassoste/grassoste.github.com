import React from 'react';

interface TextSectionProps {
  content: string;
}

const TextSection: React.FC<TextSectionProps> = ({ content }) => {
  // Simple rendering for now, could be enhanced with markdown parsing if needed
  return (
    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
      {content.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default TextSection;