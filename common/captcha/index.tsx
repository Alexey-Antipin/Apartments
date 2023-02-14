import { RegistrationOfFormik } from "../../ts";
import { useEffect, useState } from "react";
import styles from "./Captcha.module.scss";
import { FormikErrors } from "formik";
import { Sprite } from "../../svg";
import Image from "next/image";
import {
  confirmDataThunk,
  useAppSelector,
  useAppDispatch,
  toggleCaptcha,
  captchaThunk,
  RootState,
} from "../../redux";

type Props = {
  props: {
    errors: FormikErrors<RegistrationOfFormik>;
    values: RegistrationOfFormik;
  };
};

export const Captcha: React.FC<Props> = ({ props: { errors, values } }) => {
  const { toggle, captcha, captchaId, captchaName, captchaUnblock } =
    useAppSelector((state: RootState) => state.registration);
  const [countOfImages, setCountOfImages] = useState<number[]>([]);
  const [description, setDescription] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // Проверка на пустоту, перед captcha
  useEffect(() => {
    if (isEmpty(values)) return;
    if (JSON.stringify(errors) !== "{}") return;
    setDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  // Разблокировать отправку
  useEffect(() => {
    if (captchaUnblock) {
      dispatch(toggleCaptcha(false)), setDisabled(true);

      let disabledMark = document.getElementById("mark");
      let disabledCheckbox = document.getElementById("checkbox");

      if (disabledCheckbox && disabledMark) {
        disabledMark.classList.add(styles["mark-on"]);
        disabledCheckbox.classList.add(styles["checkbox-active"]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaUnblock]);

  // Проверка на пустоту полей
  const isEmpty = (str: any) => {
    let count = [];

    Object.values(str).forEach((item: any) => {
      if (item.trim() == "") {
        return count.push("true");
      }
    });

    if (count.length > 0) {
      return true;
    }
    return false;
  };

  // Click по капче
  const handleClick = async () => {
    let captcha = document.getElementById("captcha");
    let spinner = document.getElementById("spinner");

    // Если true, закончить функцию
    if (toggle) {
      dispatch(toggleCaptcha(!toggle));
      return;
    }

    animationBox(captcha as Element, spinner as Element);

    await dispatch(captchaThunk({})).then(() => {
      // Переключатель
      dispatch(toggleCaptcha(!toggle));

      setTimeout(() => {
        // Убирание анимаций
        if (spinner && captcha) {
          spinner.classList.remove(styles["button-spinner-active"]);
          captcha.classList.remove(styles["button-active"]);
          spinner.classList.add(styles["button-spinner"]);
        }
      }, 1000);
    });
  };

  // Анимации
  const animationBox = (captcha: Element, spinner: Element) => {
    // Анимация - 1
    if (captcha) {
      captcha.classList.add(styles["button-active"]);
    }

    // Анимация - 2
    setTimeout(() => {
      if (spinner) {
        spinner.classList.remove(styles["button-spinner"]);
        spinner.classList.add(styles["button-spinner-begin"]);
      }
    }, 500);

    // Анимация - 3
    setTimeout(() => {
      if (spinner) {
        spinner.classList.remove(styles["button-spinner-begin"]);
        spinner.classList.add(styles["button-spinner-active"]);
      }
    }, 1000);
  };

  // Click по изображением
  const clickOfImage = (num: number) => {
    let classCaptcha = document.getElementById(`picture-captcha-${num}`)!;
    let classItemCaptcha = document.getElementById(`item-captcha-${num}`)!;

    if (countOfImages.includes(num)) {
      setTimeout(() => {
        classCaptcha.classList.remove(styles["captcha-image"]);
        classItemCaptcha.classList.remove(styles["item-active"]);
      }, 200);
      classCaptcha.classList.add(styles["captcha-image-disabled"]);

      let array = countOfImages.filter((item) => item !== num);
      setCountOfImages(array);
    } else {
      classCaptcha.classList.add(styles["captcha-image"]);
      classItemCaptcha.classList.add(styles["item-active"]);
      classCaptcha.classList.remove(styles["captcha-image-disabled"]);

      setCountOfImages((prev) => [...prev, num]);
    }
  };

  // Подтвердить
  const clickOfConfirm = async () => {
    await dispatch(confirmDataThunk({ countOfImages, captcha })).then((res) => {
      if (res.meta.requestStatus == "rejected") {
        refreshCaptcha();
        countOfImages.forEach((element) => {
          clickOfImage(element);
        });
      }
    });
  };

  // Поменять картинку
  const refreshCaptcha = async () => {
    await dispatch(captchaThunk({ captcha, captchaId }));
    countOfImages.forEach((element) => {
      clickOfImage(element);
    });
    setTimeout(() => {
      setCountOfImages([]);
    }, 500);
  };

  return (
    <div className={styles.captcha}>
      {/* Проверка */}
      {toggle && (
        <div className={styles.container}>
          {/* Текст */}
          <p className={styles.paragraph}>
            {`Выберите все изображения, где есть ${captchaName}.`}
          </p>

          {/* Список */}
          <ul className={styles.list}>
            {[...Array(16)].map((_, index) => (
              <li
                className={styles.item}
                onClick={() => clickOfImage(index + 1)}
                id={`item-captcha-${index + 1}`}
                key={index + 1}>
                <Image
                  src={`/captcha/${captcha}/image_part_${index + 1}.jpg`}
                  id={`picture-captcha-${index + 1}`}
                  alt={`part_${index + 1}`}
                  height={93}
                  width={93}
                />
              </li>
            ))}
          </ul>

          {/* Кнопки */}
          <div className={styles["block-buttons"]}>
            <div className={styles["flex-sprites"]}>
              {/* Обновить картинку */}
              <button
                className={styles["button-control"]}
                onClick={() => refreshCaptcha()}
                type="button">
                <Sprite id="refresh" />
              </button>

              {/* Слушать */}
              <button className={styles["button-control"]} type="button">
                <Sprite id="headphones" />
              </button>

              {/* Описание */}
              <button
                className={styles["button-control"]}
                onClick={() => setDescription(!description)}
                type="button">
                <Sprite id="beacon" />
              </button>
            </div>

            {/* Подтвердить */}
            <button
              className={styles.confirm}
              onClick={() => clickOfConfirm()}
              type="button">
              ПОДТВЕРДИТЬ
            </button>
          </div>

          {/* Описание */}
          {description && (
            <div className={styles.description}>
              Нажмите на все изображения объекта, который упоминается в тексте.
              Если появятся новые подходящие картинки, также нажмите на них.
              Когда нужные изображения кончатся, выберите
              &quot;Подтвердить&quot;.
            </div>
          )}
        </div>
      )}

      {/* Кнопка */}
      <label className={styles.label} htmlFor="captcha">
        <div className={styles["size-toggle"]}>
          <button
            className={styles.button}
            onClick={() => handleClick()}
            disabled={disabled}
            type="button"
            id="captcha"
          />

          {/* Анимация загрузки */}
          <div className={styles["button-spinner"]} id="spinner">
            <Sprite id="spinner" />
          </div>

          {/* Анимация галочки */}
          <>
            <div className={styles.mark} id="mark">
              <Sprite id="checkbox" colour="green" />
            </div>
            <div className={styles.checkbox} id="checkbox" />
          </>
        </div>
        <p className={styles.text}>Я не робот</p>
      </label>

      {/* Ссылки и картинка */}
      <div className={styles["block-right"]}>
        {/* Картинка */}
        <label className={styles.image} htmlFor="captcha">
          <Image
            src="/captcha/captcha.png"
            height={30}
            width={30}
            alt="captcha"
          />
          <p className={styles["text-image"]}>reCAPTCHA</p>
        </label>

        {/* Ссылки */}
        <div className={styles["block-link"]}>
          <a className={styles["text-under"]} href="./">
            Конфиденциальность
          </a>
          <div className={styles["text-under"]}>-</div>
          <a className={styles["text-under"]} href="./">
            Условия использования
          </a>
        </div>
      </div>
    </div>
  );
};
