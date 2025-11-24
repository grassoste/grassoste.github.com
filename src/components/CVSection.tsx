import React from 'react';

interface CVSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const CVSection: React.FC<CVSectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-blue-300 dark:border-blue-700 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
};

export default CVSection;