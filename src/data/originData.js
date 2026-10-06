import { education, experience, projects } from './portfolioData';

// References to verified records; narrative copy lives in translations.js.
export const originFacts = {
  computing: education.find((item) => item.id === 1),
  design: experience.find((item) => item.id === 3),
  development: experience.find((item) => item.id === 4),
  studies: education.find((item) => item.current),
  audiovisual: projects.find((item) => item.id === 14),
};

export function originCopy(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}
