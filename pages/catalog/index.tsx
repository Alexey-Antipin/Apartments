import { useContext, useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import { Context } from "../../components";
import { useRouter } from "next/router";
import { ArticleRoom } from "../../ts";
import { cities } from "../../mocks";
import { Sprite } from "../../svg";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import {
  PaginationNumbering,
  redirectOfCatalog,
  additionalOptions,
  LinkNavigation,
  MapBackground,
  ListArticles,
  FilterRooms,
  getData,
  Control,
} from "../../common/";
import {
  selectCountRooms,
  useAppDispatch,
  useAppSelector,
  selectPriceMin,
  selectPriceMax,
  defaultPrice,
  selectArea,
  choiceCity,
  RootState,
  reset,
} from "../../redux";

type Props = {
  articles: ArticleRoom[];
  currentPage: number;
  totalData: number;
};

const Catalog: React.FC<Props> = (props) => {
  const [recommendedRooms, setRecommendedRooms] = useState<any>(false);
  const [linkCity, setLinkCity] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const { header, main, checkbox, catalog, select } = useAppSelector(
    (state: RootState) => state
  );
  const context = useContext(Context);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const list = header.underList[0].list[select.filter.city];
    const linkTown = list.text.replace(/квартиры/gi, "Аренда квартир");
    const town = list.text.replace(/на сутки/gi, "");

    setLinkCity(linkTown);
    setCity(town);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.filter.city]);

  useEffect(() => {
    if (!catalog.articles.length) {
      dispatch(choiceCity(props));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (word: string, view: string, num: number) => {
    // Обнуляем
    dispatch(defaultPrice());
    dispatch(reset());

    // При клике, выбираем
    switch (view) {
      case "price":
        dispatch(selectPriceMin("60"));
        dispatch(selectPriceMax("120"));
        break;
      case "room":
        dispatch(selectCountRooms(num));
        break;
      case "area":
        dispatch(selectArea(word));
        break;
      default:
        break;
    }

    setRecommendedRooms(true);
  };

  useEffect(() => {
    if (!recommendedRooms) return;

    const handleClickOfButton = async () => {
      const statuses = additionalOptions(checkbox);

      // Запрос города
      let { data } = await axios.get<ArticleRoom[]>(
        "http://localhost:3000/api/get-city/",
        {
          params: {
            city: select.filter.city,
            priceMin: select.filter.priceMin,
            priceMax: select.filter.priceMax,
            rooms: select.filter.rooms,
            places: select.filter.places,
            metro: select.filter.metro,
            area: select.filter.area,
            statuses: statuses,
          },
        }
      );

      // Перенаправление в каталог, деление на страницы
      redirectOfCatalog(data, dispatch, router);
    };
    handleClickOfButton();

    setRecommendedRooms(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendedRooms]);

  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>

      <div className={styles["container-background"]}>
        <LinkNavigation option_v1={true} main={city} deepLink={linkCity} />
        <h3 className={styles["title-h3"]}>Рекомендуем посмотреть</h3>
        <div className={styles["block-link"]}>
          {catalog.recommendedRooms.map((item, index) => (
            <div
              className={styles.link}
              onClick={() =>
                handleClick(item.word, item.view, item.num as number)
              }
              key={index}>
              {item.word}
            </div>
          ))}
        </div>
      </div>

      <div className={checkbox.settings ? styles["filterRooms-position"] : ""}>
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
          {main.network.map((el, index) => (
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
