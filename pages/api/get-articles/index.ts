import { NextApiRequest, NextApiResponse } from "next";
import articles from "../../../mocks/cities/rooms/minsk.json";

const GetArticles = (req: NextApiRequest, res: NextApiResponse) => {
  let { interval } = req.query;
  let number = Number(interval);
  let lengthArticles = articles.length;

  try {
    if (number) {
      let new_articles = articles.slice(0, number);
      res
        .status(200)
        .json({ items: new_articles, lengthItems: lengthArticles });
      return;
    }
    res.status(200).json({ items: articles, lengthItems: lengthArticles });
  } catch (error) {
    res.status(400).json([]);
  }
};

export default GetArticles;
