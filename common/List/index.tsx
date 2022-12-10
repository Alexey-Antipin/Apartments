import { MassiveOfListProps } from "../../ts";
import styles from "./List.module.scss";
import { useState } from "react";
import clsx from "clsx";

export const List: React.FC<MassiveOfListProps> = ({
  classes,
  array,
  active,
  title,
}) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  return (
    <>
      {title && <h2 className={classes?.classTitle}>{title}</h2>}
      <ul className={classes?.classUl || styles.list}>
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
                  key={index}>
                  {elem}
                </li>
              )
          )}
      </ul>
    </>
  );
};
