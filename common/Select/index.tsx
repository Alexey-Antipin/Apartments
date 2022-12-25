import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import styles from "./Select.module.scss";
import { SelectOfProps } from "../../ts";
import { Sprite } from "../../svg";
import Link from "next/link";
import clsx from "clsx";
import {
  selectCity,
  selectCountRooms,
} from "../../redux/reducers/selectReducer";

export const Select: React.FC<SelectOfProps> = ({
  setActive,
  active,
  setZeroing,
  zeroing,
  category,
  massive,
  option_3v,
  option_2v,
  option_1v,
}) => {
  const [listId, setListId] = useState(0);
  const [open, setOpen] = useState<boolean>(false);

  const header = useAppSelector((state: RootState) => state.header);
  const dispatch = useAppDispatch();
  const ref = useRef<any>();

  useEffect(() => {
    if (zeroing == 0 && setZeroing) {
      setZeroing(1);
      setListId(0);
    }
  }, [zeroing, setZeroing]);

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

  const handleClickOpenOfList = (elem: number) => {
    setActive(elem);
    setOpen(!open);
  };

  const handleClickOfItem = (elem: number) => {
    setListId(elem);
  };

  const handleClickOfDispatch = (category: string, arg: any) => {
    if (category == "Город") {
      dispatch(selectCity(arg));
    } else {
      dispatch(selectCountRooms(arg));
    }
  };

  return (
    <ul className={styles.position}>
      <li
        className={clsx(
          option_1v && styles.item,
          option_2v && styles["alternative-list"],
          option_3v && styles["metro-block"]
        )}
        onClick={() => handleClickOpenOfList(massive.id)}
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
      </li>

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
              onClick={() => (
                handleClickOfItem(elem.id),
                (option_1v || option_2v) &&
                  handleClickOfDispatch(
                    (option_1v && "Город") ||
                      (option_2v && category) ||
                      "",
                    header.underList[0].list[index].text
                  )
              )}
              key={index}>
              {option_1v && (
                <Link href={`./catalog/?${elem.text}`}>{elem.text}</Link>
              )}
              {(option_2v || option_3v) && <p>{elem.text}</p>}
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
};
