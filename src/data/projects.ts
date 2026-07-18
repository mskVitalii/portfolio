import type { LocalizedText } from "@/lib/localized";
import { COMPANY_BUNDLES, getCompanyBundle, type CompanyCredit } from "./companies";

export type ProjectStatus = "active" | "archived" | "deprecated";
export type ProjectCategory = "work" | "education" | "hackathon" | "personal" | "freelance";

export interface ProjectImpact {
  label: LocalizedText;
  value: string;
}

export interface ProjectLink {
  /** Key into messages.Projects.linkLabels */
  labelKey: string;
  url: string;
}

export interface Project {
  slug: string;
  title: LocalizedText;
  company?: string;
  period: string;
  status: ProjectStatus;
  statusNote?: LocalizedText;
  category: ProjectCategory;
  tagline: LocalizedText;
  description: {
    hr: LocalizedText;
    business: LocalizedText;
    tech: LocalizedText;
  };
  /** Optional structured Situation/Task/Action/Result breakdown, rendered instead
   * of a wall of text in HR mode when a project's story fits the format well. */
  star?: {
    situation: LocalizedText;
    task: LocalizedText;
    action: LocalizedText;
    result: LocalizedText;
  };
  impact?: ProjectImpact[];
  stack: string[];
  featured?: boolean;
  /** Public paths (e.g. "/images/projects/<slug>/foo.png") to screenshots/photos for this project. */
  images?: string[];
  links?: ProjectLink[];
  /** Supporting documents (e.g. reference letters) rendered as an inline PDF viewer. */
  referenceDocuments?: { title: LocalizedText; url: string }[];
  /** Optional human shout-out to a collaborator on this specific project (as opposed to
   * `CompanyBundle.credit`, which applies to every project under that company). */
  credit?: CompanyCredit;
}

