import { checkbox } from "../../redux/reducers/checkboxReducer";
import styles from "./Checkbox.module.scss";
import { useDispatch } from "react-redux";
import { CheckboxProps } from "../../ts";
import { Sprite } from "../../svg";

export const Checkbox: React.FC<CheckboxProps> = ({ massive, numberling }) => {
  const dispatch = useDispatch();

  const handleClick = (element: { id: number; status: boolean }) => {
    dispatch(
      checkbox({
        index: numberling,
        indexElement: element.id - 1,
        status: !element.status,
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

          <label className={styles.text} htmlFor={`click-button-${numberling}-${el.id}`}>
            {el.text}
          </label>
        </li>
      ))}
    </ul>
  );
};
