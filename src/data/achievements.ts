import {
  Home,
  UserRound,
  CreditCard,
  Mail,
  GraduationCap,
  FolderKanban,
  Quote,
  Sparkles,
  Trophy,
  Heart,
  Flame,
  Gem,
  Send,
  FileDown,
  Dices,
  Target,
  Crown,
  type LucideIcon,
} from "lucide-react";

export type AchievementId =
  | "visitHome"
  | "visitAbout"
  | "visitCard"
  | "visitHireMe"
  | "visitEducation"
  | "visitProjects"
  | "visitRecommendations"
  | "visitSkills"
  | "visitAll"
  | "tinderFavorite"
  | "tinderPolyamory"
  | "legendarySkin"
  | "ludomania"
  | "skillsMatch"
  | "contactClick"
  | "cvDownload"
  | "completionist";

export interface AchievementDef {
  id: AchievementId;
  icon: LucideIcon;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "visitHome", icon: Home },
  { id: "visitAbout", icon: UserRound },
  { id: "visitCard", icon: CreditCard },
  { id: "visitHireMe", icon: Mail },
  { id: "visitEducation", icon: GraduationCap },
  { id: "visitProjects", icon: FolderKanban },
  { id: "visitRecommendations", icon: Quote },
  { id: "visitSkills", icon: Sparkles },
  { id: "visitAll", icon: Trophy },
  { id: "tinderFavorite", icon: Heart },
  { id: "tinderPolyamory", icon: Flame },
  { id: "legendarySkin", icon: Gem },
  { id: "ludomania", icon: Dices },
  { id: "skillsMatch", icon: Target },
  { id: "contactClick", icon: Send },
  { id: "cvDownload", icon: FileDown },
  { id: "completionist", icon: Crown },
];

/** Maps the first URL segment (locale already stripped) to the page-visit achievement it unlocks. */
export const PAGE_ACHIEVEMENTS: Record<string, AchievementId> = {
  "": "visitHome",
  about: "visitAbout",
  card: "visitCard",
  "hire-me": "visitHireMe",
  education: "visitEducation",
  projects: "visitProjects",
  recommendations: "visitRecommendations",
  skills: "visitSkills",
};

export const ALL_PAGE_ACHIEVEMENT_IDS: AchievementId[] = Object.values(PAGE_ACHIEVEMENTS);
