import { useContext, useEffect, useRef, useState } from "react";
import { deleteCookie } from "cookies-next";
import styles from "./Header.module.scss";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { additionalOptions, redirectOfCatalog, Select } from "../../common";
import { Context } from "../context";
import { Sprite } from "../../svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  selectCallCity,
  useAppSelector,
  useAppDispatch,
  accountDelete,
  RootState,
} from "../../redux";
import { ArticleRoom } from "../../ts";
import axios from "axios";

export const Header: React.FC = () => {
  const [cookie, setCookie] = useState<string | boolean>("");
  const [toggle, setToggle] = useState<boolean | null>(null);
  const [activeId, setActiveId] = useState<number>(0);

  const { authorization, header, select, checkbox } = useAppSelector(
    (state: RootState) => state
  );
  const user = useRef<HTMLLIElement>(null);
  const context = useContext(Context);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Открытие списка под пользователем
  const handleClick = () => {
    if (toggle == null) {
      setToggle(false);
    }
    setToggle(!toggle);
  };

  // Вход в другой аккаунт сразу
  const anotherAccount = () => {
    router.push("./authorization");
    setToggle(false);
  };

  // Выход пользователя
  const exitAccount = () => {
    deleteCookie("user");
    dispatch(accountDelete());
    setToggle(false);
  };

  useEffect(() => {
    // Ищем cookie
    let cookieUser = getCookie("user");

    // Если есть user
    if (cookieUser) {
      setCookie(cookieUser);
    } else {
      // Иначе
      setCookie(false);
    }
  }, [authorization.account]);

  useEffect(() => {
    if (toggle == null) return;

    const handleClick = (e: MouseEvent) => {
      if (user.current == null) return;
      if (!user.current.contains(e.target as Element)) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    if (!select.callCity) return;

    const handleClickOfButton = async () => {
      const statuses = additionalOptions(checkbox);

      // Запрос города
      let { data } = await axios.get<ArticleRoom[]>(
        "http://localhost:3000/api/get-city/",
        {
          params: {
            city: select.filter.city,
            priceMin: select.filter.priceMin,
            priceMax: select.filter.priceMax,
            rooms: select.filter.rooms,
            places: select.filter.places,
            metro: select.filter.metro,
            area: select.filter.area,
            statuses: statuses,
          },
        }
      );

      // Перенаправление в каталог, деление на страницы
      redirectOfCatalog(data, dispatch, router);

      dispatch(selectCallCity(false));
    };
    handleClickOfButton();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.callCity]);

  return (
    <>
      {/* Верхний блок */}
      <nav>
        <ul className={styles.list}>
          {header.link.map((elem, index) => (
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
                    index == 5 && styles["text-medium"],
                    activeId === elem.id && styles["text--active"]
                  )}
                  href={elem.href}>
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
            <li className={styles.item} ref={user}>
              <button
                className={styles["item-login"]}
                onClick={() => handleClick()}>
                <Image
                  className={styles.image}
                  src="/user/user.png"
                  alt="user"
                  height={30}
                  width={30}
                />
                <p className={styles["text-medium"]}>{cookie}</p>
                <div
                  className={clsx(
                    toggle == true && styles["sprite-mark-on"],
                    toggle == false && styles["sprite-mark-off"],
                    styles["sprite-mark"]
                  )}>
                  <Sprite id="mark" colour="#4E64F9" width="10" height="14" />
                </div>
              </button>

              <div
                className={clsx(
                  toggle == true && styles["block-account-on"],
                  toggle == false && styles["block-account-off"],
                  styles["block-account"]
                )}>
                <button
                  className={styles["account"]}
                  onClick={() => anotherAccount()}>
                  Перейти в другой аккаунт
                </button>

                <button
                  className={styles["account"]}
                  onClick={() => exitAccount()}>
                  Выход с аккаунта
                </button>
              </div>
            </li>
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
              massive={header.underList[element]}
              setActive={setActiveId}
              active={activeId}
              option_1v={true}
            />
          ))}
        </ul>

        <button className={styles.button}>+ Разместить объявление</button>
      </nav>
    </>
  );
};
