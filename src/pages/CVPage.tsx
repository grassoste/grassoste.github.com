import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CVSection from '@/components/CVSection';
import Timeline from '@/components/Timeline';
import SkillBar from '@/components/SkillBar';
import SkillFilter from '@/components/SkillFilter';
import { Button } from '@/components/ui/button';
import { Download, Mail, MapPin, Phone, Mail as MailIcon, Globe, Linkedin, FileText, Menu, X } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Professional experience data
const professionalExperience = [
  {
    id: 1,
    title: "Multiplex Synthetic Biology Scientist",
    company: "Lesaffre International",
    period: "07/22 - Present",
    description: "Driving digital transformation and developing the newly established Biofoundry. Software developer, data model architect, and system administrator for LIMS (Benchling), handling >200,000 data inputs/week and >80 users. Developed automated data flows integrating manual and robotic instruments and supporting in-silico tools (CAD, CAM). Designs save >700 days and >500,000€ of manual labor each year. DNA/enzyme libraries designer.",
    tags: ["Synthetic Biology", "Biofoundry", "LIMS", "Benchling", "Digital Transformation"]
  },
  {
    id: 2,
    title: "Post-Doctoral Fellow",
    company: "CBGP, UPM",
    period: "03/21 - 05/22",
    description: "Lab manager and tech specialist at the Biocomputation Lab. Set up a new synthetic biology laboratory, automated liquid handler, and 3D printer. Worked on spatial transcriptomics in P. putida. Supervised one MSc student. Group leader: Dr. Angel Goñi Moreno.",
    tags: ["Lab Management", "Synthetic Biology", "Spatial Transcriptomics", "Automation"]
  },
  {
    id: 3,
    title: "PhD Candidate",
    company: "University Medical Center Groningen (UMCG) & DSM B.V.",
    period: "09/15 - 12/20",
    description: "MSCA-ITN fellowship within ProteinFactory. Worked on cloning and transformation in B. subtilis and E. coli; developed prediction tools; supported collaborations; supervised one MSc student. Designed, cloned, and transformed a 13k DNA library in B. subtilis; generated a ML predictive model and SHAP explanations; validated experimentally.",
    tags: ["Protein Secretion", "Machine Learning", "Molecular Cloning", "B. subtilis"]
  }
];

// Additional experience
const additionalExperience = [
  {
    id: 4,
    title: "Visiting PhD Candidate",
    company: "FGen GmbH",
    period: "07/17 - 08/17",
    description: "Used NLR and COPAS sorting to screen 13k DNA library for protein secretion phenotypes."
  },
  {
    id: 5,
    title: "Visiting PhD Candidate",
    company: "SciLifeLab",
    period: "02/16 - 04/16",
    description: "Worked with bioinformaticians to improve programming skills and biological prediction methods."
  },
  {
    id: 6,
    title: "Erasmus+ Traineeship",
    company: "Leibniz Institute of Plant Genetics and Crop Plant Research (IPK)",
    period: "02/15 - 05/15",
    description: "Optimization of Hi-C library preparation in barley tissues; sequencing preparation and execution."
  }
];

// Education data
const education = [
  {
    id: 1,
    title: "PhD in Medical Microbiology",
    company: "Rijksuniversiteit Groningen",
    period: "2015 - 2020",
    description: "MSCA-ITN fellowship within ProteinFactory. Thesis: 'Bacterial protein sorting: experimental and computational approaches'. Work on protein secretion in Bacillus subtilis.",
    tags: ["Protein Secretion", "Computational Biology", "MSCA-ITN"]
  },
  {
    id: 2,
    title: "Master of Science in Plant and Animal Biotechnology",
    company: "Udine University",
    period: "2013 - 2015",
    description: "Thesis: 'Production and optimization of NGS libraries for contact genomics in Hordeum vulgare and Vitis vinifera'. Thesis conducted at IPK via Erasmus+. Grade: 110 cum laude / 110.",
    tags: ["NGS", "Genomics", "Erasmus+"]
  },
  {
    id: 3,
    title: "Bachelor of Science in Biotechnology",
    company: "Udine University",
    period: "2010 - 2013",
    description: "Thesis on nutraceutical effects on human adipocytes. Erasmus project in Gothenburg. Grade: 110 cum laude / 110.",
    tags: ["Biotechnology", "Erasmus"]
  }
];