export const PROJECTS: Project[] = [
  // ─── Infineon Technologies AG (09/2024 – present) ──────────────────────────
  {
    slug: "infineon-parking-guidance",
    title: {
      en: "Parking Guidance System",
      de: "Parkleitsystem",
      ru: "Система навигации по парковке",
    },
    company: "Infineon Technologies AG",
    period: "09/2024 – present",
    status: "active",
    category: "work",
    tagline: {
      en: "In-house system replacing a commercial vendor, running on Infineon's own PSoC Edge chips",
      de: "Eigenentwicklung statt Fremdanbieter — läuft auf Infineons eigenen PSoC-Edge-Chips",
      ru: "Собственная система вместо стороннего поставщика — работает на чипах PSoC Edge самой Infineon",
    },
    featured: true,
    description: {
      hr: {
        en: "Full-Stack Developer building a brand-new Parking Guidance System from the ground up — backend, frontend, and the embedded computer vision that powers it. Part of a cross-functional team at Infineon's Dresden campus.",
        de: "Full-Stack-Entwickler für ein komplett neues Parkleitsystem — von Backend über Frontend bis zur eingebetteten Computer-Vision-Lösung. Teil eines funktionsübergreifenden Teams am Infineon-Standort Dresden.",
        ru: "Full-stack разработчик, создающий с нуля новую систему навигации по парковке — бэкенд, фронтенд и embedded компьютерное зрение. Часть кросс-функциональной команды на площадке Infineon в Дрездене.",
      },
      business: {
        en: "Replaced a commercial parking guidance vendor with an in-house system, saving €480,000/year compared to market alternatives. Powers a barrier control application used by 8,000 users, including 3,000 monthly active users.",
        de: "Kommerziellen Parkleitsystem-Anbieter durch eine Eigenentwicklung ersetzt und dadurch 480.000 €/Jahr gegenüber Marktalternativen eingespart. Treibt eine Schrankensteuerung mit 8.000 Nutzern an, davon 3.000 monatlich aktiv.",
        ru: "Заменили коммерческого поставщика системы навигации собственной разработкой, что сэкономило €480 000 в год по сравнению с рыночными альтернативами. Система управляет шлагбаумами и используется 8 000 пользователями, из них 3 000 — ежемесячно активные.",
      },
      tech: {
        en: "It was important to ship a solution that runs directly on Infineon's own PSoC Edge chips — embedded computer vision on-device in C, rather than relying on cloud inference. Python for backend services, C# for supporting services, JS/TS + React for the frontend.",
        de: "Wichtig war eine Lösung, die direkt auf Infineons eigenen PSoC-Edge-Chips läuft — eingebettete Computer Vision in C auf dem Gerät statt Cloud-Inferenz. Python für Backend-Services, C# für unterstützende Dienste, JS/TS + React für das Frontend.",
        ru: "Было важно реализовать решение, работающее прямо на собственных чипах PSoC Edge компании Infineon — embedded компьютерное зрение на устройстве на C, а не инференс в облаке. Python для бэкенд-сервисов, C# для вспомогательных сервисов, JS/TS + React для фронтенда.",
      },
    },
    impact: [
      { label: { en: "Annual savings", de: "Jährliche Einsparung", ru: "Экономия в год" }, value: "€480K" },
      { label: { en: "Users", de: "Nutzer", ru: "Пользователей" }, value: "8,000" },
      { label: { en: "Monthly active", de: "Monatlich aktiv", ru: "Активных в месяц" }, value: "3,000" },
    ],
    stack: ["Python", "C#", "C", "JS/TS", "React", "Computer Vision", "PSoC Edge"],
    images: [
      "/images/projects/infineon-parking-guidance/campus-building-day.jpg",
      "/images/projects/infineon-parking-guidance/campus-building-night.jpg",
      "/images/projects/infineon-parking-guidance/dresden-campus-map.jpg",
      "/images/projects/infineon-parking-guidance/embedded-hardware-enclosure.jpg",
      "/images/projects/infineon-parking-guidance/psoc-edge-camera-kit.jpg",
      "/images/projects/infineon-parking-guidance/psoc-edge-ai-kit-box.jpg",
      "/images/projects/infineon-parking-guidance/cv-bus-detection-demo.jpg",
    ],
  },
  {
    slug: "infineon-thingkathon",
    title: {
      en: "Thin[gk]athon — Distributed AI for Predictive Maintenance",
      de: "Thin[gk]athon — Verteilte KI für vorausschauende Wartung",
      ru: "Thin[gk]athon — распределённый AI для предиктивного обслуживания",
    },
    company: "Infineon Technologies AG",
    period: "06/2026",
    status: "archived",
    category: "work",
    tagline: {
      en: "3-day company hackathon — won 1st place with an on-device predictive-maintenance system",
      de: "3-tägiger interner Hackathon — 1. Platz mit einem On-Device-System für vorausschauende Wartung",
      ru: "3-дневный корпоративный хакатон — 1-е место с системой предиктивного обслуживания на устройстве",
    },
    description: {
      hr: {
        en: "Represented Infineon in a 3-day internal hackathon on distributed AI for predictive maintenance, building an on-device conveyor-line fault-detection system with a small team — won 1st place.",
        de: "Infineon bei einem 3-tägigen internen Hackathon zu verteilter KI für vorausschauende Wartung vertreten — mit einem kleinen Team ein On-Device-Fehlererkennungssystem für Förderbänder gebaut und den 1. Platz gewonnen.",
        ru: "Представлял Infineon на 3-дневном внутреннем хакатоне по распределённому AI для предиктивного обслуживания — с небольшой командой построили систему обнаружения неисправностей конвейерных линий прямо на устройстве и заняли 1-е место.",
      },
      business: {
        en: "Built a predictive-maintenance system for factory conveyor lines that detects faults directly on-device and improves over time via a retraining loop — addressing the real bottleneck at manufacturing scale: not a lack of sensor data, but the ability to act on it locally. Won 1st place; the €1,000 charity prize was donated to an anti-cyberbullying foundation.",
        de: "System zur vorausschauenden Wartung für Förderbänder in der Fabrik gebaut, das Fehler direkt auf dem Gerät erkennt und sich durch eine Retraining-Schleife stetig verbessert — löst den eigentlichen Engpass in der Fertigung: nicht fehlende Sensordaten, sondern die Fähigkeit, lokal darauf zu reagieren. 1. Platz gewonnen; das Spendenpreisgeld von 1.000 € ging an eine Stiftung gegen Cybermobbing.",
        ru: "Построили систему предиктивного обслуживания для заводских конвейерных линий, которая обнаруживает неисправности прямо на устройстве и со временем улучшается через цикл переобучения — решая реальное узкое место на производстве: не нехватку данных с датчиков, а способность действовать на их основе локально. Заняли 1-е место; благотворительный приз в €1000 передали фонду против кибербуллинга.",
      },
      tech: {
        en: "PSoC Edge for on-device sensing and inference, detecting anomalies in sound and vibration from the conveyor line. Built an incremental-learning loop: the device flags anomalies locally and reports them upstream, models get retrained centrally, and updated weights are pushed back down via a downlink update. Also explored computer vision as a positioning signal, precisely measuring the gap between conveyor rollers.",
        de: "PSoC Edge für Sensorik und Inferenz auf dem Gerät, zur Erkennung von Anomalien in Geräusch und Vibration des Förderbands. Eine Schleife für inkrementelles Lernen gebaut: Das Gerät markiert Anomalien lokal und meldet sie weiter, Modelle werden zentral neu trainiert, aktualisierte Gewichte werden per Downlink zurückgespielt. Zusätzlich Computer Vision als Positionssignal untersucht, um den Abstand zwischen Förderbandrollen präzise zu messen.",
        ru: "PSoC Edge для сенсорики и инференса прямо на устройстве, обнаружение аномалий в звуке и вибрации конвейерной линии. Построен цикл инкрементального обучения: устройство локально помечает аномалии и передаёт их наверх, модели переобучаются централизованно, а обновлённые веса возвращаются обратно через downlink-обновление. Также исследовали компьютерное зрение как сигнал позиционирования — точное измерение зазора между роликами конвейера.",
      },
    },
    impact: [
      { label: { en: "Result", de: "Ergebnis", ru: "Результат" }, value: "1st place" },
      { label: { en: "Charity prize", de: "Spendenpreis", ru: "Благотворительный приз" }, value: "€1,000" },
    ],
    stack: ["PSoC Edge", "Embedded Systems", "Computer Vision", "Machine Learning"],
    links: [{ labelKey: "eventPage", url: "https://www.eventbrite.de/e/thingkathon-distributed-ai-for-predictive-maintenance-tickets-1986900174909" }],
    images: [
      "/images/projects/infineon-thingkathon/conveyor-rig-1.jpg",
      "/images/projects/infineon-thingkathon/conveyor-rig-2.jpg",
      "/images/projects/infineon-thingkathon/architecture-sketch-1.jpg",
      "/images/projects/infineon-thingkathon/architecture-sketch-2.jpg",
    ],
  },

  // ─── onlineTours (08/2023 – 07/2024) ────────────────────────────────────────
  {
    slug: "online-tours-ab",
    title: {
      en: "A/B Testing & UI Platform",
      de: "A/B-Testing- & UI-Plattform",
      ru: "Платформа A/B-тестирования и UI",
    },
    company: "onlineTours",
    period: "08/2023 – 07/2024",
    status: "archived",
    category: "work",
    tagline: {
      en: "New component library shipped to production, replacing legacy screens one at a time",
      de: "Neue Komponentenbibliothek in Produktion — Legacy-Screens Stück für Stück abgelöst",
      ru: "Новая библиотека компонентов в проде — legacy-экраны заменялись один за другим",
    },
    description: {
      hr: {
        en: "Full-Stack Developer building A/B testing infrastructure and a React component library at a travel aggregator for tours & hotels.",
        de: "Full-Stack-Entwickler für A/B-Testing-Infrastruktur und eine React-Komponentenbibliothek bei einem Reise-Aggregator für Touren & Hotels.",
        ru: "Full-stack разработчик A/B-тестирования и библиотеки React-компонентов в турагрегаторе туров и отелей.",
      },
      business: {
        en: "Developed business logic for A/B testing in SEO and UX that increased key metrics by 11.63%. Built new UI components in production since November 2023, replacing legacy screens.",
        de: "Business-Logik für A/B-Tests in SEO und UX entwickelt, die zentrale Kennzahlen um 11,63 % steigerte. Seit November 2023 neue UI-Komponenten in Produktion gebaut und Legacy-Screens abgelöst.",
        ru: "Разработал бизнес-логику A/B-тестирования в SEO и UX, которая подняла ключевые метрики на 11,63%. С ноября 2023 года новые UI-компоненты выкатывались в прод, заменяя устаревшие экраны.",
      },
      tech: {
        en: "Server-side A/B flag logic in Ruby on Rails 7 with Redis-based caching. Legacy UI maintained in React + Redux. New component library built with React, TypeScript, Tailwind CSS and Jotai, documented in Storybook and deployed via GitLab CI/CD on Docker & Kubernetes.",
        de: "Serverseitige A/B-Flag-Logik in Ruby on Rails 7 mit Redis-Caching. Legacy-UI in React + Redux gepflegt. Neue Komponentenbibliothek mit React, TypeScript, Tailwind CSS und Jotai gebaut, in Storybook dokumentiert und via GitLab CI/CD auf Docker & Kubernetes deployt.",
        ru: "Серверная логика A/B-флагов на Ruby on Rails 7 с кешированием на Redis. Legacy UI поддерживался на React + Redux. Новая библиотека компонентов на React, TypeScript, Tailwind CSS и Jotai, задокументирована в Storybook, деплой через GitLab CI/CD на Docker и Kubernetes.",
      },
    },
    impact: [{ label: { en: "Metric uplift", de: "Kennzahl-Steigerung", ru: "Прирост метрики" }, value: "11.63%" }],
    stack: ["React", "TypeScript", "Tailwind", "Jotai", "Redux", "Ruby on Rails", "Docker", "Kubernetes", "Redis", "Storybook", "GitLab CI/CD"],
  },

  // ─── OZON Tech (07/2021 – 07/2023) — "Contribution to 2 projects" ─────────
  {
    slug: "ozon-warehouse-search",
    title: {
      en: "Warehouse Search Engine",
      de: "Lager-Suchmaschine",
      ru: "Поисковый движок склада",
    },
    company: "OZON Tech",
    period: "07/2021 – 07/2023",
    status: "archived",
    category: "work",
    tagline: {
      en: "200M warehouse items searchable in under 5 seconds",
      de: "200 Mio. Lagerartikel in unter 5 Sekunden durchsuchbar",
      ru: "200 млн товаров на складе — поиск быстрее 5 секунд",
    },
    featured: true,
    description: {
      hr: {
        en: "Backend Developer on the warehouse search team at OZON — one of Russia's largest e-commerce platforms.",
        de: "Backend-Entwickler im Warehouse-Search-Team bei OZON — einer der größten E-Commerce-Plattformen Russlands.",
        ru: "Backend-разработчик в команде поиска склада в OZON — одной из крупнейших e-commerce платформ России.",
      },
      business: {
        en: "Enabled warehouse staff to search across 200 million items in under 5 seconds, speeding up order picking at scale.",
        de: "Ermöglichte dem Lagerpersonal, 200 Millionen Artikel in unter 5 Sekunden zu durchsuchen, und beschleunigte so das Kommissionieren im großen Maßstab.",
        ru: "Дали складскому персоналу возможность искать среди 200 миллионов товаров быстрее чем за 5 секунд, ускорив сборку заказов в масштабе.",
      },
      tech: {
        en: "Go microservice with ElasticSearch full-text search, Kafka-based entity retrieval, unit and load tests with mocked values. Observability via Prometheus & Grafana, query tracing with Jaeger. Deployed on Docker & Kubernetes with Redis caching.",
        de: "Go-Microservice mit ElasticSearch-Volltextsuche, Kafka-basiertem Entity-Retrieval, Unit- und Lasttests mit gemockten Werten. Observability via Prometheus & Grafana, Query-Tracing mit Jaeger. Deployment auf Docker & Kubernetes mit Redis-Caching.",
        ru: "Go-микросервис с полнотекстовым поиском ElasticSearch, получением сущностей через Kafka, unit- и нагрузочными тестами на моках. Observability через Prometheus и Grafana, трейсинг запросов через Jaeger. Деплой на Docker и Kubernetes с кешированием Redis.",
      },
    },
    impact: [
      { label: { en: "Items indexed", de: "Indexierte Artikel", ru: "Товаров в индексе" }, value: "200M" },
      { label: { en: "Search latency", de: "Such-Latenz", ru: "Задержка поиска" }, value: "<5 sec" },
    ],
    stack: ["Go", "ElasticSearch", "Kafka", "Redis", "Prometheus", "Grafana", "Jaeger", "Docker", "Kubernetes"],
  },
  {
    slug: "ozon-barcode-scanner",
    title: {
      en: "Barcode Scanner Integration",
      de: "Barcode-Scanner-Integration",
      ru: "Интеграция сканера штрихкодов",
    },
    company: "OZON Tech",
    period: "07/2021 – 07/2023",
    status: "archived",
    category: "work",
    tagline: {
      en: "€86K/year saved by replacing manual scanning workflows",
      de: "86.000 €/Jahr eingespart durch Ablösung manueller Scan-Workflows",
      ru: "€86К в год экономии за счёт отказа от ручного сканирования",
    },
    description: {
      hr: {
        en: "Backend Developer building the point-update service behind OZON's warehouse barcode scanners, deployed to speed up the returns processing zone.",
        de: "Backend-Entwickler für den Point-Update-Service hinter OZONs Lager-Barcode-Scannern, ausgerollt zur Beschleunigung der Retourenbearbeitung.",
        ru: "Backend-разработчик сервиса point-update для складских сканеров штрихкодов OZON, развёрнутого для ускорения зоны обработки возвратов.",
      },
      business: {
        en: "Integrated barcode scanner hardware with a real-time point-update service in OZON's returns zone, cutting manual data-entry — saving €86,000/year while giving warehouse ops a scalable foundation for return-processing throughput as order volume grew. Still in use today.",
        de: "Barcode-Scanner-Hardware mit einem Echtzeit-Point-Update-Service in OZONs Retourenzone integriert und manuelle Dateneingabe reduziert — spart 86.000 €/Jahr und gibt dem Lagerbetrieb eine skalierbare Grundlage für steigenden Retourendurchsatz. Bis heute im Einsatz.",
        ru: "Интегрировали оборудование сканеров штрихкодов с сервисом point-update в реальном времени в зоне возвратов OZON, сократив ручной ввод данных — экономия €86 000 в год и масштабируемая основа для роста пропускной способности обработки возвратов. До сих пор в эксплуатации.",
      },
      tech: {
        en: "C# integration of barcode scanner hardware over WebSockets, with a PostgreSQL-backed point-update service rolled out across many distributed returns-zone terminals. Also rewrote a Mattermost bot that monitors warehouse errors from Python to C#.",
        de: "C#-Integration der Barcode-Scanner-Hardware über WebSockets, mit einem PostgreSQL-basierten Point-Update-Service auf vielen verteilten Terminals in der Retourenzone. Zusätzlich einen Mattermost-Bot zur Überwachung von Lagerfehlern von Python nach C# umgeschrieben.",
        ru: "Интеграция оборудования сканеров штрихкодов на C# через WebSockets, сервис point-update на PostgreSQL, развёрнутый на множестве распределённых терминалов зоны возвратов. Также переписал Mattermost-бота для мониторинга складских ошибок с Python на C#.",
      },
    },
    impact: [{ label: { en: "Cost savings", de: "Kosteneinsparung", ru: "Экономия" }, value: "€86K/yr" }],
    stack: ["C#", "WebSockets", "PostgreSQL"],
    images: [
      "/images/projects/ozon-tech/office-54th-floor.png",
      "/images/projects/ozon-tech/office-view-1.jpg",
      "/images/projects/ozon-tech/office-view-2.jpg",
      "/images/projects/ozon-tech/street-view-night.jpg",
    ],
  },

  // ─── egsha ───────────────────────────────────────────────────────────────
  {
    slug: "wedo-ecommerce-bidder",
    title: {
      en: "E-Commerce Ad Bidder",
      de: "E-Commerce-Anzeigenbieter",
      ru: "Автоматический байдер рекламы для e-commerce",
    },
    company: "egsha",
    period: "03/2023 – 04/2023",
    status: "archived",
    statusNote: {
      en: "Client's ad spend later moved off-marketplace; tool was retired.",
      de: "Das Werbebudget des Kunden wanderte später vom Marketplace ab; das Tool wurde eingestellt.",
      ru: "Позже клиент перенёс рекламный бюджет за пределы маркетплейса; инструмент вывели из эксплуатации.",
    },
    category: "work",
    tagline: {
      en: "Saves the client €52,000/year in ad spend — priced via TDD-built pure functions",
      de: "Spart dem Kunden 52.000 €/Jahr Werbebudget — Preisbildung über TDD-entwickelte reine Funktionen",
      ru: "Экономит клиенту €52 000 в год на рекламе — цена считается чистыми функциями, разработанными по TDD",
    },
    featured: true,
    description: {
      hr: {
        en: "Full-Stack Developer building an automated ad-price optimizer for an e-commerce client.",
        de: "Full-Stack-Entwickler für einen automatisierten Anzeigenpreis-Optimierer für einen E-Commerce-Kunden.",
        ru: "Full-stack разработчик автоматического оптимизатора цены рекламы для e-commerce клиента.",
      },
      business: {
        en: "On the marketplace, sellers pay per view — bid too high and a $100 product loses money before it's even shown 10 times; bid too low and it barely gets seen at all. The right price weighs stock levels, the marketplace's mandatory ad program, and historical performance. Automating it saved the client €52,000/year versus manual management.",
        de: "Im Marketplace zahlen Verkäufer pro Ansicht — ein zu hohes Gebot lässt ein 100-$-Produkt schon vor der 10. Ansicht ins Minus rutschen, ein zu niedriges bedeutet, dass es kaum gesehen wird. Der richtige Preis berücksichtigt Lagerbestand, das obligatorische Werbeprogramm des Marktplatzes und historische Performance-Daten. Diese Preisentscheidung zu automatisieren sparte dem Kunden 52.000 €/Jahr gegenüber manueller Steuerung.",
        ru: "На маркетплейсе продавец платит за показ карточки: слишком высокая ставка уводит товар за $100 в минус ещё до 10-го показа, слишком низкая — товар почти никто не видит. Правильная цена учитывает остатки на складе, обязательную рекламную программу маркетплейса и исторические данные. Автоматизация этого решения сэкономила клиенту €52 000 в год по сравнению с ручным управлением.",
      },
      tech: {
        en: "Python service for e-commerce ad bidding and price optimization, developed test-first (TDD) with pure functions — guaranteeing the correct bid is set at the correct moment in time, without side effects that would make the pricing logic hard to trust.",
        de: "Python-Service für E-Commerce-Anzeigenbietung und Preisoptimierung, testgetrieben (TDD) mit reinen Funktionen entwickelt — garantiert, dass zur richtigen Zeit das richtige Gebot gesetzt wird, ohne Seiteneffekte, die die Preislogik unzuverlässig machen würden.",
        ru: "Python-сервис для автоматических ставок и оптимизации цены рекламы в e-commerce, разработанный по TDD с чистыми функциями — это гарантирует, что нужная ставка выставляется в нужный момент времени, без побочных эффектов, которые сделали бы логику ценообразования ненадёжной.",
      },
    },
    impact: [{ label: { en: "Ad savings", de: "Werbe-Einsparung", ru: "Экономия на рекламе" }, value: "€52K/yr" }],
    stack: ["Python", "TDD"],
  },
  {
    slug: "flyboots-store",
    title: {
      en: "FlyBoots — Cross-Border Resale Store",
      de: "FlyBoots — Grenzüberschreitender Wiederverkaufsshop",
      ru: "FlyBoots — трансграничный магазин перепродажи",
    },
    company: "egsha",
    period: "01/2023 – 02/2023",
    status: "archived",
    statusNote: {
      en: "Delivered for launch; friend's business, no further engagement afterward.",
      de: "Zum Launch geliefert; Geschäft eines Freundes, danach kein weiteres Engagement.",
      ru: "Сдали к запуску; бизнес друга, дальнейшего сотрудничества не было.",
    },
    category: "work",
    tagline: {
      en: "Classic cross-border resale: sourced via Poizon in China, margin from price delta and traffic cost",
      de: "Klassischer grenzüberschreitender Wiederverkauf: Einkauf über Poizon in China, Marge aus Preisdifferenz und Traffic-Kosten",
      ru: "Классический трансграничный ресейл: закупка через Poizon в Китае, маржа на разнице цен и стоимости трафика",
    },
    description: {
      hr: {
        en: "Built an e-commerce store for a friend's clothing-resale business, sourcing inventory from the Chinese marketplace Poizon. Introduced a lightweight Scrum process partway through to resolve team conflict, and owned payments, shipping integrations, state management, CMS and the static build.",
        de: "E-Commerce-Shop für das Wiederverkaufsgeschäft eines Freundes gebaut, Warenbeschaffung über den chinesischen Marktplatz Poizon. Mitten im Projekt einen leichtgewichtigen Scrum-Prozess eingeführt, um Teamkonflikte zu lösen, und Zahlungen, Versand-Integrationen, State-Management, CMS und den statischen Build verantwortet.",
        ru: "Построили e-commerce магазин для бизнеса друга по перепродаже одежды, товар закупался на китайском маркетплейсе Poizon. В середине проекта ввёл лёгкий Scrum-процесс для разрешения конфликта в команде, отвечал за платежи, интеграции доставки, стейт-менеджмент, CMS и статическую сборку.",
      },
      business: {
        en: "A classic cross-border resale play: bought in China through Poizon, shipped across the border, margin coming from the price delta between markets. 3 weeks, 3–4 people full-time, to hit the client's launch date — a direct test of front-end skills retained from a 6-month backend internship at OZON. They held up.",
        de: "Ein klassischer grenzüberschreitender Wiederverkauf: Einkauf in China über Poizon, Versand über die Grenze, Marge aus der Preisdifferenz zwischen den Märkten. 3 Wochen, 3–4 Personen in Vollzeit, um den Zieltermin des Kunden zu treffen — ein direkter Test der Frontend-Fähigkeiten aus einem 6-monatigen Backend-Praktikum bei OZON. Sie bewährten sich.",
        ru: "Классический трансграничный ресейл: закупка в Китае через Poizon, доставка через границу, маржа — на разнице цен между рынками. 3 недели, 3–4 человека на полной занятости, чтобы успеть к дате запуска клиента — прямая проверка фронтенд-навыков, оставшихся после 6-месячной backend-стажировки в OZON. Они подтвердились.",
      },
      tech: {
        en: "Next.js (started on a beta release, which caused early SSR/SSG confusion) with Redux Toolkit, GraphQL, and DatoCMS. Integrated CDEK and BoxBerry for shipping and PayAnyWay for payments. Yandex.Metrica for real-time user behavior tracking.",
        de: "Next.js (auf einer Beta-Version gestartet, was anfangs zu SSR/SSG-Verwirrung führte) mit Redux Toolkit, GraphQL und DatoCMS. CDEK und BoxBerry für den Versand sowie PayAnyWay für Zahlungen integriert. Yandex.Metrica für Echtzeit-Nutzerverhaltens-Tracking.",
        ru: "Next.js (стартовали на бета-версии, что поначалу вызывало путаницу с SSR/SSG) с Redux Toolkit, GraphQL и DatoCMS. Интегрированы CDEK и BoxBerry для доставки, PayAnyWay для платежей. Яндекс.Метрика для отслеживания поведения пользователей в реальном времени.",
      },
    },
    impact: [{ label: { en: "Delivery", de: "Lieferzeit", ru: "Срок сдачи" }, value: "3 weeks" }],
    stack: ["Next.js", "GraphQL", "Redux", "DatoCMS"],
    links: [{ labelKey: "store", url: "https://flyboot.vercel.app/" }],
  },
  {
    slug: "phone-repair-resale",
    title: {
      en: "iPhone Repair & Resale",
      de: "iPhone-Reparatur & Wiederverkauf",
      ru: "Ремонт и перепродажа iPhone",
    },
    company: "egsha",
    period: "01/2018 – 03/2018",
    status: "archived",
    statusNote: {
      en: "Small resale venture, wound down after a bad parts order.",
      de: "Kleines Wiederverkaufs-Unternehmen, nach einer fehlerhaften Ersatzteilbestellung eingestellt.",
      ru: "Небольшой перепродажный бизнес, свёрнут после неудачной партии запчастей.",
    },
    category: "work",
    tagline: {
      en: "First attempt at business — refurbished and resold phones bought broken off Avito",
      de: "Erster Geschäftsversuch — defekte Handys von Avito gekauft, repariert und weiterverkauft",
      ru: "Первая попытка в бизнес — покупка сломанных телефонов с Avito, ремонт и перепродажа",
    },
    description: {
      hr: {
        en: "Ran a small iPhone refurbishment and resale business with a school friend — handled sourcing and inventory while a partner handled repairs and sales.",
        de: "Kleines iPhone-Aufarbeitungs- und Wiederverkaufsgeschäft mit einem Schulfreund geführt — Beschaffung und Bestand übernommen, während ein Partner Reparaturen und Verkauf verantwortete.",
        ru: "Вёл небольшой бизнес по восстановлению и перепродаже iPhone со школьным другом — отвечал за закупку и склад, партнёр занимался ремонтом и продажами.",
      },
      business: {
        en: "The first real attempt at business: bought broken phones off Avito, repaired them with parts from the radio market, and resold them — 3 units sold before a bad parts order from China ended the venture at a loss. It stopped making sense fast, too, as phones became harder to disassemble and original boards impossible to source. A first hands-on lesson in inventory risk.",
        de: "Der erste echte Geschäftsversuch: defekte Handys über Avito gekauft, mit Teilen vom Elektronikmarkt repariert und weiterverkauft — 3 Stück verkauft, bevor eine fehlerhafte Ersatzteillieferung aus China das Unternehmen mit Verlust beendete. Es verlor auch schnell an Sinn, da Telefone zunehmend schwerer zu zerlegen und originale Ersatzplatinen unmöglich zu beschaffen waren. Eine erste praktische Lektion in Bestandsrisiko.",
        ru: "Первая настоящая попытка бизнеса: покупали сломанные телефоны на Avito, чинили их запчастями с радиорынка и перепродавали — продали 3 штуки, пока неудачная партия запчастей из Китая не закончила предприятие с убытком. Затея быстро теряла смысл и по другой причине: телефоны становились всё менее разборными, а оригинальные платы было не достать. Первый практический урок про риски товарных остатков.",
      },
      tech: {
        en: "No software — inventory and parts tracked in a spreadsheet.",
        de: "Keine Software — Bestand und Ersatzteile in einer Tabelle erfasst.",
        ru: "Без софта — склад и запчасти вели в таблице.",
      },
    },
    impact: [{ label: { en: "Units sold", de: "Verkaufte Einheiten", ru: "Продано штук" }, value: "3" }],
    stack: ["Excel"],
    images: [
      "/images/projects/phone-repair-resale/cracked-screen.jpg",
      "/images/projects/phone-repair-resale/disassembled-parts.jpg",
      "/images/projects/phone-repair-resale/opened-iphone-internals.jpg",
      "/images/projects/phone-repair-resale/restored-iphone-back.jpg",
    ],
  },

  // ─── WeDo.agency (05/2020 – 06/2021) ───────────────────────────────────────
  {
    slug: "wedo-shopify-ai-support",
    title: {
      en: "AI Support for Shopify Stores",
      de: "KI-Support für Shopify-Shops",
      ru: "AI-поддержка для магазинов Shopify",
    },
    company: "dunlimited",
    period: "05/2020 – 06/2021",
    status: "archived",
    statusNote: {
      en: "Agency pivoted; product was client-owned and handed off.",
      de: "Agentur hat sich neu ausgerichtet; das Produkt gehörte dem Kunden und wurde übergeben.",
      ru: "Агентство сменило направление; продукт принадлежал клиенту и был передан ему.",
    },
    category: "work",
    tagline: {
      en: "Handles 660 customer support tickets a month across 5 shops, built on Gorgias",
      de: "Bearbeitet 660 Support-Tickets im Monat über 5 Shops hinweg — aufgebaut auf Gorgias",
      ru: "Обрабатывает 660 обращений в месяц в 5 магазинах — построено на базе Gorgias",
    },
    description: {
      hr: {
        en: "Full-Stack Developer building an AI-powered customer support tool for Shopify merchants, on top of the Gorgias support platform.",
        de: "Full-Stack-Entwickler für ein KI-gestütztes Support-Tool für Shopify-Händler, aufbauend auf der Gorgias-Support-Plattform.",
        ru: "Full-stack разработчик AI-инструмента поддержки для продавцов Shopify, построенного поверх платформы Gorgias.",
      },
      business: {
        en: "The AI drafts every reply and sends it directly when confident enough; otherwise a human just approves it instead of writing from scratch. It filters spam, fills templates from Shopify order context, and escalates uncertain cases to a human via Telegram rather than guessing, backed by guardrails tested during development. One store, everleakproof (lingerie), is non-returnable once shipped, so the bot's instant reaction time was the only thing that could still catch a cancellation before dispatch. Live across 5 Shopify shops, handling 660 tickets a month.",
        de: "Die KI entwirft jede Antwort und verschickt sie bei ausreichender Sicherheit direkt; andernfalls muss ein Mensch nur freigeben, statt selbst zu schreiben. Sie filtert Spam, füllt Vorlagen aus dem Shopify-Bestellkontext und eskaliert unsichere Fälle statt zu raten per Telegram an einen Menschen, abgesichert durch während der Entwicklung getestete Guardrails. Ein Shop, everleakproof (Dessous), ist nach Versand nicht rückgabefähig — die sofortige Reaktionszeit des Bots war die einzige Chance, eine Stornierung noch vor dem Versand abzufangen. Im Einsatz bei 5 Shopify-Shops, 660 Tickets im Monat.",
        ru: "Нейросеть готовит каждый ответ и при достаточной уверенности отправляет его сама; иначе человеку остаётся только одобрить черновик, а не писать с нуля. Она фильтрует спам, заполняет шаблоны по контексту заказа Shopify и эскалирует неуверенные случаи человеку через Telegram, а не гадает — это подкреплено гардрейлами, протестированными в процессе разработки. Один из магазинов, everleakproof (нижнее бельё), не подлежит возврату после отправки — мгновенная реакция бота была единственным шансом успеть отменить заказ до отправки. Работает в 5 магазинах Shopify, 660 обращений в месяц.",
      },
      tech: {
        en: "AI-assisted support automation built on the Gorgias support platform and integrated with the Shopify API for order/product context. Spam classification, template-filling, guardrail checks against over-promising, and a Telegram-bot escalation path for low-confidence cases — covered by tests written during development.",
        de: "KI-gestützte Support-Automatisierung auf der Gorgias-Support-Plattform, integriert mit der Shopify-API für Bestell-/Produktkontext. Spam-Klassifikation, Vorlagen-Befüllung, Guardrail-Prüfungen gegen Überversprechen und ein Telegram-Bot-Eskalationspfad für unsichere Fälle — abgedeckt durch während der Entwicklung geschriebene Tests.",
        ru: "AI-автоматизация поддержки на платформе Gorgias, интегрированная с API Shopify для контекста заказов/товаров. Классификация спама, заполнение шаблонов, гардрейл-проверки против чрезмерных обещаний и эскалация через Telegram-бота для случаев с низкой уверенностью — покрыто тестами, написанными в процессе разработки.",
      },
    },
    impact: [{ label: { en: "Tickets handled", de: "Bearbeitete Tickets", ru: "Обработано обращений" }, value: "660/mo" }],
    stack: ["Python", "Shopify", "Gorgias", "AI", "Telegram Bot API"],
    images: ["/images/projects/wedo-shopify-ai-support/ai-spam-classification.jpg"],
  },
  {
    slug: "dunlimited-triplewhale-integration",
    title: {
      en: "TripleWhale Integration",
      de: "TripleWhale-Integration",
      ru: "Интеграция с TripleWhale",
    },
    company: "dunlimited",
    period: "05/2020 – 06/2021",
    status: "archived",
    statusNote: {
      en: "Agency pivoted; product was client-owned and handed off.",
      de: "Agentur hat sich neu ausgerichtet; das Produkt gehörte dem Kunden und wurde übergeben.",
      ru: "Агентство сменило направление; продукт принадлежал клиенту и был передан ему.",
    },
    category: "work",
    tagline: {
      en: "A straightforward sync: Shopify shipping costs pushed into TripleWhale for attribution reporting",
      de: "Eine unkomplizierte Synchronisierung: Shopify-Versandkosten für das Attribution-Reporting an TripleWhale übertragen",
      ru: "Простая синхронизация: стоимость доставки из Shopify передаётся в TripleWhale для атрибуции",
    },
    description: {
      hr: {
        en: "Full-Stack Developer building a data-sync pipeline between a Shopify store and TripleWhale, a Shopify attribution & analytics platform.",
        de: "Full-Stack-Entwickler für eine Daten-Sync-Pipeline zwischen einem Shopify-Shop und TripleWhale, einer Attribution- & Analytics-Plattform für Shopify.",
        ru: "Full-stack разработчик пайплайна синхронизации данных между магазином Shopify и TripleWhale — платформой атрибуции и аналитики для Shopify.",
      },
      business: {
        en: "A fairly banal but necessary integration: synced Shipping Costs from the Shopify order logistics system into TripleWhale, giving the client accurate marketing attribution reporting without manual data entry.",
        de: "Eine ziemlich banale, aber notwendige Integration: Versandkosten aus dem Shopify-Bestell-Logistiksystem an TripleWhale synchronisiert und dem Kunden so präzises Marketing-Attribution-Reporting ohne manuelle Dateneingabe ermöglicht.",
        ru: "Довольно банальная, но нужная интеграция: синхронизация Shipping Costs из логистической системы заказов Shopify в TripleWhale — точная маркетинговая атрибуция для клиента без ручного ввода данных.",
      },
      tech: {
        en: "Python service syncing Shopify order and ad-spend data into TripleWhale via its API.",
        de: "Python-Service, der Shopify-Bestell- und Werbeausgabendaten über die API an TripleWhale synchronisiert.",
        ru: "Python-сервис, синхронизирующий данные заказов Shopify и рекламных расходов в TripleWhale через его API.",
      },
    },
    stack: ["Python", "Shopify", "TripleWhale"],
  },
  {
    slug: "wedo-telegram-bots",
    title: {
      en: "AI-Character Telegram Bots",
      de: "Telegram-Bots mit KI-Charakteren",
      ru: "Telegram-боты с AI-персонажами",
    },
    company: "dunlimited",
    period: "05/2020 – 06/2021",
    status: "archived",
    statusNote: {
      en: "Shut down — Telegram cost-per-lead grew too high to sustain.",
      de: "Eingestellt — Cost-per-Lead auf Telegram wurde zu hoch, um tragfähig zu bleiben.",
      ru: "Закрыт — стоимость лида в Telegram стала слишком высокой.",
    },
    category: "work",
    tagline: {
      en: "Sold access to scripted AI characters — a psychologist bot that made users cry, and a fortune-teller taught to lie convincingly",
      de: "Verkauften Zugang zu skriptierten KI-Charakteren — ein Psychologen-Bot, bei dem Nutzer weinten, und ein Wahrsager, der überzeugend lügen lernte",
      ru: "Продавали доступ к AI-персонажам по сценарию — бот-психолог доводил пользователей до слёз, а бот-предсказатель научился правдоподобно врать",
    },
    description: {
      hr: {
        en: "Full-Stack Developer building 3 Telegram bots end-to-end, including architecture, monitoring, and the deployment pipeline.",
        de: "Full-Stack-Entwickler für 3 Telegram-Bots end-to-end — inklusive Architektur, Monitoring und Deployment-Pipeline.",
        ru: "Full-stack разработчик 3 Telegram-ботов от начала до конца — архитектура, мониторинг, деплой-пайплайн.",
      },
      business: {
        en: "These bots sold access to scripted AI characters — a psychologist users cried talking to (voice messages via Whisper made that possible), and a fortune-teller taught to 'lie' convincingly: vague enough to always feel relevant, specific enough to feel true. Generated graphics and video kept it entertaining. The project closed once Telegram's cost-per-lead grew too high to sustain — but shipped 3 bots on a CI/CD pipeline that published new versions within 10 seconds of a push.",
        de: "Diese Bots verkauften Zugang zu skriptierten KI-Charakteren — ein Psychologe, bei dem Nutzer im Gespräch weinten (möglich durch Sprachnachrichten via Whisper), und ein Wahrsager, der überzeugend zu 'lügen' lernte: vage genug, um immer relevant zu wirken, konkret genug, um wahr zu klingen. Generierte Grafiken und Videos hielten es unterhaltsam. Das Projekt schloss, als der Cost-per-Lead auf Telegram zu hoch wurde — zuvor wurden 3 Bots über eine CI/CD-Pipeline ausgeliefert, die neue Versionen innerhalb von 10 Sekunden nach einem Push veröffentlichte.",
        ru: "Эти боты продавали доступ к AI-персонажам по сценарию — психологу, с которым пользователи плакали (это стало возможным благодаря голосовым сообщениям через Whisper), и предсказателю, обученному правдоподобно 'врать': достаточно туманно, чтобы казаться в тему, и достаточно конкретно, чтобы звучать правдой. Сгенерированная графика и видео дополнительно развлекали. Проект закрылся, когда стоимость лида в Telegram стала слишком высокой — но до этого выпустили 3 бота с CI/CD-пайплайном, публиковавшим новую версию за 10 секунд после пуша.",
      },
      tech: {
        en: "Python (aiogram) bots backed by PostgreSQL, with Whisper wired in for voice-message transcription. Self-hosted CI/CD via a GitHub Actions self-hosted runner, deploying to the team's own server with Docker layer caching for ~10s deploys. Images stored in Minio (S3-compatible), Redis for auth tokens and user state.",
        de: "Python-Bots (aiogram) mit PostgreSQL im Hintergrund, Whisper für die Transkription von Sprachnachrichten eingebunden. Selbst gehostetes CI/CD über einen GitHub-Actions-Self-Hosted-Runner, Deployment auf den eigenen Server des Teams mit Docker-Layer-Caching für ~10-Sekunden-Deploys. Bilder in Minio (S3-kompatibel), Redis für Auth-Tokens und Nutzerstatus.",
        ru: "Боты на Python (aiogram) с PostgreSQL, подключён Whisper для транскрибации голосовых сообщений. Self-hosted CI/CD через self-hosted раннер GitHub Actions, деплой на собственный сервер команды с кешированием слоёв Docker для деплоя за ~10 секунд. Изображения в Minio (S3-совместимое хранилище), Redis для токенов авторизации и состояния пользователя.",
      },
    },
    impact: [{ label: { en: "Deploy time", de: "Deploy-Zeit", ru: "Время деплоя" }, value: "<10 sec" }],
    stack: ["Python", "aiogram", "Whisper", "PostgreSQL", "Docker", "GitHub Actions", "Minio", "Redis"],
    images: [
      "/images/projects/wedo-telegram-bots/user-dashboard.jpg",
      "/images/projects/wedo-telegram-bots/astrology-chart-1.jpg",
      "/images/projects/wedo-telegram-bots/astrology-chart-2.jpg",
    ],
    credit: {
      name: { en: "Nikita Denisov", de: "Nikita Denisov", ru: "Никита Денисов" },
      role: {
        en: "Computer Vision Engineer",
        de: "Computer-Vision-Ingenieur",
        ru: "Инженер по компьютерному зрению",
      },
      note: {
        en: "Nikita built the computer-vision pipeline behind the generated graphics and video that kept these bots entertaining.",
        de: "Nikita hat die Computer-Vision-Pipeline hinter den generierten Grafiken und Videos gebaut, die diese Bots unterhaltsam machten.",
        ru: "Никита построил пайплайн компьютерного зрения, стоящий за генерируемой графикой и видео, которые делали этих ботов увлекательными.",
      },
      linkedinUrl: "https://www.linkedin.com/in/nikita-den/",
    },
  },
  {
    slug: "wedo-horsium-game",
    title: {
      en: "Horsium — Horse-Breeding Simulator",
      de: "Horsium — Pferdezucht-Simulator",
      ru: "Horsium — симулятор коневодства",
    },
    period: "05/2020 – 06/2021",
    status: "active",
    statusNote: {
      en: "Still in active development.",
      de: "Befindet sich weiterhin in aktiver Entwicklung.",
      ru: "Всё ещё в активной разработке.",
    },
    category: "freelance",
    tagline: {
      en: "Realistic horse genetics, built by equestrian fans for equestrian fans",
      de: "Realistische Pferdegenetik — von Pferdesportfans für Pferdesportfans gebaut",
      ru: "Реалистичная генетика лошадей — от фанатов конного спорта для фанатов конного спорта",
    },
    description: {
      hr: {
        en: "Full-Stack Developer building the backend for Horsium, an online horse-breeding simulator conceived and driven by a team of equestrian enthusiasts, for equestrian enthusiasts.",
        de: "Full-Stack-Entwickler für das Backend von Horsium, einem Online-Pferdezucht-Simulator, konzipiert und getrieben von einem Team aus Pferdesport-Enthusiasten, für Pferdesport-Enthusiasten.",
        ru: "Full-stack разработчик бэкенда Horsium — онлайн-симулятора разведения лошадей, придуманного и развиваемого командой фанатов конного спорта для таких же фанатов.",
      },
      business: {
        en: "An online horse-breeding simulator recreating realistic horse genetics: horses are bred according to inherited traits, and that breeding lays down each horse's potential — the same way it works in real equestrian breeding. Still an active, ongoing build rather than a finished product.",
        de: "Ein Online-Pferdezucht-Simulator mit realistischer Pferdegenetik: Pferde werden nach vererbten Merkmalen gezüchtet, und diese Zucht legt das Potenzial jedes Pferdes fest — genau wie in der echten Pferdezucht. Noch immer aktiv in Entwicklung, kein fertiges Produkt.",
        ru: "Онлайн-симулятор разведения лошадей с реалистичной генетикой: лошади разводятся согласно наследуемым признакам, и это разведение закладывает потенциал каждой лошади — точно так же, как в реальном коневодстве. Проект всё ещё активно разрабатывается, а не завершён.",
      },
      tech: {
        en: "Backend built with NestJS and MongoDB.",
        de: "Backend mit NestJS und MongoDB gebaut.",
        ru: "Бэкенд на NestJS и MongoDB.",
      },
    },
    stack: ["NestJS", "MongoDB"],
    images: ["/images/projects/wedo-horsium-game/horse-asset-browser.jpg"],
    credit: {
      name: { en: "Anastasia Zibrova", de: "Anastasia Zibrova", ru: "Анастасия Зиброва" },
      role: {
        en: "Founder, Horsium",
        de: "Gründerin, Horsium",
        ru: "Основательница Horsium",
      },
      note: {
        en: "Horsium was Anastasia's idea from the start — she's the equestrian enthusiast whose vision this backend was built to serve.",
        de: "Horsium war von Anfang an Anastasias Idee — sie ist die Pferdesport-Enthusiastin, deren Vision dieses Backend umsetzt.",
        ru: "Horsium с самого начала — идея Анастасии: именно её видение как фаната конного спорта воплощает этот бэкенд.",
      },
      linkedinUrl: "https://www.linkedin.com/in/anzania/",
    },
  },

  // ─── WeDo.agency — Speechki.com ventures ────────────────────────────────
  {
    slug: "audioland-musicgen",
    title: {
      en: "Audioland — AI Music Generation Plugin",
      de: "Audioland — KI-Musikgenerierungs-Plugin",
      ru: "Audioland — плагин генерации музыки на AI",
    },
    company: "WeDo.agency",
    period: "07/2023 – 10/2023",
    status: "archived",
    statusNote: {
      en: "Shut down by OpenAI's plugin monetization policy, not by the product itself.",
      de: "Nicht am Produkt gescheitert, sondern an OpenAIs Monetarisierungsrichtlinie für Plugins.",
      ru: "Закрыт не из-за продукта, а из-за политики монетизации плагинов OpenAI.",
    },
    category: "work",
    tagline: {
      en: "Startup bet to take speechki.com public on the Cyprus exchange — killed by OpenAI's plugin monetization ban",
      de: "Startup-Wette, speechki.com an die Zypern-Börse zu bringen — gescheitert an OpenAIs Plugin-Monetarisierungsverbot",
      ru: "Ставка на вывод speechki.com на Кипрскую биржу — сорвана запретом OpenAI на монетизацию плагинов",
    },
    description: {
      hr: {
        en: "Full-Stack Developer shipping Audioland, an AI music-generation plugin for ChatGPT, including its deployment pipeline and autoscaling queue.",
        de: "Full-Stack-Entwickler für Audioland, ein KI-Musikgenerierungs-Plugin für ChatGPT, inklusive Deployment-Pipeline und Auto-Scaling-Queue.",
        ru: "Full-stack разработчик Audioland — плагина генерации музыки для ChatGPT, включая пайплайн деплоя и авто-масштабируемую очередь.",
      },
      business: {
        en: "Audioland (and its sibling project, Dubbing) existed to take speechki.com public on the Cyprus stock exchange — the plan required demonstrating real profit from speechki.com's neural-network products. The startup didn't make it, not for lack of product, but because of OpenAI's plugin monetization policy: \"plugins could not be monetized before, during, or after operation\" — meaning not at all.",
        de: "Audioland (und das Schwesterprojekt Dubbing) existierten, um speechki.com an die Börse Zypern zu bringen — der Plan erforderte den Nachweis echten Gewinns aus speechki.coms KI-Produkten. Das Startup scheiterte nicht am Produkt, sondern an OpenAIs Monetarisierungsrichtlinie für Plugins: „Plugins durften weder vor, während noch nach dem Betrieb monetarisiert werden“ — also gar nicht.",
        ru: "Audioland (и родственный проект Dubbing) существовали ради вывода speechki.com на Кипрскую фондовую биржу — план требовал показать реальную прибыль на нейросетевых продуктах speechki.com. Стартап не взлетел не из-за продукта, а из-за политики монетизации плагинов OpenAI: «нельзя монетизировать ни до, ни во время, ни после эксплуатации ботов» — то есть никак.",
      },
      tech: {
        en: "AI app deployed with Next.js and Firebase; generated tracks stored in Minio object storage. Generation requests go through a queue administered by an algorithm that spins up AWS machines on demand — that's what makes the pipeline scale.",
        de: "KI-App mit Next.js und Firebase deployt; generierte Titel in Minio-Objektspeicher abgelegt. Generierungsanfragen laufen über eine Warteschlange, die von einem Algorithmus verwaltet wird, der bei Bedarf AWS-Maschinen hochfährt — das macht die Pipeline skalierbar.",
        ru: "AI-приложение развёрнуто на Next.js и Firebase; сгенерированные треки хранятся в Minio. Запросы на генерацию идут через очередь, которой управляет алгоритм, поднимающий машины на AWS по мере необходимости — именно это обеспечивает масштабируемость пайплайна.",
      },
    },
    impact: [{ label: { en: "Generation time", de: "Generierungszeit", ru: "Время генерации" }, value: "<1 min" }],
    stack: ["Next.js", "Firebase", "Minio", "AWS", "AI"],
    images: [
      "/images/projects/audioland-musicgen/generations-page-1.jpg",
      "/images/projects/audioland-musicgen/generations-page-2.jpg",
    ],
  },
  {
    slug: "wedo-ai-video-dubbing",
    title: {
      en: "Dubbing — AI Video Translation & Dubbing",
      de: "Dubbing — KI-Videoübersetzung & -Synchronisation",
      ru: "Dubbing — AI-перевод и озвучка видео",
    },
    company: "WeDo.agency",
    period: "05/2020 – 06/2021",
    status: "archived",
    statusNote: {
      en: "Agency pivoted; product was client-owned and handed off.",
      de: "Agentur hat sich neu ausgerichtet; das Produkt gehörte dem Kunden und wurde übergeben.",
      ru: "Агентство сменило направление; продукт принадлежал клиенту и был передан ему.",
    },
    category: "work",
    tagline: {
      en: "60 languages, programmatically generated into 60×59 landing pages — the SEO trick that brought the first 150 users",
      de: "60 Sprachen, programmatisch zu 60×59 Landingpages kombiniert — der SEO-Trick, der die ersten 150 Nutzer brachte",
      ru: "60 языков, программно превращённых в 60×59 лендингов — SEO-трюк, который принёс первых 150 пользователей",
    },
    description: {
      hr: {
        en: "Full-Stack Developer who found a zero-budget distribution channel for an early-stage AI dubbing product — a programmatic-SEO push across 60 languages that brought its first 150 users.",
        de: "Full-Stack-Entwickler, der für ein KI-Dubbing-Produkt im Frühstadium einen budgetfreien Vertriebskanal fand — eine programmatische SEO-Kampagne über 60 Sprachen, die die ersten 150 Nutzer brachte.",
        ru: "Full-stack разработчик, нашедший бесплатный канал привлечения для AI-продукта озвучки видео на раннем этапе — программную SEO-кампанию на 60 языков, принёсшую первых 150 пользователей.",
      },
      business: {
        en: "Programmatic SEO pages on Next.js targeting 60×59 language-pair search results brought the product's first 150 users at effectively zero acquisition cost — a scrappy alternative to paid marketing for an early-stage product with no budget. The go-to-market plan also included a listing on AppSumo — a marketplace selling one shared subscription across dozens of small SaaS tools — competing for the same customers as rask.ai and elevenlabs.com.",
        de: "Programmatische SEO-Seiten auf Next.js für 60×59 Sprachpaar-Suchergebnisse brachten dem Produkt die ersten 150 Nutzer bei praktisch null Akquisitionskosten — eine pragmatische Alternative zu bezahltem Marketing für ein Frühphasenprodukt ohne Budget. Der Go-to-Market-Plan sah außerdem eine Listung auf AppSumo vor — einem Marktplatz, der ein gemeinsames Abonnement für Dutzende kleiner SaaS-Tools verkauft — im Wettbewerb um dieselben Kunden wie rask.ai und elevenlabs.com.",
        ru: "Программные SEO-страницы на Next.js под 60×59 языковых пар в поиске принесли продукту первых 150 пользователей практически без затрат на привлечение — находчивая альтернатива платному маркетингу для продукта на раннем этапе без бюджета. План выхода на рынок также включал размещение на AppSumo — маркетплейсе, продающем одну общую подписку на десятки небольших SaaS-инструментов — конкурируя за тех же клиентов, что rask.ai и elevenlabs.com.",
      },
      tech: {
        en: "Python backend for AI video translation/dubbing, programmatic SEO pages built with Next.js covering 60 languages (60×59 landing-page combinations), Google Analytics on the frontend, translated video files stored on Google Cloud Storage.",
        de: "Python-Backend für KI-Videoübersetzung/-Synchronisation, programmatische SEO-Seiten mit Next.js für 60 Sprachen (60×59 Landingpage-Kombinationen), Google Analytics im Frontend, übersetzte Videodateien in Google Cloud Storage gespeichert.",
        ru: "Python-бэкенд для AI-перевода и озвучки видео, программные SEO-страницы на Next.js на 60 языков (60×59 комбинаций лендингов), Google Analytics на фронтенде, переведённые видеофайлы хранятся в Google Cloud Storage.",
      },
    },
    star: {
      situation: {
        en: "An early-stage AI dubbing product needed its first users, with no marketing budget to acquire them.",
        de: "Ein KI-Dubbing-Produkt im Frühstadium brauchte seine ersten Nutzer — ohne Marketingbudget, um sie zu gewinnen.",
        ru: "AI-продукту озвучки видео на раннем этапе нужны были первые пользователи — без бюджета на их привлечение.",
      },
      task: {
        en: "Find a distribution channel that could beat competitors to narrow, high-intent search queries before they did.",
        de: "Einen Vertriebskanal finden, der Wettbewerbern bei engen, kaufbereiten Suchanfragen zuvorkommt.",
        ru: "Найти канал привлечения, который опередит конкурентов по узким, целевым поисковым запросам.",
      },
      action: {
        en: "Built a translator covering 60 languages, then programmatically generated 60×59 (=3,540) language-pair landing pages targeting long-tail search terms — an SEO footprint no competitor had built yet.",
        de: "Einen Übersetzer für 60 Sprachen gebaut und dann programmatisch 60×59 (=3.540) Sprachpaar-Landingpages für Long-Tail-Suchbegriffe erzeugt — einen SEO-Fußabdruck, den noch kein Wettbewerber hatte.",
        ru: "Построили переводчик на 60 языков, затем программно сгенерировали 60×59 (=3540) лендингов для языковых пар под длинный хвост поисковых запросов — SEO-охват, которого ни у одного конкурента ещё не было.",
      },
      result: {
        en: "The first 150 users arrived through this channel alone — among them a priest translating his own sermons, attempts to translate football shorts, and a stream of emails from university AI researchers who'd stumbled onto the tool.",
        de: "Allein über diesen Kanal kamen die ersten 150 Nutzer — darunter ein Priester, der seine eigenen Predigten übersetzte, Versuche, Fußball-Shorts zu übersetzen, und eine Reihe von E-Mails von KI-Forschern an Universitäten, die auf das Tool gestoßen waren.",
        ru: "Первые 150 пользователей пришли именно через этот канал — среди них священник, переводивший собственные проповеди, попытки перевести футбольные шортсы и поток писем от университетских исследователей AI, случайно наткнувшихся на инструмент.",
      },
    },
    impact: [
      { label: { en: "First users", de: "Erste Nutzer", ru: "Первых пользователей" }, value: "150" },
      { label: { en: "Languages", de: "Sprachen", ru: "Языков" }, value: "60" },
      { label: { en: "Programmatic landing pages", de: "Programmatische Landingpages", ru: "Программных лендингов" }, value: "60×59" },
    ],
    stack: ["Python", "Next.js", "AI", "Google Analytics", "Google Cloud Storage"],
    images: [
      "/images/projects/wedo-ai-video-dubbing/sitemap-language-pages.jpg",
      "/images/projects/wedo-ai-video-dubbing/pricing-light.jpg",
      "/images/projects/wedo-ai-video-dubbing/pricing-dark.jpg",
      "/images/projects/wedo-ai-video-dubbing/firebase-analytics-1.jpg",
      "/images/projects/wedo-ai-video-dubbing/firebase-analytics-2.jpg",
      "/images/projects/wedo-ai-video-dubbing/firebase-analytics-3.jpg",
      "/images/projects/wedo-ai-video-dubbing/amplitude-analytics.jpg",
    ],
  },

  // ─── Personal, freelance & academic projects (2018 – 2023) ────────────────
  {
    slug: "neural-network-visualizer",
    title: {
      en: "Neural Network Training Visualizer",
      de: "Visualizer für neuronales Netz-Training",
      ru: "Визуализатор обучения нейросети",
    },
    period: "07/2020 – 09/2020",
    status: "archived",
    category: "freelance",
    tagline: {
      en: "Purely academic visualization, built for a university acquaintance's thesis",
      de: "Rein akademische Visualisierung, gebaut für die Abschlussarbeit eines Uni-Bekannten",
      ru: "Чисто академическая визуализация, сделанная для дипломной работы знакомого по университету",
    },
    description: {
      hr: {
        en: "Built the front-end for a university acquaintance's thesis project, visualizing neural-network training in real time while the training itself ran on the client's own server.",
        de: "Frontend für die Abschlussarbeit eines Uni-Bekannten gebaut — visualisierte das Training eines neuronalen Netzes in Echtzeit, während das Training selbst auf dem eigenen Server des Auftraggebers lief.",
        ru: "Собрал фронтенд для дипломного проекта знакомого по университету — визуализация обучения нейросети в реальном времени, пока само обучение шло на сервере заказчика.",
      },
      business: {
        en: "A purely academic engagement for a university acquaintance's thesis, run as his first Agile-style freelance work and earning ₽7,000. Stayed on good terms with the client — two years later, referred a friend to him for follow-on front-end work.",
        de: "Ein rein akademisches Projekt für die Abschlussarbeit eines Uni-Bekannten, als erste Agile-artige Freelance-Arbeit durchgeführt und mit 7.000 ₽ vergütet. Der Kontakt blieb gut — zwei Jahre später wurde ihm ein Freund für weitere Frontend-Arbeit empfohlen.",
        ru: "Чисто академический проект для дипломной работы знакомого по университету, первый фриланс-опыт в agile-формате, заработок 7 000 ₽. Сохранились хорошие отношения с заказчиком — через два года порекомендовал ему друга для дальнейшей фронтенд-работы.",
      },
      tech: {
        en: "JavaScript frontend rendering live TensorFlow training data streamed from the client's backend; Trello for kanban tracking.",
        de: "JavaScript-Frontend, das live TensorFlow-Trainingsdaten vom Backend des Auftraggebers streamte; Trello für Kanban-Tracking.",
        ru: "JavaScript-фронтенд, отрисовывающий данные обучения TensorFlow в реальном времени, стримящиеся с бэкенда заказчика; Trello для канбан-трекинга.",
      },
    },
    impact: [{ label: { en: "Revenue", de: "Honorar", ru: "Доход" }, value: "₽7,000" }],
    stack: ["JavaScript", "TensorFlow"],
    links: [
      { labelKey: "demo", url: "https://mskvitalii.github.io/WebFaceNN/" },
      { labelKey: "github", url: "https://github.com/mskVitalii/WebFaceNN" },
    ],
    images: [
      "/images/projects/neural-network-visualizer/app-screenshot.png",
      "/images/projects/neural-network-visualizer/math-visualization.png",
      "/images/projects/neural-network-visualizer/notes-photo.png",
      "/images/projects/neural-network-visualizer/tensorflow-playground-demo.jpg",
    ],
  },
  {
    slug: "universal-insight-dashboard",
    title: {
      en: "Universal Insight — Ops Dashboard",
      de: "Universal Insight — Ops-Dashboard",
      ru: "Universal Insight — операционный дашборд",
    },
    period: "08/2020 – 05/2021",
    status: "archived",
    statusNote: {
      en: "Front-end delivered in full; the product itself was never sold and payment was never completed.",
      de: "Frontend vollständig geliefert; das Produkt selbst wurde nie verkauft, die Zahlung nie abgeschlossen.",
      ru: "Фронтенд сдан полностью; сам продукт так и не продан, оплата не завершена.",
    },
    category: "freelance",
    tagline: {
      en: "Angular ops dashboard for employee activity tracking — 9 monitoring modules, scope grew 14x mid-flight",
      de: "Angular-Ops-Dashboard zur Mitarbeiteraktivitäts-Verfolgung — 9 Tracking-Module, Umfang wuchs während der Arbeit um das 14-Fache",
      ru: "Операционный дашборд на Angular для отслеживания активности сотрудников — 9 модулей мониторинга, скоуп вырос в 14 раз по ходу проекта",
    },
    description: {
      hr: {
        en: "Led front-end delivery (and, in practice, day-to-day team coordination) on an internal employee-activity-tracking dashboard — 9 monitoring modules spanning screenshots, keystrokes, file transfers, and browsing history — learning Angular from scratch mid-project.",
        de: "Frontend-Lieferung geleitet (und in der Praxis auch die tägliche Teamkoordination) für ein internes Dashboard zur Mitarbeiteraktivitäts-Verfolgung — 9 Tracking-Module von Screenshots über Tastenanschläge bis zu Dateiübertragungen und Browserverlauf — dabei Angular während des Projekts von Grund auf gelernt.",
        ru: "Руководил сдачей фронтенда (а на практике и ежедневной координацией команды) для внутреннего дашборда отслеживания активности сотрудников — 9 модулей мониторинга: от скриншотов и нажатий клавиш до передачи файлов и истории браузера — изучая Angular с нуля прямо по ходу проекта.",
      },
      business: {
        en: "An internal program to monitor and report on employee computer activity across 9 configurable tracking modules — screenshots, keystrokes, file transfers, a password manager, proxy history, and remote terminal access among them. Scope grew from an initial 7,000 ₽ quote to 100,000 ₽, but stalled for months on unclear requirements and a stuck backend partner. The front-end shipped complete and bug-free — but the client never sold the finished product, and the engagement ended without full payment. A formative lesson: get a written scope and contract before starting work.",
        de: "Ein internes Programm zur Überwachung und zum Reporting von Mitarbeiter-Computeraktivität über 9 konfigurierbare Tracking-Module — darunter Screenshots, Tastenanschläge, Dateiübertragungen, ein Passwort-Manager, Proxy-Verlauf und Remote-Terminal-Zugriff. Der Umfang wuchs von einem ursprünglichen Angebot über 7.000 ₽ auf 100.000 ₽, stockte aber monatelang wegen unklarer Anforderungen und eines ins Stocken geratenen Backend-Partners. Das Frontend wurde vollständig und fehlerfrei geliefert — doch der Kunde verkaufte das fertige Produkt nie, und das Projekt endete ohne vollständige Bezahlung. Eine prägende Lektion: vor Arbeitsbeginn einen schriftlichen Scope und Vertrag einholen.",
        ru: "Внутренняя программа мониторинга и отчётности по компьютерной активности сотрудников с 9 настраиваемыми модулями отслеживания — среди них скриншоты, нажатия клавиш, передача файлов, менеджер паролей, история прокси и удалённый доступ к терминалу. Скоуп вырос с изначальной сметы в 7 000 ₽ до 100 000 ₽, но месяцами буксовал из-за неясных требований и застрявшего бэкенд-партнёра. Фронтенд был сдан полностью и без багов — но клиент так и не продал готовый продукт, и проект завершился без полной оплаты. Важный урок: заранее получать письменный скоуп и договор.",
      },
      tech: {
        en: "Angular frontend with RxJS, complex dashboard layouts and charting, integrated against a partner-built backend. Juggled three separate UI libraries (Nebular, Bootstrap, Material) accumulated over the project's life.",
        de: "Angular-Frontend mit RxJS, komplexen Dashboard-Layouts und Charting, integriert mit einem vom Partner gebauten Backend. Drei verschiedene UI-Bibliotheken (Nebular, Bootstrap, Material) jonglierten, die sich über die Projektlaufzeit ansammelten.",
        ru: "Фронтенд на Angular с RxJS, сложные дашборд-раскладки и графики, интеграция с бэкендом от партнёра. Приходилось жонглировать тремя разными UI-библиотеками (Nebular, Bootstrap, Material), накопившимися за время проекта.",
      },
    },
    impact: [
      { label: { en: "Scope growth", de: "Umfangswachstum", ru: "Рост скоупа" }, value: "₽7K → ₽100K" },
      { label: { en: "Tracking modules", de: "Tracking-Module", ru: "Модулей мониторинга" }, value: "9" },
    ],
    stack: ["Angular", "RxJS"],
    links: [
      { labelKey: "demo", url: "https://universalinsight.vercel.app/pages/dashboard" },
      { labelKey: "github", url: "https://github.com/mskVitalii/universal_insight" },
    ],
    images: [
      "/images/projects/universal-insight-dashboard/dashboard-overview.png",
      "/images/projects/universal-insight-dashboard/charts-view.png",
      "/images/projects/universal-insight-dashboard/design-mockup.png",
      "/images/projects/universal-insight-dashboard/gallery-01.jpeg",
      "/images/projects/universal-insight-dashboard/gallery-02.jpeg",
      "/images/projects/universal-insight-dashboard/gallery-03.jpeg",
      "/images/projects/universal-insight-dashboard/monitoring-mockup.jpg",
    ],
  },
  {
    slug: "subway-battery-monitor",
    title: {
      en: "Subway Battery Monitoring Dashboard",
      de: "U-Bahn-Batterieüberwachungs-Dashboard",
      ru: "Дашборд мониторинга батарей метро",
    },
    period: "09/2020 – 11/2020",
    status: "archived",
    category: "freelance",
    tagline: {
      en: "Admin panel for a tender: live telemetry and rebalancing across 30 subway batteries",
      de: "Admin-Panel für eine Ausschreibung: Live-Telemetrie und Rebalancing für 30 U-Bahn-Batterien",
      ru: "Админка для тендера: телеметрия в реальном времени и перебалансировка для 30 батарей метро",
    },
    description: {
      hr: {
        en: "Built the front-end admin panel for a subway battery-monitoring system, as part of a team bidding on a subway battery-supply tender — visualizing live voltage, temperature and current readings, and exposing a rebalancing trigger, for an operations team overseeing 30 battery units.",
        de: "Frontend-Admin-Panel für ein U-Bahn-Batterieüberwachungssystem gebaut, als Teil eines Teams bei einer Ausschreibung für U-Bahn-Batterielieferung — mit Live-Anzeige von Spannung, Temperatur und Strom sowie einem Rebalancing-Trigger für ein Betriebsteam, das 30 Batterieeinheiten überwacht.",
        ru: "Собрал фронтенд админки для системы мониторинга батарей метро в составе команды, участвовавшей в тендере на поставку батарей для метро — визуализация напряжения, температуры и тока в реальном времени плюс кнопка запуска перебалансировки для команды, следящей за 30 батареями.",
      },
      business: {
        en: "Delivered as part of a bid on a subway battery-supply tender — the admin panel tracking all 30 battery units' live readings, with a rebalancing trigger for operators. Built with a 4-person freelance team, earning ₽30,000; missed the original deadline after the charting library couldn't handle real-time updates and had to be swapped mid-project.",
        de: "Geliefert im Rahmen eines Angebots für eine U-Bahn-Batterielieferungs-Ausschreibung — das Admin-Panel zeigt die Live-Messwerte aller 30 Batterieeinheiten und gibt Betreibern einen Rebalancing-Trigger. Gebaut mit einem 4-köpfigen Freelance-Team, Honorar 30.000 ₽; die ursprüngliche Frist verpasst, nachdem die Charting-Bibliothek Echtzeit-Updates nicht bewältigen konnte und mitten im Projekt ausgetauscht werden musste.",
        ru: "Сдано в рамках участия в тендере на поставку батарей для метро — админка показывает показания всех 30 батарей в реальном времени и даёт операторам кнопку перебалансировки. Собрано командой из 4 фрилансеров, доход 30 000 ₽; не успели к изначальному дедлайну, потому что библиотека графиков не справилась с обновлениями в реальном времени и её пришлось менять по ходу проекта.",
      },
      tech: {
        en: "Angular dashboard consuming live sensor telemetry sent over cellular from battery units on subway rolling stock, with a rebalancing action wired to a backend command endpoint.",
        de: "Angular-Dashboard, das Live-Sensortelemetrie empfängt, die per Mobilfunk von Batterieeinheiten in U-Bahn-Wagen gesendet wird, mit einer Rebalancing-Aktion, die an einen Backend-Kommando-Endpunkt angebunden ist.",
        ru: "Дашборд на Angular, принимающий телеметрию датчиков в реальном времени, передаваемую по сотовой сети от батарей на подвижном составе метро, с действием перебалансировки, подключённым к командному эндпоинту бэкенда.",
      },
    },
    impact: [
      { label: { en: "Revenue", de: "Honorar", ru: "Доход" }, value: "₽30,000" },
      { label: { en: "Batteries monitored", de: "Überwachte Batterien", ru: "Батарей под контролем" }, value: "30" },
    ],
    stack: ["Angular"],
    links: [{ labelKey: "demo", url: "https://mew2-ultra.web.app/" }],
    images: [
      "/images/projects/subway-battery-monitor/dashboard-overview.png",
      "/images/projects/subway-battery-monitor/final-photo-1.jpeg",
      "/images/projects/subway-battery-monitor/final-photo-2.jpeg",
      "/images/projects/subway-battery-monitor/dashboard-notes-1.png",
      "/images/projects/subway-battery-monitor/battery-dashboard.jpg",
    ],
  },
  {
    slug: "amc-makeathon-2020",
    title: {
      en: "AMC Makeathon 2020",
      de: "AMC Makeathon 2020",
      ru: "AMC Makeathon 2020",
    },
    period: "10/2020",
    status: "archived",
    category: "hackathon",
    tagline: {
      en: "University hackathon entry — backend built overnight",
      de: "Uni-Hackathon-Beitrag — Backend über Nacht gebaut",
      ru: "Заявка на университетском хакатоне — бэкенд собран за ночь",
    },
    description: {
      hr: {
        en: "Paired up to build the backend for a hackathon entry, solving a tricky Unicode serialization bug overnight; lost to the eventual winning team.",
        de: "Zu zweit das Backend für einen Hackathon-Beitrag gebaut, über Nacht einen kniffligen Unicode-Serialisierungsfehler gelöst; gegen das spätere Siegerteam verloren.",
        ru: "В паре собрали бэкенд для заявки на хакатоне, за ночь решили коварный баг с Unicode-сериализацией; проиграли команде, ставшей победителем.",
      },
      business: {
        en: "No placement, but a clear early lesson: at a hackathon, the pitch and the idea matter more than the code.",
        de: "Keine Platzierung, aber eine klare frühe Lektion: Bei einem Hackathon zählen Pitch und Idee mehr als der Code.",
        ru: "Без призового места, но с чётким ранним уроком: на хакатоне питч и идея важнее кода.",
      },
      tech: {
        en: "C# backend, reusing patterns from the FassonAPI coursework.",
        de: "C#-Backend, unter Wiederverwendung von Mustern aus der FassonAPI-Kursarbeit.",
        ru: "Бэкенд на C#, с переиспользованием паттернов из курсовой FassonAPI.",
      },
    },
    stack: ["C#"],
    links: [{ labelKey: "github", url: "https://github.com/mskVitalii/AMC-Makeathon-2020" }],
    images: [
      "/images/projects/amc-makeathon-2020/project-screenshot.png",
      "/images/projects/amc-makeathon-2020/presentation-notes.png",
    ],
  },
  {
    slug: "ncahoots-admin-panel",
    title: {
      en: "NCahoots — Gifting Startup Admin Panel",
      de: "NCahoots — Admin-Panel für ein Geschenke-Startup",
      ru: "NCahoots — админка для стартапа по подаркам",
    },
    period: "11/2020 – 08/2021",
    status: "archived",
    category: "freelance",
    tagline: {
      en: "Led an 8-month freelance engagement for a Silicon Valley gifting startup",
      de: "Leitete ein 8-monatiges Freelance-Projekt für ein Geschenke-Startup aus dem Silicon Valley",
      ru: "Руководил 8-месячным фриланс-проектом для стартапа по подаркам из Кремниевой долины",
    },
    description: {
      hr: {
        en: "Led front-end delivery of an admin panel for NCahoots, a Silicon Valley gifting startup, coordinating a small remote team and migrating the stack from Angular to React mid-engagement.",
        de: "Leitete die Frontend-Lieferung eines Admin-Panels für NCahoots, ein Geschenke-Startup aus dem Silicon Valley, koordinierte ein kleines Remote-Team und migrierte den Stack mitten im Projekt von Angular zu React.",
        ru: "Руководил сдачей фронтенда админки для NCahoots — стартапа по подаркам из Кремниевой долины, координировал небольшую удалённую команду и мигрировал стек с Angular на React прямо по ходу проекта.",
      },
      business: {
        en: "An 8-month freelance engagement worth roughly $1,000 (₽70,789) with a highly professional, always-available client — the clearest, best-run client relationship of his student freelance years, with zero payment or communication issues.",
        de: "Ein 8-monatiges Freelance-Projekt im Wert von rund 1.000 $ (70.789 ₽) mit einem sehr professionellen, jederzeit erreichbaren Kunden — die klarste, am besten geführte Kundenbeziehung seiner Freelance-Jahre als Student, ohne jegliche Zahlungs- oder Kommunikationsprobleme.",
        ru: "8-месячный фриланс-проект стоимостью около $1000 (70 789 ₽) с очень профессиональным, всегда на связи клиентом — самые чёткие и хорошо выстроенные отношения с клиентом за все студенческие годы фриланса, без единой проблемы с оплатой или коммуникацией.",
      },
      tech: {
        en: "React frontend (migrated from an initial Angular build). Discord for team comms, Postman for API contracts, a GitLab Kanban board for tracking.",
        de: "React-Frontend (migriert von einer anfänglichen Angular-Version). Discord für Team-Kommunikation, Postman für API-Verträge, ein GitLab-Kanban-Board für das Tracking.",
        ru: "Фронтенд на React (мигрировано с изначальной версии на Angular). Discord для командной коммуникации, Postman для API-контрактов, канбан-доска GitLab для трекинга.",
      },
    },
    impact: [
      { label: { en: "Revenue", de: "Honorar", ru: "Доход" }, value: "₽70,789" },
      { label: { en: "Duration", de: "Dauer", ru: "Длительность" }, value: "8 months" },
    ],
    stack: ["React", "Angular"],
    links: [
      { labelKey: "demo", url: "https://admin-silicon-valley.vercel.app" },
      { labelKey: "github", url: "https://github.com/mskVitalii/admin_silicon_valley" },
    ],
    images: [
      "/images/projects/ncahoots-admin-panel/sample-data-1.jpeg",
      "/images/projects/ncahoots-admin-panel/sample-data-2.jpeg",
    ],
    referenceDocuments: [
      {
        title: {
          en: "Academic practice supervisor's review (HSE, 2021)",
          de: "Beurteilung des Praxisbetreuers (HSE, 2021)",
          ru: "Отзыв руководителя учебной практики (НИУ ВШЭ, 2021)",
        },
        url: "/documents/ncahoots-admin-panel/practice-supervisor-review.pdf",
      },
    ],
  },
  {
    slug: "mining-skins-store",
    title: {
      en: "Skins-for-Mining Store & Landing Page",
      de: "Skins-für-Mining-Shop & Landingpage",
      ru: "Магазин и лендинг скинов за майнинг",
    },
    period: "03/2021 – 06/2021",
    status: "archived",
    category: "freelance",
    tagline: {
      en: "Solo freelance build for a crypto-mining rewards platform: a skins store, mining-activity dashboard, and follow-on marketing landing page",
      de: "Solo-Freelance-Projekt für eine Krypto-Mining-Prämienplattform: Skins-Shop, Mining-Aktivitäts-Dashboard und eine Folge-Landingpage",
      ru: "Соло-фриланс-проект платформы наград за майнинг: магазин скинов, дашборд майнинг-активности и лендинг для продвижения",
    },
    description: {
      hr: {
        en: "First freelance project taken on solo, without a team — the skins store itself plus a dashboard tracking each user's mining activity, and a marketing page for the mining-rewards product. A follow-on landing page came a few weeks later, built with a small ad-hoc team.",
        de: "Erstes Freelance-Projekt solo ohne Team — der eigentliche Skins-Shop selbst plus ein Dashboard zur Verfolgung der Mining-Aktivität jedes Nutzers und eine Marketing-Seite für das Mining-Prämien-Produkt. Einige Wochen später folgte eine eigene Landingpage, gebaut mit einem kleinen Ad-hoc-Team.",
        ru: "Первый фриланс-проект, взятый в одиночку, без команды — сам магазин скинов плюс дашборд отслеживания майнинг-активности каждого пользователя и маркетинговая страница продукта наград за майнинг. Через несколько недель добавился отдельный лендинг, собранный с небольшой ситуативной командой.",
      },
      business: {
        en: "Referred in after a difficult prior engagement, delivered the store in 3 weeks instead of the usual months — and designed its visual identity himself, well-received enough that the client paid an extra €50 for it and 50% over the quoted rate overall. The client came back for a second engagement: a landing page on the same idea — most people don't know how to start mining crypto, but plenty will lend idle computing power for something tangible, in this case CS:GO skins — earning another ₽15,000.",
        de: "Über eine Empfehlung nach einem schwierigen vorherigen Projekt gewonnen, den Shop in 3 Wochen statt der üblichen Monate geliefert — und die visuelle Identität selbst entworfen, die so gut ankam, dass der Kunde dafür 50 € extra sowie insgesamt 50 % über dem vereinbarten Satz zahlte. Der Kunde kam für ein zweites Projekt zurück: eine Landingpage nach derselben Idee — die meisten wissen nicht, wie man mit Krypto-Mining anfängt, aber viele leihen ungenutzte Rechenleistung für etwas Greifbares, in diesem Fall CS:GO-Skins — und brachte weitere 15.000 ₽ ein.",
        ru: "Пришёл по рекомендации после сложного предыдущего проекта, сдал магазин за 3 недели вместо обычных месяцев — и сам придумал визуальную айдентику, которая понравилась настолько, что клиент доплатил за неё €50 и в итоге заплатил на 50% больше оговорённой ставки. Клиент вернулся со вторым проектом — лендингом на той же идее: большинство не знает, как начать майнить крипту, но многие готовы одолжить простаивающие мощности за что-то осязаемое, в данном случае скины CS:GO — принеся ещё 15 000 ₽.",
      },
      tech: {
        en: "Both built with GatsbyJS. The landing page's animation-heavy design ultimately made it noticeably laggy — a lesson in budgeting a performance pass for heavy scroll animations.",
        de: "Beide mit GatsbyJS gebaut. Das animationslastige Design der Landingpage machte sie letztlich spürbar träge — eine Lektion, für aufwendige Scroll-Animationen einen Performance-Durchgang einzuplanen.",
        ru: "Оба проекта собраны на GatsbyJS. Из-за обилия анимаций лендинг в итоге заметно тормозил — урок о необходимости закладывать время на оптимизацию производительности при тяжёлых скролл-анимациях.",
      },
    },
    impact: [{ label: { en: "Revenue", de: "Honorar", ru: "Доход" }, value: "₽30,000" }],
    stack: ["Gatsby"],
    links: [
      { labelKey: "demoStore", url: "https://skinmainers.vercel.app/about" },
      { labelKey: "githubStore", url: "https://github.com/mskKote/ac_for_vs" },
      { labelKey: "demoLanding", url: "https://skin-miners.web.app/" },
      { labelKey: "githubLanding", url: "https://github.com/kolbak/Skin-Miners" },
    ],
    images: [
      "/images/projects/mining-skins-store/store-screenshot-1.png",
      "/images/projects/mining-skins-store/store-screenshot-2.png",
      "/images/projects/mining-skins-store/gallery-1.jpeg",
      "/images/projects/mining-skins-store/gallery-2.jpeg",
      "/images/projects/mining-skins-landing/homepage.png",
    ],
  },
  {
    slug: "typography-order-form",
    title: {
      en: "Typography Order Form",
      de: "Bestellformular für die Druckerei",
      ru: "Форма заказа для типографии",
    },
    period: "09/2019",
    status: "archived",
    company: "Yohan Loshop (own studio)",
    category: "work",
    tagline: {
      en: "First project of a 3-person studio he co-founded — a print-order form",
      de: "Erstes Projekt eines von ihm mitgegründeten 3-köpfigen Studios — ein Druck-Bestellformular",
      ru: "Первый проект студии из 3 человек, которую он сооснова́л — форма заказа для печати",
    },
    description: {
      hr: {
        en: "Co-founded a small 3-person dev studio and built its first client project: an order form for a print shop running an idle industrial printer.",
        de: "Kleines 3-köpfiges Dev-Studio mitgegründet und dessen erstes Kundenprojekt gebaut: ein Bestellformular für eine Druckerei mit ungenutztem Industriedrucker.",
        ru: "Сооснова́л небольшую студию разработки из 3 человек и собрал её первый клиентский проект: форму заказа для типографии с простаивающим промышленным принтером.",
      },
      business: {
        en: "Zero-revenue proof-of-concept project that kicked off the studio, which went on to take larger paid work (see Legion).",
        de: "Proof-of-Concept-Projekt ohne Umsatz, das das Studio anschob, das später größere bezahlte Aufträge übernahm (siehe Legion).",
        ru: "Проект-доказательство концепции без дохода, с которого стартовала студия, позже взявшая более крупные оплачиваемые заказы (см. Legion).",
      },
      tech: {
        en: "Built with GatsbyJS.",
        de: "Mit GatsbyJS gebaut.",
        ru: "Собран на GatsbyJS.",
      },
    },
    stack: ["Gatsby"],
    links: [{ labelKey: "demo", url: "https://typography.gatsbyjs.io/" }],
    images: ["/images/projects/typography-order-form/order-form.png"],
  },
  {
    slug: "legion-corporate-site",
    title: {
      en: "Legion — Construction Company Portal",
      de: "Legion — Portal für ein Bauunternehmen",
      ru: "Legion — портал для строительной компании",
    },
    period: "10/2019 – 04/2020",
    status: "archived",
    statusNote: {
      en: "Engagement ended after the client's side lost confidence in delivery speed.",
      de: "Projekt endete, nachdem der Kunde das Vertrauen in die Liefergeschwindigkeit verlor.",
      ru: "Проект завершился, когда клиент потерял уверенность в скорости поставки.",
    },
    company: "Yohan Loshop (own studio)",
    category: "work",
    tagline: {
      en: "Corporate portal for a construction firm — his studio's first paid contract",
      de: "Firmenportal für ein Bauunternehmen — der erste bezahlte Auftrag seines Studios",
      ru: "Корпоративный портал для строительной компании — первый оплачиваемый контракт студии",
    },
    description: {
      hr: {
        en: "Ran engineering on his 3-person studio's largest client engagement: a corporate portal for a construction company, working through several rounds of design and requirements changes.",
        de: "Verantwortete die technische Umsetzung des größten Kundenprojekts seines 3-köpfigen Studios: ein Firmenportal für ein Bauunternehmen, mit mehreren Runden an Design- und Anforderungsänderungen.",
        ru: "Отвечал за инженерную часть крупнейшего клиентского проекта студии из 3 человек: корпоративный портал для строительной компании, с несколькими раундами изменений дизайна и требований.",
      },
      business: {
        en: "Earned ₽25,000 across a 7-month engagement. The clearest lesson from running his own studio: without a written scope, an unclear client point of contact turns page-by-page delivery into open-ended scope creep — and without steady revenue, a 3-person team can't compete with what junior full-time roles pay in the same city.",
        de: "25.000 ₽ Honorar über ein 7-monatiges Projekt. Die klarste Lektion aus dem eigenen Studio: Ohne schriftlichen Scope verwandelt ein unklarer Ansprechpartner beim Kunden seitenweise Lieferung in endlosen Scope-Creep — und ohne stetigen Umsatz kann ein 3-köpfiges Team nicht mit dem mithalten, was Junior-Vollzeitstellen in derselben Stadt zahlen.",
        ru: "Заработок 25 000 ₽ за 7-месячный проект. Самый чёткий урок из ведения собственной студии: без письменного скоупа неясный контакт со стороны клиента превращает постраничную поставку в бесконечное расползание скоупа — а без стабильного дохода команда из 3 человек не может конкурировать с зарплатой джуниор-позиций на полной занятости в том же городе.",
      },
      tech: {
        en: "Built with GatsbyJS, after evaluating and discarding several headless CMS options (Contentful, CosmicJS, DatoCMS) before settling on one.",
        de: "Mit GatsbyJS gebaut, nachdem mehrere Headless-CMS-Optionen (Contentful, CosmicJS, DatoCMS) evaluiert und verworfen wurden, bevor man sich für eine entschied.",
        ru: "Собран на GatsbyJS, после оценки и отсева нескольких headless CMS (Contentful, CosmicJS, DatoCMS), прежде чем остановились на одном.",
      },
    },
    impact: [{ label: { en: "Revenue", de: "Honorar", ru: "Доход" }, value: "₽25,000" }],
    stack: ["Gatsby"],
    links: [
      { labelKey: "demo", url: "https://legion-ecru.vercel.app/" },
      { labelKey: "github", url: "https://github.com/mskVitalii/Legion" },
    ],
    images: ["/images/projects/legion-corporate-site/homepage.png"],
  },
  {
    slug: "dancin-party-site",
    title: {
      en: "Danc'in — Party Website",
      de: "Danc'in — Party-Website",
      ru: "Danc'in — сайт вечеринки",
    },
    period: "11/2021 – 12/2021",
    status: "archived",
    statusNote: {
      en: "Overkill for the event it was built for — turnout was low regardless.",
      de: "Überdimensioniert für den Anlass, für den es gebaut wurde — die Teilnehmerzahl blieb trotzdem niedrig.",
      ru: "Слишком много для мероприятия, ради которого сделан — явка всё равно была низкой.",
    },
    category: "personal",
    tagline: {
      en: "A party website built for his sister's event",
      de: "Eine Party-Website für die Veranstaltung seiner Schwester",
      ru: "Сайт вечеринки, сделанный для мероприятия сестры",
    },
    description: {
      hr: {
        en: "Built a website for his sister's party after she talked him into it — an excuse to learn GatsbyJS.",
        de: "Website für die Party seiner Schwester gebaut, nachdem sie ihn überredet hatte — ein Vorwand, um GatsbyJS zu lernen.",
        ru: "Собрал сайт для вечеринки сестры после того, как она его уговорила — повод изучить GatsbyJS.",
      },
      business: {
        en: "No commercial goal; the site was more elaborate than the small event actually needed.",
        de: "Kein kommerzielles Ziel; die Seite war aufwendiger, als die kleine Veranstaltung eigentlich brauchte.",
        ru: "Без коммерческой цели; сайт получился сложнее, чем реально требовалось для небольшого мероприятия.",
      },
      tech: {
        en: "Built with GatsbyJS — in hindsight, plain HTML/CSS would have been the better fit for the scope.",
        de: "Mit GatsbyJS gebaut — rückblickend wäre reines HTML/CSS für den Umfang die bessere Wahl gewesen.",
        ru: "Собран на GatsbyJS — задним числом простой HTML/CSS подошёл бы для такого объёма лучше.",
      },
    },
    stack: ["Gatsby"],
    links: [
      { labelKey: "demo", url: "https://party-ashy-sigma.vercel.app" },
      { labelKey: "github", url: "https://github.com/mskVitalii/party" },
    ],
    images: ["/images/projects/dancin-party-site/homepage.png"],
  },
  {
    slug: "linear-adaptive-typography",
    title: {
      en: "Linear Adaptive — Fluid Typography",
      de: "Linear Adaptive — fließende Typografie",
      ru: "Linear Adaptive — плавная типографика",
    },
    period: "02/2022",
    status: "archived",
    category: "personal",
    tagline: {
      en: "Fluid, CSS-variable-driven responsive typography toolkit",
      de: "Fließendes, CSS-variablen-gesteuertes Toolkit für responsive Typografie",
      ru: "Инструментарий плавной адаптивной типографики на CSS-переменных",
    },
    description: {
      hr: {
        en: "Built a small toolkit for fluid typography using CSS custom properties, aimed at speeding up responsive design handoff from Figma.",
        de: "Kleines Toolkit für fließende Typografie mit CSS Custom Properties gebaut, um die Übergabe von responsivem Design aus Figma zu beschleunigen.",
        ru: "Собрал небольшой инструментарий плавной типографики на CSS custom properties, чтобы ускорить передачу адаптивного дизайна из Figma.",
      },
      business: {
        en: "Used directly on the Legion project; no separate commercial outcome.",
        de: "Direkt im Legion-Projekt eingesetzt; kein separates kommerzielles Ergebnis.",
        ru: "Использован напрямую в проекте Legion; отдельного коммерческого результата не было.",
      },
      tech: {
        en: "Built with Next.js and CSS custom properties.",
        de: "Mit Next.js und CSS Custom Properties gebaut.",
        ru: "Собран на Next.js и CSS custom properties.",
      },
    },
    stack: ["Next.js"],
    links: [
      { labelKey: "demo", url: "https://linear-adaptive.vercel.app/" },
      { labelKey: "github", url: "https://github.com/mskVitalii/linear-adaptive" },
    ],
    images: ["/images/projects/linear-adaptive-typography/homepage.png"],
  },
  {
    slug: "sign-app",
    title: {
      en: "Sign-App — Signature Drawing Tool",
      de: "Sign-App — Werkzeug zum Zeichnen von Unterschriften",
      ru: "Sign-App — инструмент для рисования подписи",
    },
    period: "03/2022",
    status: "archived",
    category: "personal",
    tagline: {
      en: "A one-day build for drawing and saving a signature",
      de: "Ein Ein-Tages-Projekt zum Zeichnen und Speichern einer Unterschrift",
      ru: "Проект на один день для рисования и сохранения подписи",
    },
    description: {
      hr: {
        en: "Built a small tool for drawing a signature by hand and exporting it — a one-day, one-project sprint.",
        de: "Kleines Tool zum handschriftlichen Zeichnen und Exportieren einer Unterschrift gebaut — ein Ein-Tages-Sprint.",
        ru: "Собрал небольшой инструмент для рисования подписи от руки и её экспорта — спринт на один день.",
      },
      business: {
        en: "Used repeatedly by himself and friends since — a small but genuinely useful pet tool.",
        de: "Seitdem wiederholt von ihm selbst und Freunden genutzt — ein kleines, aber wirklich nützliches Pet-Tool.",
        ru: "С тех пор регулярно используется им самим и друзьями — маленький, но по-настоящему полезный pet-инструмент.",
      },
      tech: {
        en: "Built with Next.js.",
        de: "Mit Next.js gebaut.",
        ru: "Собран на Next.js.",
      },
    },
    stack: ["Next.js"],
    links: [
      { labelKey: "demo", url: "https://sign-app-mu.vercel.app/" },
      { labelKey: "github", url: "https://github.com/mskVitalii/Sign-app" },
    ],
    images: ["/images/projects/sign-app/homepage.png"],
  },
  {
    slug: "effects-parallax-editor",
    title: {
      en: "Effects — Parallax Comic Editor",
      de: "Effects — Parallax-Comic-Editor",
      ru: "Effects — редактор параллакс-комиксов",
    },
    period: "03/2022 – 05/2022",
    status: "archived",
    statusNote: {
      en: "Grew out of a parallax-scrolling comic page built at his first hackathon in 07/2020, which didn't place but proved the concept. Led a 4-person student team on the full editor two years later; marketing outreach to artists didn't convert.",
      de: "Entstand aus einer Parallax-Scroll-Comicseite, die er bei seinem ersten Hackathon im 07/2020 baute — ohne Platzierung, aber mit belegtem Konzept. Zwei Jahre später ein 4-köpfiges Studententeam für den vollständigen Editor geleitet; Marketing-Outreach an Künstler konvertierte nicht.",
      ru: "Вырос из параллакс-скролл-страницы комикса, сделанной на первом хакатоне в 07/2020 — без призового места, но с доказанной концепцией. Через два года руководил командой из 4 студентов над полноценным редактором; маркетинговый охват художников не сконвертировался.",
    },
    category: "hackathon",
    tagline: {
      en: "Editor turning 2D art into gyroscope-driven 2.5D parallax content — grew out of a 2020 hackathon prototype",
      de: "Editor, der 2D-Kunst in gyroskop-gesteuerten 2,5D-Parallax-Content verwandelt — entstanden aus einem Hackathon-Prototyp von 2020",
      ru: "Редактор, превращающий 2D-иллюстрации в 2.5D параллакс-контент на гироскопе — вырос из прототипа хакатона 2020 года",
    },
    description: {
      hr: {
        en: "Led a 4-person university-course team building an editor that converts 2D illustrations into gyroscope- and scroll-driven 2.5D parallax content — grown from a parallax-scrolling comic page he first built at a hackathon two years earlier, the visually most distinctive entry in the room though it didn't place at the time.",
        de: "Leitete ein 4-köpfiges Universitätskurs-Team beim Bau eines Editors, der 2D-Illustrationen in gyroskop- und scroll-gesteuerten 2,5D-Parallax-Content verwandelt — gewachsen aus einer Parallax-Scroll-Comicseite, die er zwei Jahre zuvor bei einem Hackathon baute, dem visuell auffälligsten Beitrag im Raum, obwohl er damals nicht platziert war.",
        ru: "Руководил командой из 4 студентов в рамках университетского курса над редактором, превращающим 2D-иллюстрации в 2.5D параллакс-контент, управляемый гироскопом и скроллом — вырос из параллакс-страницы комикса, впервые собранной на хакатоне двумя годами ранее, визуально самой заметной заявки в зале, хотя тогда она не заняла призового места.",
      },
      business: {
        en: "First real attempt at marketing: reached out to digital artists and communities directly. Interest was polite but shallow — no artist adopted the tool, a clear lesson that cold outreach without an existing audience rarely converts.",
        de: "Erster echter Marketing-Versuch: direkte Ansprache digitaler Künstler und Communities. Das Interesse war höflich, aber oberflächlich — kein Künstler übernahm das Tool, eine klare Lektion, dass Kaltakquise ohne bestehendes Publikum selten konvertiert.",
        ru: "Первая настоящая попытка маркетинга: прямое обращение к digital-художникам и сообществам. Интерес был вежливым, но поверхностным — ни один художник не начал пользоваться инструментом, чёткий урок о том, что холодный охват без существующей аудитории редко конвертируется.",
      },
      tech: {
        en: "Built with Next.js and FaunaDB. The original 2020 hackathon prototype was vanilla JS with parallax.js scroll effects — this rebuilt the concept as a proper editor rather than a one-off page.",
        de: "Mit Next.js und FaunaDB gebaut. Der ursprüngliche Hackathon-Prototyp von 2020 war reines JS mit parallax.js-Scroll-Effekten — dies baute das Konzept als vollwertigen Editor statt als Einmal-Seite neu auf.",
        ru: "Собран на Next.js и FaunaDB. Изначальный прототип с хакатона 2020 года был на чистом JS с эффектами скролла parallax.js — этот проект пересобрал концепцию как полноценный редактор, а не одноразовую страницу.",
      },
    },
    stack: ["Next.js", "FaunaDB"],
    links: [
      { labelKey: "demo", url: "https://effects.vercel.app/en/1/1/editor" },
      { labelKey: "github", url: "https://github.com/mskVitalii/effects" },
      { labelKey: "originalHackathonDemo", url: "https://mskvitalii.github.io/Scott-Pilgrim-Parallax/" },
      { labelKey: "originalHackathonGithub", url: "https://github.com/mskVitalii/Scott-Pilgrim-Parallax" },
    ],
    images: [
      "/images/projects/effects-parallax-editor/editor.png",
      "/images/projects/effects-parallax-editor/original-hackathon-build.png",
    ],
  },
  {
    slug: "firebase-slack-auth-extension",
    title: {
      en: "New-User Slack Notifier — Firebase Extension",
      de: "Neuer-Nutzer-Slack-Benachrichtiger — Firebase-Erweiterung",
      ru: "Slack-уведомления о новых пользователях — расширение Firebase",
    },
    period: "09/2024 – present",
    status: "active",
    category: "personal",
    tagline: {
      en: "Firebase Extension installed in 90 projects — Slack alerts on every new signup",
      de: "Firebase-Erweiterung in 90 Projekten installiert — Slack-Benachrichtigungen bei jeder neuen Registrierung",
      ru: "Расширение Firebase, установленное в 90 проектах — уведомления в Slack при каждой новой регистрации",
    },
    description: {
      hr: {
        en: "Built and published a Firebase Extension that posts a Slack message whenever a new user signs up, configurable with just a Slack webhook and message template — installed in 90 Firebase projects via the official Extensions marketplace.",
        de: "Firebase-Erweiterung gebaut und veröffentlicht, die bei jeder neuen Nutzerregistrierung eine Slack-Nachricht postet, konfigurierbar über nur einen Slack-Webhook und eine Nachrichtenvorlage — installiert in 90 Firebase-Projekten über den offiziellen Extensions-Marktplatz.",
        ru: "Собрал и опубликовал расширение Firebase, отправляющее сообщение в Slack при каждой новой регистрации пользователя, настраиваемое всего через Slack-вебхук и шаблон сообщения — установлено в 90 проектах Firebase через официальный маркетплейс расширений.",
      },
      business: {
        en: "A zero-maintenance, install-and-configure Firebase Extension solving a common need — real-time visibility into new signups — adopted by 90 separate projects through Firebase's official extensions marketplace, extensions.dev.",
        de: "Eine wartungsfreie, sofort einsatzbereite Firebase-Erweiterung, die ein häufiges Bedürfnis löst — Echtzeit-Sichtbarkeit neuer Registrierungen — übernommen von 90 verschiedenen Projekten über Firebases offiziellen Extensions-Marktplatz extensions.dev.",
        ru: "Firebase-расширение без обслуживания, работающее сразу после установки и настройки, решает частую потребность — видимость новых регистраций в реальном времени — используется в 90 отдельных проектах через официальный маркетплейс расширений Firebase extensions.dev.",
      },
      tech: {
        en: "TypeScript Cloud Function triggered on Firebase Auth user-creation events, packaged and published as a Firebase Extension with a configurable Slack Webhook URL and message template.",
        de: "TypeScript-Cloud-Function, ausgelöst durch Firebase-Auth-Nutzererstellungs-Events, verpackt und veröffentlicht als Firebase-Erweiterung mit konfigurierbarer Slack-Webhook-URL und Nachrichtenvorlage.",
        ru: "Cloud Function на TypeScript, срабатывающая на события создания пользователя в Firebase Auth, упакована и опубликована как расширение Firebase с настраиваемым Slack Webhook URL и шаблоном сообщения.",
      },
    },
    impact: [{ label: { en: "Installs", de: "Installationen", ru: "Установок" }, value: "90" }],
    stack: ["TypeScript", "Firebase", "Cloud Functions", "Slack API"],
    links: [
      { labelKey: "firebaseExtension", url: "https://extensions.dev/extensions/mskvitalii/auth-send-message-to-slack" },
      { labelKey: "github", url: "https://github.com/mskVitalii/auth-send-message-to-slack" },
    ],
    images: ["/images/projects/firebase-slack-auth-extension/listing.png"],
  },
  {
    slug: "semki-staffbase-hackathon",
    title: {
      en: "Semki — Intelligent Communication Platform with AI-Powered User Matching",
      de: "Semki — intelligente Kommunikationsplattform mit KI-gestütztem Nutzer-Matching",
      ru: "Semki — платформа коммуникации с AI-подбором сотрудников",
    },
    period: "10/2025 – 11/2025",
    status: "archived",
    category: "hackathon",
    tagline: {
      en: "RAG-powered employee search that helps enterprises connect departments and find the right people fast",
      de: "RAG-gestützte Mitarbeitersuche, die Unternehmen hilft, Abteilungen zu vernetzen und schnell die richtigen Personen zu finden",
      ru: "RAG-поиск сотрудников, помогающий предприятиям связывать отделы и быстро находить нужных людей",
    },
    description: {
      hr: {
        en: "Built Semki for Staffbase's 'Code the Future' AI Challenge — an AI-powered employee-search platform that helps large organizations connect departments and find the right people fast.",
        de: "Semki für Staffbases 'Code the Future' AI Challenge gebaut — eine KI-gestützte Mitarbeitersuch-Plattform, die großen Organisationen hilft, Abteilungen zu vernetzen und schnell die richtigen Personen zu finden.",
        ru: "Собрал Semki для AI-хакатона Staffbase 'Code the Future' — платформу поиска сотрудников на AI, помогающую крупным организациям связывать отделы и быстро находить нужных людей.",
      },
      business: {
        en: "Large enterprises struggle to find the right person across siloed departments. Semki uses AI-powered semantic search over employee profiles to surface relevant colleagues instantly, cutting the time spent hunting for the right contact in a big organization.",
        de: "Große Unternehmen tun sich schwer, über isolierte Abteilungen hinweg die richtige Person zu finden. Semki nutzt KI-gestützte semantische Suche über Mitarbeiterprofile, um relevante Kollegen sofort sichtbar zu machen und den Zeitaufwand für die Suche nach dem richtigen Kontakt in einer großen Organisation zu reduzieren.",
        ru: "Крупным компаниям сложно найти нужного человека среди изолированных отделов. Semki использует семантический AI-поиск по профилям сотрудников, чтобы мгновенно находить релевантных коллег, сокращая время на поиск нужного контакта в большой организации.",
      },
      tech: {
        en: "Go backend (Gin) with MongoDB, Qdrant for vector search, Redis caching, and the OpenAI API for embeddings and RAG-style retrieval over employee profiles. React 19 + TypeScript frontend with Mantine UI, Zustand and TanStack Query. Full observability stack (Prometheus, Grafana, Loki, Jaeger) deployed on Kubernetes.",
        de: "Go-Backend (Gin) mit MongoDB, Qdrant für Vektorsuche, Redis-Caching und der OpenAI-API für Embeddings und RAG-artiges Retrieval über Mitarbeiterprofile. React-19- + TypeScript-Frontend mit Mantine UI, Zustand und TanStack Query. Vollständiger Observability-Stack (Prometheus, Grafana, Loki, Jaeger), deployt auf Kubernetes.",
        ru: "Бэкенд на Go (Gin) с MongoDB, Qdrant для векторного поиска, кеширование Redis и OpenAI API для эмбеддингов и RAG-поиска по профилям сотрудников. Фронтенд на React 19 + TypeScript с Mantine UI, Zustand и TanStack Query. Полный стек observability (Prometheus, Grafana, Loki, Jaeger) на Kubernetes.",
      },
    },
    stack: ["Go", "React", "TypeScript", "MongoDB", "Qdrant", "OpenAI API", "Kubernetes"],
    links: [
      { labelKey: "competition", url: "https://staffbase.com/ai-challenge" },
      { labelKey: "demoVideo", url: "https://www.youtube.com/watch?v=4vvkE5uHvkU" },
      { labelKey: "github", url: "https://github.com/mskVitalii/Semki" },
    ],
    images: [
      "/images/projects/semki-staffbase-hackathon/staffbase-org-settings.jpg",
      "/images/projects/semki-staffbase-hackathon/ai-search-demo.jpg",
    ],
  },
];

