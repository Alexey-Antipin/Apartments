import { PropsLimitOfPage } from "../../../ts";

export default async function getData({
  limit,
  array,
  page,
}:PropsLimitOfPage) {
  console.log(array)

  const paginatedProducts = array.slice(
    (page - 1) * limit,
    page * limit
  );
  return { articles: paginatedProducts, total: array.length };
}
