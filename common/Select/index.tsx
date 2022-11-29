import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { Sprite } from "../../svg";
import { MassiveOfSelect, SelectOfProps } from "../../ts";
import styles from "./Select.module.scss";

export const Select: React.FC<SelectOfProps> = ({
  massive,
  active,
  setActive,
}) => {
  const [listId, setListId] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(true);

  const handlerClick = (element: number) => {
    setActive(element);

    // Обнуление списка, при клике иного элемента.
    if (active !== massive.id) {
      setListId(0);
    }

    // Открытие списка, при повторном клике.
    if (!toggle) {
      setToggle(true);
    }
  };

  const handleClickOfItem = (element: number) => {
    setListId(element);
    setToggle(false);
  };

  return (
    <li className={styles.item} onClick={() => handlerClick(massive.id)}>
      <div className={styles.block}>
        {/* Смена слова при клике. */}
        {active === massive.id && listId ? (
          <div className={styles.text}>
            {massive.list[listId - 1].text}
          </div>
        ) : (
          <div className={styles.text}>{massive.text}</div>
        )}

        {/* svg - картинка. */}
        {massive.sprite && (
          <span className={styles["sprite-margin"]}>
            <Sprite
              id={massive.sprite}
              height="15"
              width="12"
              colour="#FFD54F"
            />
          </span>
        )}
      </div>

      {/* Почеркивание при клике. */}
      <span
        className={clsx(
          styles.focus,
          active === massive.id && styles["focus-active"]
        )}></span>

      {/* Внутренный список. */}
      {active === massive.id && toggle && (
        <ul className={styles.underlist}>
          {massive.list.map((elem, index: number) => (
            <li
              className={styles["underlist-item"]}
              key={index}
              onClick={() => handleClickOfItem(elem.id)}>
              <Link href="./">{elem.text}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
