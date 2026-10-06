import { education, experience } from './portfolioData';

// A deliberately small selection, not a second chronology. Change the selection
// here; identity, role and date precision continue to come from portfolioData.
const selection = [
  { id: 'studies', category: 'learning', record: education.find((item) => item.id === 3), titleKey: 'degree', organizationKey: 'institution' },
  { id: 'practice', category: 'building', record: experience.find((item) => item.id === 5), titleKey: 'position', organizationKey: 'company' },
];

export const nowData = {
  items: selection.filter(({ record }) => record?.current === true && record.endDate == null),
};
