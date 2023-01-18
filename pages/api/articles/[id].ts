import { NextApiResponse, NextApiRequest } from "next";
import { Article, ResponseError } from "../../../ts";
import { cities } from "../../../mocks";

type Articles = { articles: Article[]; articleCurrent: Article[] };

const HandlerArticles = (
  req: NextApiRequest,
  res: NextApiResponse< Articles | ResponseError>
) => {
  let id: number = Number(req.query.id);

  let min: number = id - 1;
  let max: number = min + 4;

  let lengthAllArticles = cities.articlesNews.length;

  if (max >= lengthAllArticles) {
    let articles = cities.articlesNews.slice(
      lengthAllArticles - 3,
      lengthAllArticles
    );
    let articleCurrent = cities.articlesNews[lengthAllArticles - 1];
    return res.status(200).send({ articles, articleCurrent });
  }

  let articleCurrent = cities.articlesNews[min];
  let articles = cities.articlesNews.slice(min + 1, max);

  return res.status(200).send({ articles, articleCurrent });
};

export default HandlerArticles;
