import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Select } from "../../common/Select";
import styles from "./Header.module.scss";
import { getCookie } from "cookies-next";
import { Context } from "../context";
import { Sprite } from "../../svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export const Header: React.FC = () => {
  const [cookie, setCookie] = useState<string | boolean>("");
  const [activeId, setActiveId] = useState<number>(0);
  const { link, underList } = useAppSelector(
    (state: RootState) => state.header
  );
  const context = useContext(Context);

  useEffect(() => {
    let cookieUser = getCookie("user");

    if (!cookieUser) return;
    setCookie(cookieUser);
  }, []);

  return (
    <>
      {/* Верхний блок */}
      <nav>
        <ul className={styles.list}>
          {link.map((elem, index) => (
            <li
              className={styles.item}
              onClick={() => setActiveId(elem.id)}
              key={index}>
              {/* Блок */}
              <div className={styles.block}>
                {/* Количество сердец */}
                {!!context.heart && elem.sprite == "heart" && (
                  <div className={styles.heart}>{context.heart}</div>
                )}

                {/* Изображение */}
                {elem.sprite && (
                  <span
                    className={clsx(
                      context.heart > 0 && styles["sprite-red"],
                      activeId === elem.id
                        ? styles["sprite-active"]
                        : styles.sprite
                    )}>
                    <Sprite id={elem.sprite} />
                  </span>
                )}

                {/* Текст */}
                <Link
                  className={clsx(
                    styles.text,
                    activeId === elem.id && styles["text--active"]
                  )}
                  href={elem.href || "./"}>
                  {elem.text}
                </Link>
              </div>

              {/* Почеркивание */}
              <div
                className={clsx(
                  styles.focus,
                  activeId === elem.id && styles["focus--active"]
                )}
              />
            </li>
          ))}

          {cookie ? (
            <p className={styles.login}>{cookie}</p>
          ) : (
            <li className={styles.item}>
              <Link
                href={"./authorization"}
                className={clsx(styles.login, styles.login)}>
                Вход и регистрация
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Нижний блок */}
      <nav className={styles.navigation}>
        <Image src="/logo.png" height="20" width="134" alt="logo" />

        <ul className={styles["navigation-list"]}>
          {[0, 1, 2, 3].map((element) => (
            <Select
              key={element}
              massive={underList[element]}
              active={activeId}
              setActive={setActiveId}
              option_1v={true}
            />
          ))}
        </ul>

        <button className={styles.button}>+ Разместить объявление</button>
      </nav>
    </>
  );
};
