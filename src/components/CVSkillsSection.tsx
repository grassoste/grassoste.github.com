import React, { useState } from 'react';
import SkillBar from '@/components/SkillBar';
import SkillFilter from '@/components/SkillFilter';
import CVLanguageSkills from './CVLanguageSkills'; // Import the new component

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Language {
  language: string;
  level: number;
}

interface CVSkillsSectionProps {
  allSkills: Skill[];
  skillCategories: string[];
  competencies: string[];
  managementSkills: string[];
  bioinformaticsSkills: string[];
  labTechniques: string[];
  transferableSkills: string[];
  languages: Language[]; // New prop for languages
}

const CVSkillsSection: React.FC<CVSkillsSectionProps> = ({
  allSkills,
  skillCategories,
  competencies,
  managementSkills,
  bioinformaticsSkills,
  labTechniques,
  transferableSkills,
  languages, // Destructure new prop
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  return (
    <>
      {/* Languages */}
      <CVLanguageSkills languages={languages} />

      {/* Technical Skills */}
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Technical Skills</h3>
      <SkillFilter 
        categories={skillCategories.slice(1)} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredSkills.map((skill, index) => (
          <SkillBar 
            key={index} 
            skill={skill.name} 
            level={skill.level} 
          />
        ))}
      </div>

      {/* Core Competencies */}
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Core Competencies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {competencies.map((competency, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <p className="text-gray-800 dark:text-gray-200">{competency}</p>
          </div>
        ))}
      </div>

      {/* Management Skills */}
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Management Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {managementSkills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <p className="text-gray-800 dark:text-gray-200">{skill}</p>
          </div>
        ))}
      </div>

      {/* Bioinformatics Skills */}
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Bioinformatics Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {bioinformaticsSkills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <p className="text-gray-800 dark:text-gray-200">{skill}</p>
          </div>
        ))}
      </div>

      {/* Lab Techniques */}
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Laboratory Techniques</h3>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {labTechniques.map((technique, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-gray-300">{technique}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transferable Skills */}
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Transferable Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transferableSkills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <p className="text-gray-800 dark:text-gray-200">{skill}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CVSkillsSection;