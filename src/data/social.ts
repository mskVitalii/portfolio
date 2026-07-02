export type SocialId = "email" | "linkedin" | "github" | "telegram";

export interface SocialLink {
  id: SocialId;
  label: string;
  value: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "email", label: "Email", value: "msk.vitaly@gmail.com", href: "mailto:msk.vitaly@gmail.com" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/mskvitalii", href: "https://linkedin.com/in/mskvitalii" },
  { id: "github", label: "GitHub", value: "github.com/mskvitalii", href: "https://github.com/mskvitalii" },
  { id: "telegram", label: "Telegram", value: "@mskvitalii", href: "https://t.me/mskvitalii" },
];

export function getSocialLink(id: SocialId): SocialLink {
  const link = SOCIAL_LINKS.find((l) => l.id === id);
  if (!link) throw new Error(`Unknown social link: ${id}`);
  return link;
}
