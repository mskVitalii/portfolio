export type GalleryOrientation = "landscape" | "portrait";

export type GalleryTag =
  | "travel"
  | "germany"
  | "czechia"
  | "sport"
  | "study"
  | "work"
  | "food"
  | "animals"
  | "concert"
  | "austria"
  | "spain"
  | "netherlands"
  | "chess";

export interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  orientation: GalleryOrientation;
  tags: GalleryTag[];
  /** Vitalii's face is clearly, recognizably visible — eligible for the Tinder deck. */
  hasFace: boolean;
}

/** Hover annotation captions live in messages/{en,de,ru}.json under AboutPage.gallery.captions[id]. */
/** Tag labels live in messages/{en,de,ru}.json under AboutPage.gallery.tags[tag]. */
/** Tinder-mode bios (hasFace photos only) live in messages/{en,de,ru}.json under AboutPage.gallery.tinderBios[id]. */

export const ABOUT_GALLERY: GalleryPhoto[] = [
  // Поход на границу Чехии и Германии #путешествия #Чехия #Германия
  { id: "about-001", src: "/images/about/horizontal/gallery-h-01.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "germany"], hasFace: false },
  // Готовлю блинчики на 4 человека #кулинария
  { id: "about-002", src: "/images/about/horizontal/gallery-h-02.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["food"], hasFace: false },
  // Поход на границу Чехии и Германии #путешествия #Чехия #Германия
  { id: "about-003", src: "/images/about/horizontal/gallery-h-03.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "germany"], hasFace: false },
  // Поход на границу Чехии и Германии #путешествия #Чехия #Германия
  { id: "about-004", src: "/images/about/horizontal/gallery-h-04.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "germany"], hasFace: false },
  // Зоопарк в Хемнице #Германия #животные
  { id: "about-005", src: "/images/about/horizontal/gallery-h-05.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "animals"], hasFace: false },
  // Берлин! #Германия
  { id: "about-006", src: "/images/about/horizontal/gallery-h-06.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Берлин! #Германия
  { id: "about-007", src: "/images/about/horizontal/gallery-h-07.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Саксонская Швейцария #Германия #путешествия
  { id: "about-008", src: "/images/about/horizontal/gallery-h-08.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "travel"], hasFace: false },
  // Саксонская Швейцария #Германия #путешествия
  { id: "about-009", src: "/images/about/horizontal/gallery-h-09.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "travel"], hasFace: false },
  // Саксонская Швейцария #Германия #путешествия
  { id: "about-010", src: "/images/about/horizontal/gallery-h-10.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "travel"], hasFace: false },
  // Велопоход по Саксонии #путешествия #Германия #спорт
  { id: "about-011", src: "/images/about/horizontal/gallery-h-11.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "germany", "sport"], hasFace: false },
  // Велопоход по Саксонии #путешествия #Германия #спорт
  { id: "about-012", src: "/images/about/horizontal/gallery-h-12.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "germany", "sport"], hasFace: false },
  // Концерт Rammstein в Дрездене #Германия #концерт
  { id: "about-013", src: "/images/about/horizontal/gallery-h-13.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "concert"], hasFace: false },
  // Концерт Team Scheisse в Постдаме #Германия #концерт
  { id: "about-014", src: "/images/about/horizontal/gallery-h-14.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "concert"], hasFace: false },
  // Фехтование #Германия #спорт
  { id: "about-015", src: "/images/about/horizontal/gallery-h-15.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "sport"], hasFace: false },
  // Фехтование #Германия #спорт
  { id: "about-016", src: "/images/about/horizontal/gallery-h-16.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "sport"], hasFace: false },
  // Infineon #работа
  { id: "about-017", src: "/images/about/horizontal/gallery-h-17.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["work"], hasFace: false },
  // Австрия #путешествия #Австрия
  { id: "about-018", src: "/images/about/horizontal/gallery-h-18.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "austria"], hasFace: false },
  // Австрия #путешествия #Австрия
  { id: "about-019", src: "/images/about/horizontal/gallery-h-19.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "austria"], hasFace: true },
  // Австрия #путешествия #Австрия
  { id: "about-020", src: "/images/about/horizontal/gallery-h-20.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "austria"], hasFace: false },
  // Австрия #путешествия #Австрия
  { id: "about-021", src: "/images/about/horizontal/gallery-h-21.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "austria"], hasFace: false },
  // Прага #путешествия #Чехия
  { id: "about-022", src: "/images/about/horizontal/gallery-h-22.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia"], hasFace: false },
  // Ательерка архитектурного уника в Праге #путешествия #Чехия
  { id: "about-023", src: "/images/about/horizontal/gallery-h-23.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia"], hasFace: false },
  // Кампус архитектурного уника в Праге #путешествия #Чехия
  { id: "about-024", src: "/images/about/horizontal/gallery-h-24.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia"], hasFace: false },
  // Прага #путешествия #Чехия
  { id: "about-025", src: "/images/about/horizontal/gallery-h-25.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia"], hasFace: false },
  // Прага ярмарка #путешествия #Чехия
  { id: "about-026", src: "/images/about/horizontal/gallery-h-26.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia"], hasFace: false },
  // Прага холм Страхов - подъём к студенческим общагам #путешествия #Чехия
  { id: "about-027", src: "/images/about/horizontal/gallery-h-27.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia"], hasFace: false },
  // Подъём на гору Снежку #путешествия #Чехия #спорт
  { id: "about-028", src: "/images/about/horizontal/gallery-h-28.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "sport"], hasFace: true },
  // Подъём на гору Снежку #путешествия #Чехия #спорт
  { id: "about-029", src: "/images/about/horizontal/gallery-h-29.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "sport"], hasFace: false },
  // Подъём на гору Снежку #путешествия #Чехия #спорт
  { id: "about-030", src: "/images/about/horizontal/gallery-h-30.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "sport"], hasFace: false },
  // Подъём на гору Снежку #путешествия #Чехия #спорт
  { id: "about-031", src: "/images/about/horizontal/gallery-h-31.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "sport"], hasFace: false },
  // Подъём на гору Снежку #путешествия #Чехия #спорт
  { id: "about-032", src: "/images/about/horizontal/gallery-h-32.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "sport"], hasFace: false },
  // Подъём на гору Снежку #путешествия #Чехия #спорт
  { id: "about-033", src: "/images/about/horizontal/gallery-h-33.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "czechia", "sport"], hasFace: false },
  // Испания #путешествия #Испания
  { id: "about-034", src: "/images/about/horizontal/gallery-h-34.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "spain"], hasFace: false },
  // Мадрид #путешествия #Испания
  { id: "about-035", src: "/images/about/horizontal/gallery-h-35.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "spain"], hasFace: false },
  // Мадрид #путешествия #Испания
  { id: "about-036", src: "/images/about/horizontal/gallery-h-36.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "spain"], hasFace: false },
  // Chemnitz Niners #Германия
  { id: "about-037", src: "/images/about/horizontal/gallery-h-37.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Chemnitz Niners #Германия
  { id: "about-038", src: "/images/about/horizontal/gallery-h-38.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Амстердам #путешествия #Нидерланды
  { id: "about-039", src: "/images/about/horizontal/gallery-h-39.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "netherlands"], hasFace: false },
  // Амстердам #путешествия #Нидерланды
  { id: "about-040", src: "/images/about/horizontal/gallery-h-40.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "netherlands"], hasFace: false },
  // Офис Booking #путешествия #Нидерланды
  { id: "about-041", src: "/images/about/horizontal/gallery-h-41.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "netherlands"], hasFace: false },
  // Магистерская #учёба
  { id: "about-042", src: "/images/about/horizontal/gallery-h-42.jpg", width: 1600, height: 1247, orientation: "landscape", tags: ["study"], hasFace: false },
  // Магистерская #учёба
  { id: "about-043", src: "/images/about/horizontal/gallery-h-43.jpg", width: 1600, height: 774, orientation: "landscape", tags: ["study"], hasFace: false },
  // Шоколадная фабрика в Амстердаме #путешествия #Нидерланды
  { id: "about-044", src: "/images/about/horizontal/gallery-h-44.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["travel", "netherlands"], hasFace: false },
  // Infineon я автобус #работа
  { id: "about-045", src: "/images/about/horizontal/gallery-h-45.jpg", width: 1600, height: 898, orientation: "landscape", tags: ["work"], hasFace: false },
  // OZON #работа
  { id: "about-046", src: "/images/about/horizontal/gallery-h-46.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["work"], hasFace: false },
  // OZON #работа
  { id: "about-047", src: "/images/about/horizontal/gallery-h-47.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["work"], hasFace: false },
  // OZON #работа
  { id: "about-048", src: "/images/about/horizontal/gallery-h-48.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["work"], hasFace: false },
  // OZON #работа
  { id: "about-049", src: "/images/about/horizontal/gallery-h-49.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["work"], hasFace: false },
  // Кошка #животные
  { id: "about-050", src: "/images/about/horizontal/gallery-h-50.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["animals"], hasFace: false },
  // Кошка #животные
  { id: "about-051", src: "/images/about/horizontal/gallery-h-51.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["animals"], hasFace: false },
  // Концерт Green Apelsin #концерт
  { id: "about-052", src: "/images/about/horizontal/gallery-h-52.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["concert"], hasFace: false },
  // Минималистичный сетап #работа
  { id: "about-053", src: "/images/about/horizontal/gallery-h-53.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["work"], hasFace: false },
  // Хемниц #Германия
  { id: "about-054", src: "/images/about/horizontal/gallery-h-54.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Голова Карла Маркса в Хемнице #Германия
  { id: "about-055", src: "/images/about/horizontal/gallery-h-55.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: true },
  // Экспериментирую с чаями #Германия
  { id: "about-056", src: "/images/about/horizontal/gallery-h-56.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Хемниц #Германия
  { id: "about-057", src: "/images/about/horizontal/gallery-h-57.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Франкфурт #Германия #путешествия
  { id: "about-058", src: "/images/about/horizontal/gallery-h-58.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany", "travel"], hasFace: false },
  // Озеро Рабенштайн в Хемнице #Германия
  { id: "about-059", src: "/images/about/horizontal/gallery-h-59.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Дрезден галерея старых мастеров #Германия
  { id: "about-060", src: "/images/about/horizontal/gallery-h-60.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["germany"], hasFace: false },
  // Покер #Германия
  { id: "about-061", src: "/images/about/horizontal/gallery-h-61.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Запуск дрона в Чехии #Чехия
  { id: "about-062", src: "/images/about/horizontal/gallery-h-62.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["czechia"], hasFace: false },
  // Infineon #работа
  { id: "about-063", src: "/images/about/horizontal/gallery-h-63.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["work"], hasFace: false },
  // Сетап в Мензе #учёба
  { id: "about-064", src: "/images/about/horizontal/gallery-h-64.jpg", width: 1600, height: 1200, orientation: "landscape", tags: ["study"], hasFace: false },
  // Велосипед за 30 евро #спорт #Германия
  { id: "about-065", src: "/images/about/vertical/gallery-v-01.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "germany"], hasFace: false },
  // Велосипед за 30 евро #спорт #Германия
  { id: "about-066", src: "/images/about/vertical/gallery-v-02.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "germany"], hasFace: false },
  // Велосипед за 30 евро #спорт #Германия
  { id: "about-067", src: "/images/about/vertical/gallery-v-03.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "germany"], hasFace: true },
  // Франкфурт #Германия #путешествия
  { id: "about-068", src: "/images/about/vertical/gallery-v-04.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany", "travel"], hasFace: false },
  // Грибной сезон в Хемнице #Германия #путешествия
  { id: "about-069", src: "/images/about/vertical/gallery-v-05.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany", "travel"], hasFace: false },
  // Буржуйка около Снежки #Чехия #путешествия
  { id: "about-070", src: "/images/about/vertical/gallery-v-06.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["czechia", "travel"], hasFace: false },
  // Павлин посреди улицы в Испании #Испания #путешествия
  { id: "about-071", src: "/images/about/vertical/gallery-v-07.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["spain", "travel"], hasFace: false },
  // Спуск со Снежки #Чехия #путешествия #спорт
  { id: "about-072", src: "/images/about/vertical/gallery-v-08.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["czechia", "travel", "sport"], hasFace: false },
  // Испания #Испания #путешествия
  { id: "about-073", src: "/images/about/vertical/gallery-v-09.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["spain", "travel"], hasFace: false },
  // Испания #Испания #путешествия
  { id: "about-074", src: "/images/about/vertical/gallery-v-10.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["spain", "travel"], hasFace: false },
  // Поход в Саксонский лес #спорт #Германия
  { id: "about-075", src: "/images/about/vertical/gallery-v-11.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "germany"], hasFace: false },
  // Поход в Саксонский лес #спорт #Германия
  { id: "about-076", src: "/images/about/vertical/gallery-v-12.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "germany"], hasFace: false },
  // Дешёвое жильё в Германии #спорт #Германия
  { id: "about-077", src: "/images/about/vertical/gallery-v-13.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "germany"], hasFace: false },
  // Поход в Саксонский лес #спорт #Германия
  { id: "about-078", src: "/images/about/vertical/gallery-v-14.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "germany"], hasFace: false },
  // Экспериментирую со скейтбордом #Германия
  { id: "about-079", src: "/images/about/vertical/gallery-v-15.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Поход в Чехии #спорт #Чехия
  { id: "about-080", src: "/images/about/vertical/gallery-v-16.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["sport", "czechia"], hasFace: false },
  // Экспериментирую со скейтбордом #Германия
  { id: "about-081", src: "/images/about/vertical/gallery-v-17.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Работа в Infineon #работа
  { id: "about-082", src: "/images/about/vertical/gallery-v-18.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["work"], hasFace: false },
  // Кошка #животные
  { id: "about-083", src: "/images/about/vertical/gallery-v-19.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["animals"], hasFace: false },
  // Выпускной бакалавра (я слева) #учёба
  { id: "about-084", src: "/images/about/vertical/gallery-v-20.jpg", width: 1016, height: 1600, orientation: "portrait", tags: ["study"], hasFace: false },
  // Прибытие в Германию #Германия
  { id: "about-085", src: "/images/about/vertical/gallery-v-21.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Блинчики #кулинария
  { id: "about-086", src: "/images/about/vertical/gallery-v-22.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["food"], hasFace: false },
  // Театр #Германия
  { id: "about-087", src: "/images/about/vertical/gallery-v-23.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: true },
  // Гусь на озере #Австрия #животные
  { id: "about-088", src: "/images/about/vertical/gallery-v-24.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["austria", "animals"], hasFace: false },
  // МКС с земли #Германия
  { id: "about-089", src: "/images/about/vertical/gallery-v-25.jpg", width: 739, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Онигири #Германия
  { id: "about-090", src: "/images/about/vertical/gallery-v-26.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Экспериментирую с усами #Германия
  { id: "about-091", src: "/images/about/vertical/gallery-v-27.jpg", width: 1199, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: true },
  // Ночник #Германия
  { id: "about-092", src: "/images/about/vertical/gallery-v-28.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Мой первый блястящий ход
  { id: "about-093", src: "/images/about/vertical/gallery-v-29.jpg", width: 739, height: 1600, orientation: "portrait", tags: ["chess"], hasFace: false },
  // Тотем спокойствия #Германия
  { id: "about-094", src: "/images/about/vertical/gallery-v-30.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
  // Совиный дом #животные
  { id: "about-095", src: "/images/about/vertical/gallery-v-31.jpg", width: 1005, height: 1600, orientation: "portrait", tags: ["animals"], hasFace: false },
  // Совиный дом #животные
  { id: "about-096", src: "/images/about/vertical/gallery-v-32.jpg", width: 1073, height: 1600, orientation: "portrait", tags: ["animals"], hasFace: false },
  // Рамен #кулинария
  { id: "about-097", src: "/images/about/vertical/gallery-v-33.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["food"], hasFace: false },
  // Девайс в Infineon #работа
  { id: "about-098", src: "/images/about/vertical/gallery-v-34.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["work"], hasFace: false },
  // Экспериментирую с массажем #Германия
  { id: "about-099", src: "/images/about/vertical/gallery-v-35.jpg", width: 1200, height: 1600, orientation: "portrait", tags: ["germany"], hasFace: false },
];
