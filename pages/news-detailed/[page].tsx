import getProducts from "../../common/Pagination/GetData";
import styles from "./NewsDetailed.module.scss";
import { Article, PageProps } from "../../ts";
import { Sprite } from "../../svg";
import { useState } from "react";
import Head from "next/head";
import {
  LinkNavigation,
  ListArticles,
  PaginationNumbering,
} from "../../common";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

const PaginatedPage: React.FC<PageProps> = ({
  articles,
  currentPage,
  totalData,
}) => {
  const news = "Новости";
  const [value, setValue] = useState<string>("");
  const [list, setList] = useState<Article[]>(articles);

  const searchArticle = () => {
    let newList = articles.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setList(newList);
  };

  return (
    <div className="NewsDetailed">
      <Head>
        <title>Новости</title>
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <LinkNavigation link={news} />
        </div>

        <div className={styles["container-list"]}>
          <ListArticles
            classes={{ classUl: styles["link-articles"] }}
            list={list}
          />
        </div>

        <PaginationNumbering
          totalItems={totalData}
          currentPage={currentPage}
          itemsPerPage={9}
        />

        <div className={styles.background}>
          <div className={styles.block}>
            <input
              className={styles.search}
              placeholder="Поиск по статьям"
              onChange={(event) => setValue(event.target.value)}
              value={value}
            />
            <button
              className={styles.button}
              onClick={() => searchArticle()}>
              <Sprite id="search" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const page = Number(params?.page) || 1;
  const { articles, total } = await getProducts({ limit: 9, page });

  if (!articles.length) {
    return {
      notFound: true,
    };
  }

  if (page === 1) {
    return {
      redirect: {
        destination: "/news-detailed",
        permanent: false,
      },
    };
  }

  return {
    props: {
      articles,
      totalData: total,
      currentPage: page,
    },
    revalidate: 60 * 60 * 24, // <--- ISR cache: once a day
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Array.from({ length: 5 }).map(
      (_, index) => `/news-detailed/${index + 2}`
    ),
    fallback: "blocking",
  };
};

export default PaginatedPage;
