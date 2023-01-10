import { NextApiResponse, NextApiRequest } from "next";
import { Article, ResponseError } from "../../../ts";
import {cities} from "../../../mocks";

const HandlerArticles = (
  req: NextApiRequest,
  res: NextApiResponse<Article[] | ResponseError>
) => {
  let { rangeMin, rangeMax } = req.query;

  const filtered = cities.articlesNews.slice(Number(rangeMin), Number(rangeMax));

  return filtered.length > 0
    ? res.status(200).json(filtered)
    : res.status(404).json({ message: "Ошибка" });
};

export default HandlerArticles;
