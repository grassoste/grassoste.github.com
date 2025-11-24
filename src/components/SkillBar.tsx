import React from 'react';

interface SkillBarProps {
  skill: string;
  level: number;
  maxLevel?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level, maxLevel = 100 }) => {
  const percentage = Math.min(100, Math.max(0, (level / maxLevel) * 100));
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill}</span>
        <span className="text-sm">{level}/{maxLevel}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-300 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;