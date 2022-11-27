import { NextApiRequest, NextApiResponse } from "next";
import user from "../../../mocks/users.json";

const GetAccount = (req: NextApiRequest, res: NextApiResponse) => {
  let { login, password, remember } = req.query;

  if (user.login === login && user.password === password) {
    if (remember == "true") {
      res.status(200).json("true");
      return;
    }
    res.status(200).json("Вход в аккаунт");
  } else {
    res
      .status(400)
      .json("Неправильный логин или пароль, либо пользователя не существует.");
  }
};

export default GetAccount;
