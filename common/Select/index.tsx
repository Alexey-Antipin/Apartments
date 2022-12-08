import React, { useEffect, useState } from "react";
import styles from "./Select.module.scss";
import { SelectOfProps } from "../../ts";
import { Sprite } from "../../svg";
import Link from "next/link";
import clsx from "clsx";

export const Select: React.FC<SelectOfProps> = ({
  classItem,
  active,
  massive,
  setActive,
  underlining,
  classSprite,
  classUnderList,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listId, setListId] = useState<number>(0);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: any) => {
      if (e.target.className !== styles.text) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handClickOpenOfList = (elem: number) => {
    setActive(elem);
    setOpen(true);
  };

  const handClickOfItem = (elem: number) => {
    setListId(elem);
  };

  return (
    <li
      className={clsx(classItem , styles.item)}
      onClick={() => handClickOpenOfList(massive.id)}>
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
          <span className={classSprite || styles["sprite-margin"]}>
            <Sprite
              id={massive.sprite}
              height="15"
              width="12"
              colour="#FFD54F"
            />
          </span>
        )}
      </div>

      {/* Почёркивание при клике. */}
      {/*Если почёркивание не нужно, тогда передаём: underlining = false*/}
      {underlining == true && (
        <span
          className={clsx(
            styles.focus,
            active === massive.id && styles["focus-active"]
          )}></span>
      )}

      {/* Внутренный список. */}
      {active === massive.id && open && (
        <ul className={clsx(classUnderList, styles.underlist)}>
          {massive.list.map((elem, index: number) => (
            <li
              className={styles["underlist-item"]}
              onClick={() => handClickOfItem(elem.id)}
              key={index}>
              <Link href="./">{elem.text}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
