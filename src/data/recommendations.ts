export interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  text: string;
  linkedinUrl?: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "placeholder-1",
    name: "Coming soon",
    role: "Engineering Manager",
    company: "—",
    relationship: "Direct manager",
    text: "Recommendations from colleagues and managers are being collected. Check back soon.",
  },
];
