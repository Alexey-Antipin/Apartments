import { ArticleRoom, CheckboxState, MoreCheckbox, Object } from "../../../ts";

// Дополнительные опции
export const additionalOptions = (
  massive: ArticleRoom[],
  checkbox: CheckboxState
) => {
  // Ключи
  let keys = checkbox.checkboxForComparison;

  // Список
  let box: Object[] = [
    ...checkbox.checkboxMassive[0].list,
    ...checkbox.checkboxMassive[1].list,
  ];

  // Запись статусов
  let statuses: Array<boolean> = [];

  // Получение статусов
  box.forEach((item) => {
    return statuses.push(item.status);
  });

  // Если в statuses всё false
  if (statuses.includes(true)) {
    // Готовый объект для сравнивания
    let more: MoreCheckbox = {};

    // Создание: ключ - значение
    box.forEach((item, index: number) => {
      more[keys[index]] = item.status;
    });

    // Фильтруем массив
    return massive.filter((item) => {
      return JSON.stringify(item.more) === JSON.stringify(more);
    });
  } else {
    // Иначе возвращаем нетронутый массив
    return massive;
  }
};
