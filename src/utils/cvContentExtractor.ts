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
  let content = "Stefano Grasso's CV Information:\n\n";

  // About Me
  content += `About Me: ${discursiveSections.about}\n\n`;

  // Professional Experience
  content += "Professional Experience:\n";
  professionalExperience.forEach(exp => {
    content += `- ${exp.title} at ${exp.company} (${exp.period}, ${exp.location}): ${exp.description}\n`;
    if (exp.tags && exp.tags.length > 0) {
      content += `  Tags: ${exp.tags.join(', ')}\n`;
    }
  });
  content += "\n";

  // Additional Experience
  content += "Additional Experience:\n";
  additionalExperience.forEach(exp => {
    content += `- ${exp.title} at ${exp.company} (${exp.period}, ${exp.location}): ${exp.description}\n`;
  });
  content += "\n";

  // Education
  content += "Education:\n";
  education.forEach(edu => {
    content += `- ${edu.title} from ${edu.company} (${edu.period}, ${edu.location}): ${edu.description}\n`;
    if (edu.thesis) content += `  Thesis: ${edu.thesis}\n`;
    if (edu.supervisors) content += `  Supervisors: ${edu.supervisors.join(', ')}\n`;
    if (edu.grade) content += `  Grade: ${edu.grade}\n`;
    if (edu.doi) content += `  DOI: ${edu.doi}\n`;
    if (edu.notes) content += `  Notes: ${edu.notes}\n`;
  });
  content += "\n";

  // Publications
  content += "Publications:\n";
  publications.forEach(pub => {
    content += `- "${pub.title}" by ${pub.authors.join(', ')} in ${pub.journal} (${pub.year}). DOI: ${pub.doi}\n`;
  });
  content += "\n";

  // Conferences
  content += "Conferences:\n";
  conferences.forEach(conf => {
    content += `- "${conf.title}" at ${conf.conference} (${conf.year}, ${conf.location}). Type: ${conf.type}\n`;
  });
  content += "\n";

  // Research Interests
  content += `Research Interests: ${discursiveSections.research_interests}\n\n`;

  // Skills
  content += "Skills:\n";
  content += "  Languages: " + languages.map(lang => `${lang.language} (Level ${lang.level}/5)`).join(', ') + "\n";
  content += "  Technical Skills: " + allSkills.filter(s => s.category === "Technical").map(s => `${s.name} (${s.level}%)`).join(', ') + "\n";
  content += "  Programming Skills: " + allSkills.filter(s => s.category === "Programming").map(s => `${s.name} (${s.level}%)`).join(', ') + "\n";
  content += "  Soft Skills: " + allSkills.filter(s => s.category === "Soft Skills").map(s => `${s.name} (${s.level}%)`).join(', ') + "\n";
  content += "  Core Competencies: " + competencies.join(', ') + "\n";
  content += "  Management Skills: " + managementSkills.join(', ') + "\n";
  content += "  Bioinformatics Skills: " + bioinformaticsSkills.join(', ') + "\n";
  content += "  Laboratory Techniques: " + labTechniques.join(', ') + "\n";
  content += "  Transferable Skills: " + transferableSkills.join(', ') + "\n\n";

  // Consulting
  content += `Consulting: ${discursiveSections.consulting}\n\n`;

  // Software
  content += `Software: ${discursiveSections.software}\n\n`;

  // Links
  content += `Links: ${discursiveSections.links}\n\n`;

  return content;
};