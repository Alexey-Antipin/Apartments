import { NextApiRequest, NextApiResponse } from "next";
import { writeFile } from "fs";

const CreateAccount = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let { login, email, password } = req.body;

  try {
    writeFile(
      "./mocks/user/users.json",
      JSON.stringify({
        login,
        email,
        password,
      }),
      (err) => {
        if (err) throw "Ошибка!";
      }
    );
    res.status(200).json("Пользователь зарегистрирован!");
  } catch (error) {
    res.status(404).json(error);
  }
};

export default CreateAccount;
