import React, { useState } from 'react';
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
  // Navigation items with hierarchical structure for the new menu
  const navItems = [
    { id: 'about', label: 'About' },
    { 
      id: 'experience', 
      label: 'Experience', 
      subSections: [
        { id: 'professional-experience', label: 'Professional' },
        { id: 'additional-experience', label: 'Additional' },
        { id: 'international-experience', label: 'International' },
      ]
    },
    { 
      id: 'academic-life', 
      label: 'Academic Life', 
      subSections: [
        { id: 'education', label: 'Education' },
        { id: 'publications', label: 'Publications' },
        { id: 'research-interests', label: 'Research Interests' },
      ]
    },
    { id: 'skills', label: 'Skills' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'software', label: 'Software' },
    { id: 'links', label: 'Links' },
  ];

  // State to control which accordion item is open
  const [openAccordionValue, setOpenAccordionValue] = useState<string | undefined>(undefined);

  // Map sub-section IDs to their parent collapsible section IDs
  const sectionToParentMap = new Map<string, string>();
  navItems.forEach(item => {
    if (item.subSections) {
      item.subSections.forEach(subItem => {
        sectionToParentMap.set(subItem.id, item.id);
      });
    }
  });

  // Scroll to section and expand parent accordion if necessary
  const scrollToSection = (id: string) => {
    const parentId = sectionToParentMap.get(id);
    const targetAccordionId = parentId || id; // If it's a sub-section, open its parent. Otherwise, open itself.

    // Set the accordion to open the target section or its parent
    setOpenAccordionValue(targetAccordionId);

    // Wait for the accordion to open before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Adjust scroll position to account for fixed header
        const headerOffset = 80; // Approximate height of the fixed header
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
        console.log(`Scrolling to section: ${id}`);
      } else {
        console.warn(`Section with ID '${id}' not found.`);
      }
    }, 300); // Small delay for accordion animation
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

          {/* About Section - now non-collapsible */}
          <CVSection id="about" title="About Me" isCollapsible={false}>
            <TextSection content={discursiveSections.about} />
          </CVSection>

          {/* Grouped Experience Section */}
          <CVSection 
            id="experience" 
            title="Experience" 
            accordionValue={openAccordionValue} 
            onAccordionValueChange={setOpenAccordionValue}
          >
            {/* Professional Experience */}
            <CVSection id="professional-experience" title="Professional Experience" className="!mb-8" isCollapsible={false}>
              <Timeline items={professionalExperience} />
            </CVSection>

            {/* Additional Experience */}
            <CVSection id="additional-experience" title="Additional Experience" className="!mb-8" isCollapsible={false}>
              <Timeline items={additionalExperience} />
            </CVSection>

            {/* International Experience Section */}
            <CVSection id="international-experience" title="International Experience" className="!mb-0" isCollapsible={false}>
              <CVInternationalExperience />
            </CVSection>
          </CVSection>

          {/* Grouped Academic Life Section */}
          <CVSection 
            id="academic-life" 
            title="Academic Life" 
            accordionValue={openAccordionValue} 
            onAccordionValueChange={setOpenAccordionValue}
          >
            {/* Education */}
            <CVSection id="education" title="Education" className="!mb-8" isCollapsible={false}>
              <Timeline items={education} />
            </CVSection>

            {/* Publications */}
            <CVSection id="publications" title="Publications" className="!mb-8" isCollapsible={false}>
              <PublicationsSection publications={publications} />
            </CVSection>

            {/* Research Interests Section - now part of Academic Life */}
            <CVSection id="research-interests" title="Research Interests" className="!mb-0" isCollapsible={false}>
              <TextSection content={discursiveSections.research_interests} />
            </CVSection>
          </CVSection>

          {/* Skills (Combined Section) */}
          <CVSection 
            id="skills" 
            title="Skills" 
            accordionValue={openAccordionValue} 
            onAccordionValueChange={setOpenAccordionValue}
          >
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
          <CVSection 
            id="consulting" 
            title="Consulting" 
            accordionValue={openAccordionValue} 
            onAccordionValueChange={setOpenAccordionValue}
          >
            <TextSection content={discursiveSections.consulting} />
          </CVSection>

          {/* Software Section */}
          <CVSection 
            id="software" 
            title="Software" 
            accordionValue={openAccordionValue} 
            onAccordionValueChange={setOpenAccordionValue}
          >
            <TextSection content={discursiveSections.software} />
          </CVSection>

          {/* Links Section */}
          <CVSection 
            id="links" 
            title="Links" 
            accordionValue={openAccordionValue} 
            onAccordionValueChange={setOpenAccordionValue}
          >
            <TextSection content={discursiveSections.links} />
          </CVSection>
        </main>
      </div>
    </div>
  );
};

export default CVPage;