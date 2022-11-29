import { NextApiResponse, NextApiRequest } from "next";
import { Article, ResponseError } from "../../../ts";
import articles from "../../../mocks/articles.json";

const HandlerArticles = (
  req: NextApiRequest,
  res: NextApiResponse<Article[] | ResponseError>
) => {
  let { rangeMin, rangeMax } = req.query;

  const filtered = articles.slice(Number(rangeMin), Number(rangeMax));

  return filtered.length > 0
    ? res.status(200).json(filtered)
    : res.status(404).json({ message: "Ошибка" });
};

export default HandlerArticles;
