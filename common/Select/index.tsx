import React, { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import { SelectOfProps } from "../../ts";
import { Sprite } from "../../svg";
import Link from "next/link";
import clsx from "clsx";

export const Select: React.FC<SelectOfProps> = ({
  setActive,
  massive,
  active,
  option_3v,
  option_2v,
  option_1v,
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
      className={clsx(
        option_1v && styles.item,
        option_2v && styles["alternative-list"],
        option_3v && styles["metro-block"]
      )}
      onClick={() => handClickOpenOfList(massive.id)}
      ref={ref}>
      <div
        className={clsx(
          option_1v && styles.block,
          (option_2v || option_3v) &&
            open &&
            styles["alternative-block-active"],
          (option_2v || option_3v) &&
            !open &&
            styles["alternative-block-hover"],
          (option_2v || option_3v) && styles["alternative-block"]
        )}>
          
        {option_3v && massive.sprite_2 && (
          <div className={styles["metro-sprite"]}>
            <Sprite id={massive.sprite_2} />
          </div>
        )}

        {/* Смена слова при клике. */}
        {(option_2v || option_3v || active === massive.id) && listId ? (
          <div
            className={clsx(
              option_1v && styles.text,
              option_2v && styles["alternative-text"],
              option_3v && styles["metro-text"]
            )}>
            {massive.list[listId - 1].text}
          </div>
        ) : (
          <div
            className={clsx(
              option_1v && styles.text,
              option_2v && styles["alternative-text"],
              option_3v && styles["metro-text"]
            )}>
            {massive.text}
          </div>
        )}

        {/* svg - картинка. */}
        {massive.sprite && (
          <span
            className={clsx(
              option_1v && styles["sprite-margin"],
              (option_2v || option_3v) && styles["alternative-sprite"]
            )}>
            <Sprite
              id={massive.sprite}
              height="12"
              width="12"
              colour={massive.spriteColour || "#FFD54F"}
            />
          </span>
        )}
      </div>

      {/* Почёркивание при клике. */}
      {!option_2v && !option_3v && (
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
            option_1v && styles.underlist,
            (option_2v || option_3v) && styles["alternative-underlist"]
          )}>
          {massive.list.map((elem, index: number) => (
            <li
              className={clsx(
                option_1v && styles["underlist-item"],
                (option_2v || option_3v) &&
                  styles["alternative-underlist-item"]
              )}
              onClick={() => handClickOfItem(elem.id)}
              key={index}>
              {(option_2v || option_3v) && <p>{elem.text}</p>}
              {option_1v && <Link href="./">{elem.text}</Link>}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
