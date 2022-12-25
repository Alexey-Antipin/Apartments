import styles from "./Control.module.scss";
import { Sprite } from "../../svg";
import { useState } from "react";

type List = {
  sprite: string;
  text: string;
  view: (index: number) => void;
  classBtn: string;
  default_sprite?: string;
};

export const Control = () => {
  const [viewOfList, setViewOfList] = useState<boolean>(true);

  const defaultOfView = () => {
    setViewOfList(true);
  };

  const handleClickOfList = (index: number) => {
    if (index == 1) {
      setViewOfList(true);
    } else {
      setViewOfList(false);
    }
  };

  const defaultOfMap = () => {
    // Карта.
    return;
  };

  const list: List[] = [
    {
      sprite: "default",
      text: "По умолчанию",
      view: defaultOfView,
      classBtn: styles.button,
      default_sprite: "mark",
    },
    {
      sprite: "list",
      text: "Список",
      view: handleClickOfList,
      classBtn: (viewOfList && styles.button) || styles["button-off"],
    },
    {
      sprite: "square",
      text: "Плитки",
      view: handleClickOfList,
      classBtn: (viewOfList && styles["button-off"]) || styles.button,
    },
    {
      sprite: "sign",
      text: "Показать на карте",
      view: defaultOfMap,
      classBtn: styles.button,
    },
  ];

  return (
    <div className={styles.wrapper}>
      {list.map((el, index) => (
        <button
          className={el.classBtn}
          onClick={() => el.view(index)}
          key={index}>
          <Sprite id={el.sprite} colour="#664EF9" height="15" width="12" />

          {el.text}

          {el.default_sprite && (
            <div className={styles.sprite}>
              <Sprite
                id={el.default_sprite}
                colour="#664EF9"
                height="12"
                width="8"
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
