import { NextApiResponse, NextApiRequest } from "next";
import { DateArticles } from "../../../common/date";
import { cities } from "../../../mocks";

type Articles = { articles: Object[] };

type Object = { id: number; title: string; time: string };

const HandlerArticles = (
  req: NextApiRequest,
  res: NextApiResponse<Articles>
) => {
  let array = cities.articlesNews.slice(0, 5);

  let massive = array.map((elem) => {
    let time = DateArticles(elem.time) as string;

    return { id: elem.id, title: elem.title, time: time };
  });

  return res.status(200).send({ articles: massive });
};

export default HandlerArticles;
