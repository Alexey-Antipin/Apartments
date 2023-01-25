import styles from "./Captcha.module.scss";
import { useState } from "react";
import Image from "next/image";
import { Sprite } from "../../svg";

export const Captcha = () => {
  const [toggle, settoggle] = useState<boolean>(false);

  const handleClick = () => {
    settoggle(!toggle);
  };

  const clickOfImage = () => {};

  return (
    <div className={styles.captcha}>
      {/* Проверка */}
      {toggle && (
        <div className={styles.container}>
          {/* Текст */}
          <p className={styles.paragraph}>
            Выберите все изображения, где есть дорожные знаки.
          </p>

          {/* Список */}
          <ul className={styles.list}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
              (item) => (
                <li
                  className={styles.item}
                  key={item}
                  onClick={() => clickOfImage()}></li>
              )
            )}
          </ul>

          {/* Кнопки */}
          <div className={styles["block-buttons"]}>
            <div className={styles["flex-sprites"]}>
              <Sprite id="refresh" />
              <Sprite id="headphones" />
              <Sprite id="beacon" />
            </div>
            <button className={styles.confirm}>ПОДТВЕРДИТЬ</button>
          </div>
        </div>
      )}

      {/* Кнопка */}
      <label className={styles.label} htmlFor="captcha">
        <button
          className={styles.button}
          onClick={() => handleClick()}
          type="button"
          id="captcha"
        />
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
            Конфиденциальность -
          </a>
          <a className={styles["text-under"]} href="./">
            Условия использования
          </a>
        </div>
      </div>
    </div>
  );
};
