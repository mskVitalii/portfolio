export type Certificate = {
  title: string;
  issuer: string;
  year: number;
  credentialUrl?: string;
  category: "cloud" | "language" | "development" | "other";
};

export const CERTIFICATES: Certificate[] = [
  {
    title: "IELTS Academic",
    issuer: "British Council",
    year: 2022,
    category: "language",
  },
];
