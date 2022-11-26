import { useEffect, useState } from "react";
import { LinkNavigation, ListArticles } from "../../common";
import styles from "./News.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Sprite } from "../../svg";
import { Article } from "../../ts";
import axios from "axios";

const News: React.FC = () => {
  //id click, потом убрать.
  let id = 1;
  const network: Array<string> = [
    "vk",
    "facebook-2",
    "viber",
    "telegram",
    "whatsapp",
  ];
  const [article, setArticle] = useState<Article>();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    combineData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    let { data } = await axios.get<Article>(
      `http://localhost:3000/api/articles/1`
    );
    setArticle(data);
  };

  const getArticles = async () => {
    let { data } = await axios.get<Article[]>(
      "http://localhost:3000/api/articles"
    );
    setArticles(data);
  };

  const combineData = async () => {
    await getData();
    await getArticles();
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <LinkNavigation
            link={"Новости"}
            deeperLink={article?.title || "Cтатьи не существует."}
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
              src={(article && article.photo) || "/nophoto.png"}
              alt="article"
              priority
              fill
            />
          </div>
        </div>

        <div className={styles["text-block"]}>
          {article &&
            article?.text.map((item, index: number) => {
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

export default News;
