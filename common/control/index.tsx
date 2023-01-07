import { Context } from "../../components/context";
import styles from "./Control.module.scss";
import { useContext } from "react";
import { Sprite } from "../../svg";

type List = {
  view: (index: number) => void;
  default_sprite?: string;
  classBtn: string;
  sprite: string;
  colour: string;
  text: string;
};

export const Control = () => {
  const context = useContext(Context);

  const defaultOfView = () => {
    context.setColourSprite(true);
  };

  const handleClickOfList = (index: number) => {
    if (index == 1) {
      context.setColourSprite(true);
    } else {
      context.setColourSprite(false);
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
      colour: "#7A7F86",
    },
    {
      sprite: "list",
      text: "Список",
      view: handleClickOfList,
      classBtn:
        (context.colourSprite && styles.button) || styles["button-off"],
      colour: context.colourSprite ? "#664EF9" : "#BDBDBD",
    },
    {
      sprite: "square",
      text: "Плитки",
      view: handleClickOfList,
      classBtn:
        (context.colourSprite && styles["button-off"]) || styles.button,
      colour: context.colourSprite ? "#BDBDBD" : "#664EF9",
    },
    {
      sprite: "sign",
      text: "Показать на карте",
      view: defaultOfMap,
      classBtn: styles.button,
      colour: "#664EF9",
    },
  ];

  return (
    <div className={styles.wrapper}>
      {list.map((el, index) => (
        <button
          className={el.classBtn}
          onClick={() => el.view(index)}
          key={index}>
          <Sprite
            id={el.sprite}
            colour={el.colour}
            height="15"
            width="12"
          />

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
