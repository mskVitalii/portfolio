"use client";

import {
  AudioLines,
  BatteryCharging,
  Boxes,
  Bot,
  Camera,
  Code,
  Cpu,
  Database,
  FileText,
  Globe,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  ListOrdered,
  LogIn,
  Map as MapIcon,
  Megaphone,
  MessageSquare,
  MonitorSmartphone,
  Package,
  Palette,
  Radio,
  Rss,
  ScanEye,
  ScanFace,
  Search,
  Send,
  Server,
  ShieldCheck,
  Signal,
  Sparkles,
  Target,
  Timer,
  User,
  UserPlus,
  Users,
  Volume2,
  Workflow,
  Zap,
  HardDrive,
} from "lucide-react";
import { FlowDiagram, type FlowNode, type FlowScenario } from "./FlowDiagram";

interface FlowConfig {
  /** Key under `Projects.flows` in messages/*.json. */
  messageKey: string;
  nodes: FlowNode[];
  scenarios: FlowScenario[];
}

// Each path mirrors what the project's description and write-up state —
// nothing here is meant to add architecture the project didn't have.
const FLOWS: Record<string, FlowConfig> = {
  "infineon-parking-guidance": {
    messageKey: "parkingGuidance",
    nodes: [
      { id: "camera", icon: Camera },
      { id: "onDevice", icon: Cpu },
      { id: "mqtt", icon: Radio },
      { id: "backend", icon: Server },
      { id: "dashboard", icon: MapIcon },
    ],
    scenarios: [
      { id: "occupancy", path: ["camera", "onDevice", "mqtt", "backend", "dashboard"] },
      { id: "offline", path: ["camera", "backend", "dashboard"] },
    ],
  },
  "ozon-warehouse-search": {
    messageKey: "warehouseSearch",
    nodes: [
      { id: "picker", icon: User },
      { id: "wms", icon: MonitorSmartphone },
      { id: "service", icon: Server },
      { id: "redis", icon: Zap },
      { id: "es", icon: Search },
      { id: "catalog", icon: Package },
      { id: "kafka", icon: Workflow },
    ],
    scenarios: [
      { id: "hit", path: ["picker", "wms", "service", "redis"] },
      { id: "miss", path: ["picker", "wms", "service", "redis", "es"] },
      { id: "update", path: ["catalog", "kafka", "service", "es", "redis"] },
    ],
  },
  "master-thesis-semantic-search": {
    messageKey: "semanticSearch",
    nodes: [
      { id: "frontend", icon: MonitorSmartphone },
      { id: "orchestrator", icon: Workflow },
      { id: "embedder", icon: Boxes },
      { id: "qdrant", icon: Database },
      { id: "reranker", icon: ListOrdered },
      { id: "llm", icon: Sparkles },
      { id: "portals", icon: Landmark, external: true },
      { id: "scrapers", icon: Bot },
      { id: "mongo", icon: Database },
    ],
    scenarios: [
      { id: "search", path: ["frontend", "orchestrator", "embedder", "qdrant", "reranker", "llm", "frontend"] },
      { id: "ingest", path: ["portals", "scrapers", "qdrant", "mongo"] },
    ],
  },
  "news-aggregator-thesis": {
    messageKey: "newsAggregator",
    nodes: [
      { id: "cron", icon: Timer },
      { id: "pg", icon: Database },
      { id: "rss", icon: Rss, external: true },
      { id: "es", icon: Search },
      { id: "web", icon: MapIcon },
      { id: "api", icon: Server },
      { id: "admin", icon: ShieldCheck },
    ],
    scenarios: [
      { id: "harvest", path: ["cron", "pg", "rss", "es"] },
      { id: "read", path: ["web", "api", "es", "web"] },
      { id: "admin", path: ["admin", "api", "pg"] },
    ],
  },
  "wedo-telegram-bots": {
    messageKey: "telegramBots",
    nodes: [
      { id: "ad", icon: Megaphone, external: true },
      { id: "landing", icon: Globe },
      { id: "bot", icon: Bot },
      { id: "keitaro", icon: Target, external: true },
      { id: "whisper", icon: AudioLines, external: true },
      { id: "character", icon: Sparkles },
    ],
    scenarios: [
      { id: "funnel", path: ["ad", "landing", "bot", "keitaro", "ad"] },
      { id: "voice", path: ["bot", "whisper", "character", "bot"] },
    ],
  },
  "semki-staffbase-hackathon": {
    messageKey: "semki",
    nodes: [
      { id: "profiles", icon: Users },
      { id: "openai", icon: Sparkles, external: true },
      { id: "qdrant", icon: Database },
      { id: "ui", icon: MonitorSmartphone },
      { id: "api", icon: Server },
      { id: "redis", icon: Zap },
    ],
    scenarios: [
      { id: "index", path: ["profiles", "openai", "qdrant"] },
      { id: "ask", path: ["ui", "api", "redis", "openai", "qdrant", "ui"] },
    ],
  },
  "fassonapi-coursework": {
    messageKey: "fassonApi",
    nodes: [
      { id: "webcam", icon: Camera },
      { id: "server", icon: Server },
      { id: "face", icon: ScanFace, external: true },
      { id: "blob", icon: HardDrive, external: true },
      { id: "signedIn", icon: LogIn },
    ],
    scenarios: [
      { id: "register", path: ["webcam", "server", "face", "blob"] },
      { id: "login", path: ["webcam", "server", "face", "signedIn"] },
    ],
  },
  "firebase-slack-auth-extension": {
    messageKey: "firebaseSlack",
    nodes: [
      { id: "signup", icon: UserPlus },
      { id: "auth", icon: KeyRound, external: true },
      { id: "fn", icon: Code },
      { id: "template", icon: FileText },
      { id: "slack", icon: MessageSquare, external: true },
    ],
    scenarios: [{ id: "signup", path: ["signup", "auth", "fn", "template", "slack"] }],
  },
  "subway-battery-monitor": {
    messageKey: "subwayBattery",
    nodes: [
      { id: "battery", icon: BatteryCharging },
      { id: "cellular", icon: Signal },
      { id: "dashboard", icon: LayoutDashboard },
      { id: "operator", icon: User },
      { id: "command", icon: Send },
    ],
    scenarios: [
      { id: "telemetry", path: ["battery", "cellular", "dashboard"] },
      { id: "rebalance", path: ["operator", "dashboard", "command"] },
    ],
  },
  "cyberphys-color-robot": {
    messageKey: "colorRobot",
    nodes: [
      { id: "object", icon: Palette },
      { id: "sensor", icon: ScanEye },
      { id: "arduino", icon: Cpu },
      { id: "buzzer", icon: Volume2 },
      { id: "led", icon: Lightbulb },
    ],
    scenarios: [
      { id: "known", path: ["object", "sensor", "arduino", "buzzer"] },
      { id: "unknown", path: ["object", "sensor", "arduino", "led"] },
    ],
  },
};

/** Step-through "how it works" diagram for projects whose mechanics are a
 * request/event flow — renders nothing for projects without one. */
export function ProjectFlow({ slug }: { slug: string }) {
  const config = FLOWS[slug];
  if (!config) return null;
  return <FlowDiagram messageKey={config.messageKey} nodes={config.nodes} scenarios={config.scenarios} />;
}
