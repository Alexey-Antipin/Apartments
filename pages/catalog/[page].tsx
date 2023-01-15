import { ListArticles, PaginationNumbering } from "../../common";
import { LinkNavigation } from "../../common/linkNavigation";
import getProducts from "../../common/Pagination/getData";
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

type Params = { params: { page: string } };

type Props = {
  currentPage: number;
  totalData: number;
  articles: ArticleRoom[];
};

const Catalog: React.FC<Props> = ({
  articles,
  totalData,
  currentPage,
}) => {
  const [linkCity, setLinkCity] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const checkboxs = useAppSelector((state: RootState) => state.checkbox);
  const tagRooms = useAppSelector((state: RootState) => state.catalog);
  const header = useAppSelector(
    (state: RootState) => state.header.underList[0]
  );
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
    const town = header.list[select.city].text.replace(/на сутки/gi, "");
    const linkTown = header.list[select.city].text.replace(
      /квартиры/gi,
      "Аренда квартир"
    );

    setLinkCity(linkTown);
    setCity(town);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>

      <div className={styles["container-background"]}>
        <LinkNavigation option_v1={true} main={city} deepLink={linkCity} />
        <h3 className={styles["title-h3"]}>Рекомендуем посмотреть</h3>
        <div className={styles["block-link"]}>
          {tagRooms.recommendedRooms.map((el, index) => (
            <Link className={styles.link} key={index} href="./">
              {el}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={
          checkboxs.settings ? styles["filterRooms-position"] : ""
        }>
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
        Найдено {totalData} результата
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
          totalItems={totalData}
          currentPage={currentPage}
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

export const getStaticProps = async ({ params }: Params) => {
  const page = Number(params?.page) || 1;
  const { articles, total } = await getProducts({
    limit: 9,
    page,
    array: cities.minsk,
  });

  if (!articles.length) {
    return {
      notFound: true,
    };
  }

  if (page === 1) {
    return {
      redirect: {
        destination: "/catalog",
        permanent: false,
      },
    };
  }

  return {
    props: {
      articles,
      totalData: total,
      currentPage: page,
      a: params,
    },
    revalidate: 60 * 60 * 24, // <--- ISR cache: once a day
  };
};

export const getStaticPaths = async () => {
  return {
    paths: Array.from({ length: 5 }).map(
      (_, index) => `/catalog/${index + 2}`
    ),
    fallback: "blocking",
  };
};

export default Catalog;
