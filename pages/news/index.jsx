import styles from "./News.module.scss";
import { cities } from "../../mocks";
import propTypes from "prop-types";
import { Sprite } from "../../svg";
import { useState } from "react";
import Head from "next/head";
import {
  PaginationNumbering,
  LinkNavigation,
  ListArticles,
  DateArticles,
  getProducts,
} from "../../common";

const News = ({ articles, totalData, currentPage }) => {
  const [value, setValue] = useState("");
  const [list, setList] = useState(articles);

  const searchArticle = () => {
    let newList = articles.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setList(newList);
  };

  return (
    <div>
      <Head>
        <title>Новости</title>
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <LinkNavigation
            deepLink={"Новости"}
            main={"Новости"}
            option_v1={true}
          />
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
          link={"news"}
        />

        <div className={styles.background}>
          <div className={styles.block}>
            <input
              className={styles.search}
              placeholder="Поиск по статьям"
              onChange={(event) => setValue(event.target.value)}
              value={value}
            />
            <button className={styles.button} onClick={() => searchArticle()}>
              <Sprite id="search" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = () => {
  const { articles, total } = getProducts({
    limit: 9,
    page: 1,
    array: cities.articlesNews,
  });

  articles.forEach((_, index, array) => {
    let timeCurrent = DateArticles(array[index].time);
    array[index].time = timeCurrent;
  });

  return {
    props: {
      articles,
      totalData: total,
      currentPage: 1,
    },
  };
};

News.propTypes = {
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

export default News;
