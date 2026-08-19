import type { LocalizedText } from "@/lib/localized";

export interface Recommendation {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: LocalizedText;
  text: LocalizedText;
  linkedinUrl?: string;
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "waldemar-kindler",
    name: "Waldemar Kindler",
    role: "CEO",
    company: "Think Ahead Technologies",
    relationship: {
      en: "Hackathon teammate",
      de: "Teamkollege beim Hackathon",
      ru: "Напарник по хакатону",
    },
    text: {
      en: "I met Vitalii at the “Distributed AI for Predictive Maintenance” Thinkathon, where we built an edge-to-cloud AI pipeline for predictive maintenance in semiconductor manufacturing together — and took first place. His embedded systems expertise and hands-on knowledge of running AI on resource-constrained hardware were central to that result, and his Go skills gave our pipeline fast, reliable backend components. What stood out most was how effectively he uses AI-assisted engineering tools — his speed and quality went well beyond the norm. He also brought genuinely creative ideas that pushed our approach forward, all while being a reliable, easy-to-work-with teammate who explains complex things clearly.",
      de: "Ich habe Vitalii beim Thinkathon „Distributed AI for Predictive Maintenance“ kennengelernt, wo wir gemeinsam eine Edge-to-Cloud-KI-Pipeline für Predictive Maintenance in der Halbleiterfertigung entwickelten – und den ersten Platz belegten. Seine Expertise im Embedded-Bereich und sein praktisches Wissen über den Einsatz von KI auf ressourcenbeschränkten Systemen waren für dieses Ergebnis zentral, und seine Go-Kenntnisse sorgten für performante, robuste Backend-Komponenten unserer Pipeline. Besonders beeindruckt hat mich sein versierter Umgang mit KI-gestützten Entwicklungswerkzeugen – seine Geschwindigkeit und Qualität lagen weit über dem Üblichen. Zudem brachte er kreative Ideen ein, die unseren Ansatz entscheidend voranbrachten, und war dabei ein verlässlicher, angenehmer Teamkollege, der komplexe Sachverhalte klar kommunizieren kann.",
      ru: "Я познакомился с Виталием на хакатоне Thinkathon «Distributed AI for Predictive Maintenance», где мы вместе создали edge-to-cloud AI-пайплайн для предиктивного обслуживания в производстве полупроводников — и заняли первое место. Его экспертиза во встраиваемых системах и практическое понимание работы ИИ на ограниченных по ресурсам устройствах сыграли ключевую роль в этом результате, а его навыки Go обеспечили быстрые и надёжные backend-компоненты нашего пайплайна. Больше всего меня впечатлило то, насколько эффективно он использует инструменты AI-assisted разработки — скорость и качество его работы заметно превышали обычный уровень. Он также предлагал по-настоящему креативные идеи, которые двигали наш подход вперёд, оставаясь при этом надёжным и приятным членом команды, ясно объясняющим сложные вещи.",
    },
  },
  {
    id: "fedor-datnov",
    name: "Fedor Datnov",
    role: "CEO",
    company: "NCahoots, Inc.",
    relationship: {
      en: "Internship supervisor",
      de: "Praktikumsbetreuer",
      ru: "Руководитель практики",
    },
    text: {
      en: "Vitalii led a five-person team during his internship, building our order-administration panel end-to-end — from an Amazon product-data pipeline to a JWT-based auth system. He kept the team on schedule, made sure the code worked, and delivered the assignment in full. I rated his internship a perfect 10 out of 10.",
      de: "Während seines Praktikums leitete Vitalii ein fünfköpfiges Team und entwickelte unser Bestell-Administrationspanel von Grund auf – von einer Amazon-Produktdaten-Pipeline bis zu einem JWT-basierten Authentifizierungssystem. Er hielt das Team im Zeitplan, sorgte dafür, dass der Code funktionierte, und erfüllte die Aufgabe vollständig. Ich bewertete sein Praktikum mit der Bestnote 10 von 10.",
      ru: "Во время стажировки Виталий руководил командой из пяти человек и с нуля разработал панель администрирования заказов — от пайплайна сбора данных о товарах с Amazon до системы аутентификации на JWT. Он держал команду в графике, следил за работоспособностью кода и полностью выполнил задание. Я оценил его стажировку на высший балл — 10 из 10.",
    },
  },
];
