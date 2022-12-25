import styles from "./Map.module.scss";
import { Sprite } from "../../svg";
import clsx from "clsx";

type Props = {
  children?: JSX.Element;
  wrapper?: string;
  paragraph?: boolean;
};

export const MapBackground: React.FC<Props> = ({
  children,
  wrapper,
  paragraph,
}) => {
  return (
    <div className={clsx(wrapper, styles.wrapper)}>
      <h2 className={styles["title-h2"]}>
        {paragraph ? (
          <>Показать найденные квартиры на карте</>
        ) : (
          <>Поиск квартир на карте</>
        )}
      </h2>

      <h3 className={styles["title-h3"]}>
        {paragraph ? (
          <>
            Ищите новостройки рядом с работой,
            <br />
            парком или родственниками
          </>
        ) : (
          <>
            Ищите квартиры на сутки в центре города,
            <br /> возле парка или в живописном районе
          </>
        )}
      </h3>

      <button className={styles.button}>
        <Sprite id="sign" height="15" width="15" colour="#FFD54F" />
        Открыть карту
      </button>

      {children}
    </div>
  );
};
