import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { newsThunk } from "../../redux/reducers/newsReducer";
import { LinkNavigation, ListArticles } from "../../common";
import { RootState } from "../../redux/store";
import styles from "./News.module.scss";
import { Sprite } from "../../svg";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const News = () => {
  const dispatch = useAppDispatch();
  const { list, item } = useAppSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(newsThunk());
  }, []);

  const network: Array<string> = [
    "vk",
    "facebook-2",
    "viber",
    "telegram",
    "whatsapp",
  ];

  return (
    <>
      <Head>
        <title>Новости</title>
      </Head>

      <div className={styles.header}>
        <div className={styles.wrapper}>
          <LinkNavigation
            deepLink={item[0]?.title || "Cтатьи не существует."}
            option_v2={true}
            main={"Новости"}
          />
        </div>

        <div className={styles.network}>
          <time className={styles.date}>
            {item[0]?.time || "00.00.0000"}
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
              src={item[0]?.photo || "/nophoto.png"}
              alt="article"
              priority
              fill
            />
          </div>
        </div>

        <div className={styles["text-block"]}>
          {item[0]?.text.map((item: string, index: number) => {
            return (
              <div key={index}>
                <p>{item}</p>
                <br />
              </div>
            );
          })}
          {!item[0] && <div>Cтатьи не существует.</div>}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.container}>
          <h2 className={styles["main-title"]}>Читайте также</h2>
          <ListArticles list={list} />
        </div>
      </div>
    </>
  );
};

export default News;
