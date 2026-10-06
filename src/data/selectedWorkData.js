import { experience, projects } from './portfolioData';

// Project 3 reads its verified case study; project 4 keeps its supported excerpts.
// Identity, employment, stack and production state remain in the central data.
// Only the selected public sections enter the scene; deeper process records do
// not become UI automatically. Both projects share the same scene components.
const presentations = [
  {
    id: 'prodisel',
    projectId: 3,
    titleEN: null, // Product branding is identical in both languages.
  },
  {
    id: 'cv-standardization',
    projectId: 4,
    titleEN: 'CV Standardization',
    discipline: 'Automação com IA',
    disciplineEN: 'AI automation',
    role: 'Iniciativa e desenvolvimento próprios',
    roleEN: 'Self-initiated development',
    status: 'Testada com casos reais',
    statusEN: 'Tested with real cases',
    sections: [
      {
        label: 'context',
        text: 'Uma ferramenta para automatizar a padronização dos currículos recebidos pelo RH da Assurance IT. O processo era feito manualmente.',
        textEN: 'A tool to automate the standardization of résumés received by Assurance IT’s HR team. The process was previously manual.',
      },
      {
        label: 'approach',
        text: 'Python e API do Gemini para extrair os dados e aplicá-los em um template fixo.',
        textEN: 'Python and the Gemini API extract the data and apply it to a fixed template.',
      },
    ],
  },
];

export const selectedProjects = presentations.map((presentation, index) => {
  const project = projects.find((item) => item.id === presentation.projectId);
  const detail = project.caseStudy;
  const employment = detail && experience.find((item) => item.id === detail.experienceId);
  const verifiedPresentation = detail ? {
    discipline: project.category,
    disciplineEN: project.categoryEN,
    role: `${employment.position} · ${employment.company}. ${detail.role}`,
    roleEN: `${employment.positionEN} · ${employment.company}. ${detail.roleEN}`,
    status: detail.productionState.summary,
    statusEN: detail.productionState.summaryEN,
    sections: [
      { label: 'context', text: detail.summary, textEN: detail.summaryEN },
      { label: 'product', text: detail.context, textEN: detail.contextEN },
      { label: 'approach', text: detail.architecture.summary, textEN: detail.architecture.summaryEN },
      { label: 'discovery', text: detail.discovery.summary, textEN: detail.discovery.summaryEN },
    ],
  } : {};
  return {
    ...presentation,
    ...verifiedPresentation,
    project,
    visibleStack: detail?.visibleStack ?? project.technologies,
    number: String(index + 1).padStart(2, '0'),
    title: project.nameShort,
    // No media or links are invented when the central record has none.
    media: project.images ?? (project.image ? [project.image] : []),
    links: project.link ? [{ href: project.link, label: 'externalLink' }] : [],
  };
});
