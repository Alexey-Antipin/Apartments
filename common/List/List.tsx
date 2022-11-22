import Link from "next/link";
import { Sprite } from "../../svg";
import { MassiveOfListProps } from "../../ts";
import { clsx } from "clsx";
import styles from "./List.module.scss";

export const List: React.FC<MassiveOfListProps> = ({ classes, array }) => {
  return (
    <ul className={classes?.classUl || styles.list}>
      {array &&
        array.map((elem, index: number) => (
          <li className={classes?.classList || styles.item} key={index}>
            {elem}
          </li>
        ))}
    </ul>
  );
};
