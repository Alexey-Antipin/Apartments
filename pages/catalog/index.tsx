import { PaginationNumbering, getData } from "../../common/pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { choiceCity, } from "../../redux/reducers/catalogReducer";
import { LinkNavigation } from "../../common/linkNavigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../components/context";
import { FilterRooms } from "../../common/filter";
import { MapBackground } from "../../common/map";
import { Control } from "../../common/control";
import { RootState } from "../../redux/store";
import { ListArticles } from "../../common";
import styles from "./Catalog.module.scss";
import { ArticleRoom } from "../../ts";
import { cities } from "../../mocks";
import { Sprite } from "../../svg";
import Link from "next/link";
import Head from "next/head";

type Props = {
  articles: ArticleRoom[];
  currentPage: number;
  totalData: number;
};

const Catalog: React.FC<Props> = (props) => {
  const [linkCity, setLinkCity] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const network = useAppSelector((state: RootState) => state.main.network);
  const checkboxs = useAppSelector((state: RootState) => state.checkbox);
  const catalog = useAppSelector((state: RootState) => state.catalog);
  const select = useAppSelector((state: RootState) => state.select);
  const context = useContext(Context);
  const dispatch = useAppDispatch();
  const header = useAppSelector(
    (state: RootState) => state.header.underList[0]
  );

  useEffect(() => {
    if (!catalog.articles.length) {
      dispatch(choiceCity(props));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const town = header.list[select.filter.city].text.replace(/на сутки/gi, "");
    const linkTown = header.list[select.filter.city].text.replace(
      /квартиры/gi,
      "Аренда квартир"
    );

    setLinkCity(linkTown);
    setCity(town);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.filter.city]);

  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>

      <div className={styles["container-background"]}>
        <LinkNavigation option_v1={true} main={city} deepLink={linkCity} />
        <h3 className={styles["title-h3"]}>Рекомендуем посмотреть</h3>
        <div className={styles["block-link"]}>
          {catalog.recommendedRooms.map((el, index) => (
            <Link className={styles.link} key={index} href="./">
              {el}
            </Link>
          ))}
        </div>
      </div>

      <div className={checkboxs.settings ? styles["filterRooms-position"] : ""}>
        <FilterRooms
          classes={{
            classNavbar: styles.navbar,
            classSelectflex: styles["select-flex"],
            classSettings: styles["settings-flex"],
            classTitle: styles["title-under"],
            classFlex: styles["filter-flex"],
            classList: styles["list-flex"],
            classLine: styles.line,
          }}
          component={<Control />}
          arrayRooms={true}
        />
      </div>

      <h2 className={styles["title-h2"]}>
        Найдено {catalog.totalData} результата
      </h2>

      <ListArticles
        alternative={!context.colourSprite}
        sliderTrue={true}
        list={catalog.articles}
        classes={{
          classUl: context.colourSprite
            ? styles["catalog-list"]
            : styles["catalog-list-row"],
          classList: context.colourSprite
            ? styles["catalog-item"]
            : styles["catalog-item-row"],
        }}
      />

      <div className={styles["block-footer"]}>
        <PaginationNumbering
          classes={{ wrapper: styles["pagination-wrapper"] }}
          totalItems={catalog.totalData}
          currentPage={catalog.currentPage}
          itemsPerPage={9}
          link={`catalog`}
        />
        <div className={styles["block-network"]}>
          <p className={styles["network-text"]}>Поделиться</p>
          {network.map((el, index) => (
            <Link className={styles.network} key={index} href={el.href}>
              <Sprite id={el.net} height="16" width="18" colour="black" />
            </Link>
          ))}
        </div>
      </div>

      <MapBackground wrapper={styles.wrapper} paragraph={true} />
    </>
  );
};

export const getStaticProps = () => {
  const { articles, total } = getData({
    limit: 9,
    page: 1,
    array: cities.minsk,
  });

  return {
    props: {
      articles,
      totalData: total,
      currentPage: 1,
    },
  };
};

export default Catalog;
