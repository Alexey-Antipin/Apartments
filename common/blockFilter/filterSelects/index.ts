import { SelectState } from "../../../redux/reducers/selectReducer";
import { ArticleRoom } from "../../../ts";

// Фильтр спальные места, район, метро
export const filterSelects = (massive: ArticleRoom[], select: SelectState) => {
  // Деструктуризация
  let { places, metro, area } = select.filter;

  // Если не выбрано ничего
  if (!places && !metro && !area) {
    return massive;
  }

  // Если выбраны
  return massive.filter((item) => {
    return (
      (places ? item.places == places : item.places) &&
      (metro ? item.station == metro : item.station) &&
      (area ? item.area == area : item.area)
    );
  });
};
