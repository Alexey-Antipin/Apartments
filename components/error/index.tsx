import styles from "./Error.module.scss";
import { Sprite } from "../../svg";
import Image from "next/image";
import Link from "next/link";

export const Error: React.FC = () => {
  return (
    <div className={styles.error}>
      <div className={styles.wrapper}>
        <Image
          className={styles.picture}
          src="/points.png"
          alt="points"
          height="60"
          width="60"
        />
        <div>
          <h2 className={styles.title}>Ошибка 404</h2>
          <p className={styles.text}>
            Возможно, у вас опечатка в адресе страницы, или её просто не
            существует
          </p>
          <Link className={styles.button} href="/">
            <Sprite id="home" colour="#1E2123" />
            <span className={styles["button-text"]}>
              Вернуться на главную
            </span>
          </Link>
        </div>
        <div>
          <Sprite id="error" />
        </div>
        <Image
          className={styles["picture-white"]}
          src="/white-points.png"
          alt="points"
          height="60"
          width="60"
        />
      </div>
    </div>
  );
};
