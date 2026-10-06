import { education, experience, projects } from './portfolioData';

// Editorial excerpts, keyed to source records. Identity, roles, periods and
// current status are always read from those records, never copied here.
const experiencePresentation = {
  1: { id: 'support', language: 'technical', summary: 'Computadores, desenvolvimento de software e sistemas de segurança.', summaryEN: 'Computers, software development and security systems.' },
  2: { id: 'marketing', language: 'organic', summary: 'Peças gráficas, edição de vídeos e automações com IA.', summaryEN: 'Graphic materials, video editing and AI automation.' },
  3: { id: 'design', language: 'organic', summary: 'Redes sociais, diagramação e campanhas na comunicação institucional.', summaryEN: 'Social media, document layout and campaigns in institutional communications.' },
  4: { id: 'development', language: 'technical', summary: 'Desenvolvimento frontend, análise de código, correção de bugs e melhorias de interface.', summaryEN: 'Frontend development, code analysis, bug fixes and interface improvements.' },
  5: { id: 'mobile', language: 'combined', summary: 'Desenvolvimento mobile com Flutter integrado a bancos de dados SQL.', summaryEN: 'Mobile development with Flutter integrated with SQL databases.' },
  6: { id: 'operations', language: 'combined', summary: 'Recrutamento e gestão de vagas. Iniciativa própria de padronização automática de currículos.', summaryEN: 'Recruitment and job posting management. A self-initiated résumé standardization tool.' },
};
const educationPresentation = {
  1: { id: 'computing', language: 'technical', summary: 'Algoritmos, estruturas de dados e desenvolvimento de software.', summaryEN: 'Algorithms, data structures and software development.' },
  2: { id: 'school', language: 'organic', background: true },
  3: { id: 'studies', language: 'combined' },
};

const audiovisual = projects.find((record) => record.id === 14);
const computing = education.find((record) => record.id === 1);
const records = [
  ...education.map((record) => ({ ...educationPresentation[record.id], kind: 'education', record })),
  ...experience.map((record) => ({ ...experiencePresentation[record.id], kind: 'experience', record })),
  ...(audiovisual ? [{
    id: 'audiovisual', kind: 'project', record: audiovisual,
    language: 'organic', background: true,
    summary: 'Captação de imagem e áudio, edição de vídeo e produção em grupo.',
    summaryEN: 'Image and audio capture, video editing and group production.',
  }] : []),
];

export const pathMoments = records.map((moment) => {
  const startDate = moment.record.startDate ?? moment.record.year.split('-')[0];
  return {
    ...moment,
    startDate,
    year: startDate.slice(0, 4),
    datePrecision: startDate.length === 4 ? 'year' : 'month',
    // The departure and continuation belong to the same academic transition.
    // A year-only date is not converted to January or ordered within that year.
    previousStudies: moment.id === 'studies' ? computing : null,
  };
}).sort((a, b) => {
  const year = Number(a.year) - Number(b.year);
  if (year) return year;
  if (a.datePrecision === 'month' && b.datePrecision === 'month') return a.startDate.localeCompare(b.startDate);
  // Year-only academic context precedes the dated work in the composition;
  // the 2026 parallel-period label explicitly avoids a within-year sequence.
  return (a.datePrecision === 'year' ? 0 : 1) - (b.datePrecision === 'year' ? 0 : 1);
});

export function pathIdentity(moment, field) {
  const { record, kind } = moment;
  if (kind === 'experience') return { role: field(record, 'position'), organization: record.companyShort === 'IF Sudeste MG' ? record.companyShort : record.company };
  if (kind === 'education') return { role: field(record, 'degree'), organization: record.institution };
  const [role, organization] = record.name.split(' — ');
  return { role, organization };
}
