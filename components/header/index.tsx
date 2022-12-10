import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { getCookie } from "cookies-next";
import { MassiveOfList, MassiveOfSelect } from "../../ts";
import { Sprite } from "../../svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Select } from "../../common/Select";

export const Header: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(0);
  const [cookie, setCookie] = useState<string | boolean>("");

  const link: MassiveOfList[] = [
    { id: 1, text: "Главная", href: "./" },
    { id: 2, text: "Новости", href: "./news" },
    { id: 3, text: "Размещение и тарифы", href: "./" },
    {
      id: 4,
      text: "Объявления на карте",
      href: "./",
      sprite: "sign",
    },
    { id: 5, text: "Контакты", href: "./contacts" },
  ];
  const bookmark = {
    id: 6,
    text: "Закладки",
    href: "./",
  };
  const underList: MassiveOfSelect[] = [
    {
      id: 7,
      text: "Квартиры на сутки",
      sprite: "sign",
      list: [
        { id: 1, text: "Квартиры на сутки в Минске" },
        { id: 2, text: "Квартиры на сутки в Гомеле" },
        { id: 3, text: "Квартиры на сутки в Бресте" },
        { id: 4, text: "Квартиры на сутки в Витебске" },
        { id: 5, text: "Квартиры на сутки в Гродно" },
        { id: 6, text: "Квартиры на сутки в Могилеве" },
      ],
    },
    {
      id: 8,
      text: "Коттеджи и усадьбы",
      list: [
        { id: 1, text: "Коттеджи на сутки в Минске" },
        { id: 2, text: "Коттеджи на сутки в Гомеле" },
        { id: 3, text: "Коттеджи на сутки в Бресте" },
        { id: 4, text: "Коттеджи на сутки в Витебске" },
        { id: 5, text: "Коттеджи на сутки в Гродно" },
        { id: 6, text: "Коттеджи на сутки в Могилеве" },
      ],
    },
    {
      id: 9,
      text: "Бани и Сауны",
      list: [
        { id: 1, text: "Бани и Сауны в Минске" },
        { id: 2, text: "Бани и Сауны в Гомеле" },
        { id: 3, text: "Бани и Сауны в Бресте" },
        { id: 4, text: "Бани и Сауны в Витебске" },
        { id: 5, text: "Бани и Сауны в Гродно" },
        { id: 6, text: "Бани и Сауны в Могилеве" },
      ],
    },
    {
      id: 10,
      text: "Авто напрокат",
      list: [
        { id: 1, text: "Авто напрокат в Минске" },
        { id: 2, text: "Авто напрокат в Гомеле" },
        { id: 3, text: "Авто напрокат в Бресте" },
        { id: 4, text: "Авто напрокат в Витебске" },
        { id: 5, text: "Авто напрокат в Гродно" },
        { id: 6, text: "Авто напрокат в Могилеве" },
      ],
    },
  ];

  useEffect(() => {
    let cookieUser = getCookie("user");

    if (!cookieUser) return;
    setCookie(cookieUser);
  }, []);

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
                href={elem.href || "./"}>
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

        {cookie ? (
          <p className={styles.login}>{cookie}</p>
        ) : (
          <ul className={styles["list-size"]}>
            <li
              className={styles.item}
              onClick={() => setActiveId(bookmark.id)}>
              <Link
                href={"./"}
                className={clsx(
                  styles.text,
                  activeId === bookmark.id && styles["text--active"]
                )}>
                {bookmark.text}
                <span className={styles["margin-heart"]}>
                  <Sprite
                    id="heart"
                    colour={
                      (activeId === bookmark.id && "#1e2123") || "#8291a3"
                    }
                  />
                </span>
              </Link>

              <div
                className={clsx(
                  styles.focus,
                  activeId === bookmark.id && styles["focus--active"]
                )}></div>
            </li>
            <li className={styles.item}>
              <Link
                href={"./authorization"}
                className={clsx(styles.login, styles.login)}>
                Вход и регистрация
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <nav className={styles.navigation}>
        <Image src="/logo.png" height="20" width="134" alt="logo" />

        <ul className={styles["navigation-list"]}>
          <Select
            massive={underList[0]}
            active={activeId}
            setActive={setActiveId}
            underlining={true}
          />
          <Select
            massive={underList[1]}
            active={activeId}
            setActive={setActiveId}
            underlining={true}
          />
          <Select
            massive={underList[2]}
            active={activeId}
            setActive={setActiveId}
            underlining={true}
          />
          <Select
            massive={underList[3]}
            active={activeId}
            setActive={setActiveId}
            underlining={true}
          />
        </ul>

        <button className={styles.button}>+ Разместить объявление</button>
      </nav>
    </>
  );
};