// Skills data
const allSkills = [
  { name: "Molecular Biology", level: 95, category: "Technical" },
  { name: "Python", level: 85, category: "Technical" },
  { name: "Benchling", level: 90, category: "Technical" },
  { name: "Functional Analyses", level: 85, category: "Technical" },
  { name: "Project Management", level: 85, category: "Technical" },
  { name: "Git", level: 85, category: "Technical" },
  { name: "Microbiology", level: 80, category: "Technical" },
  { name: "NGS-workflow", level: 75, category: "Technical" },
  { name: "SQL", level: 75, category: "Technical" },
  { name: "HPC", level: 70, category: "Technical" },
  { name: "Bash", level: 85, category: "Programming" },
  { name: "GitLab CI/CD", level: 75, category: "Programming" },
  { name: "Problem Solving", level: 90, category: "Soft Skills" },
  { name: "Team Leadership", level: 85, category: "Soft Skills" },
  { name: "Innovation", level: 90, category: "Soft Skills" }
];

const skillCategories = ["all", "Technical", "Programming", "Soft Skills"];

// Competencies data
const competencies = [
  "Laboratory design",
  "Laboratory implementation",
  "Laboratory digitalization",
  "Laboratory management",
  "LIMS deployment and adoption",
  "Digital transformation",
  "Change management",
  "LabOps optimization",
  "Data automation",
  "Experimental design",
  "Data analysis",
  "Software development",
  "Project management",
  "People management"
];

// Management skills
const managementSkills = [
  "Project planning with Gantt charts",
  "Setting KPIs, milestones, deliverables",
  "Jira Service Management setup and administration",
  "Scientific communication",
  "Diplomatic communication",
  "Cross-functional cross-communication",
  "Team coordination and supervision",
  "Empathy and motivational leadership",
  "Organizational skills",
  "Decision-making",
  "Building long-lasting professional networks"
];

// Bioinformatics skills
const bioinformaticsSkills = [
  "Python (scikit-learn, shap, BioPython)",
  "Bash and Linux administration",
  "Advanced Benchling administrator and developer platform",
  "R&D data architecture modeling",
  "Git and version control",
  "LaTeX",
  "SQL queries",
  "HPC/cluster computing (SLURM)",
  "Uncountable API interactions",
  "Advanced usage of gene and protein databases",
  "Algorithms for biological purposes (alignment, HMMs, etc.)",
  "Command-line and API bioinformatic tools",
  "Functional annotation of proteins",
  "Development of prediction tools and pipelines",
  "NGS classical workflow",
  "Intermediate CI/CD pipeline deployment (k8 backend)",
  "Basic AWS",
  "Basic C/C++",
  "Basic Ruby",
  "Basic Java",
  "Understanding code in other languages for debugging/customization",
  "Preparation of cartoons and scientific figures"
];

// Lab techniques
const labTechniques = [
  "PCR",
  "RT-PCR",
  "qPCR",
  "Electrophoresis",
  "Molecular cloning (Gibson, GoldenGate, OE-PCR)",
  "Biobricks-oriented cloning",
  "Transformation (E. coli, B. subtilis, P. putida)",
  "DNA extraction",
  "RNA extraction",
  "DNA/RNA purification",
  "DNA quantification (UV, Nanodrop, Qubit, Bioanalyzer/capillary electrophoresis)",
  "Variant library design and construction",
  "NGS library preparation",
  "Sequencing (iSeq, NextSeq2000, MinION)",
  "Hi-C",
  "Enzymatic assays",
  "Protein extraction",
  "PAGE",
  "Western blotting",
  "Mass spectrometry proteomics data analysis",
  "Bacterial and yeast culture",
  "Replica plating",
  "Bacterial growth assays",
  "Large particle flow cytometry (COPAS)",
  "Flow cytometry",
  "Automated liquid handlers (TECAN EVO)",
  "Automated liquid handler programming (OT-2)"
];

// Transferable skills
const transferableSkills = [
  "Eager learner",
  "Flexible mindset",
  "Innovation-driven",
  "Advanced research and analytical ability",
  "Understanding scientific and academic regulations and norms",
  "Problem solving and rationalization",
  "3D printing (assembly, design, operation)",
  "3D design (Fusion360, Autodesk Inventor)",
  "Team leadership",
  "Cross-functional collaboration",
  "Empathy and interpersonal awareness",
  "Scientific communication"
];

