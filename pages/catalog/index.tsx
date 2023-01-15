import { ListArticles, PaginationNumbering } from "../../common";
import { LinkNavigation } from "../../common/linkNavigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../components/context";
import { useAppSelector } from "../../redux/hooks";
import { FilterRooms } from "../../common/filter";
import { MapBackground } from "../../common/map";
import { Control } from "../../common/control";
import { RootState } from "../../redux/store";
import styles from "./Catalog.module.scss";
import { ArticleRoom } from "../../ts";
import { cities } from "../../mocks";
import { Sprite } from "../../svg";
import Link from "next/link";
import Head from "next/head";

const Catalog: React.FC = () => {
  const [articles, setArticles] = useState<ArticleRoom[]>([]);
  const [linkCity, setLinkCity] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const header = useAppSelector(
    (state: RootState) => state.header.underList[0]
  );
  const checkboxs = useAppSelector((state: RootState) => state.checkbox);
  const catalog = useAppSelector((state: RootState) => state.catalog);
  const select = useAppSelector((state: RootState) => state.select);
  const context = useContext(Context);

  const network = [
    { net: "vk", href: "./" },
    { net: "facebook-2", href: "./" },
    { net: "viber", href: "./" },
    { net: "telegram", href: "./" },
    { net: "whatsapp", href: "./" },
  ];

  useEffect(() => {
    setArticles(catalog.articles);
  }, [catalog.articles]);

  useEffect(() => {
    const town = header.list[select.city].text.replace(/на сутки/gi, "");
    const linkTown = header.list[select.city].text.replace(
      /квартиры/gi,
      "Аренда квартир"
    );

    setLinkCity(linkTown);
    setCity(town);

    if (catalog.articles.length == 0) {
      setArticles(cities.minsk);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.city]);

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
        Найдено {articles.length} результата
      </h2>

      <ListArticles
        alternative={!context.colourSprite}
        sliderTrue={true}
        list={articles}
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

export default Catalog;
