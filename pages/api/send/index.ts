import { writeFile } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const HandlerSend = (req: NextApiRequest, res: NextApiResponse) => {
  let { name, email, message } = req.body;

  const goodResponse =
    "Какое-то сообщение о том, " +
    "что письмо отправлено, " +
    "какое-то сообщение, " +
    "что письмо отправлено.";

  const badResponse = "По определенной причине, письмо не отправлено";

  try {
    writeFile(
      "./mocks/message.json",
      JSON.stringify({
        name,
        email,
        message,
      }),
      (err) => {
        if (err) throw "Ошибка!";
      }
    );
    res.status(200).json(goodResponse);
  } catch (error) {
    res.status(404).json(badResponse);
  }
};

export default HandlerSend;
