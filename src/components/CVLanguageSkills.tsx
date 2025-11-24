import React from 'react';
import SkillBar from '@/components/SkillBar';

interface Language {
  language: string;
  level: number; // Assuming level 1-5, where 5 is native/fluent
}

interface CVLanguageSkillsProps {
  languages: Language[];
}

const CVLanguageSkills: React.FC<CVLanguageSkillsProps> = ({ languages }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Languages</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.map((lang, index) => (
          <SkillBar 
            key={index} 
            skill={lang.language} 
            level={lang.level} 
            maxLevel={5} // Assuming a max level of 5 for languages
          />
        ))}
      </div>
    </div>
  );
};

export default CVLanguageSkills;