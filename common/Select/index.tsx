import React, { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import { SelectOfProps } from "../../ts";
import { Sprite } from "../../svg";
import Link from "next/link";
import clsx from "clsx";

export const Select: React.FC<SelectOfProps> = ({
  alternative,
  setActive,
  active,
  massive,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listId, setListId] = useState<number>(0);
  const ref = useRef<any>();

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: any) => {
      if (!ref.current.contains(e.target)) {
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
    setOpen(!open);
  };

  const handClickOfItem = (elem: number) => {
    setListId(elem);
  };

  return (
    <li
      className={styles.item}
      onClick={() => handClickOpenOfList(massive.id)}
      ref={ref}>
      <div
        className={clsx(
          open && alternative && styles["alternative-block-active"],
          !open && alternative && styles["alternative-block-hover"],
          (alternative && styles["alternative-block"]) || styles.block
        )}>
        {/* Смена слова при клике. */}
        {(alternative || active === massive.id) && listId ? (
          <div
            className={clsx(
              (alternative && styles["alternative-text"]) || styles.text
            )}>
            {massive.list[listId - 1].text}
          </div>
        ) : (
          <div
            className={clsx(
              (alternative && styles["alternative-text"]) || styles.text
            )}>
            {massive.text}
          </div>
        )}

        {/* svg - картинка. */}
        {massive.sprite && (
          <span
            className={clsx(
              (alternative && styles["alternative-sprite"]) ||
                styles["sprite-margin"]
            )}>
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
      {!alternative && (
        <span
          className={clsx(
            styles.focus,
            active === massive.id && styles["focus-active"]
          )}></span>
      )}

      {/* Внутренный список. */}
      {active === massive.id && open && (
        <ul
          className={clsx(
            (alternative && styles["alternative-underlist"]) ||
              styles.underlist
          )}>
          {massive.list.map((elem, index: number) => (
            <li
              className={clsx(
                (alternative && styles["alternative-underlist-item"]) ||
                  styles["underlist-item"]
              )}
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
