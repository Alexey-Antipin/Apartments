import { PaginationNumbering } from "../../common/Pagination/PaginationNumbering";
import { LinkNavigation, ListArticles } from "../../common";
import getProducts from "../../common/Pagination/GetData";
import styles from "./NewsDetailed.module.scss";
import { Article, PageProps } from "../../ts";
import { GetStaticProps } from "next";
import { Sprite } from "../../svg";
import { useState } from "react";
import Head from "next/head";

const NewsDetailed: React.FC<PageProps> = ({
  articles,
  totalData,
  currentPage,
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

export const getStaticProps: GetStaticProps = async () => {
  const { articles, total } = await getProducts({
    limit: 9,
    page: 1,
  });

  return {
    props: {
      articles,
      totalData: total,
      currentPage: 1,
    },
  };
};

export default NewsDetailed;
