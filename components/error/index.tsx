import styles from "./Error.module.scss";
import { useRouter } from "next/router";
import { Sprite } from "../../svg";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export const Error: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath == "/news-detailed") {
      router.push(`${router.asPath}/1`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.error}>
      <div className={styles.wrapper}>
        {/* Точки жёлтые */}
        <Image
          className={styles.picture}
          src="/points.png"
          alt="points"
          height="60"
          width="60"
        />

        {/* Блок */}
        <div className={styles.block}>
          <h2 className={styles.title}>Ошибка 404</h2>
          <p className={styles.text}>
            Возможно, у вас опечатка в адресе страницы, или её просто не
            существует
          </p>
          <Link className={styles.button} href="/">
            <Sprite id="home" colour="#1E2123" />
            <span className={styles["button-text"]}>Вернуться на главную</span>
          </Link>
        </div>

        {/* Ошибка svg */}
        <div className={styles.sprite}>
          <Sprite id="error" />
        </div>

        {/* Точки белые */}
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
