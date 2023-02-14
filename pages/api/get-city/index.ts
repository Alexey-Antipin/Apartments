import { ArticleRoom, MoreCheckbox } from "../../../ts";
import { NextApiResponse, NextApiRequest } from "next";
import { cities } from "../../../mocks";

// Выбор города
const selectionCity = (select: string) => {
  switch (select) {
    case "0":
      return cities.minsk;
    case "1":
      return cities.gomel;
    case "2":
      return cities.brest;
    case "3":
      return cities.vitebsk;
    case "4":
      return cities.grodno;
    case "5":
      return cities.mogilev;
    default:
      return cities.minsk;
  }
};

// Фильтр цен
const filterPrice = (
  massive: ArticleRoom[],
  priceMin: string,
  priceMax: string
) => {
  return massive.filter(
    (item) => +priceMin <= +item.price && +item.price <= +priceMax
  );
};

// Фильтр Комнаты
const filterApartment = (massive: ArticleRoom[], rooms: string) => {
  let room: number = Number(rooms);

  if (!room) return massive;

  return massive.filter((item) => room == item.room);
};

// Фильтр спальные места, район, метро
const filterSelects = (
  massive: ArticleRoom[],
  places: string,
  metro: string,
  area: string
) => {
  // Если не выбрано ничего
  if (!places && !metro && !area) {
    return massive;
  }

  // Если выбраны
  return massive.filter((item) => {
    return (
      (places ? item.places == places : item.places) &&
      (metro ? item.station == metro : item.station) &&
      (area ? item.area == area : item.area)
    );
  });
};

// Дополнительные опции
const additionalOptions = (
  massive: ArticleRoom[],
  statuses: Array<boolean>
) => {
  // Ключи
  let keys = [
    "gasCooker",
    "oven",
    "coffeeMaker",
    "microwave",
    "dishes",
    "dishwasher",
    "tv",
    "teapot",
    "refrigerator",
    "broom",
    "food",
    "water",
  ];

  // Если в statuses есть true
  if (statuses.includes(true)) {
    // Готовый объект для сравнивания
    let more: MoreCheckbox = {};

    // Создание: ключ - значение
    statuses.forEach((item, index: number) => {
      more[keys[index]] = item;
    });

    // Фильтруем массив
    return massive.filter((item) => {
      return JSON.stringify(item.more) === JSON.stringify(more);
    });
  } else {
    // Иначе возвращаем нетронутый массив
    return massive;
  }
};

const GetCity = (req: NextApiRequest, res: NextApiResponse) => {
  const { city, priceMin, priceMax, rooms, places, metro, area, statuses } =
    req.query;
  let massiveStatuses = JSON.parse(statuses as string);

  // Фильтр города
  const cities = selectionCity(city as string);

  // Фильтр цен
  const arrayPrice = filterPrice(
    cities,
    priceMin as string,
    priceMax as string
  );

  // Фильтр Комнаты
  const arrayApartment = filterApartment(arrayPrice, rooms as string);

  // Фильтр спальные места, район, метро
  const arrayRestOfElements = filterSelects(
    arrayApartment,
    places as string,
    metro as string,
    area as string
  );

  // Дополнительные опции
  const options = additionalOptions(
    arrayRestOfElements,
    massiveStatuses as Array<boolean>
  );

  return res.status(200).send(options);
};

export default GetCity;
