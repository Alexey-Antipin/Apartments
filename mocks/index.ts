import vitebsk from "./cities/rooms/vitebsk.json";
import mogilev from "./cities/rooms/mogilev.json";
import articlesNews from "./news/articles.json";
import grodno from "./cities/rooms/grodno.json";
import gomel from "./cities/rooms/gomel.json";
import brest from "./cities/rooms/brest.json";
import minsk from "./cities/rooms/minsk.json";

type Cities = {
  articlesNews: any[];
  vitebsk: any[];
  mogilev: any[];
  grodno: any[];
  gomel: any[];
  minsk: any[];
  brest: any[];
};

const cities: Cities = {
  vitebsk,
  mogilev,
  grodno,
  gomel,
  minsk,
  brest,
  articlesNews,
};

export { cities };
