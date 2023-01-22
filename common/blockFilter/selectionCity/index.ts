import { SelectState } from "../../../redux/reducers/selectReducer";
import { cities } from "../../../mocks";

// Выбор города
export const selectionCity = (select: SelectState) => {
  switch (select.filter.city) {
    case 0:
      return cities.minsk;
    case 1:
      return cities.gomel;
    case 2:
      return cities.brest;
    case 3:
      return cities.vitebsk;
    case 4:
      return cities.grodno;
    case 5:
      return cities.mogilev;
    default:
      return cities.minsk;
  }
};
