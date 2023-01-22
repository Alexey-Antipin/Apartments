import { SelectState } from "../../../redux/reducers/selectReducer";
import { ArticleRoom } from "../../../ts";

// Фильтр цен
export const filterPrice = (massive: ArticleRoom[], select: SelectState) => {
  return massive.filter(
    (item) =>
      +select.filter.priceMin <= +item.price &&
      +item.price <= +select.filter.priceMax
  );
};
