import { Network, ContactsOfField, Icon, ResetForm } from "../../ts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RootState } from "../../redux/store";
import styles from "./Contacts.module.scss";
import { Sprite } from "../../svg";
import * as Yup from "yup";
import clsx from "clsx";
import {
  contactsThunk,
  closeModal,
  openModal,
} from "../../redux/reducers/contactsReducer";

const Contacts: React.FC = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state: RootState) => state.contacts);

  const icon: Icon[] = [
    { name: "sign", colour: "#FFFFFF", width: "12", height: "15" },
    { name: "mobile", colour: "#FFFFFF", width: "12", height: "15" },
    { name: "email", colour: "#FFFFFF", width: "12", height: "15" },
    { name: "clock", colour: "#FFFFFF", width: "12", height: "15" },
  ];
  const network: Network[] = [
    { name: "viber", href: "https://www.viber.com/ru/" },
    { name: "telegram", href: "https://web.telegram.org/?legacy=1" },
    { name: "whatsapp", href: "https://www.whatsapp.com/?lang=ru" },
  ];
  const socialNetwork: Network[] = [
    { name: "instagram", href: "https://www.instagram.com/" },
    { name: "vk", href: "https://vk.com/" },
    { name: "facebook", href: "https://ru-ru.facebook.com/" },
  ];
  const initialValues: ContactsOfField = {
    name: "",
    email: "",
    message: "",
  };
  const validationField = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z]*$/, "Только латиница.")
      .required("Поле обязательно!"),
    email: Yup.string()
      .email("Невалидная почта!")
      .required("Поле обязательно!"),
    message: Yup.string()
      .min(25, "Минимум 25 символов!")
      .required("Поле обязательно!"),
  });

  const onSubmit = async (
    values: ContactsOfField,
    { resetForm }: ResetForm
  ) => {
    let { name, email, message } = values;
    dispatch(contactsThunk({ name, email, message }));
    dispatch(openModal());
    resetForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.call}>
        <h1 className={styles["call-title"]}>Контакты</h1>

        <p className={styles["call-paragraph"]}>
          Если у Вас есть пожелания, предложения или претензии по
          организации работы сайта мы всегда рады услышать Ваше мнение.
        </p>

        <div className={styles["call-block"]}>
          <div className={styles["call-block-icons"]}>
            {icon.map((elem, index) => (
              <div key={index} className={styles["call-icons"]}>
                <Sprite
                  id={elem.name}
                  colour={elem.colour}
                  width={elem.width}
                  height={elem.height}
                />
              </div>
            ))}
          </div>

          <address className={styles.address}>
            <p>220068, РБ, г. Минск, ул. Осипенко, 21, кв.23</p>

            <div className={styles["telefon-block"]}>
              <a className={styles.telefon} href="tel:+375296214833">
                +375 29 621-48-33
              </a>
              {network.map((elem, index) => (
                <a
                  className={styles["telefon-icons"]}
                  href={elem.href}
                  key={index}>
                  <Sprite id={elem.name} colour="#FFFFFF" />
                </a>
              ))}
            </div>

            <a className={styles.mail} href="mailto:sdaem@sdaem.by">
              sdaem@sdaem.by
            </a>

            <time dateTime="08:00-22:00">
              <span className={styles.time}>Режим работы:</span>{" "}
              08:00-22:00
            </time>
          </address>
        </div>

        <p className={styles.info}>
          ИП Шушкевич Андрей Викторович <br /> УНП 192602485 Минским
          горисполкомом 10.02.2016
        </p>

        <div className={styles.warning}>
          <Sprite id="warning" />
          <p className={styles["warning-text"]}>
            Администрация сайта не владеет информацией о наличии свободных
            квартир
          </p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationField}
        onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className={styles.contacts}>
            {/* Input */}
            <div className={styles["block-input"]}>
              <label className={styles.label} htmlFor="name">
                <h3 className={styles.title}>Ваше имя</h3>
                <Field
                  className={clsx(
                    errors.name && touched.name && styles["block-error"],
                    styles.input
                  )}
                  placeholder="Введите"
                  name="name"
                  type="text"
                  id="name"
                />
                <div
                  className={clsx(
                    errors.name && touched.name && styles["sprite-error"],
                    styles.sprite
                  )}>
                  <Sprite id="user" colour="#686868" />
                </div>
                <ErrorMessage
                  className={styles["message-error"]}
                  component="div"
                  name="name"
                />
              </label>

              <label className={styles.label} htmlFor="email">
                <h3 className={styles.title}>Ваша электронная почта</h3>
                <Field
                  className={clsx(
                    errors.email && touched.email && styles["block-error"],
                    styles.input
                  )}
                  placeholder="Введите"
                  name="email"
                  type="email"
                  id="email"
                />
                <div
                  className={clsx(
                    errors.name && touched.name && styles["sprite-error"],
                    styles.sprite
                  )}>
                  <Sprite id="email" colour="#686868" />
                </div>
                <ErrorMessage
                  className={styles["message-error"]}
                  component="div"
                  name="email"
                />
              </label>
            </div>

            {/* Textarea */}
            <h3 className={styles.title}>Ваше сообщение</h3>
            <Field
              className={clsx(
                errors.message && touched.message && styles["block-error"],
                styles.textarea
              )}
              placeholder="Сообщение"
              name="message"
              as="textarea"
            />
            <ErrorMessage
              className={styles["message-error"]}
              component="div"
              name="message"
            />

            {/* Send */}
            <button type="submit" className={styles.send}>
              Отправить
            </button>
          </Form>
        )}
      </Formik>

      {/* modal window */}
      {contacts.modal && (
        <>
          <div className={styles.background}></div>
          <div className={styles.modal}>
            <h2 className={styles["modal-title"]}>
              Ваше письмо отправлено!
            </h2>

            <p className={styles["modal-text"]}>
              {contacts.messageOfSend}
            </p>

            <button
              type="button"
              className={styles["modal-button"]}
              onClick={() => dispatch(closeModal())}>
              Закрыть окно
            </button>
          </div>
        </>
      )}

      <div className={styles.combine}>
        {socialNetwork.map((elem, index) => (
          <a className={styles.icon} href={elem.href} key={index}>
            <Sprite id={elem.name} colour="#FFFFFF" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
