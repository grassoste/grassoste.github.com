import React from 'react';
import ReactMarkdown from 'react-markdown';

interface TextSectionProps {
  content: string;
}

const TextSection: React.FC<TextSectionProps> = ({ content }) => {
  return (
    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default TextSection;