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
  getData,
} from "../../common";

const PaginatedPage = ({ articles, currentPage, totalData }) => {
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

export const getStaticProps = ({ params }) => {
  const page = Number(params?.page) || 1;
  const { articles, total } = getData({
    limit: 9,
    page,
    array: cities.articlesNews,
  });

  articles.forEach((_, index, array) => {
    let timeCurrent = DateArticles(array[index].time);
    array[index].time = timeCurrent;
  });

  if (!articles.length) {
    return {
      notFound: true,
    };
  }

  if (page === 1) {
    return {
      redirect: {
        destination: "/news",
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

PaginatedPage.propTypes = {
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

export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: 5 }).map((_, index) => `/news/${index + 2}`),
    fallback: "blocking",
  };
};

export default PaginatedPage;
