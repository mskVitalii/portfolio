export type Certificate = {
  title: string;
  issuer: string;
  year: number;
  credentialUrl?: string;
  category: "cloud" | "language" | "development" | "other";
};

export const CERTIFICATES: Certificate[] = [
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    year: 2022,
    category: "cloud",
  },
  {
    title: "IELTS Academic",
    issuer: "British Council",
    year: 2022,
    category: "language",
  },
  {
    title: "DSH (Deutschkenntnisse für den Hochschulzugang)",
    issuer: "Chemnitz University of Technology",
    year: 2023,
    category: "language",
  },
];
