import React from 'react';
import Header from '@/components/Header';
import CVSection from '@/components/CVSection';
import Timeline from '@/components/Timeline';
import CVNavigation from '@/components/CVNavigation';
import CVHero from '@/components/CVHero';
import CVActionButtons from '@/components/CVActionButtons';
import PublicationsSection from '@/components/PublicationsSection';
import CVSkillsSection from '@/components/CVSkillsSection';
import TextSection from '@/components/TextSection';
import CVInternationalExperience from '@/components/CVInternationalExperience';

import {
  professionalExperience,
  additionalExperience,
  education,
  allSkills,
  skillCategories,
  competencies,
  managementSkills,
  bioinformaticsSkills,
  labTechniques,
  transferableSkills,
  publications,
  discursiveSections,
  languages
} from '@/data/cvData';

const CVPage = () => {
  // Navigation items
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' }, // Grouped section
    { id: 'academic-life', label: 'Academic Life' }, // Grouped section
    { id: 'skills', label: 'Skills' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'research-interests', label: 'Research Interests' },
    { id: 'software', label: 'Software' },
    { id: 'links', label: 'Links' },
    { id: 'contact', label: 'Contact' }
  ];

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cream-50 dark:from-gray-900 dark:to-gray-800 relative">
      {/* Logo watermark */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none bg-repeat bg-center"
        style={{ 
          backgroundImage: "url('/logo.png')",
          backgroundSize: "200px"
        }}
      ></div>
      
      <CVNavigation navItems={navItems} scrollToSection={scrollToSection} />
      
      <div className="relative z-10 pt-20">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <CVHero />
          <CVActionButtons />

          {/* About Section */}
          <CVSection id="about" title="About Me">
            <TextSection content={discursiveSections.about} />
          </CVSection>

          {/* Grouped Experience Section */}
          <CVSection id="experience" title="Experience">
            {/* Professional Experience */}
            <CVSection id="professional-experience" title="Professional Experience" className="!mb-8">
              <Timeline items={professionalExperience} />
            </CVSection>

            {/* Additional Experience */}
            <CVSection id="additional-experience" title="Additional Experience" className="!mb-8">
              <Timeline items={additionalExperience} />
            </CVSection>

            {/* International Experience Section */}
            <CVSection id="international-experience" title="International Experience" className="!mb-0">
              <CVInternationalExperience />
            </CVSection>
          </CVSection>

          {/* Grouped Academic Life Section */}
          <CVSection id="academic-life" title="Academic Life">
            {/* Education */}
            <CVSection id="education" title="Education" className="!mb-8">
              <Timeline items={education} />
            </CVSection>

            {/* Publications */}
            <CVSection id="publications" title="Publications" className="!mb-0">
              <PublicationsSection publications={publications} />
            </CVSection>
          </CVSection>

          {/* Skills (Combined Section) */}
          <CVSection id="skills" title="Skills">
            <CVSkillsSection 
              allSkills={allSkills}
              skillCategories={skillCategories}
              competencies={competencies}
              managementSkills={managementSkills}
              bioinformaticsSkills={bioinformaticsSkills}
              labTechniques={labTechniques}
              transferableSkills={transferableSkills}
              languages={languages}
            />
          </CVSection>

          {/* Consulting Section */}
          <CVSection id="consulting" title="Consulting">
            <TextSection content={discursiveSections.consulting} />
          </CVSection>

          {/* Research Interests Section */}
          <CVSection id="research-interests" title="Research Interests">
            <TextSection content={discursiveSections.research_interests} />
          </CVSection>

          {/* Software Section */}
          <CVSection id="software" title="Software">
            <TextSection content={discursiveSections.software} />
          </CVSection>

          {/* Links Section */}
          <CVSection id="links" title="Links">
            <TextSection content={discursiveSections.links} />
          </CVSection>
        </main>
      </div>
    </div>
  );
};

export default CVPage;