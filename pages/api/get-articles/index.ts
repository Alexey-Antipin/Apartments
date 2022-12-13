import { NextApiRequest, NextApiResponse } from "next";
import articles from "../../../mocks/cities/rooms/minsk.json";

const GetArticles = (req: NextApiRequest, res: NextApiResponse) => {
  let { interval } = req.query;
  let number = Number(interval);

  try {
    if (number) {
      let new_articles = articles.slice(0, number);
      res.status(200).json(new_articles);
      return;
    }
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json([]);
  }
};

export default GetArticles;
