export type ServiceCategory = {
  id: string;
  name: string;
  subcategories: ServiceSubcategory[];
};

export type ServiceSubcategory = {
  id: string;
  name: string;
  wheelSizes: WheelSizePrice[];
};

export type WheelSizePrice = {
  size: string;
  price: number;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'complex1',
    name: 'Комплекс «Перекидка» (4с/у, 4бл, 4ш/м)',
    subcategories: [
      {
        id: 'sedan',
        name: 'Легковой автомобиль',
        wheelSizes: [
          { size: 'R 12-14', price: 1640 },
          { size: 'R 15-16', price: 2180 },
          { size: 'R 17-18', price: 2400 },
          { size: 'R 19-20', price: 2790 },
          { size: 'R 21+', price: 3280 },
        ],
      },
      {
        id: 'crossover',
        name: 'Кроссовер, Минивен',
        wheelSizes: [
          { size: 'R 13-14', price: 2180 },
          { size: 'R 15-16', price: 2280 },
          { size: 'R 17-18', price: 2840 },
          { size: 'R 19-20', price: 3160 },
          { size: 'R 21+', price: 3440 },
        ],
      },
      {
        id: 'suv',
        name: 'Внедорожник',
        wheelSizes: [
          { size: 'R 13-16', price: 2620 },
          { size: 'R 17-18', price: 3060 },
          { size: 'R 19-20', price: 3480 },
          { size: 'R 21+', price: 3700 },
        ],
      },
      {
        id: 'commercial',
        name: 'Коммерческий транспорт',
        wheelSizes: [
          { size: 'Соболь, УАЗ', price: 2540 },
          { size: 'Газель', price: 3900 },
        ],
      },
    ],
  },
  {
    id: 'complex2',
    name: 'Комплекс «Перекидка в Сборе» (4с/у, 4бл)',
    subcategories: [
      {
        id: 'sedan',
        name: 'Легковой автомобиль',
        wheelSizes: [
          { size: 'R 12-14', price: 1100 },
          { size: 'R 15-16', price: 1480 },
          { size: 'R 17-18', price: 1620 },
          { size: 'R 19-20', price: 1860 },
          { size: 'R 21+', price: 2160 },
        ],
      },
      {
        id: 'crossover',
        name: 'Кроссовер, Минивен',
        wheelSizes: [
          { size: 'R 13-14', price: 1480 },
          { size: 'R 15-16', price: 1520 },
          { size: 'R 17-18', price: 1880 },
          { size: 'R 19-20', price: 2100 },
          { size: 'R 21+', price: 2240 },
        ],
      },
      {
        id: 'suv',
        name: 'Внедорожник',
        wheelSizes: [
          { size: 'R 13-16', price: 1720 },
          { size: 'R 17-18', price: 2000 },
          { size: 'R 19-20', price: 2280 },
          { size: 'R 21+', price: 2420 },
        ],
      },
      {
        id: 'commercial',
        name: 'Коммерческий транспорт',
        wheelSizes: [
          { size: 'Соболь, УАЗ', price: 1680 },
          { size: 'Газель', price: 2140 },
        ],
      },
    ],
  },
  {
    id: 'repair',
    name: 'Комплекс «Ремонт» (с/у, бл, ш/м)',
    subcategories: [
      {
        id: 'sedan',
        name: 'Легковой автомобиль',
        wheelSizes: [
          { size: 'R 12-14', price: 960 },
          { size: 'R 15-16', price: 1095 },
          { size: 'R 17-18', price: 1455 },
          { size: 'R 19-20', price: 1545 },
          { size: 'R 21+', price: 1670 },
        ],
      },
      {
        id: 'crossover',
        name: 'Кроссовер, Минивен',
        wheelSizes: [
          { size: 'R 13-14', price: 1095 },
          { size: 'R 15-16', price: 1120 },
          { size: 'R 17-18', price: 1560 },
          { size: 'R 19-20', price: 1640 },
          { size: 'R 21+', price: 1710 },
        ],
      },
      {
        id: 'suv',
        name: 'Внедорожник',
        wheelSizes: [
          { size: 'R 13-16', price: 1205 },
          { size: 'R 17-18', price: 1615 },
          { size: 'R 19-20', price: 1720 },
          { size: 'R 21+', price: 1775 },
        ],
      },
      {
        id: 'commercial',
        name: 'Коммерческий транспорт',
        wheelSizes: [
          { size: 'Соболь, УАЗ', price: 1185 },
          { size: 'Газель', price: 1185 },
        ],
      },
    ],
  },
  {
    id: 'storage',
    name: 'Сезонное хранение шин (4 шт.)',
    subcategories: [
      {
        id: 'without-disk',
        name: 'Без диска',
        wheelSizes: [
          { size: 'R 12-14', price: 2500 },
          { size: 'R 15-16', price: 3000 },
          { size: 'R 17-18', price: 3500 },
          { size: 'R 19-20', price: 4000 },
          { size: 'R 21+', price: 4500 },
        ],
      },
      {
        id: 'with-disk',
        name: 'С диском',
        wheelSizes: [
          { size: 'R 12-14', price: 2800 },
          { size: 'R 15-16', price: 3400 },
          { size: 'R 17-18', price: 4000 },
          { size: 'R 19-20', price: 4600 },
          { size: 'R 21+', price: 5300 },
        ],
      },
    ],
  },
  {
    id: 'other',
    name: 'Другие услуги',
    subcategories: [
      {
        id: 'repairs',
        name: 'Ремонт',
        wheelSizes: [
          { size: 'Ремонт кордовой R12-16', price: 550 },
          { size: 'Ремонт кордовой R17-24', price: 850 },
          { size: 'Ремонт латкой R12-16', price: 250 },
          { size: 'Ремонт латкой R17-24', price: 390 },
          { size: 'Ремонт жгутом', price: 220 },
          { size: 'Ремонт жгутом без съёма', price: 330 },
        ],
      },
    ],
  },
];
