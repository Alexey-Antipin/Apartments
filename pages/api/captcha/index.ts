import { NextApiRequest, NextApiResponse } from "next";

const Captcha = (req: NextApiRequest, res: NextApiResponse) => {
  let { captcha, captchaId } = req.query;

  let name = captcha as string;
  let id = captchaId as unknown as number;

  // Рандомное число
  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  // Массив
  let massive = [
    { id: 1, text: "КОСМОНАВТ", captcha: "astronaut" },
    { id: 2, text: "КОШКА", captcha: "cat" },
    { id: 3, text: "ЗЕМЛЯ", captcha: "earth" },
    { id: 4, text: "БОЖЬЯ КОРОВКА", captcha: "ladybug" },
    { id: 5, text: "ДЕРЕВО", captcha: "tree" },
  ];

  // Логика
  function logic() {
    if (!name) {
      let randomChoice = randomInteger(0, 4);
      return randomChoice;
    }
    if (name === massive[id - 1].captcha) {
      return AnotherNumber();
    }
    //  Интервал рандомного числа
    let randomChoice = randomInteger(0, 4);
    return randomChoice;
  }

  // Меняем рандомное число
  function AnotherNumber() {
    let cycle = true;

    while (cycle) {
      let randomChoice = randomInteger(0, 4);
      if (name !== massive[randomChoice].captcha) {
        cycle = false;
        return randomChoice;
      }
    }
  }

  // Получаем число
  let indexMassive = logic() as number;

  // Отправка
  res.send({
    captchaName: massive[indexMassive].text,
    captcha: massive[indexMassive].captcha,
    captchaId: massive[indexMassive].id,
  });
};

export default Captcha;
