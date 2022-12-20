import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Select } from "../../common/Select";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { getCookie } from "cookies-next";
import { Sprite } from "../../svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export const Header: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(0);
  const [cookie, setCookie] = useState<string | boolean>("");
  const { link, bookmark, underList } = useAppSelector(
    (state: RootState) => state.header
  );

  useEffect(() => {
    let cookieUser = getCookie("user");

    if (!cookieUser) return;
    setCookie(cookieUser);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          {link.map((elem, index) => (
            <li
              className={styles.item}
              onClick={() => setActiveId(elem.id)}
              key={index}>
              <Link
                className={clsx(
                  styles.text,
                  activeId === elem.id && styles["text--active"]
                )}
                href={elem.href || "./"}>
                {elem.sprite && (
                  <span className={styles["sprite-margin"]}>
                    <Sprite
                      id={elem.sprite}
                      colour={activeId === elem.id ? "black" : "#8291a3"}
                    />
                  </span>
                )}
                {elem.text}
              </Link>
              <div
                className={clsx(
                  styles.focus,
                  activeId === elem.id && styles["focus--active"]
                )}></div>
            </li>
          ))}
        </ul>

        {cookie ? (
          <p className={styles.login}>{cookie}</p>
        ) : (
          <ul className={styles["list-size"]}>
            <li
              className={styles.item}
              onClick={() => setActiveId(bookmark.id)}>
              <Link
                href={"./"}
                className={clsx(
                  styles.text,
                  activeId === bookmark.id && styles["text--active"]
                )}>
                {bookmark.text}
                <span className={styles["margin-heart"]}>
                  <Sprite
                    id="heart"
                    colour={
                      (activeId === bookmark.id && "#1e2123") || "#8291a3"
                    }
                  />
                </span>
              </Link>

              <div
                className={clsx(
                  styles.focus,
                  activeId === bookmark.id && styles["focus--active"]
                )}></div>
            </li>
            <li className={styles.item}>
              <Link
                href={"./authorization"}
                className={clsx(styles.login, styles.login)}>
                Вход и регистрация
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <nav className={styles.navigation}>
        <Image src="/logo.png" height="20" width="134" alt="logo" />

        <ul className={styles["navigation-list"]}>
          <Select
            massive={underList[0]}
            active={activeId}
            setActive={setActiveId}
            option_1v={true}
          />
          <Select
            massive={underList[1]}
            active={activeId}
            setActive={setActiveId}
            option_1v={true}
          />
          <Select
            massive={underList[2]}
            active={activeId}
            setActive={setActiveId}
            option_1v={true}
          />
          <Select
            massive={underList[3]}
            active={activeId}
            setActive={setActiveId}
            option_1v={true}
          />
        </ul>

        <button className={styles.button}>+ Разместить объявление</button>
      </nav>
    </>
  );
};
