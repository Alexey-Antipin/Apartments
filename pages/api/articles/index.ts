import { NextApiResponse, NextApiRequest } from "next";
import articles from "../../../mocks/articles.json";
import { Article, ResponseError } from "../../../ts";

const HandlerArticles = (
  req: NextApiRequest,
  res: NextApiResponse<Article[] | ResponseError>
) => {
  let { id, begin, end } = req.query;

  const elemBegin = Number(begin);
  const elemEnd = Number(end);

  const filteredById = articles.filter((elem) => elem.id !== id);

  const filtered = filteredById.slice(elemBegin, elemEnd);

  return filtered.length > 0
    ? res.status(200).json(filtered)
    : res.status(404).json({ message: `Пользователь: ${id} не найден.` });
};

export default HandlerArticles;
