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

// Helper to get top N items or all if less than N
const getTopItems = (arr: string[] | { name: string }[], count: number) => {
  if (!arr || arr.length === 0) return 'None listed.';
  const names = (arr as any[]).map(item => typeof item === 'string' ? item : item.name);
  return names.slice(0, count).join(', ') + (names.length > count ? ', etc.' : '');
};

export const getCVContent = (): string => {
  let content = "Stefano Grasso's CV Summary:\n\n";

  // About Me
  content += `About: ${discursiveSections.about}\n\n`;

  // Professional Experience (condensed)
  content += "Professional Experience (highlights):\n";
  professionalExperience.slice(0, 3).forEach(exp => { // Limit to top 3 experiences
    const tags = exp.tags && exp.tags.length > 0 ? ` (Skills: ${getTopItems(exp.tags, 2)})` : ''; // Limit to 2 tags
    content += `- ${exp.title} at ${exp.company} (${exp.period})${tags}.\n`;
  });
  if (professionalExperience.length > 3) content += `- ...and ${professionalExperience.length - 3} more professional experiences.\n`;
  content += "\n";

  // Additional Experience (condensed)
  content += "Additional Experience (highlights):\n";
  additionalExperience.slice(0, 2).forEach(exp => { // Limit to top 2 additional experiences
    content += `- ${exp.title} at ${exp.company} (${exp.period}).\n`;
  });
  if (additionalExperience.length > 2) content += `- ...and ${additionalExperience.length - 2} more additional experiences.\n`;
  content += "\n";

  // Education (condensed)
  content += "Education (highlights):\n";
  education.slice(0, 3).forEach(edu => { // Limit to top 3 education entries
    content += `- ${edu.title} from ${edu.company} (${edu.period}).\n`;
  });
  if (education.length > 3) content += `- ...and ${education.length - 3} more education entries.\n`;
  content += "\n";

  // Publications (condensed)
  content += "Publications (highlights):\n";
  publications.slice(0, 3).forEach(pub => { // Limit to top 3 publications
    content += `- "${pub.title}" (${pub.year}, ${pub.journal}).\n`;
  });
  if (publications.length > 3) content += `- ...and ${publications.length - 3} more publications.\n`;
  content += "\n";

  // Conferences (condensed)
  content += "Conferences (highlights):\n";
  conferences.slice(0, 2).forEach(conf => { // Limit to top 2 conferences
    content += `- "${conf.title}" (${conf.year}, ${conf.type}).\n`;
  });
  if (conferences.length > 2) content += `- ...and ${conferences.length - 2} more conferences.\n`;
  content += "\n";

  // Research Interests
  content += `Research Interests: ${discursiveSections.research_interests}\n\n`;

  // Skills (summarized)
  content += "Skills Summary:\n";
  content += `  Languages: ${getTopItems(languages.map(l => l.language), 3)}.\n`;
  content += `  Technical Skills: ${getTopItems(allSkills.filter(s => s.category === "Technical"), 3)}.\n`;
  content += `  Programming Skills: ${getTopItems(allSkills.filter(s => s.category === "Programming"), 3)}.\n`;
  content += `  Soft Skills: ${getTopItems(allSkills.filter(s => s.category === "Soft Skills"), 3)}.\n`;
  content += `  Core Competencies: ${getTopItems(competencies, 3)}.\n`;
  content += `  Management Skills: ${getTopItems(managementSkills, 3)}.\n`;
  content += `  Bioinformatics Skills: ${getTopItems(bioinformaticsSkills, 3)}.\n`;
  content += `  Laboratory Techniques: ${getTopItems(labTechniques, 3)}.\n`;
  content += `  Transferable Skills: ${getTopItems(transferableSkills, 3)}.\n\n`;

  // Consulting
  content += `Consulting: ${discursiveSections.consulting}\n\n`;

  // Software
  content += `Software: ${discursiveSections.software}\n\n`;

  // Links
  content += `Links: ${discursiveSections.links}\n\n`;

  return content;
};