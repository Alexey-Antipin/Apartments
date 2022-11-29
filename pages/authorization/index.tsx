import { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Authorization.module.scss";
import { AuthorizationOfFormik } from "../../ts";
import { Sprite } from "../../svg";
import Link from "next/link";
import * as Yup from "yup";
import axios from "axios";
import clsx from "clsx";

const Authorization: React.FC = () => {
  const router = useRouter();
  const [remember, setRemember] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<string>("");

  const initialValues: AuthorizationOfFormik = {
    login: "",
    password: "",
  };

  const validationField = Yup.object({
    password: Yup.string().required("Поле обязательно!"),
    login: Yup.string().required("Поле обязательно!"),
  });

  const onSubmit = async (values: AuthorizationOfFormik) => {
    let { login, password } = values;

    await axios
      .get('http://localhost:3000/api/get-account/', {
        params: { login, password, remember },
      })
      .then((res) => {
        if (res.data.rememberUser == "true") {
          document.cookie = `user=${res.data[0]}; max-age=10800`;
        } else {
          document.cookie = `user=${res.data[0]};`;
        }
        router.push("./");
      })
      .catch((error) => setErrorUser(error.response.data));
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.authorization}>
          <h1 className={styles.title}>Авторизация</h1>

          <p className={styles.paragraph}>
            Авторизируйтесь, чтобы начать публиковать свои объявления
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationField}
            onSubmit={onSubmit}>
            {({ errors, touched }) => (
              <Form>
                <label htmlFor="login" className={styles.position}>
                  <Field
                    className={clsx(
                      errors.login &&
                        touched.login &&
                        styles["formik-error-block"],
                      styles.input
                    )}
                    placeholder="Логин"
                    name="login"
                    id="login"
                  />
                  <span
                    className={
                      errors.login ? styles["error-icons"] : styles.icons
                    }>
                    <Sprite id="user" colour="#686868" />
                  </span>
                </label>
                <ErrorMessage
                  className={styles["formik-error"]}
                  component="div"
                  name="login"
                />

                <label htmlFor="password" className={styles.position}>
                  <Field
                    className={clsx(
                      errors.password &&
                        touched.password &&
                        styles["formik-error-block"],
                      styles.input
                    )}
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    id="password"
                  />
                  <span
                    className={
                      errors.password ? styles["error-icons"] : styles.icons
                    }>
                    <Sprite id="lock" colour="#686868" />
                  </span>
                </label>
                <ErrorMessage
                  className={styles["formik-error"]}
                  component="div"
                  name="password"
                />

                <div className={styles.control}>
                  <label className={styles["label-block"]} htmlFor="switch">
                    <button
                      className={clsx(
                        styles.switch,
                        remember && styles["switch-on"]
                      )}
                      onClick={() => setRemember(!remember)}
                      type="button"
                      id="switch">
                      <div
                        className={clsx(
                          styles.round,
                          remember && styles["round-on"]
                        )}></div>
                    </button>

                    <div className={styles.remember}>Запомнить меня</div>
                  </label>

                  <Link className={styles.forgot} href="/">
                    Забыли пароль?
                  </Link>
                </div>

                <button className={styles.entrance} type="submit">
                  Войти
                </button>
              </Form>
            )}
          </Formik>

          {errorUser && (
            <p className={styles["error-from-server"]}>{errorUser}</p>
          )}

          <p className={styles.account}>
            Еще нет аккаунта?
            <Link className={styles["account-create"]} href="/registration">
              Создайте акканут
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
