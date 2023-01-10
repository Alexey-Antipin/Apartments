import { PropsLimitOfPage } from "../../../ts";

export default  function getData({
  limit,
  array,
  page,
}:PropsLimitOfPage) {

  const paginatedProducts = array.slice(
    (page - 1) * limit,
    page * limit
  );
  return { articles: paginatedProducts, total: array.length };
}
