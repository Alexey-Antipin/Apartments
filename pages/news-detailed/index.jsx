import { PaginationNumbering } from "../../common/Pagination/PaginationNumbering";
import { LinkNavigation, ListArticles } from "../../common";
import getProducts from "../../common/Pagination/GetData";
import styles from "./NewsDetailed.module.scss";
import propTypes from "prop-types";
import { Sprite } from "../../svg";
import { useState } from "react";
import Head from "next/head";

const NewsDetailed = ({ articles, totalData, currentPage }) => {

  const news = "Новости";
  const [value, setValue] = useState("");
  const [list, setList] = useState(articles);

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
          <LinkNavigation main={news} deepLink={news} option_v1={true} />
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

export const getStaticProps = async () => {
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

NewsDetailed.propTypes = {
  articles: propTypes.arrayOf(
    propTypes.shape({
      description: propTypes.string,
      id: propTypes.string,
      photo: propTypes.string,
      text: propTypes.array,
      time: propTypes.string,
      title: propTypes.string,
      width: propTypes.number,
    })
  ),
  totalData: propTypes.number,
  currentPage: propTypes.number,
};

export default NewsDetailed;
