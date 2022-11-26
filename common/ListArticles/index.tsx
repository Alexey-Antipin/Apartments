import Image from "next/image";
import { ArticleProps } from "../../ts";
import styles from "./ListArticles.module.scss";

export const ListArticles: React.FC<ArticleProps> = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((item, index) => {
        return (
          <li className={styles.element} key={index}>
            <div className={styles["image-block"]}>
              <Image
                className={styles.image}
                src={item.photo}
                alt="home"
                priority
                fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              />
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            <hr className={styles.linier}></hr>
            <div className={styles.block}>
              <time className={styles.date}>{item.time}</time>
              <a className={styles.link} href={`./${item.id}`}>
                Читать
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
