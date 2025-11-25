import React from 'react';
import { MapPin, Linkedin, FileText, GraduationCap } from 'lucide-react'; // Import GraduationCap icon

const CVHero: React.FC = () => {
  return (
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
              <span>Marcq-en-Baroeul, FR</span>
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
          href="https://scholar.google.com/citations?user=ZYXEuS0AAAAJ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <GraduationCap className="mr-1 h-4 w-4" />
          Google Scholar
        </a>
      </div>
    </section>
  );
};

export default CVHero;