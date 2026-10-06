import { contactInfo, personalInfo } from './portfolioData';

// Public professional channels already used by the portfolio. No availability
// claims or additional personal contact channels are inferred for the ending.
export const connectData = {
  name: personalInfo.displayName,
  year: '2026',
  links: [
    { id: 'email', value: contactInfo.email, href: `mailto:${contactInfo.email}`, external: false },
    ...['linkedin', 'github'].map((id) => ({
      id,
      value: contactInfo.social[id].displayName,
      href: contactInfo.social[id].url,
      external: true,
    })),
  ],
};
