import { NextApiResponse, NextApiRequest } from "next";
import articles from "../../../mocks/articles.json";
import { Article } from "../../../ts";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Article[]>
) {
  return res.status(200).json(articles);
}
