import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthorizationOfFormik } from "../../ts";
import styles from "./Authorization.module.scss";
import { useRouter } from "next/router";
import { Sprite } from "../../svg";
import Link from "next/link";
import Head from "next/head";
import * as Yup from "yup";
import clsx from "clsx";
import {
  authorizationThunk,
  useAppDispatch,
  useAppSelector,
  accountUser,
  RootState,
} from "../../redux";

const Authorization: React.FC = () => {
  const authorization = useAppSelector(
    (state: RootState) => state.authorization
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValues: AuthorizationOfFormik = {
    remember: false,
    password: "",
    login: "",
  };

  const validationField = Yup.object({
    password: Yup.string().required("Поле обязательно!"),
    login: Yup.string().required("Поле обязательно!"),
  });

  const onSubmit = (values: AuthorizationOfFormik) => {
    let { login, password, remember } = values;

    dispatch(authorizationThunk({ login, password, remember })).then((res) => {
      if (res.meta.requestStatus == "fulfilled") {
        dispatch(accountUser());
        router.push("./");
      }
    });
  };
  return (
    <div className={styles.background}>
      <Head>
        <title>Авторизация</title>
      </Head>

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
            {({ errors, touched, values }) => (
              <Form>
                {/* Логин */}
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

                {/* Пароль */}
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

                {/* Контроль */}
                <div className={styles.control}>
                  <label className={styles["label-block"]} htmlFor="switch">
                    {/* Переключатель */}
                    <Field
                      className={styles["switch-block"]}
                      type="checkbox"
                      name="remember"
                      id="switch"
                    />
                    {/* Поле */}
                    <div
                      className={clsx(
                        styles.switch,
                        values.remember && styles["switch-on"]
                      )}>
                      {/* Круг */}
                      <div
                        className={clsx(
                          styles.round,
                          values.remember && styles["round-on"]
                        )}></div>
                    </div>

                    <div className={styles.remember}>Запомнить меня</div>
                  </label>

                  <Link className={styles.forgot} href="/">
                    Забыли пароль?
                  </Link>
                </div>

                {/* Кнопка */}
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
