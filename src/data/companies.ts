import type { LocalizedText } from "@/lib/localized";

export interface CompanyCredit {
  name: LocalizedText;
  role: LocalizedText;
  note: LocalizedText;
  linkedinUrl: string;
}

export interface CompanyBundle {
  /** Must match `Project.company` exactly for projects that belong to this bundle. */
  name: string;
  /** URL slug for the merged company case-study page: /projects/company/[slug]. */
  slug: string;
  blurb: {
    hr: LocalizedText;
    business: LocalizedText;
    tech: LocalizedText;
  };
  /** Optional human shout-out to a collaborator on this engagement. */
  credit?: CompanyCredit;
}

export const COMPANY_BUNDLES: CompanyBundle[] = [
  {
    name: "Infineon Technologies AG",
    slug: "infineon",
    blurb: {
      hr: {
        en: "One of Europe's largest chipmakers, serving automotive, industrial, and IoT markets. Shipping a solution that runs directly on the company's own PSoC Edge chips — rather than relying on cloud inference — mattered as much here as the system design itself.",
        de: "Einer der größten Chiphersteller Europas, tätig in Automotive-, Industrie- und IoT-Märkten. Eine Lösung zu liefern, die direkt auf den unternehmenseigenen PSoC-Edge-Chips läuft — statt auf Cloud-Inferenz zu setzen — war hier genauso wichtig wie das Systemdesign selbst.",
        ru: "Один из крупнейших производителей чипов в Европе, работающий на рынках автомобилестроения, промышленности и IoT. Реализовать решение, работающее прямо на собственных чипах компании PSoC Edge — а не полагаться на облачный инференс — здесь было так же важно, как и сам дизайн системы.",
      },
      business: {
        en: "A German semiconductor manufacturer, the largest in Europe.",
        de: "Ein deutscher Halbleiterhersteller, der größte Europas.",
        ru: "Немецкий производитель полупроводников, крупнейший в Европе.",
      },
      tech: {
        en: "Enterprise engineering environment at a large semiconductor manufacturer, spanning embedded computer vision running directly on Infineon's own PSoC Edge chips, backend services, and production frontend tooling.",
        de: "Unternehmensweite Engineering-Umgebung bei einem großen Halbleiterhersteller, mit eingebetteter Computer Vision, die direkt auf Infineons eigenen PSoC-Edge-Chips läuft, Backend-Services und produktivem Frontend-Tooling.",
        ru: "Корпоративная инженерная среда крупного производителя полупроводников, охватывающая embedded компьютерное зрение, работающее прямо на собственных чипах PSoC Edge компании Infineon, бэкенд-сервисы и production-инструменты фронтенда.",
      },
    },
  },
  {
    name: "OZON Tech",
    slug: "ozon",
    blurb: {
      hr: {
        en: "OZON is one of Russia's largest e-commerce platforms — think Amazon scale for Eastern Europe — employing thousands of engineers across warehousing, search, and logistics.",
        de: "OZON ist eine der größten E-Commerce-Plattformen Russlands — vergleichbar mit Amazon-Größenordnung für Osteuropa — mit Tausenden Ingenieuren in Lagerlogistik, Suche und Logistik.",
        ru: "OZON — одна из крупнейших e-commerce платформ России, масштаба Amazon для Восточной Европы, с тысячами инженеров в складской логистике, поиске и логистике.",
      },
      business: {
        en: "Russia's largest marketplace, Amazon-scale for Eastern Europe. The business model is built on reselling logistics capacity and monetizing seller placement across the platform.",
        de: "Russlands größter Marktplatz, Amazon-Größenordnung für Osteuropa. Das Geschäftsmodell basiert auf dem Weiterverkauf von Logistikkapazität und der Monetarisierung von Verkäuferplatzierungen auf der Plattform.",
        ru: "Крупнейший маркетплейс в России, масштаба Amazon для Восточной Европы. Бизнес-модель построена на перепродаже логистических мощностей и монетизации размещения продавцов на платформе.",
      },
      tech: {
        en: "Large-scale distributed backend serving one of Russia's largest online marketplaces (Amazon-scale for Eastern Europe) — high-throughput search, warehouse logistics, and fulfillment systems operating at national scale.",
        de: "Groß angelegtes verteiltes Backend für einen der größten Online-Marktplätze Russlands (Amazon-Größenordnung für Osteuropa) — Hochdurchsatz-Suche, Lagerlogistik und Fulfillment-Systeme im nationalen Maßstab.",
        ru: "Крупномасштабный распределённый бэкенд одного из крупнейших онлайн-маркетплейсов России (масштаба Amazon для Восточной Европы) — высоконагруженный поиск, складская логистика и системы фулфилмента национального масштаба.",
      },
    },
  },
  {
    name: "onlineTours",
    slug: "onlinetours",
    blurb: {
      hr: {
        en: "onlineTours is a remote-first travel aggregator for tours & hotels, running experimentation-driven product development across SEO and UX. The team worked in Scrum.",
        de: "onlineTours ist ein Remote-first-Reiseaggregator für Touren & Hotels, mit experimentgetriebener Produktentwicklung in SEO und UX. Die Arbeit erfolgte nach Scrum.",
        ru: "onlineTours — remote-first турагрегатор туров и отелей, ведущий продуктовую разработку через эксперименты в SEO и UX. Работа велась по Scrum.",
      },
      business: {
        en: "onlineTours resells traffic by aggregating tour & hotel offers from partner suppliers, and monetizes through partner placement across the platform.",
        de: "onlineTours verkauft Traffic weiter, indem es Touren- und Hotelangebote von Partneranbietern aggregiert, und monetarisiert über Partnerplatzierungen auf der Plattform.",
        ru: "onlineTours перепродаёт трафик, агрегируя предложения туров и отелей от партнёров-поставщиков, и монетизируется через размещение партнёров на платформе.",
      },
      tech: {
        en: "Legacy Ruby on Rails + React/Redux platform being incrementally modernized with a new TypeScript/Tailwind component library, deployed via GitLab CI/CD on Docker & Kubernetes.",
        de: "Legacy-Plattform aus Ruby on Rails + React/Redux, die schrittweise mit einer neuen TypeScript/Tailwind-Komponentenbibliothek modernisiert wird, deployt via GitLab CI/CD auf Docker & Kubernetes.",
        ru: "Legacy-платформа на Ruby on Rails + React/Redux, постепенно модернизируемая новой библиотекой компонентов на TypeScript/Tailwind, деплой через GitLab CI/CD на Docker и Kubernetes.",
      },
    },
    credit: {
      name: { en: "Pavel Rosikhin", de: "Pavel Rosikhin", ru: "Павел Росихин" },
      role: {
        en: "Product Manager, onlineTours",
        de: "Product Manager, onlineTours",
        ru: "Продакт-менеджер, onlineTours",
      },
      note: {
        en: "The 11.63% uplift here wasn't a solo effort — Pavel drove the product side of every A/B test in this engagement, and the collaboration was genuinely great to work in.",
        de: "Die Steigerung um 11,63 % war keine Einzelleistung — Pavel hat bei diesem Engagement die Produktseite jedes A/B-Tests vorangetrieben, und die Zusammenarbeit war wirklich hervorragend.",
        ru: "Прирост в 11,63% — не одиночная заслуга: Павел вёл продуктовую сторону каждого A/B-теста в этом проекте, и совместная работа была по-настоящему приятной.",
      },
      linkedinUrl: "https://www.linkedin.com/in/павел-росихин-2476b9225/",
    },
  },
  {
    name: "egsha",
    slug: "egsha",
    blurb: {
      hr: {
        en: "egsha is a friend's small carpet-trading business — the umbrella client behind several one-off e-commerce engagements built for him over the years, from an early iPhone resale operation to a cross-border clothing resale store.",
        de: "egsha ist das kleine Teppichhandelsgeschäft eines Freundes — der Kunde hinter mehreren über die Jahre für ihn gebauten E-Commerce-Projekten, von einem frühen iPhone-Wiederverkaufsgeschäft bis zu einem grenzüberschreitenden Bekleidungs-Wiederverkaufsshop.",
        ru: "egsha — небольшой бизнес друга по продаже ковров, клиент, для которого за годы было сделано несколько разовых e-commerce проектов: от раннего перепродажного бизнеса iPhone до трансграничного магазина одежды.",
      },
      business: {
        en: "A small computer-carpet-trading business, and the client behind several small, hands-on e-commerce engagements built around it over the years — an automated ad-price optimizer, a first short-lived iPhone resale venture, and later a cross-border clothing resale store sourcing inventory from the Chinese marketplace Poizon.",
        de: "Ein kleines Handelsgeschäft für Computer-Teppiche, und der Kunde hinter mehreren über die Jahre gebauten, hands-on E-Commerce-Projekten — ein automatisierter Anzeigenpreis-Optimierer, ein erstes kurzlebiges iPhone-Wiederverkaufsgeschäft und später ein grenzüberschreitender Bekleidungs-Wiederverkaufsshop mit Wareneinkauf über den chinesischen Marktplatz Poizon.",
        ru: "Небольшой бизнес по продаже компьютерных ковров и клиент, для которого за годы было сделано несколько небольших e-commerce проектов: автоматический оптимизатор цены рекламы, первый недолгий бизнес по перепродаже iPhone, а позже трансграничный магазин одежды с закупкой на китайском маркетплейсе Poizon.",
      },
      tech: {
        en: "Lightweight commerce builds spanning a TDD-built Python pricing service, spreadsheet-tracked inventory in the earliest venture, and a full Next.js storefront with payments and shipping integrations in the later one.",
        de: "Schlanke Commerce-Projekte, von einem testgetrieben entwickelten Python-Preisservice über tabellenbasierten Bestand im frühesten Vorhaben bis zu einem vollständigen Next.js-Shop mit Zahlungs- und Versandintegrationen im späteren.",
        ru: "Лёгкие commerce-проекты — от Python-сервиса ценообразования, разработанного по TDD, через учёт склада в таблице в самом раннем проекте до полноценного магазина на Next.js с платежами и интеграциями доставки в более позднем.",
      },
    },
    credit: {
      name: { en: "Georgiy Sinokhchyan", de: "Georgiy Sinokhchyan", ru: "Георгий Синохчян" },
      role: {
        en: "Founder, egsha",
        de: "Gründer, egsha",
        ru: "Основатель egsha",
      },
      note: {
        en: "Georgiy is egsha — a good friend whose string of small e-commerce ventures over the years gave a space to build things end-to-end, from a pricing algorithm to a full cross-border storefront.",
        de: "Georgiy ist egsha — ein guter Freund, dessen Reihe kleiner E-Commerce-Unternehmungen über die Jahre den Raum bot, Dinge end-to-end zu bauen, von einem Preisalgorithmus bis zu einem vollständigen grenzüberschreitenden Shop.",
        ru: "Георгий и есть egsha — хороший друг, чья череда небольших e-commerce начинаний за эти годы дала возможность строить всё от начала до конца: от алгоритма ценообразования до полноценного трансграничного магазина.",
      },
      linkedinUrl: "https://www.linkedin.com/in/georgiy-sinokhchyan-836107221/",
    },
  },
  {
    name: "WeDo.agency",
    slug: "wedo",
    blurb: {
      hr: {
        en: "WeDo.agency is a remote business consulting and development studio — a one-year engagement covering 13 startups and client projects across AI, e-commerce, and internal tooling.",
        de: "WeDo.agency ist ein Remote-Beratungs- und Entwicklungsstudio für Unternehmen — ein einjähriges Engagement mit 13 Startups und Kundenprojekten aus KI, E-Commerce und internen Tools.",
        ru: "WeDo.agency — удалённая консалтинговая и девелоперская студия — годовое сотрудничество, охватившее 13 стартапов и клиентских проектов в AI, e-commerce и внутренних инструментах.",
      },
      business: {
        en: "A business consulting and development agency running many small, parallel client engagements rather than a single product — from AI-powered tools to e-commerce storefronts to internal ops dashboards.",
        de: "Eine Unternehmensberatungs- und Entwicklungsagentur mit vielen kleinen, parallel laufenden Kundenprojekten statt eines einzelnen Produkts — von KI-gestützten Tools über E-Commerce-Shops bis zu internen Ops-Dashboards.",
        ru: "Консалтинговое и девелоперское агентство, ведущее множество небольших параллельных клиентских проектов вместо одного продукта — от AI-инструментов до e-commerce витрин и внутренних операционных дашбордов.",
      },
      tech: {
        en: "Broad full-stack rotation across Python, Next.js, NestJS, React, Angular, Firebase, and PostgreSQL, shipping a new client project every few weeks.",
        de: "Breite Full-Stack-Rotation über Python, Next.js, NestJS, React, Angular, Firebase und PostgreSQL, alle paar Wochen ein neues Kundenprojekt ausgeliefert.",
        ru: "Широкая full-stack ротация по Python, Next.js, NestJS, React, Angular, Firebase и PostgreSQL, новый клиентский проект выходил каждые несколько недель.",
      },
    },
  },
  {
    name: "dunlimited",
    slug: "dunlimited",
    blurb: {
      hr: {
        en: "dunlimited is Singapore's #1-ranked marketing agency, together with its portfolio of owned brands — commissioned during the WeDo.agency engagement.",
        de: "dunlimited ist die führende Marketingagentur Singapurs samt ihres Portfolios an eigenen Marken — beauftragt im Rahmen des WeDo.agency-Engagements.",
        ru: "dunlimited — маркетинговое агентство №1 в Сингапуре вместе с портфелем собственных брендов — заказчик в рамках сотрудничества через WeDo.agency.",
      },
      business: {
        en: "Singapore's top-ranked marketing agency and its family of owned product brands.",
        de: "Die führende Marketingagentur Singapurs und ihre eigenen Produktmarken.",
        ru: "Ведущее маркетинговое агентство Сингапура и его собственные товарные бренды.",
      },
      tech: {
        en: "Python service work spanning a Gorgias-based Shopify AI support integration, a TripleWhale attribution sync, and a suite of Telegram bots (aiogram + PostgreSQL + Whisper + a Telegram Mini App) with CI/CD to a self-hosted GitHub Actions runner, Grafana monitoring, AWS S3 image storage, and Redis for auth tokens and state.",
        de: "Python-Service-Arbeit über eine Gorgias-basierte Shopify-KI-Support-Integration, eine TripleWhale-Attribution-Synchronisierung und eine Suite von Telegram-Bots (aiogram + PostgreSQL + Whisper + eine Telegram Mini App) mit CI/CD auf einen selbst gehosteten GitHub-Actions-Runner, Grafana-Monitoring, AWS-S3-Bildspeicher und Redis für Auth-Tokens und Status.",
        ru: "Python-сервисы: AI-интеграция поддержки Shopify на базе Gorgias, синхронизация атрибуции с TripleWhale и набор Telegram-ботов (aiogram + PostgreSQL + Whisper + Telegram Mini App) с CI/CD на self-hosted раннер GitHub Actions, мониторингом через Grafana, хранилищем изображений AWS S3 и Redis для токенов авторизации и состояния.",
      },
    },
  },
  {
    name: "Yohan Loshop (own studio)",
    slug: "yohan-loshop",
    blurb: {
      hr: {
        en: "Yohan Loshop is a small custom-development studio he co-founded with friends — a 3-person team taking on paid client work outside their day jobs.",
        de: "Yohan Loshop ist ein kleines, von ihm mit Freunden mitgegründetes Individualentwicklungsstudio — ein 3-köpfiges Team, das neben dem Hauptjob bezahlte Kundenprojekte übernahm.",
        ru: "Yohan Loshop — небольшая студия заказной разработки, сооснованная с друзьями — команда из 3 человек, бравшая оплачиваемые клиентские проекты помимо основной работы.",
      },
      business: {
        en: "A bespoke-development studio he co-founded with friends, taking on client projects on a work-for-hire basis.",
        de: "Ein von ihm mit Freunden mitgegründetes Studio für Individualentwicklung, das Kundenprojekte auf Werkvertragsbasis übernahm.",
        ru: "Студия заказной разработки, сооснованная с друзьями, бравшая клиентские проекты на условиях работы по найму.",
      },
      tech: {
        en: "GatsbyJS-based client sites, evaluating and integrating headless CMS options (Contentful, CosmicJS, DatoCMS) as client requirements grew.",
        de: "Kundenseiten auf Basis von GatsbyJS, mit Evaluierung und Integration von Headless-CMS-Optionen (Contentful, CosmicJS, DatoCMS), als die Kundenanforderungen wuchsen.",
        ru: "Клиентские сайты на GatsbyJS, с оценкой и интеграцией headless CMS (Contentful, CosmicJS, DatoCMS) по мере роста требований клиентов.",
      },
    },
  },
];

export function getCompanyBundle(company?: string): CompanyBundle | undefined {
  return COMPANY_BUNDLES.find((c) => c.name === company);
}

export function getCompanyBundleBySlug(slug: string): CompanyBundle | undefined {
  return COMPANY_BUNDLES.find((c) => c.slug === slug);
}
