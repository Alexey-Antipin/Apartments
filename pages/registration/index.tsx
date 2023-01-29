import { RegistrationOfFormik } from "../../ts";
import styles from "./Registration.module.scss";
import { Captcha } from "../../common";
import { Sprite } from "../../svg";
import Link from "next/link";
import Head from "next/head";
import * as Yup from "yup";
import {
  redistrationThunk,
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../redux";
import {
  FormikTouched,
  ErrorMessage,
  FormikErrors,
  Formik,
  Field,
  Form,
} from "formik";

type FormikValues = {
  errors: FormikErrors<{ [field: string]: any }>;
  touched: FormikTouched<{ [field: string]: any }>;
  values: RegistrationOfFormik;
};

const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modal, field, text, captchaUnblock } = useAppSelector(
    (state: RootState) => state.registration
  );

  const initialValues: RegistrationOfFormik = {
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationField = Yup.object({
    login: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, "Только латиница и цифры.")
      .min(8, "Не менее 10 знаков.")
      .max(20, "Не более 20 знаков.")
      .required("Обязательное поле!"),
    email: Yup.string()
      .email("Невалидная почта.")
      .required("Обязательное поле!"),
    password: Yup.string()
      .min(10, "Не менее 10 знаков.")
      .max(30, "Не более 30 знаков.")
      .required("Обязательное поле!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают!")
      .required("Обязательное поле!"),
  });

  // Если есть ошибки, будет табличка
  const errorFields = ({ errors, touched, values }: FormikValues) => {
    let answer:boolean = false;
    let keys:string[] = Object.keys(values);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];

      if (errors[key] && touched[key]) {
        answer = true;
        break;
      }
    }

    return answer;
  };

  // Отправка
  const onSubmit = (values: RegistrationOfFormik) => {
    let { login, email, password } = values;
    dispatch(redistrationThunk({ login, email, password }));
  };

  return (
    <div className={styles.background}>
      <Head>
        <title>Регистрация</title>
      </Head>

      {!modal ? (
        <div className={styles.registration}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationField}
            onSubmit={onSubmit}>
            {({ errors, touched, values }: FormikValues) => (
              <Form className={styles.form}>
                <h1 className={styles.title}>Регистрация</h1>
                {/* Поля */}
                {Object.keys(values).map((item, index) => (
                  <label className={styles.block} htmlFor={item} key={index}>
                    <Field
                      className={
                        errors[item] && touched[item]
                          ? styles["input-errors"]
                          : styles.input
                      }
                      placeholder={field.denotation[index]}
                      type={field.type[index]}
                      name={item}
                      id={item}
                    />

                    {/* Иконка */}
                    <div className={styles.icon}>
                      <Sprite id={field.sprite[index]} colour={"#686868"} />
                    </div>

                    {/* Иконка ошибка */}
                    <ErrorMessage name={item}>
                      {() => (
                        <div className={styles["icon-error"]}>
                          <Sprite
                            id="warning"
                            height="20"
                            width="20"
                            colour="#EB5757"
                          />
                        </div>
                      )}
                    </ErrorMessage>

                    {/* Под полем */}
                    <ErrorMessage
                      className={styles.errors}
                      component="div"
                      name={item}
                    />
                  </label>
                ))}

                {/* Ошибка ввода */}
                {errorFields({ errors, touched, values }) && (
                  <div className={styles["button-error"]}>
                    <span className={styles["button-error-text"]}>
                      Ошибка ввода
                    </span>
                    <Sprite
                      id="warning"
                      height="20"
                      width="20"
                      colour="#ffffff80"
                    />
                  </div>
                )}

                {/* Captcha */}
                <Captcha props={{ errors, values }} />

                {/* Зарегистрироваться */}
                <button
                  className={styles.send}
                  disabled={!captchaUnblock}
                  type="submit">
                  Зарегистрироваться
                </button>
              </Form>
            )}
          </Formik>

          <div className={styles["block-text"]}>
            <p className={styles["text-title"]}>Пользователь обязуется:</p>

            <ul>
              {text.map((text: string, index: number) => (
                <li className={styles["text-paragraph"]} key={index}>
                  <span className={styles["text-round"]} />
                  {text}
                </li>
              ))}
            </ul>

            <p className={styles["text-account"]}>
              Уже есть аккаунт?
              <Link className={styles["text-entrance"]} href="/authorization">
                Войдите
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.modal}>
          <h2 className={styles["modal-title"]}>Подтвердите регистрацию</h2>
          <p className={styles["modal-paragraph"]}>
            Письмо для подтверждения аккаунта отправлено почту. Перейдите по
            ссылке, указанной в письме. Если письма нет, то проверьте спам.
          </p>
          <Link className={styles["modal-button"]} href="./">
            Понятно
          </Link>
        </div>
      )}
    </div>
  );
};

export default Registration;
