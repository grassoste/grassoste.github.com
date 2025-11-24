import React from 'react';

const CVInternationalExperience: React.FC = () => {
  const countries = [
    "Italy",
    "Sweden",
    "Switzerland",
    "Germany",
    "Netherlands",
    "Spain",
    "France"
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl">
        My international background includes living and working in the following countries, providing a broad and diverse experience:
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {countries.map((country, index) => (
          <span 
            key={index} 
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
          >
            {country}
          </span>
        ))}
      </div>
      <div className="w-full max-w-2xl">
        <img 
          src="/Mymap.png" 
          alt="Map of International Experience" 
          className="w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        />
      </div>
    </div>
  );
};

export default CVInternationalExperience;