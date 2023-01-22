import { CheckboxState, Object } from "../../../ts";

// Дополнительные опции
export const additionalOptions = (checkbox: CheckboxState) => {
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

  return JSON.stringify(statuses);
};
