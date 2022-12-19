import { NextApiRequest, NextApiResponse } from "next";
import articles from "../../../mocks/cities/rooms/minsk.json";
import news from "../../../mocks/articles.json";
import { Article } from "../../../ts";

const GetArticles = (req: NextApiRequest, res: NextApiResponse) => {
  let { interval } = req.query;
  let number = Number(interval);
  let lengthArticles = articles.length;

  try {
    let link_articles: Article[] = news.slice(0, 5);

    let links = link_articles.map((el) => ({
      title: el.title,
      date: el.time,
    }));

    if (number) {
      let new_articles = articles.slice(0, number);
      res.status(200).json({
        items: new_articles,
        lengthItems: lengthArticles,
        news: links,
      });
      return;
    }
    res
      .status(200)
      .json({ items: articles, lengthItems: lengthArticles, news: links });
  } catch (error) {
    res.status(400).json([]);
  }
};

export default GetArticles;
