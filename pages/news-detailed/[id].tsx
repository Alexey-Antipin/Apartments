import { LinkNavigation, ListArticles } from "../../common";
import styles from "./NewsDetailed.module.scss";
import { useRouter } from "next/router";
import { Sprite } from "../../svg";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  newsThunk,
} from "../../redux";

const News: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { articles, articleCurrent } = useAppSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (!router.isReady) return;
    let id = router.query.id as string;

    dispatch(newsThunk(+id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
            deepLink={articleCurrent.title || "Cтатьи не существует."}
            option_v2={true}
            main={"Новости"}
          />
        </div>

        <div className={styles.network}>
          <time className={styles.date}>
            {articleCurrent.time || "00.00.0000"}
          </time>

          <div className={styles.nav}>
            <span className={styles.label}>Поделиться</span>

            <ul className={styles.list}>
              {network.map((elem, index) => (
                <li className={styles.item} key={index}>
                  <Link href="/">
                    <Sprite id={elem} colour="#664EF9" height="20" width="20" />
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
              src={articleCurrent.photo || "/nophoto.png"}
              alt="article"
              priority
              fill
            />
          </div>
        </div>

        <div className={styles["text-block"]}>
          {articleCurrent.text &&
            articleCurrent.text.map((item: string, index: number) => {
              return (
                <div key={index}>
                  <p>{item}</p>
                  <br />
                </div>
              );
            })}
          {!articleCurrent && <div>Cтатьи не существует.</div>}
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
