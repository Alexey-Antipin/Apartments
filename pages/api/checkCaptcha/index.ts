import { NextApiRequest, NextApiResponse } from "next";

const CheckCaptcha = (req: NextApiRequest, res: NextApiResponse) => {
  let { captcha, massive } = req.query;

  // Распарсиваем массив и сортируем
  let massiveCheck: number[] = JSON.parse(massive as string);

  // Сортировка
  massiveCheck.sort(function (a, b) {
    return a - b;
  });

  // Выбор капчи
  const captchaMassive = () => {
    switch (captcha as string) {
      case "astronaut":
        return [2, 3, 6, 7, 10, 11];
      case "ladybug":
        return [6, 7, 10, 11];
      case "earth":
        return [2, 3, 6, 7];
      case "tree":
        return [9, 10];
      case "cat":
        return [5, 6];
    }
  };

  // Проверка капчи с массивом
  const captchaCheckOfMassive = () => {
    let answer = captchaMassive() as number[];

    let equals = JSON.stringify(answer) === JSON.stringify(massiveCheck);
    return equals;
  };

  // Получаем ответ
  let response = captchaCheckOfMassive();

  // Посылаем ответ
  res.send(response);
};

export default CheckCaptcha;
