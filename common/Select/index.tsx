import React, { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import { SelectOfProps } from "../../ts";
import { Sprite } from "../../svg";
import Link from "next/link";
import clsx from "clsx";

export const Select: React.FC<SelectOfProps> = ({
  classItemActive,
  classUnderList,
  underlining,
  classSprite,
  classHover,
  classItem,
  classText,
  setActive,
  massive,
  active,
  ban,
}) => {
  const [openWindow, setOpenWindow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [listId, setListId] = useState<number>(0);
  const ref = useRef<any>();

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: any) => {
      if (!ref.current.contains(e.target)) {
        setOpenWindow(false);
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handClickOpenOfList = (elem: number) => {
    setOpenWindow(!open);
    setActive(elem);
    setOpen(!open);
  };

  const handClickOfItem = (elem: number) => {
    setOpenWindow(false);
    setListId(elem);
  };

  return (
    <li
      className={clsx(
        !open && classHover,
        openWindow && classItemActive,
        classItem,
        styles.item
      )}
      onClick={() => handClickOpenOfList(massive.id)}
      ref={ref}>
      <div className={styles.block}>
        {/* Смена слова при клике. */}
        {/* ban - запрет смена слова при клике. */}
        {(ban || active === massive.id) && listId ? (
          <div className={clsx(classText || styles.text)}>
            {massive.list[listId - 1].text}
          </div>
        ) : (
          <div className={clsx(classText || styles.text)}>
            {massive.text}
          </div>
        )}

        {/* svg - картинка. */}
        {massive.sprite && (
          <span className={classSprite || styles["sprite-margin"]}>
            <Sprite
              id={massive.sprite}
              height="15"
              width="12"
              colour={massive.spriteColour || "#FFD54F"}
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
