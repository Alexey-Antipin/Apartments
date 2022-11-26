import { NextApiRequest, NextApiResponse } from "next";
import articles from "../../../mocks/articles.json";
import { Article, ResponseError } from "../../../ts";

const HandlerArticlesId = (
  req: NextApiRequest,
  res: NextApiResponse<Article | ResponseError>
) => {
  const { id } = req.query;
  const filtered = articles.filter((elem) => elem.id === id);

  return filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res.status(404).json({ message: `Пользователь: ${id} не найден.` });
};

export default HandlerArticlesId;
