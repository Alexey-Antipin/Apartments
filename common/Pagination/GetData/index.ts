import { PropsLimitOfPage } from "../../../ts";
import articles from "../../../mocks/articles.json";

export default async function getData({
  limit,
  page,
}:PropsLimitOfPage) {
  const paginatedProducts = articles.slice(
    (page - 1) * limit,
    page * limit
  );
  return { articles: paginatedProducts, total: articles.length };
}
