import { MassiveOfListProps } from "../../ts";
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
