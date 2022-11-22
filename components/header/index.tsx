import { useState } from "react";
import { MassiveOfList } from "../../ts";
import { Sprite } from "../../svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import clsx from "clsx";

export const Header: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(0);
  const link: MassiveOfList[] = [
    { id: 1, text: "Главная" },
    { id: 2, text: "Новости" },
    { id: 3, text: "Размещение и тарифы" },
    {
      id: 4,
      text: "Объявления на карте",
      sprite: "sign",
    },
    { id: 5, text: "Контакты" },
  ];
  const listRight: MassiveOfList[] = [
    { id: 1, text: "Закладки" },
    {
      id: 2,
      text: "Вход и регистрация",
      sprite: "heart",
    },
  ];
  const underList: MassiveOfList[] = [
    {
      id: 6,
      text: "Квартиры на сутки",
      sprite: "sign",
    },
    { id: 7, text: "Коттеджи и усадьбы" },
    { id: 8, text: "Бани и Сауны" },
    { id: 9, text: "Авто напрокат" },
  ];

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          {link.map((elem, index) => (
            <li
              className={styles.item}
              onClick={() => setActiveId(elem.id)}
              key={index}>
              <Link
                className={clsx(
                  styles.text,
                  activeId === elem.id && styles["text--active"]
                )}
                href={"./"}>
                {elem.sprite && (
                  <span className={styles["sprite-margin"]}>
                    <Sprite
                      id={elem.sprite}
                      colour={activeId === elem.id ? "black" : "#8291a3"}
                    />
                  </span>
                )}
                {elem.text}
              </Link>
              <div
                className={clsx(
                  styles.focus,
                  activeId === elem.id && styles["focus--active"]
                )}></div>
            </li>
          ))}
        </ul>

        <ul className={styles["list-size"]}>
          {listRight.map((elem, index) => (
            <li key={index}>
              <Link
                className={clsx(
                  styles.login,
                  index === 1
                    ? styles["login-colour"]
                    : styles["login-default"]
                )}
                href={"./"}>
                {elem.sprite && (
                  <span className={styles["margin-heart"]}>
                    <Sprite
                      id={elem.sprite}
                      colour={activeId === elem.id ? "black" : "#8291a3"}
                    />
                  </span>
                )}
                {elem.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className={styles.navigation}>
        <Image src="/logo.png" height="20" width="134" alt="logo" />

        <ul className={styles["navigation-list"]}>
          {underList.map((elem, index) => (
            <li
              className={styles["navigation-item"]}
              onClick={() => setActiveId(elem.id)}
              key={index}>
              <Link className={styles["navigation-text"]} href={"./"}>
                {elem.text}
              </Link>
              <div
                className={clsx(
                  styles.focus,
                  activeId === elem.id && styles["focus--active"]
                )}></div>
            </li>
          ))}
        </ul>

        <button className={styles.button}>+ Разместить объявление</button>
      </nav>
    </>
  );
};
