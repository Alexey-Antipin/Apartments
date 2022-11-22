import { useState } from "react";
import { MassiveOfList } from "../../ts";
import { List } from "../../common/List/List";
import styles from "./Header.module.scss";
import Image from "next/image";

export const Header: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(0);
  const hook = {
    activeId,
    setActiveId,
  };
  const link: MassiveOfList[] = [
    { id: 1, text: "Главная", underLine: true },
    { id: 2, text: "Новости", underLine: true },
    { id: 3, text: "Размещение и тарифы", underLine: true },
    {
      id: 4,
      text: "Объявления на карте",
      underLine: true,
      sprite: "sign",
    },
    { id: 5, text: "Контакты", underLine: true },
  ];
  const listRight: MassiveOfList[] = [
    { id: 1, text: "Закладки" },
    {
      id: 2,
      text: "Вход и регистрация",
      sprite: "heart",
      colour: styles.login,
    },
  ];
  const underList: MassiveOfList[] = [
    {
      id: 6,
      text: "Квартиры на сутки",
      underLine: true,
      sprite: "sign",
      characterSprite: { height: "15", width: "12", colour: "#FFD54F" },
    },
    { id: 7, text: "Коттеджи и усадьбы", underLine: true },
    { id: 8, text: "Бани и Сауны", underLine: true },
    { id: 9, text: "Авто напрокат", underLine: true },
  ];

  return (
    <>
      <div className={styles.navbar}>
        <nav className={styles.menu} id="navbar">
          <List
            massive={link}
            classes={{ classSprite: styles["margin"] }}
            hook={hook}
          />
          <List
            massive={listRight}
            classes={{
              classParagraph: styles.text,
              classUl: styles["list-size"],
              classSprite: styles["margin-heart"],
            }}
          />
        </nav>
      </div>

      <div className={styles.navigation}>
        <nav className={styles["navigation-menu"]}>
          <Image
            className={styles.logo}
            src="/logo.png"
            height="20"
            width="134"
            alt="logo"
          />
          <List
            massive={underList}
            classes={{
              classSprite: styles["margin-sign"],
              classParagraph: styles["navigation-text"],
              classList: styles["navigation-list"],
            }}
            hook={hook}
          />
          <button className={styles.button}>
            + Разместить объявление
          </button>
        </nav>
      </div>
    </>
  );
};
