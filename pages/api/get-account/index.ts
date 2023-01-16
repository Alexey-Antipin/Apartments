import { NextApiRequest, NextApiResponse } from "next";
import user from "../../../mocks/user/users.json";

const GetAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  let { login, password, remember } = req.query;

  if (user.login === login && user.password === password) {
    if (remember == "true") {
      res.status(200).send({ token: user.login, rememberUser: true });
      return;
    }
    res.status(200).send({ token: user.login });
  } else {
    res
      .status(400)
      .json("Неправильный логин или пароль, либо пользователя не существует.");
  }
};

export default GetAccount;
