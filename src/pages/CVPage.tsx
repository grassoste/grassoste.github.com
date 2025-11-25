import React, { useState } from 'react';
import CVSection from '@/components/CVSection';
import Timeline from '@/components/Timeline';
import CVNavigation from '@/components/CVNavigation';
import CVHero from '@/components/CVHero';
import CVActionButtons from '@/components/CVActionButtons';
import PublicationsSection from '@/components/PublicationsSection';
import TextSection from '@/components/TextSection';
import CVInternationalExperience from '@/components/CVInternationalExperience';
import ConferencesSection from '@/components/ConferencesSection';
import CVLanguageSkills from '@/components/CVLanguageSkills'; // Import CVLanguageSkills
import SkillBar from '@/components/SkillBar'; // Import SkillBar
import SkillFilter from '@/components/SkillFilter'; // Import SkillFilter
import Chatbot from '@/components/Chatbot'; // Import Chatbot
import ChatbotIntroBanner from '@/components/ChatbotIntroBanner'; // Import ChatbotIntroBanner
import { getCVContent } from '@/utils/cvContentExtractor'; // Import content extractor
import { useTheme } from '@/context/ThemeContext'; // Import useTheme

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
  languages,
  conferences
} from '@/data/cvData';

const CVPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { theme } = useTheme(); // Get the current theme

  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  // Generate CV content for the chatbot
  const cvContext = getCVContent();

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
        { id: 'conferences', label: 'Conferences' },
        { id: 'research-interests', label: 'Research Interests' },
      ]
    },
    { 
      id: 'skills', 
      label: 'Skills',
      subSections: [
        { id: 'languages', label: 'Languages' },
        { id: 'technical-skills', label: 'Technical Skills' },
        { id: 'core-competencies', label: 'Core Competencies' },
        { id: 'management-skills', label: 'Management Skills' },
        { id: 'bioinformatics-skills', label: 'Bioinformatics Skills' },
        { id: 'laboratory-techniques', label: 'Laboratory Techniques' },
        { id: 'transferable-skills', label: 'Transferable Skills' },
      ]
    },
    { 
      id: 'other', 
      label: 'Other',
      subSections: [
        { id: 'consulting', label: 'Consulting' },
        { id: 'software', label: 'Software' },
        { id: 'links', label: 'Links' },
      ]
    },
  ];

  // State to control which top-level accordion item is open
  const [openMainSection, setOpenMainSection] = useState<string | undefined>(undefined);
  // State to control which sub-accordion item is open within the active main section
  const [openSubSection, setOpenSubSection] = useState<string | undefined>(undefined);

  // Map sub-section IDs to their parent collapsible section IDs
  const sectionToParentMap = new Map<string, string>();
  navItems.forEach(item => {
    if (item.subSections) {
      item.subSections.forEach(subItem => {
        sectionToParentMap.set(subItem.id, item.id);
      });
    }
  });

  // Scroll to section and expand parent/sub-accordions if necessary
  const scrollToSection = (id: string) => {
    const parentId = sectionToParentMap.get(id);

    if (parentId) {
      // If it's a sub-section, open its parent and itself
      setOpenMainSection(parentId);
      setOpenSubSection(id);
    } else {
      // If it's a main section, open it and close any active sub-section
      setOpenMainSection(id);
      setOpenSubSection(undefined);
    }

    // Wait for the accordion(s) to open before scrolling
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
        className={`absolute inset-0 pointer-events-none bg-no-repeat bg-center bg-fixed ${theme === 'light' ? 'opacity-10' : 'opacity-5'}`}
        style={{ 
          backgroundImage: "url('/logo.png')",
          backgroundSize: "cover"
        }}
      ></div>
      
      <CVNavigation navItems={navItems} scrollToSection={scrollToSection} />
      
      <div className="relative z-10 pt-20">
        {/* Header component removed */}
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <CVHero />
          <CVActionButtons />

          {/* About Section - now non-collapsible */}
          <CVSection id="about" title="About Me" isCollapsible={false} level="main">
            <TextSection content={discursiveSections.about} />
          </CVSection>

          {/* Grouped Experience Section */}
          <CVSection 
            id="experience" 
            title="Experience" 
            accordionValue={openMainSection} 
            onAccordionValueChange={setOpenMainSection}
            level="main" // Top-level section
          >
            {/* Professional Experience */}
            <CVSection 
              id="professional-experience" 
              title="Professional Experience" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <Timeline items={professionalExperience} />
            </CVSection>

            {/* Additional Experience */}
            <CVSection 
              id="additional-experience" 
              title="Additional Experience" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <Timeline items={additionalExperience} />
            </CVSection>

            {/* International Experience Section */}
            <CVSection 
              id="international-experience" 
              title="International Experience" 
              className="!mb-0" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <CVInternationalExperience />
            </CVSection>
          </CVSection>

          {/* Grouped Academic Life Section */}
          <CVSection 
            id="academic-life" 
            title="Academic Life" 
            accordionValue={openMainSection} 
            onAccordionValueChange={setOpenMainSection}
            level="main" // Top-level section
          >
            {/* Education */}
            <CVSection 
              id="education" 
              title="Education" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <Timeline items={education} />
            </CVSection>

            {/* Publications */}
            <CVSection 
              id="publications" 
              title="Publications" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <PublicationsSection publications={publications} />
            </CVSection>

            {/* Conferences */}
            <CVSection 
              id="conferences" 
              title="Conferences" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <ConferencesSection conferences={conferences} />
            </CVSection>

            {/* Research Interests Section - now part of Academic Life */}
            <CVSection 
              id="research-interests" 
              title="Research Interests" 
              className="!mb-0" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <TextSection content={discursiveSections.research_interests} />
            </CVSection>
          </CVSection>

          {/* Skills (Combined Section) */}
          <CVSection 
            id="skills" 
            title="Skills" 
            accordionValue={openMainSection} 
            onAccordionValueChange={setOpenMainSection}
            level="main" // Top-level section
          >
            {/* Languages */}
            <CVSection 
              id="languages" 
              title="Languages" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub"
            >
              <CVLanguageSkills languages={languages} />
            </CVSection>

            {/* Technical Skills */}
            <CVSection 
              id="technical-skills" 
              title="Technical Skills" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub"
            >
              <SkillFilter 
                categories={skillCategories.slice(1)} 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {filteredSkills.map((skill, index) => (
                  <SkillBar 
                    key={index} 
                    skill={skill.name} 
                    level={skill.level} 
                  />
                ))}
              </div>
            </CVSection>

            {/* Core Competencies */}
            <CVSection 
              id="core-competencies" 
              title="Core Competencies" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {competencies.map((competency, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{competency}</p>
                  </div>
                ))}
              </div>
            </CVSection>

            {/* Management Skills */}
            <CVSection 
              id="management-skills" 
              title="Management Skills" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {managementSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{skill}</p>
                  </div>
                ))}
              </div>
            </CVSection>

            {/* Bioinformatics Skills */}
            <CVSection 
              id="bioinformatics-skills" 
              title="Bioinformatics Skills" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {bioinformaticsSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{skill}</p>
                  </div>
                ))}
              </div>
            </CVSection>

            {/* Laboratory Techniques */}
            <CVSection 
              id="laboratory-techniques" 
              title="Laboratory Techniques" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {labTechniques.map((technique, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{technique}</p>
                  </div>
                ))}
              </div>
            </CVSection>

            {/* Transferable Skills */}
            <CVSection 
              id="transferable-skills" 
              title="Transferable Skills" 
              className="!mb-0" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {transferableSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-gray-800 dark:text-gray-200">{skill}</p>
                  </div>
                ))}
              </div>
            </CVSection>
          </CVSection>

          {/* Grouped Other Section */}
          <CVSection 
            id="other" 
            title="Other" 
            accordionValue={openMainSection} 
            onAccordionValueChange={setOpenMainSection}
            level="main" // Top-level section
          >
            {/* Consulting Section */}
            <CVSection 
              id="consulting" 
              title="Consulting" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <TextSection content={discursiveSections.consulting} />
            </CVSection>

            {/* Software Section */}
            <CVSection 
              id="software" 
              title="Software" 
              className="!mb-8" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <TextSection content={discursiveSections.software} />
            </CVSection>

            {/* Links Section */}
            <CVSection 
              id="links" 
              title="Links" 
              className="!mb-0" 
              isCollapsible={true} 
              accordionValue={openSubSection} 
              onAccordionValueChange={setOpenSubSection}
              level="sub" // Sub-section
            >
              <TextSection content={discursiveSections.links} />
            </CVSection>
          </CVSection>
        </main>
      </div>
      <Chatbot />
      <ChatbotIntroBanner /> {/* Render the new banner component */}
    </div>
  );
};

export default CVPage;