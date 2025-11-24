import React from 'react';

interface TimelineItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <span className="text-blue-600 dark:text-blue-400 font-medium mt-1 md:mt-0">{item.period}</span>
              </div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{item.company}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
              {item.tags && (
                <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;