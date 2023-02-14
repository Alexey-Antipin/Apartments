export const DateArticles = (time: string) => {
  // Все 12 месяцев
  let months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  // Если не пришло
  if (!time) return;

  // Формирование даты
  let date = new Date(time);

  // Создания своего формата даты
  let newDate =
    date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

  // Если ошибка
  if (newDate == "NaN undefined NaN") {
    return time;
  }

  // Возвращаем дату
  return newDate;
};
