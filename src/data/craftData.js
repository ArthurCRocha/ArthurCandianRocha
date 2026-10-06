import { hardSkills, experience, projects } from './portfolioData';

// Normalize spelling only. A technology relationship requires an explicit
// technologies entry; descriptions, related languages and frameworks imply none.
const normalize = (name) => name.trim().toLowerCase();
const definitions = [
  ['interfaces', [
    ['react', 'React', ['React.js', 'React']],
    // Requested display nomenclature; the legacy source spelling is an alias.
    // This does not assert an Angular version or change the Metryx association.
    ['angular', 'Angular', ['Angular.js', 'Angular']],
    ['javascript', 'JavaScript', ['JavaScript']],
    ['typescript', 'TypeScript', ['TypeScript']],
    ['html', 'HTML5', ['HTML5']],
    ['css', 'CSS3', ['CSS3']],
    ['tailwind', 'Tailwind CSS', ['Tailwind CSS']],
    ['flutter', 'Flutter', ['Flutter']],
    ['dart', 'Dart', ['Dart']],
  ]],
  ['backend', [
    ['java', 'Java', ['Java']],
    ['python', 'Python', ['Python']],
    ['fastapi', 'FastAPI', ['FastAPI']],
    ['node', 'Node.js', ['Node.js']],
    ['express', 'Express', ['Express']],
    ['php', 'PHP', ['PHP']],
    ['cpp', 'C++', ['C++']],
    ['groovy', 'Groovy', ['Groovy']],
  ]],
  ['data', [
    ['sql', 'SQL', ['SQL']],
    ['postgres', 'PostgreSQL', ['SQL / PostgreSQL', 'PostgreSQL']],
    ['sql-server', 'SQL Server', ['SQL Server']],
    ['t-sql', 'T-SQL', ['T-SQL']],
    ['mysql', 'MySQL', ['MySQL']],
    ['redis', 'Redis', ['Redis']],
  ]],
  ['design', [
    ['photoshop', 'Photoshop', ['Adobe Photoshop', 'Photoshop']],
    ['figma', 'Figma', ['Figma']],
    ['canva', 'Canva', ['Canva']],
    ['illustrator', 'Illustrator', ['Illustrator']],
    ['indesign', 'InDesign', ['InDesign']],
    ['premiere', 'Premiere', ['Adobe Premiere']],
    ['capcut', 'CapCut', ['CapCut']],
    ['vegas', 'Sony Vegas', ['Sony Vegas']],
  ]],
  ['tools', [
    ['git', 'Git / GitHub', ['Git/GitHub']],
    ['docker', 'Docker', ['Docker']],
    ['gemini', 'Gemini API', ['Gemini API']],
    ['socket', 'Socket.io', ['Socket.io']],
    ['jwt', 'JWT', ['JWT']],
    ['powershell', 'PowerShell', ['PowerShell']],
    ['codemagic', 'Codemagic', ['Codemagic']],
  ]],
];

const skills = Object.values(hardSkills).flatMap((group) => group.skills);
const work = [
  ...experience.map((record) => ({ kind: 'experience', record })),
  ...projects.map((record) => ({ kind: 'project', record })),
];
const supportedNames = new Set([
  ...skills.map((skill) => normalize(skill.name)),
  ...work.flatMap(({ record }) => (record.technologies ?? []).map(normalize)),
]);

export const craftCategories = definitions.map(([id, entries], categoryIndex) => ({
  id,
  number: String(categoryIndex + 1).padStart(2, '0'),
  technologies: entries
    .filter(([, , aliases]) => aliases.some((name) => supportedNames.has(normalize(name))))
    .map(([technologyId, name, aliases], technologyIndex) => {
      const names = new Set(aliases.map(normalize));
      const references = work.filter(({ record }) =>
        record.technologies?.some((technology) => names.has(normalize(technology)))
      ).sort((a, b) => {
        const current = Number(Boolean(b.record.current)) - Number(Boolean(a.record.current));
        const year = (record) => Number((record.startDate ?? record.year ?? '0').slice(0, 4));
        return current || year(b.record) - year(a.record);
      });
      return {
        id: technologyId,
        name,
        category: id,
        number: `${String(categoryIndex + 1).padStart(2, '0')}.${String(technologyIndex + 1).padStart(2, '0')}`,
        aliases,
        // Keep actual data objects; never copy a role, date or project association.
        references,
      };
    }),
})).filter((category) => category.technologies.length);

export const craftTechnologies = craftCategories.flatMap((category) => category.technologies);
