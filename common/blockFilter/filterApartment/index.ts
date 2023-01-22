import { SelectState } from "./../../../redux/reducers/selectReducer";
import { ArticleRoom } from "../../../ts";

// Фильтр Комнаты
export const filterApartment = (
  massive: ArticleRoom[],
  select: SelectState
) => {
  if (!select.filter.rooms) return massive;

  return massive.filter((item) => select.filter.rooms == item.room);
};