// Publications data (sorted by year, newest first)
const publications = [
  {
    title: "A Genus Comparison in the Topological Analysis of RNA Structures",
    authors: ["N. Cangiotti", "S. Grasso"],
    year: 2025,
    journal: "Acta Biotheoretica",
    doi: "10.1007/s10441-025-09500-9"
  },
  {
    title: "Signal Peptide Efficiency: From High-Throughput Data to Prediction and Explanation.",
    authors: ["S. Grasso", "V. Dabene", "M. M. W. B. Hendriks", "P. Zwartjens", "R. Pellaux", "M. Held", "S. Panke", "J. M. van Dijl", "A. Meyer", "T. van Rij"],
    year: 2023,
    journal: "ACS Synthetic Biology",
    doi: "10.1021/acssynbio.2c00328"
  },
  {
    title: "Synthetic biology in Europe: current community landscape and future perspectives",
    authors: ["S. Donati", "I. Barbier", "D. A. García-Soriano", "S. Grasso", "P. Handal-Marquez", "K. Malcı", "L. Marlow", "C. Westmann", "A. Amara"],
    year: 2022,
    journal: "Biotechnology Notes",
    doi: "10.1016/j.biotno.2022.07.003"
  },
  {
    title: "Proteomic Charting of Imipenem Adaptive Responses in a Highly Carbapenem Resistant Clinical Enterobacter roggenkampii Isolate",
    authors: ["S. Nepal", "S. Maaß", "S. Grasso", "F. M. Cavallo", "J. Bartel", "D. Becher", "E. Bathoorn", "J. M. van Dijl"],
    year: 2021,
    journal: "Antibiotics",
    doi: "10.3390/antibiotics10050501"
  },
  {
    title: "GP4: an integrated Gram-Positive Protein Prediction Pipeline for subcellular localization mimicking bacterial sorting.",
    authors: ["S. Grasso", "T. van Rij", "J. M. van Dijl"],
    year: 2020,
    journal: "Briefings in Bioinformatics",
    doi: "10.1093/bib/bbaa302"
  },
  {
    title: "Gingimaps: Protein Localization in the Oral Pathogen Porphyromonas gingivalis",
    authors: ["G. Gabarrini", "S. Grasso", "A. J. van Winkelhoff", "J. M. van Dijl"],
    year: 2020,
    journal: "Microbiology and Molecular Biology Reviews",
    doi: "10.1128/MMBR.00032-19"
  },
  {
    title: "A chromosome conformation capture ordered sequence of the barley genome.",
    authors: ["M. Mascher", "H. Gundlach", "A. Himmelbach", "S. Beier", "S. O. Twardziok", "T. Wicker", "V. Radchuk", "C. Dockter", "P. E. Hedley", "J. Russell", "M. Bayer", "L. Ramsay", "H. Liu", "...", "S. Grasso", "..."],
    year: 2017,
    journal: "Nature",
    doi: "10.1038/nature22043"
  },
  {
    title: "An ancient family of mobile genomic islands introducing cephalosporinase and carbapenemase genes in Enterobacteriaceae.",
    authors: ["S. Nepal", "F. Bonn", "S. Grasso", "T. Stobernack", "A. de Jong", "K. Zhou", "R. Wedema", "S. Rosema", "D. Becher", "..."],
    year: 2018,
    journal: "Virulence",
    doi: "10.1080/21505594.2018.1509666"
  },
  {
    title: "Signatures of cytoplasmic proteins in the exoproteome distinguish community- and hospital-associated methicillin-resistant Staphylococcus aureus USA300 lineages.",
    authors: ["S. A. Mekonnen", "L. M. Palma Medina", "C. Glasner", "E. Tsompanidou", "A. de Jong", "S. Grasso", "..."],
    year: 2017,
    journal: "Virulence",
    doi: "10.1080/21505594.2017.1325064"
  },
  {
    title: "Construction of a map-based reference genome sequence for barley, Hordeum vulgare L.",
    authors: ["S. Beier", "A. Himmelbach", "C. Colmsee", "X. Zhang", "R. A. Barrero", "Q. Zhang", "L. Li", "M. Bayer", "D. Bolser", "S. Taudien", "M. Groth", "M. Felder", "A. Hastie", "H. Šimková", "H. Staňková", "J. Vrána", "S. Chan", "M. Muñoz-Amatriaín", "R. Ounit", "S. Wanamaker", "T. Schmutzer", "L. Aliyeva-Schnorr", "S. Grasso", "..."],
    year: 2017,
    journal: "Scientific Data",
    doi: "10.1038/sdata.2017.44"
  },
  {
    title: "Base excision repair in Archaea: back to the future in DNA repair.",
    authors: ["S. Grasso", "G. Tell"],
    year: 2014,
    journal: "DNA Repair",
    doi: "10.1016/j.dnarep.2014.05.006"
  },
  {
    title: "Nutraceuticals and regulation of adipocyte life: premises or promises.",
    authors: ["M. Colitti", "S. Grasso"],
    year: 2014,
    journal: "BioFactors",
    doi: "10.1002/biof.1164"
  }
];

const CVPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === activeCategory);

  // Handle scroll for navigation visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('change', handleScroll);
  }, []);

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Stefano_Grasso_CV.pdf';
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
      window.location.href = 'mailto:stefano@2000e.it?subject=Your CV&body=Dear Dr. Grasso,%0D%0A%0D%0AI am interested in your CV.%0D%0A%0D%0ABest regards,';
      showSuccess('Opening email client...');
    } catch (error) {
      showError('Failed to open email client. Please try again.');
    }
  };

  // Function to render authors with Stefano Grasso in bold
  const renderAuthors = (authors: string[]) => {
    return authors.map((author, index) => (
      <span key={index}>
        {author === "S. Grasso" ? (
          <strong>{author}</strong>
        ) : (
          author
        )}
        {index < authors.length - 1 && ", "}
      </span>
    ));
  };

  // Navigation items
  const navItems = [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'publications', label: 'Publications' },
    { id: 'skills', label: 'Skills' }, // This now points to the combined skills section
    { id: 'contact', label: 'Contact' }
  ];

  // Scroll to section
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
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
      
      {/* Navigation Menu */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            S. Grasso, PhD
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <div className="relative z-10 pt-20">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header Section */}
          <section id="contact" className="text-center mb-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-center mb-6">
              <div className="mb-6 md:mb-0 md:mr-8">
                <img 
                  src="/me.png" 
                  alt="Stefano Grasso" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 dark:border-blue-700 shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                  Stefano Grasso, PhD
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                  Multiplex Synthetic Biology Scientist
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>4 Rue Copernic, Marcq-en-Baroeul, FR</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>+33 7 513 776 36</span>
                  </div>
                  <div className="flex items-center">
                    <MailIcon className="mr-2 h-4 w-4" />
                    <span>stefano@2000e.it</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Innovative Synthetic Biology Scientist with 10+ years of research experience and a strong background in molecular biology, LIMS integration, and biofoundry development, passionate about empowering scientific teams through digital transformation and high-throughput solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a 
                href="https://www.linkedin.com/in/stefano-grasso-biotech/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Linkedin className="mr-1 h-4 w-4" />
                LinkedIn
              </a>
              <a 
                href="https://www.researchgate.net/profile/Stefano_Grasso2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <FileText className="mr-1 h-4 w-4" />
                ResearchGate
              </a>
              <a 
                href="https://grassoste.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Globe className="mr-1 h-4 w-4" />
                Personal Website
              </a>
            </div>
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
          <CVSection id="experience" title="Professional Experience">
            <Timeline items={professionalExperience} />
          </CVSection>

          {/* Additional Experience */}
          <CVSection id="additional-experience" title="Additional Experience">
            <Timeline items={additionalExperience} />
          </CVSection>

          {/* Education */}
          <CVSection id="education" title="Education">
            <Timeline items={education} />
          </CVSection>

          {/* Publications */}
          <CVSection id="publications" title="Publications">
            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                {publications.map((publication, index) => (
                  <AccordionItem key={index} value={publication.title.replace(/\s+/g, '-').toLowerCase() + index}>
                    <AccordionTrigger className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 text-left hover:no-underline">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {publication.title}
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 mt-2">
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {renderAuthors(publication.authors)}
                      </p>
                      <div className="flex flex-wrap items-center justify-between">
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{publication.journal}</span> ({publication.year})
                        </p>
                        <a 
                          href={`https://doi.org/${publication.doi}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          DOI: {publication.doi}
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </CVSection>

          {/* Skills (Combined Section) */}
          <CVSection id="skills" title="Skills">
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
          </CVSection>
        </main>
      </div>
    </div>
  );
};

export default CVPage;