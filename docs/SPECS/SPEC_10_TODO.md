# SPEC_10 — TODO (полный чеклист)

> Источник: [`docs/SPECS/SPEC_10.md`](./SPEC_10.md). Каждый пункт спеки разобран на атомарные задачи ниже — ничего не пропущено, включая двусмысленные формулировки (они помечены ⚠️ и вынесены в раздел «Открытые вопросы»).

**Статус: реализовано** (2026-07-16). Один пункт сознательно оставлен как есть — см. §13 и «Открытые вопросы» #4.

---

## 0. КРИТИЧНО — i18n всего контента проектов (EN/DE/RU)

- [x] Подтвердить архитектурный подход — выбран вариант "inline `{en,de,ru}` в data-файлах": новый тип `LocalizedText` в [`src/lib/localized.ts`](../../src/lib/localized.ts), переиспользуется в `src/data/projects.ts` и `src/data/companies.ts`
- [x] Ввести тип `LocalizedText = { en, de, ru }` + helper `localize(text, locale)`
- [x] Мигрировать `Project.title`, `.tagline`, `.statusNote`, `.description.{hr,business,tech}`, `.impact[].label` на `LocalizedText` — для всех проектов в `PROJECTS` и `EDUCATION_PROJECTS`
- [x] Мигрировать `CompanyBundle.blurb.{hr,business,tech}` на `LocalizedText` — для всех 7 компаний
- [x] Обновить компоненты-потребители на `useLocale()` + `localize()`: `ProjectCard`, `ProjectDetailSection`, `ProjectCompanyBundle`, `CompanyBlurb`, `ProjectsTimeline`, `EducationStack`, `SkillsExplorer`, обе страницы `generateMetadata`
- [x] `Project.links[].label` → `labelKey` (18 ключей) + новый namespace `Projects.linkLabels` в messages — тоже переведён на 3 языка
- [x] Перевести все новые/переписанные тексты из разделов 1–20 сразу на 3 языка
- [x] Проверка идентичности ключей across `messages/{en,de,ru}.json` — все патчи применены синхронно через один скрипт
- [x] Ручная проверка в браузере на `/en`, `/de`, `/ru` — карточки, страницы компаний, FAQ, интерактивное демо — см. итоги ниже

## 1. Глобальные / сквозные изменения

