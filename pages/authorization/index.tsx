import {
  authorizationThunk,
  remember,
} from "../../redux/reducers/authorizationReducer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AuthorizationOfFormik } from "../../ts";
import styles from "./Authorization.module.scss";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { Sprite } from "../../svg";
import Link from "next/link";
import * as Yup from "yup";
import clsx from "clsx";

const Authorization: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state:RootState) => state.authorization);

  const initialValues: AuthorizationOfFormik = {
    login: "",
    password: "",
    remember: "false",
  };

  const validationField = Yup.object({
    password: Yup.string().required("Поле обязательно!"),
    login: Yup.string().required("Поле обязательно!"),
  });

  const onSubmit = (values: AuthorizationOfFormik) => {
    let { login, password, remember } = values;

    dispatch(authorizationThunk({ login, password, remember })).then(
      (authorization) => {
        authorization.meta.requestStatus == "fulfilled" &&
          router.push("./");
      }
    );
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
                      errors.password
                        ? styles["error-icons"]
                        : styles.icons
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
                  <label
                    className={styles["label-block"]}
                    htmlFor="switch">
                    <button
                      className={clsx(
                        styles.switch,
                        authorization.remember && styles["switch-on"]
                      )}
                      onClick={() =>
                        dispatch(remember(!authorization.remember))
                      }
                      type="button"
                      id="switch">
                      <div
                        className={clsx(
                          styles.round,
                          authorization.remember && styles["round-on"]
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

          {authorization.error_user && (
            <p className={styles["error-from-server"]}>
              {authorization.error_user}
            </p>
          )}

          <p className={styles.account}>
            Еще нет аккаунта?
            <Link
              className={styles["account-create"]}
              href="/registration">
              Создайте акканут
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
