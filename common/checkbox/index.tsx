import { useAppDispatch, checkbox } from "../../redux";
import styles from "./Checkbox.module.scss";
import { CheckboxProps } from "../../ts";
import { Sprite } from "../../svg";

export const Checkbox: React.FC<CheckboxProps> = ({ massive, numberling }) => {
  const dispatch = useAppDispatch();

  const handleClick = (element: { id: number; status: boolean }) => {
    dispatch(
      checkbox({
        indexElement: element.id - 1,
        status: !element.status,
        index: numberling,
      })
    );
  };

  return (
    <ul>
      {massive.map((el, index: number) => (
        <li className={styles.item} key={index}>
          <button
            className={el.status ? styles["button-on"] : styles["button-off"]}
            onClick={() => handleClick(el)}
            id={`click-button-${numberling}-${el.id}`}>
            <Sprite id="checkbox" />
          </button>

          <label
            className={styles.text}
            htmlFor={`click-button-${numberling}-${el.id}`}>
            {el.text}
          </label>
        </li>
      ))}
    </ul>
  );
};
