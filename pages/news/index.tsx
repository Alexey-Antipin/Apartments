import { LinkNavigation, ListArticles } from "../../common";
import { Article, TypesOfArticles } from "../../ts";
import styles from "./News.module.scss";
import { Sprite } from "../../svg";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const News = ({ article, articles }: TypesOfArticles) => {
  const network: Array<string> = [
    "vk",
    "facebook-2",
    "viber",
    "telegram",
    "whatsapp",
  ];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <LinkNavigation
            link={"Новости"}
            deeperLink={article.title || "Cтатьи не существует."}
          />
        </div>

        <div className={styles.network}>
          <time className={styles.date}>
            {(article && article.time) || "00.00.0000"}
          </time>

          <div className={styles.nav}>
            <span className={styles.label}>Поделиться</span>

            <ul className={styles.list}>
              {network.map((elem, index) => (
                <li className={styles.item} key={index}>
                  <Link href="/">
                    <Sprite id={elem} colour="#664EF9" height="13" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.block}>
          <Image
            className={styles.point}
            src="/points.png"
            height="60"
            width="60"
            alt="points"
          />
          <div className={styles["news-photo-position"]}>
            <Image
              className={styles["news-photo"]}
              src={article.photo || "/nophoto.png"}
              alt="article"
              priority
              fill
            />
          </div>
        </div>

        <div className={styles["text-block"]}>
          {article &&
            article.text.map((item: string, index: number) => {
              return (
                <div key={index}>
                  <p>{item}</p>
                  <br />
                </div>
              );
            })}
          {!article && <div>Cтатьи не существует.</div>}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.container}>
          <h2 className={styles["main-title"]}>Читайте также</h2>
          <ListArticles list={articles} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  let id = 1;
  let rangeMin = id - 1;
  let rangeMax = rangeMin + 4;

  let { data } = await axios.get<Article[]>(
    "http://localhost:3000/api/articles",
    { params: { rangeMin, rangeMax } }
  );

  const list = data.slice(1, 4);
  const item = data.filter((el) => el.id == id.toString());

  return { props: { articles: list, article: item[0] } };
}

export default News;