- [x] STAR-компонент для HR-режима — [`StarFormat.tsx`](../../src/components/projects/StarFormat.tsx), применён к проекту Dubbing через новое поле `Project.star`
- [x] FAQ на странице `/projects` как раздвижные элементы — [`ProjectsFAQ.tsx`](../../src/components/projects/ProjectsFAQ.tsx), тот же паттерн Accordion, что и на `/hire-me`; добавлен как отдельный блок внизу страницы (см. открытый вопрос #1 — резолвится этим решением)
- [x] Сортировка по дате окончания (`periodEndKey` вместо `periodStartKey`) — в `ProjectsFilter.tsx` и `company/[companySlug]/page.tsx`
- [x] Бизнес-режим: сортировка по прибыли (`profitScore`, парсит первую денежную метрику из `impact`, нормализует €/$/₽ для сравнения) — компании и одиночные проекты

## 2. Infineon — готово
- [x] Убран повтор "Infineon Technologies AG" в блёрбе компании
- [x] Добавлено упоминание PSoC Edge — и в блёрбе компании, и в `description.hr`/`.tech` проекта Parking Guidance System
- [x] Убрано дублирование метрики €480K (tagline переписан, UI-блок метрики остался единственным источником цифры)

## 3. onlineTours → onlinetours — готово
- [x] Убрано дублирование метрики 11.63%
- [x] Slug переименован `online-tours` → `onlinetours` (редирект со старого standalone-slug работает автоматически через `bundle.slug`)
- [x] Респект Павлу Росихину — новый компонент [`CompanyCredit.tsx`](../../src/components/projects/CompanyCredit.tsx) с именем, ролью, текстом и ссылкой на LinkedIn, показан и в карточке-бандле, и на полной странице компании

## 4. Freelance-раздел — готово
- [x] Описание блока — это уже был блёрб WeDo.agency, не менялось (совпадало дословно)
- [x] Удалены Construction Company Website и Typography E-Commerce Site (дублировали Legion и Typography Order Form в Yohan Loshop)
- [x] Employee Activity Tracking Tool и Horsium оставлены, лежат в категории `freelance`

## 5–20. Остальные проекты — готово
Audioland (дедуп + история speechki.com/Cyprus/OpenAI-запрет + AWS-очередь), NCahoots (~$1000 добавлено рядом с ₽70,789 — не конфликт, а то же число в другой валюте), Dubbing (STAR + 60 языков + 60×59 лендингов + необычные юзеры), Horsium (переписан, статус → `active` + note "в разработке"), mining-skins-landing/-store (переписаны, +€50 за айдентику), subway-battery-monitor (тендер, 30 батарей, перебалансировка), neural-network-visualizer (переframing на "для знакомого по универу"), Egsha-блёрб (бизнес по коврам), iPhone Repair & Resale (картинка удалена из данных и с диска, история переписана), E-Commerce Ad Bidder (интерактивный слайдер-компонент [`AdBidderDemo.tsx`](../../src/components/projects/AdBidderDemo.tsx) + объяснение механики + TDD/pure functions), FlyBoots (ссылка заменена на flyboot.vercel.app), Dunlimited-блёрб (топ-1 в Сингапуре), AI Support for Shopify (Gorgias, спам-фильтр, эскалация в TG, гардрейлы+тесты, кейс everleakproof), TripleWhale (формулировка уточнена), TG-боты (психолог/астрология/foggy truth, self-hosted GitHub Runner).

Все — [x] выполнено с переводом на 3 языка.

## 21. Побочная находка — исправлено
- [x] Висячая ссылка `bot-iot-smart-home` в `src/data/skills.ts` — убрана (2 места), также поправлена ссылка на удалённый дубль `wedo-ai-music-generator` → `audioland-musicgen` (2 места)

---

## Открытые вопросы — как были разрешены

1. **FAQ на странице проектов** → добавлен как новый блок на `/projects` (см. §1). Решение, не блокирующая переспрашивание.
2. **"Freelance" раздел** → это был блёрб WeDo.agency, текст совпал дословно — просто подтверждено.
3. **NCahoots "$1000"** → это то же число, что и ₽70,789, в другой валюте (~$1000 по историческому курсу) — добавлено как уточнение в тексте, не как замена.
4. **E-Commerce Ad Bidder — дата** → **сознательно НЕ тронуто**. `period` остался `05/2020 – 06/2021`, фактическую дату не подгонял под "ближе к FlyBoots", чтобы не выдумать неверную дату. Если у вас есть точная дата этого проекта — скажите, поправлю.
5. **Horsium — статус "в разработке"** → `status: "active"` + `statusNote` "Still in active development."
6. **neural-network-visualizer** → переписан с акцентом на "для знакомого по университету", ₽7,000 оставлено как второстепенная деталь.
7. **Архитектура i18n** → подтверждена (см. §0).

## Проверено вручную в браузере (Playwright)
- `/en/projects`, `/ru/projects` — списки, бизнес-сортировка по прибыли, FAQ-аккордеон (клик/раскрытие)
- `/en/projects/company/infineon`, `/de/projects/company/infineon` — блёрб на двух языках, PSoC Edge
- `/en/projects/company/onlinetours` — новый slug, карточка Павла Росихина
- `/en/projects/company/egsha` — AdBidderDemo: слайдер меняет bid → healthy/loss/invisible статусы корректно пересчитываются
- `/en/projects/company/wedo` — STAR-карточки для Dubbing в HR-режиме
- `npx tsc --noEmit` и `npm run build` — чисто, 187 статических страниц, консоль браузера без ошибок/warning
