import React, { useState } from 'react';
import Header from '@/components/Header';
import CVSection from '@/components/CVSection';
import Timeline from '@/components/Timeline';
import SkillBar from '@/components/SkillBar';
import SkillFilter from '@/components/SkillFilter';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

// Mock data based on a typical CV structure
const professionalExperience = [
  {
    id: 1,
    title: "Senior Data Scientist",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading data science initiatives in genomics and synthetic biology data analysis. Developed machine learning models for predicting protein structures and optimizing synthetic pathways.",
    tags: ["Machine Learning", "Python", "Genomics", "Data Visualization"]
  },
  {
    id: 2,
    title: "Computational Biologist",
    company: "BioTech Research Labs",
    period: "2020 - 2022",
    description: "Transitioned from wet lab research to computational biology. Developed pipelines for analyzing high-throughput sequencing data and implemented statistical models for gene expression analysis.",
    tags: ["R", "Bioconductor", "RNA-Seq", "Statistical Modeling"]
  },
  {
    id: 3,
    title: "Research Scientist",
    company: "Synthetic Biology Institute",
    period: "2018 - 2020",
    description: "Designed and executed experiments in synthetic biology. Engineered microbial systems for sustainable chemical production and published findings in peer-reviewed journals.",
    tags: ["CRISPR", "Metabolic Engineering", "Molecular Cloning", "Microbiology"]
  }
];

const education = [
  {
    id: 1,
    title: "Ph.D. in Molecular Biology",
    company: "University of Science and Technology",
    period: "2014 - 2018",
    description: "Thesis: 'Engineering Synthetic Pathways for Biofuel Production'. Developed novel techniques for pathway optimization using computational modeling.",
    tags: ["Synthetic Biology", "Systems Biology", "Computational Modeling"]
  },
  {
    id: 2,
    title: "M.Sc. in Biotechnology",
    company: "Institute of Advanced Studies",
    period: "2012 - 2014",
    description: "Specialized in recombinant DNA technology and fermentation processes. Graduated with distinction.",
    tags: ["Bioprocess Engineering", "Protein Engineering", "Fermentation"]
  }
];

const allSkills = [
  { name: "Python", level: 90, category: "Programming" },
  { name: "R", level: 85, category: "Programming" },
  { name: "Machine Learning", level: 80, category: "Data Science" },
  { name: "Data Visualization", level: 85, category: "Data Science" },
  { name: "SQL", level: 75, category: "Data Science" },
  { name: "Synthetic Biology", level: 90, category: "Biology" },
  { name: "Genomics", level: 85, category: "Biology" },
  { name: "CRISPR", level: 80, category: "Biology" },
  { name: "React", level: 70, category: "Web Development" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "AWS", level: 65, category: "DevOps" },
  { name: "Git", level: 80, category: "DevOps" }
];

const skillCategories = ["all", "Programming", "Data Science", "Biology", "Web Development", "DevOps"];

const CVPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Scientist_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showSuccess('CV downloaded successfully!');
    } catch (error) {
      showError('Failed to download CV. Please try again.');
    }
  };

  const handleEmail = () => {
    try {
      window.location.href = 'mailto:?subject=My CV&body=Please find my CV attached.&attachment=/cv.pdf';
      showSuccess('Opening email client...');
    } catch (error) {
      showError('Failed to open email client. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cream-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <section className="text-center mb-12 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Dr. Scientist Name
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Synthetic Biology → Big Data & Software Development
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Bridging the gap between biological research and computational solutions through data-driven approaches and innovative software development.
          </p>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
          <Button 
            onClick={handleEmail}
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 px-6 py-3 rounded-full"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email CV
          </Button>
        </div>

        {/* Professional Experience */}
        <CVSection title="Professional Experience">
          <Timeline items={professionalExperience} />
        </CVSection>

        {/* Education */}
        <CVSection title="Education">
          <Timeline items={education} />
        </CVSection>

        {/* Skills */}
        <CVSection title="Skills">
          <SkillFilter 
            categories={skillCategories.slice(1)} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, index) => (
              <SkillBar 
                key={index} 
                skill={skill.name} 
                level={skill.level} 
              />
            ))}
          </div>
        </CVSection>

        {/* Projects */}
        <CVSection title="Key Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Genomic Data Pipeline</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Developed a scalable pipeline for processing and analyzing genomic data using Python and AWS.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Python
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  AWS
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Genomics
                </span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">SynBio Designer</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Web application for designing synthetic biology constructs with visualization tools.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  React
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  D3.js
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                  Synthetic Biology
                </span>
              </div>
            </div>
          </div>
        </CVSection>
      </main>
    </div>
  );
};

export default CVPage;