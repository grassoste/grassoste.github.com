import {
  professionalExperience,
  additionalExperience,
  education,
  allSkills,
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

export const getCVContent = (): string => {
  let content = "Stefano Grasso's CV Summary:\n\n";

  // About Me
  content += `About: ${discursiveSections.about}\n\n`;

  // Professional Experience
  content += "Professional Experience:\n";
  professionalExperience.forEach(exp => {
    content += `- ${exp.title} at ${exp.company} (${exp.period}, ${exp.location}). Key skills: ${exp.tags ? exp.tags.join(', ') : 'N/A'}.\n`;
  });
  content += "\n";

  // Additional Experience
  content += "Additional Experience:\n";
  additionalExperience.forEach(exp => {
    content += `- ${exp.title} at ${exp.company} (${exp.period}, ${exp.location}).\n`;
  });
  content += "\n";

  // Education
  content += "Education:\n";
  education.forEach(edu => {
    content += `- ${edu.title} from ${edu.company} (${edu.period}, ${edu.location}). Grade: ${edu.grade || 'N/A'}. Thesis: ${edu.thesis || 'N/A'}.\n`;
  });
  content += "\n";

  // Publications
  content += "Publications:\n";
  publications.forEach(pub => {
    content += `- "${pub.title}" (${pub.year}, ${pub.journal}). DOI: ${pub.doi}.\n`;
  });
  content += "\n";

  // Conferences
  content += "Conferences:\n";
  conferences.forEach(conf => {
    content += `- "${conf.title}" (${conf.year}, ${conf.conference}, ${conf.type}).\n`;
  });
  content += "\n";

  // Research Interests
  content += `Research Interests: ${discursiveSections.research_interests}\n\n`;

  // Skills
  content += "Skills:\n";
  content += "  Languages: " + languages.map(lang => lang.language).join(', ') + ".\n";
  content += "  Technical Skills: " + allSkills.filter(s => s.category === "Technical").map(s => s.name).join(', ') + ".\n";
  content += "  Programming Skills: " + allSkills.filter(s => s.category === "Programming").map(s => s.name).join(', ') + ".\n";
  content += "  Soft Skills: " + allSkills.filter(s => s.category === "Soft Skills").map(s => s.name).join(', ') + ".\n";
  content += "  Core Competencies: " + competencies.join(', ') + ".\n";
  content += "  Management Skills: " + managementSkills.join(', ') + ".\n";
  content += "  Bioinformatics Skills: " + bioinformaticsSkills.join(', ') + ".\n";
  content += "  Laboratory Techniques: " + labTechniques.join(', ') + ".\n";
  content += "  Transferable Skills: " + transferableSkills.join(', ') + ".\n\n";

  // Consulting
  content += `Consulting: ${discursiveSections.consulting}\n\n`;

  // Software
  content += `Software: ${discursiveSections.software}\n\n`;

  // Links
  content += `Links: ${discursiveSections.links}\n\n`;

  return content;
};