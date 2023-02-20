import { useAppDispatch, choiceCity, selectCity } from "../../redux";
import { MassiveOfListProps } from "../../ts";
import getProducts from "../paginat/getData";
import styles from "./List.module.scss";
import { useRouter } from "next/router";
import { cities } from "../../mocks";
import { Sprite } from "../../svg";
import { useState } from "react";
import clsx from "clsx";

export const List: React.FC<MassiveOfListProps> = ({
  beginNumber,
  classes,
  array,
  active,
  header,
  amount,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeList, setActiveList] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<number>(beginNumber || 0);

  const handleClick = (elem: string) => {
    // Выбор города
    let { choice, indexCity } = selectionOfRooms(elem);

    // Фильтрация
    const { articles, total } = getProducts({
      limit: 9,
      page: 1,
      array: choice,
    });

    // Выбор заголовка
    dispatch(selectCity(indexCity));

    // Сохранение в store
    dispatch(
      choiceCity({
        articles,
        totalData: total,
        currentPage: 1,
      })
    );

    // Перенаправляем в catalog
    router.push("./catalog");
  };

  const selectionOfRooms = (elem: string) => {
    switch (elem) {
      case "Квартиры в Минске":
        return { choice: cities.minsk, indexCity: 0 };
      case "Квартиры в Гомеле":
        return { choice: cities.gomel, indexCity: 1 };
      case "Квартиры в Гродно":
        return { choice: cities.grodno, indexCity: 4 };
      case "Квартиры в Могилеве":
        return { choice: cities.mogilev, indexCity: 5 };
      case "Квартиры в Бресте":
        return { choice: cities.brest, indexCity: 2 };
      case "Квартиры в Витебск":
        return { choice: cities.vitebsk, indexCity: 3 };
      default:
        return { choice: cities.minsk, indexCity: 0 };
    }
  };

  return (
    <>
      {header?.sprite ? (
        <h2
          className={classes?.classTitle}
          onClick={() => setActiveList(!activeList)}>
          {header.title}
          {header.sprite && (
            <div
              className={clsx(
                styles.sprite,
                activeList && styles["sprite-active"]
              )}>
              <Sprite id="mark" colour="#FEB700" height="8" />
            </div>
          )}
        </h2>
      ) : (
        <h2 className={classes?.classTitle}>{header?.title}</h2>
      )}

      <ul
        className={
          clsx(
            activeList && header?.sprite
              ? classes?.classDisabled
              : classes?.classUl
          ) || styles.list
        }>
        {array &&
          array.map(
            (elem, index: number) =>
              // Если передаём active.
              (active && (
                <li
                  className={clsx(
                    styles["list-text"],
                    index + 1 === activeItem && styles["text-active"]
                  )}
                  onClick={() => setActiveItem(index + 1)}
                  key={index}>
                  {elem}
                </li>
              )) || (
                // Иначе.
                <li
                  className={classes?.classList || styles.item}
                  key={index}
                  onClick={() => handleClick(elem)}>
                  {elem}
                  {amount && (
                    <div className={styles["count"]}>{amount[index]}</div>
                  )}
                </li>
              )
          )}
      </ul>
    </>
  );
};