export const EDUCATION_PROJECTS: Project[] = [
  // ─── Higher School of Economics — Bachelor's in Software Engineering ──────
  {
    slug: "fassonapi-coursework",
    title: {
      en: "FassonAPI — Biometric Web Auth",
      de: "FassonAPI — Biometrische Web-Authentifizierung",
      ru: "FassonAPI — биометрическая веб-аутентификация",
    },
    company: "Higher School of Economics",
    period: "10/2019 – 04/2020",
    status: "archived",
    category: "education",
    tagline: {
      en: "Award-winning first-year coursework: FaceID-style web authentication",
      de: "Preisgekrönte Erstsemester-Kursarbeit: webbasierte Authentifizierung im FaceID-Stil",
      ru: "Отмеченная наградой курсовая первого курса: веб-аутентификация в стиле FaceID",
    },
    description: {
      hr: {
        en: "First-year university coursework proposing biometric, FaceID-style authentication for websites, developed with an academic advisor.",
        de: "Erstsemester-Kursarbeit, die biometrische, FaceID-artige Authentifizierung für Websites vorschlug, entwickelt mit einem akademischen Betreuer.",
        ru: "Курсовая работа первого курса, предлагающая биометрическую аутентификацию для сайтов в стиле FaceID, разработана с научным руководителем.",
      },
      business: {
        en: "Coursework project later recognized among HSE's best student projects — notified of the award two years after submission.",
        de: "Kursprojekt, das später zu den besten Studierendenprojekten der HSE zählte — die Auszeichnung wurde zwei Jahre nach Abgabe mitgeteilt.",
        ru: "Курсовой проект, позже признанный одним из лучших студенческих проектов НИУ ВШЭ — о награде сообщили спустя два года после сдачи.",
      },
      tech: {
        en: "Backend explored in C#. The C# refresher gained here paid off directly: it's what let him walk into the OZON backend internship interview with confidence.",
        de: "Backend in C# erkundet. Die hier aufgefrischten C#-Kenntnisse zahlten sich direkt aus: Sie gaben ihm die Sicherheit für das Vorstellungsgespräch zum Backend-Praktikum bei OZON.",
        ru: "Бэкенд исследовался на C#. Освежённые здесь знания C# напрямую окупились: именно они позволили уверенно пройти собеседование на бэкенд-стажировку в OZON.",
      },
    },
    impact: [{ label: { en: "Recognition", de: "Auszeichnung", ru: "Признание" }, value: "HSE Best Projects" }],
    stack: ["C#"],
    links: [
      { labelKey: "demo", url: "https://fassonapi.azurewebsites.net/" },
      { labelKey: "github", url: "https://github.com/mskVitalii/FassonAPI" },
    ],
    images: [
      "/images/projects/fassonapi-coursework/architecture-scheme.png",
      "/images/projects/fassonapi-coursework/late-night-coding.png",
      "/images/projects/fassonapi-coursework/award-1.jpeg",
      "/images/projects/fassonapi-coursework/award-2.jpeg",
    ],
  },
  {
    slug: "cyberphys-color-robot",
    title: {
      en: "Color-Sensing Sound Robot",
      de: "Farberkennender Klangroboter",
      ru: "Робот, распознающий цвет по звуку",
    },
    company: "Higher School of Economics",
    period: "04/2020 – 05/2020",
    status: "archived",
    category: "education",
    tagline: {
      en: "Arduino robot that identifies 12 colors and responds with sound",
      de: "Arduino-Roboter, der 12 Farben erkennt und mit Klang reagiert",
      ru: "Arduino-робот, распознающий 12 цветов и отвечающий звуком",
    },
    description: {
      hr: {
        en: "Built a color-sensing robot with a course partner — wrote the detection algorithm while she handled the electronics build and enclosure.",
        de: "Farberkennenden Roboter mit einem Kurspartner gebaut — Erkennungsalgorithmus geschrieben, während sie Elektronikaufbau und Gehäuse übernahm.",
        ru: "Собрал робота, распознающего цвет, вместе с напарницей по курсу — писал алгоритм распознавания, пока она занималась электроникой и корпусом.",
      },
      business: {
        en: "Academic hardware project; no commercial output, but a first real exposure to embedded debugging.",
        de: "Akademisches Hardware-Projekt; kein kommerzieller Output, aber erste echte Erfahrung mit Embedded-Debugging.",
        ru: "Академический hardware-проект без коммерческого результата, но с первым настоящим опытом отладки embedded-систем.",
      },
      tech: {
        en: "Arduino/C++ firmware reading a color sensor and mapping 12 detected colors to distinct audio tones.",
        de: "Arduino-/C++-Firmware, die einen Farbsensor ausliest und 12 erkannte Farben auf unterschiedliche Audiotöne abbildet.",
        ru: "Прошивка на Arduino/C++, считывающая датчик цвета и сопоставляющая 12 распознанных цветов с разными звуковыми тонами.",
      },
    },
    stack: ["C++", "Arduino"],
    links: [{ labelKey: "github", url: "https://github.com/mskVitalii/Arduino-Color-Sound" }],
    images: [
      "/images/projects/cyberphys-color-robot/robot-build-1.png",
      "/images/projects/cyberphys-color-robot/robot-build-2.png",
      "/images/projects/cyberphys-color-robot/robot-build-3.png",
    ],
  },
  {
    slug: "tango-streaming-coursework",
    title: {
      en: "Tango — Streaming App Coursework",
      de: "Tango — Kursarbeit zu einer Streaming-App",
      ru: "Tango — курсовая по стриминговому приложению",
    },
    company: "Higher School of Economics",
    period: "11/2020 – 05/2021",
    status: "archived",
    statusNote: {
      en: "Prototype, social features too raw to pursue further.",
      de: "Prototyp, Social-Features noch zu unausgereift für eine Weiterführung.",
      ru: "Прототип, социальные функции оказались слишком сырыми для продолжения.",
    },
    category: "education",
    tagline: {
      en: "Coursework prototype: a Netflix-style streaming app",
      de: "Kursarbeits-Prototyp: eine Streaming-App im Netflix-Stil",
      ru: "Прототип для курсовой: стриминговое приложение в стиле Netflix",
    },
    description: {
      hr: {
        en: "Built the backend for a coursework project alongside an iOS-focused partner, learning Java Spring Boot along the way.",
        de: "Backend für ein Kursprojekt zusammen mit einem auf iOS fokussierten Partner gebaut, dabei Java Spring Boot gelernt.",
        ru: "Собрал бэкенд для курсового проекта вместе с напарником, специализирующимся на iOS, попутно изучая Java Spring Boot.",
      },
      business: {
        en: "Prototype shared informally with a filmmaking student for feedback — social features weren't developed enough to take further.",
        de: "Prototyp informell mit einem Film-Studenten für Feedback geteilt — Social-Features waren nicht ausgereift genug für eine Weiterführung.",
        ru: "Прототип неформально показывали студенту-кинематографисту для обратной связи — социальные функции были недостаточно проработаны для продолжения.",
      },
      tech: {
        en: "Backend in Java Spring Boot, later revisited in Go. Frontend admin panel in JavaScript.",
        de: "Backend in Java Spring Boot, später in Go überarbeitet. Frontend-Admin-Panel in JavaScript.",
        ru: "Бэкенд на Java Spring Boot, позже пересмотрен на Go. Админка на JavaScript.",
      },
    },
    stack: ["Java", "Go", "Spring Boot", "JavaScript"],
    links: [
      { labelKey: "githubBackend", url: "https://github.com/mskVitalii/Tango-server" },
      { labelKey: "githubAdmin", url: "https://github.com/mskVitalii/Tango_admin" },
      { labelKey: "liveDemoAdmin", url: "https://tango-admin-rho.vercel.app" },
    ],
  },
  {
    slug: "checkpoint-coursework",
    title: {
      en: "Checkpoint — Security Checkpoint App",
      de: "Checkpoint — App für Sicherheitskontrollpunkte",
      ru: "Checkpoint — приложение для КПП",
    },
    company: "Higher School of Economics",
    period: "03/2021 – 04/2021",
    status: "archived",
    category: "education",
    tagline: {
      en: "Coursework backend for a security-checkpoint management app",
      de: "Kursarbeits-Backend für eine App zur Verwaltung von Sicherheitskontrollpunkten",
      ru: "Курсовой бэкенд для приложения управления контрольно-пропускными пунктами",
    },
    description: {
      hr: {
        en: "Built the backend for a course partner's mobile app (React Native) supporting security checkpoints at sites like malls and gated communities.",
        de: "Backend für die mobile App (React Native) eines Kurspartners gebaut, die Sicherheitskontrollpunkte etwa in Einkaufszentren und geschlossenen Wohnanlagen unterstützt.",
        ru: "Собрал бэкенд для мобильного приложения (React Native) напарника по курсу, поддерживающего контрольно-пропускные пункты в торговых центрах и закрытых посёлках.",
      },
      business: {
        en: "Academic coursework; extra hands-on experience with Spring Boot.",
        de: "Akademische Kursarbeit; zusätzliche praktische Erfahrung mit Spring Boot.",
        ru: "Академическая курсовая; дополнительный практический опыт со Spring Boot.",
      },
      tech: {
        en: "Backend in Java Spring Boot.",
        de: "Backend in Java Spring Boot.",
        ru: "Бэкенд на Java Spring Boot.",
      },
    },
    stack: ["Java", "Spring Boot"],
  },
  {
    slug: "lightning-diagram-editor",
    title: {
      en: "Lightning — ER Diagram Editor",
      de: "Lightning — ER-Diagramm-Editor",
      ru: "Lightning — редактор ER-диаграмм",
    },
    company: "Higher School of Economics",
    period: "04/2022",
    status: "deprecated",
    statusNote: {
      en: "Rough prototype — the zero-code ambition outran the execution.",
      de: "Grober Prototyp — die Zero-Code-Ambition übertraf die Umsetzung.",
      ru: "Черновой прототип — амбиция zero-code опередила реализацию.",
    },
    category: "education",
    tagline: {
      en: "3rd-semester coursework attempt at a zero-code backend/server generator",
      de: "Versuch im 3. Semester, einen Zero-Code-Backend-/Server-Generator zu bauen",
      ru: "Попытка курсовой 3-го семестра сделать zero-code генератор бэкенда/сервера",
    },
    description: {
      hr: {
        en: "Coursework attempt at a zero-code tool for scaffolding a server from a visual model — landed as a rough ER-diagram editor rather than the original ambition.",
        de: "Kursarbeits-Versuch eines Zero-Code-Tools, das aus einem visuellen Modell ein Server-Grundgerüst erzeugt — endete als grober ER-Diagramm-Editor statt der ursprünglichen Ambition.",
        ru: "Курсовая попытка сделать zero-code инструмент для генерации сервера из визуальной модели — в итоге получился черновой редактор ER-диаграмм вместо изначальной амбиции.",
      },
      business: {
        en: "No commercial outcome, but it crystallized a lasting interest in low-code tooling and, later, AI-assisted development as ways to close the gap between an idea and a working service.",
        de: "Kein kommerzielles Ergebnis, aber es festigte ein bleibendes Interesse an Low-Code-Tools und später an KI-gestützter Entwicklung als Wege, die Lücke zwischen einer Idee und einem funktionierenden Service zu schließen.",
        ru: "Без коммерческого результата, но именно тогда выкристаллизовался устойчивый интерес к low-code инструментам, а позже — к AI-ассистированной разработке как способу сократить путь от идеи до работающего сервиса.",
      },
      tech: {
        en: "Built with Next.js.",
        de: "Mit Next.js gebaut.",
        ru: "Собран на Next.js.",
      },
    },
    stack: ["Next.js"],
    links: [
      { labelKey: "demo", url: "https://lightning-sand.vercel.app" },
      { labelKey: "github", url: "https://github.com/mskVitalii/lightning" },
    ],
    images: ["/images/projects/lightning-diagram-editor/editor.png"],
  },
  {
    slug: "react-redux-docs-translation",
    title: {
      en: "React Redux Docs — Russian Translation",
      de: "React-Redux-Dokumentation — russische Übersetzung",
      ru: "Документация React Redux — перевод на русский",
    },
    company: "Higher School of Economics",
    period: "07/2022 – 09/2022",
    status: "archived",
    statusNote: {
      en: "Translation stalled after the library's maintainers didn't respond to update requests.",
      de: "Übersetzung stagnierte, nachdem die Maintainer der Bibliothek nicht auf Aktualisierungsanfragen reagierten.",
      ru: "Перевод остановился после того, как мейнтейнеры библиотеки не ответили на запросы обновления.",
    },
    category: "education",
    tagline: {
      en: "University practicum: official Russian translation of the React Redux docs",
      de: "Universitätspraktikum: offizielle russische Übersetzung der React-Redux-Dokumentation",
      ru: "Университетская практика: официальный русский перевод документации React Redux",
    },
    description: {
      hr: {
        en: "Completed an official university practicum translating the React Redux documentation into Russian, credited under a faculty practicum supervisor.",
        de: "Offizielles Universitätspraktikum absolviert, in dem die React-Redux-Dokumentation ins Russische übersetzt wurde, betreut von einem Fakultätsdozenten.",
        ru: "Прошёл официальную университетскую практику по переводу документации React Redux на русский язык, под руководством преподавателя-куратора.",
      },
      business: {
        en: "Published to a js.org subdomain reserved for vetted JS-ecosystem resources; covered in a Habr article on the translation process. Reader feedback on Habr was mixed, and the translation was never kept in sync after the maintainers didn't respond to a webhook/update request — useful firsthand exposure to the maintenance cost of open-source contributions.",
        de: "Veröffentlicht auf einer js.org-Subdomain für geprüfte JS-Ökosystem-Ressourcen; in einem Habr-Artikel über den Übersetzungsprozess behandelt. Das Leserfeedback auf Habr war gemischt, und die Übersetzung blieb nie synchron, nachdem die Maintainer nicht auf eine Webhook-/Update-Anfrage reagierten — eine nützliche direkte Erfahrung der Wartungskosten von Open-Source-Beiträgen.",
        ru: "Опубликовано на поддомене js.org, зарезервированном для проверенных ресурсов JS-экосистемы; освещено в статье на Хабре о процессе перевода. Отзывы читателей на Хабре были смешанными, а перевод так и не поддерживался в актуальном состоянии после того, как мейнтейнеры не ответили на запрос через webhook — полезный первый опыт того, чего стоит поддержка open-source вклада.",
      },
      tech: {
        en: "Documentation translation and static site publishing.",
        de: "Dokumentationsübersetzung und Veröffentlichung einer statischen Website.",
        ru: "Перевод документации и публикация статического сайта.",
      },
    },
    stack: ["Documentation"],
    links: [
      { labelKey: "liveTranslation", url: "https://ru.react-redux.js.org/" },
      { labelKey: "github", url: "https://github.com/mskVitalii/react-redux-ru" },
    ],
    images: ["/images/projects/react-redux-docs-translation/habr-feedback-stats.png"],
  },
  {
    slug: "news-aggregator-thesis",
    title: {
      en: "Prospero — News Aggregator (Bachelor's Thesis)",
      de: "Prospero — News-Aggregator (Bachelorarbeit)",
      ru: "Prospero — агрегатор новостей (бакалаврская работа)",
    },
    company: "Higher School of Economics",
    period: "03/2023 – 06/2023",
    status: "archived",
    category: "education",
    tagline: {
      en: "Bachelor's thesis: a fully instrumented news-aggregation platform",
      de: "Bachelorarbeit: eine vollständig instrumentierte News-Aggregations-Plattform",
      ru: "Бакалаврская работа: полностью инструментированная платформа агрегации новостей",
    },
    featured: true,
    description: {
      hr: {
        en: "Bachelor's thesis project — a news aggregator built and shipped in roughly a month of focused work, backed by a real production-style setup, with a companion admin panel for content moderation.",
        de: "Bachelorarbeitsprojekt — ein News-Aggregator, gebaut und ausgeliefert in rund einem Monat fokussierter Arbeit, mit einem echten produktionsnahen Setup und einem begleitenden Admin-Panel für die Inhaltsmoderation.",
        ru: "Проект бакалаврской работы — агрегатор новостей, собранный и выпущенный примерно за месяц сфокусированной работы, с настоящей production-инфраструктурой и админкой для модерации контента.",
      },
      business: {
        en: "Scoped the idea into epics and stories in Jira, sized by complexity and time, with lower-priority ideas parked in a Notion backlog as a single source of documentation truth.",
        de: "Idee in Jira in Epics und Stories aufgeteilt, nach Komplexität und Zeit geschätzt, weniger priorisierte Ideen in einem Notion-Backlog als einzige Dokumentationsquelle geparkt.",
        ru: "Разбил идею на эпики и стори в Jira, оценённые по сложности и времени, менее приоритетные идеи хранились в бэклоге Notion как единый источник документации.",
      },
      tech: {
        en: "Go backend (his first project in the language) with ElasticSearch, PostgreSQL and a Next.js/React/Redux Toolkit/RTK Query frontend deployed on Vercel, plus a separate admin panel. Full observability stack: logs in ELK, tracing in Jaeger, metrics in Prometheus/Grafana, and Yandex.Metrica for traffic. CI/CD auto-deployed to a rented Docker host on every merged PR.",
        de: "Go-Backend (sein erstes Projekt in dieser Sprache) mit ElasticSearch, PostgreSQL und einem auf Vercel deployten Next.js/React/Redux-Toolkit/RTK-Query-Frontend, plus separatem Admin-Panel. Vollständiger Observability-Stack: Logs in ELK, Tracing in Jaeger, Metriken in Prometheus/Grafana und Yandex.Metrica für Traffic. CI/CD deployte bei jedem gemergten PR automatisch auf einen gemieteten Docker-Host.",
        ru: "Бэкенд на Go (первый проект на этом языке) с ElasticSearch, PostgreSQL и фронтендом на Next.js/React/Redux Toolkit/RTK Query, развёрнутым на Vercel, плюс отдельная админка. Полный стек observability: логи в ELK, трейсинг в Jaeger, метрики в Prometheus/Grafana и Яндекс.Метрика для трафика. CI/CD автоматически деплоил на арендованный Docker-хост при каждом слитом PR.",
      },
    },
    impact: [{ label: { en: "Thesis grade", de: "Abschlussnote", ru: "Оценка за диплом" }, value: "B+" }],
    stack: ["Go", "ElasticSearch", "PostgreSQL", "Next.js", "React", "Redux Toolkit", "Docker", "Prometheus", "Grafana", "Jaeger", "ELK"],
    links: [
      { labelKey: "liveSite", url: "https://prospero-frontend.vercel.app/" },
      { labelKey: "adminPanel", url: "https://prospero-adminka.vercel.app/" },
      { labelKey: "githubFrontend", url: "https://github.com/mskVitalii/prospero_frontend" },
      { labelKey: "githubBackend", url: "https://github.com/mskVitalii/prospero_backend" },
      { labelKey: "githubAdmin", url: "https://github.com/mskVitalii/prospero_adminka" },
    ],
  },

  // ─── Chemnitz University of Technology — Master's in Web Engineering ──────
  {
    slug: "chemnitz-map-assignment",
    title: {
      en: "Chemnitz Map — Project Assignment",
      de: "Chemnitz Map — Projektaufgabe",
      ru: "Chemnitz Map — проектное задание",
    },
    company: "Chemnitz University of Technology",
    period: "11/2023 – 01/2024",
    status: "archived",
    category: "education",
    tagline: {
      en: "1st-semester project assignment: an interactive campus/city map",
      de: "Projektaufgabe im 1. Semester: eine interaktive Campus-/Stadtkarte",
      ru: "Проектное задание 1-го семестра: интерактивная карта кампуса/города",
    },
    description: {
      hr: {
        en: "First-semester project assignment at TU Chemnitz building an interactive map application.",
        de: "Projektaufgabe im ersten Semester an der TU Chemnitz zum Bau einer interaktiven Kartenanwendung.",
        ru: "Проектное задание первого семестра в TU Chemnitz по разработке интерактивного картографического приложения.",
      },
      business: {
        en: "Academic assignment; no commercial output.",
        de: "Akademische Aufgabe; kein kommerzieller Output.",
        ru: "Академическое задание, без коммерческого результата.",
      },
      tech: {
        en: "Built with TypeScript.",
        de: "Mit TypeScript gebaut.",
        ru: "Собрано на TypeScript.",
      },
    },
    stack: ["TypeScript"],
    links: [{ labelKey: "github", url: "https://github.com/mskVitalii/chemnitz_map" }],
  },
  {
    slug: "swe-low-code-sql",
    title: {
      en: "SWE — Low-Code SQL Builder",
      de: "SWE — Low-Code-SQL-Baukasten",
      ru: "SWE — low-code конструктор SQL",
    },
    company: "Chemnitz University of Technology",
    period: "04/2024 – 07/2024",
    status: "archived",
    category: "education",
    tagline: {
      en: "Seminar Web Engineering coursework: a low-code app for building SQL queries",
      de: "Kursarbeit im Seminar Web Engineering: eine Low-Code-App zum Erstellen von SQL-Abfragen",
      ru: "Курсовая по семинару Web Engineering: low-code приложение для построения SQL-запросов",
    },
    description: {
      hr: {
        en: "Coursework for the Seminar Web Engineering module — a low-code tool that lets non-technical users compose SQL queries visually.",
        de: "Kursarbeit für das Modul Seminar Web Engineering — ein Low-Code-Tool, das nicht-technischen Nutzern erlaubt, SQL-Abfragen visuell zu erstellen.",
        ru: "Курсовая по модулю Seminar Web Engineering — low-code инструмент, позволяющий нетехническим пользователям визуально составлять SQL-запросы.",
      },
      business: {
        en: "Academic coursework demonstrating low-code/no-code tooling concepts, a recurring interest since the earlier Lightning project at HSE.",
        de: "Akademische Kursarbeit, die Low-Code-/No-Code-Konzepte demonstriert — ein wiederkehrendes Interesse seit dem früheren Lightning-Projekt an der HSE.",
        ru: "Академическая курсовая, демонстрирующая концепции low-code/no-code — устойчивый интерес ещё со времён проекта Lightning в НИУ ВШЭ.",
      },
      tech: {
        en: "Built with TypeScript, deployed on Vercel.",
        de: "Mit TypeScript gebaut, auf Vercel deployt.",
        ru: "Собрано на TypeScript, развёрнуто на Vercel.",
      },
    },
    stack: ["TypeScript"],
    links: [
      { labelKey: "liveDemo", url: "https://swe-eight.vercel.app" },
      { labelKey: "github", url: "https://github.com/mskVitalii/SWE" },
    ],
    images: ["/images/projects/swe-low-code-sql/homepage.png"],
  },
  {
    slug: "sse-software-service-engineering",
    title: {
      en: "SSE — Software Service Engineering Coursework",
      de: "SSE — Kursarbeit Software Service Engineering",
      ru: "SSE — курсовая по Software Service Engineering",
    },
    company: "Chemnitz University of Technology",
    period: "10/2024 – 01/2025",
    status: "archived",
    category: "education",
    tagline: {
      en: "Software Service Engineering module coursework",
      de: "Kursarbeit für das Modul Software Service Engineering",
      ru: "Курсовая по модулю Software Service Engineering",
    },
    description: {
      hr: {
        en: "Coursework for the Software Service Engineering module, covering service-oriented design and implementation.",
        de: "Kursarbeit für das Modul Software Service Engineering, mit Fokus auf serviceorientiertem Design und Implementierung.",
        ru: "Курсовая по модулю Software Service Engineering, охватывающая сервис-ориентированное проектирование и реализацию.",
      },
      business: {
        en: "Academic coursework; no commercial output.",
        de: "Akademische Kursarbeit; kein kommerzieller Output.",
        ru: "Академическая курсовая, без коммерческого результата.",
      },
      tech: {
        en: "Built with C# / .NET.",
        de: "Mit C# / .NET gebaut.",
        ru: "Собрано на C# / .NET.",
      },
    },
    stack: ["C#", ".NET"],
    links: [{ labelKey: "github", url: "https://github.com/mskVitalii/SSE" }],
  },
  {
    slug: "master-thesis-semantic-search",
    title: {
      en: "Semantic Search Across Government Open Data — Master's Thesis",
      de: "Semantische Suche über offene Verwaltungsdaten — Masterarbeit",
      ru: "Семантический поиск по открытым государственным данным — магистерская работа",
    },
    company: "Chemnitz University of Technology",
    period: "03/2025 – present",
    status: "active",
    statusNote: {
      en: "In progress — the Master-Arbeit is not yet submitted (85 of 120 ECTS completed per the latest transcript).",
      de: "In Arbeit — die Masterarbeit ist noch nicht eingereicht (85 von 120 ECTS laut aktuellem Notenspiegel).",
      ru: "В процессе — магистерская работа ещё не сдана (85 из 120 ECTS по последней выписке).",
    },
    category: "education",
    tagline: {
      en: "Master's thesis (in progress): a semantic search engine for government open data, built as 4 cooperating microservices",
      de: "Masterarbeit (in Arbeit): eine semantische Suchmaschine für offene Verwaltungsdaten, aufgebaut als 4 zusammenarbeitende Microservices",
      ru: "Магистерская работа (в процессе): семантический поисковый движок по открытым государственным данным на 4 взаимодействующих микросервисах",
    },
    featured: true,
    description: {
      hr: {
        en: "Master's thesis at TU Chemnitz, currently in progress — designing and building a semantic search engine over government open data, split into four independently deployable services: frontend, backend/API, an embedding service, and a reranker.",
        de: "Masterarbeit an der TU Chemnitz, derzeit in Arbeit — Entwurf und Bau einer semantischen Suchmaschine über offene Verwaltungsdaten, aufgeteilt in vier unabhängig deploybare Services: Frontend, Backend/API, einen Embedding-Service und einen Reranker.",
        ru: "Магистерская работа в TU Chemnitz, в процессе — проектирование и разработка семантического поискового движка по открытым государственным данным, разделённого на четыре независимо разворачиваемых сервиса: фронтенд, бэкенд/API, сервис эмбеддингов и реранкер.",
      },
      business: {
        en: "A production-style thesis project demonstrating a full semantic-search pipeline — from raw open-data ingestion through embedding, retrieval, and reranking to a natural-language search UI.",
        de: "Ein produktionsnahes Abschlussprojekt, das eine vollständige Semantic-Search-Pipeline demonstriert — von der Aufnahme roher offener Daten über Embedding, Retrieval und Reranking bis zu einer Suchoberfläche in natürlicher Sprache.",
        ru: "Дипломный проект в стиле production, демонстрирующий полный пайплайн семантического поиска — от приёма сырых открытых данных через эмбеддинг, ретрив и реранкинг до поискового интерфейса на естественном языке.",
      },
      tech: {
        en: "Go backend/API, Python services for embedding and reranking (the reranker being the thesis's core research contribution), and a TypeScript/React frontend — 4 separate repositories reflecting a real microservice architecture.",
        de: "Go-Backend/-API, Python-Services für Embedding und Reranking (der Reranker ist der zentrale Forschungsbeitrag der Arbeit) und ein TypeScript/React-Frontend — 4 separate Repositories, die eine echte Microservice-Architektur abbilden.",
        ru: "Бэкенд/API на Go, Python-сервисы для эмбеддинга и реранкинга (реранкер — основной исследовательский вклад работы), фронтенд на TypeScript/React — 4 отдельных репозитория, отражающих реальную микросервисную архитектуру.",
      },
    },
    impact: [{ label: { en: "Services", de: "Services", ru: "Сервисов" }, value: "4" }],
    stack: ["Go", "Python", "TypeScript", "Machine Learning"],
    links: [
      { labelKey: "demoVideo", url: "https://www.youtube.com/watch?v=qp12kmON7A0" },
      { labelKey: "githubFrontend", url: "https://github.com/mskVitalii/semantically-open-data-frontend" },
      { labelKey: "githubBackend", url: "https://github.com/mskVitalii/semantically-open-data-backend" },
      { labelKey: "githubEmbedder", url: "https://github.com/mskVitalii/semantically-open-data-embedder" },
      { labelKey: "githubReranker", url: "https://github.com/mskVitalii/semantically-open-data-reranker" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return [...PROJECTS, ...EDUCATION_PROJECTS].find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

// Sort key from a project's *end* date ("MM/YYYY [– MM/YYYY|present]") so
// recently-finished (or ongoing) work surfaces first — a project that ran
// 2018-2023 reads as more recent than one that started later but wrapped
// earlier, which a start-date sort would get backwards. Shared by the
// /projects listing, the company bundle page, and next-project navigation.
export function periodEndKey(period: string): number {
  const parts = period.split(/\s*[–—-]\s*/);
  const endToken = (parts[1] ?? parts[0]).trim();
  if (endToken.toLowerCase() === "present") return Infinity;
  const match = endToken.match(/(\d{1,2})\/(\d{4})/);
  if (match) return parseInt(match[2], 10) * 12 + parseInt(match[1], 10);
  const year = endToken.match(/\d{4}/);
  return year ? parseInt(year[0], 10) * 12 : 0;
}

type ProjectStop =
  | { kind: "project"; project: Project }
  | { kind: "bundle"; bundleSlug: string; projects: Project[] };

const NAV_CATEGORIES: ProjectCategory[] = ["work", "hackathon", "freelance", "personal"];

// The canonical, mode-independent browsing order used for "next project"
// navigation: fixed category order, each sorted by end date descending, with
// work-category projects for a bundled company collapsed into one stop (they
// share a single page). This mirrors the default (non-business-lens) grid
// order without chasing the listing's live filter/sort state.
function buildProjectStops(): ProjectStop[] {
  const stops: ProjectStop[] = [];

  for (const category of NAV_CATEGORIES) {
    const categoryProjects = PROJECTS.filter((p) => p.category === category);

    if (category !== "work") {
      const sorted = [...categoryProjects].sort((a, b) => periodEndKey(b.period) - periodEndKey(a.period));
      stops.push(...sorted.map((project): ProjectStop => ({ kind: "project", project })));
      continue;
    }

    const byBundleSlug = new Map<string, Project[]>();
    const singles: Project[] = [];
    for (const p of categoryProjects) {
      const bundle = p.company ? getCompanyBundle(p.company) : undefined;
      if (!bundle) {
        singles.push(p);
        continue;
      }
      if (!byBundleSlug.has(bundle.slug)) byBundleSlug.set(bundle.slug, []);
      byBundleSlug.get(bundle.slug)!.push(p);
    }

    const entries = [
      ...singles.map((project) => ({
        sortKey: periodEndKey(project.period),
        stop: { kind: "project", project } as ProjectStop,
      })),
      ...[...byBundleSlug.entries()].map(([bundleSlug, ps]) => {
        const sorted = [...ps].sort((a, b) => periodEndKey(b.period) - periodEndKey(a.period));
        return {
          sortKey: periodEndKey(sorted[0].period),
          stop: { kind: "bundle", bundleSlug, projects: sorted } as ProjectStop,
        };
      }),
    ];
    entries.sort((a, b) => b.sortKey - a.sortKey);
    stops.push(...entries.map((e) => e.stop));
  }

  return stops;
}

export interface NextProjectTarget {
  href: string;
  title: LocalizedText;
}

function firstOfStop(stop: ProjectStop): NextProjectTarget {
  if (stop.kind === "project") {
    return { href: `/projects/${stop.project.slug}`, title: stop.project.title };
  }
  const first = stop.projects[0];
  return { href: `/projects/company/${stop.bundleSlug}#${first.slug}`, title: first.title };
}

/** Where "next project" should take a reader who just finished `slug` — the
 * next project within the same company bundle if there is one, otherwise the
 * first project of the next stop in the canonical order, or `null` if `slug`
 * is the last stop overall. */
export function getNextProject(slug: string): NextProjectTarget | null {
  const stops = buildProjectStops();

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];

    if (stop.kind === "project") {
      if (stop.project.slug !== slug) continue;
      const next = stops[i + 1];
      return next ? firstOfStop(next) : null;
    }

    const idx = stop.projects.findIndex((p) => p.slug === slug);
    if (idx === -1) continue;
    if (idx < stop.projects.length - 1) {
      const next = stop.projects[idx + 1];
      return { href: `/projects/company/${stop.bundleSlug}#${next.slug}`, title: next.title };
    }
    const next = stops[i + 1];
    return next ? firstOfStop(next) : null;
  }

  return null;
}
