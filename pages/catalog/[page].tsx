import {cities} from "../../mocks";
import { ListArticles, PaginationNumbering } from "../../common";
import { LinkNavigation } from "../../common/LinkNavigation";
import getProducts from "../../common/Pagination/GetData";
import { useAppSelector } from "../../redux/hooks";
import { FilterRooms } from "../../common/filter";
import { MapBackground } from "../../common/map";
import { Control } from "../../common/control";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import { Sprite } from "../../svg";
import { Article } from "../../ts";
import Link from "next/link";
import Head from "next/head";

type Params = { params: { page: string } };

type Props = {
  currentPage: number;
  totalData: number;
  articles: Article[];
};

const Catalog: React.FC<Props> = ({
  articles,
  totalData,
  currentPage,
}) => {
  const [linkCity, setLinkCity] = useState<string>("Квартиры в Минске");
  const [city, setCity] = useState<string>("Квартиры в Минске");

  const tagRooms = useAppSelector((state: RootState) => state.catalog);
  const select = useAppSelector((state: RootState) => state.select);

  const network = [
    { net: "vk", href: "./" },
    { net: "facebook-2", href: "./" },
    { net: "viber", href: "./" },
    { net: "telegram", href: "./" },
    { net: "whatsapp", href: "./" },
  ];

  useEffect(() => {
    if (!select.city) return;

    const town = select.city.replace(/на сутки/gi, "");
    const linkTown = select.city.replace(/квартиры/gi, "Аренда квартир");

    setLinkCity(linkTown);
    setCity(town);
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
          {tagRooms.recommendedRooms.map((el, index) => (
            <Link className={styles.link} key={index} href="./">
              {el}
            </Link>
          ))}
        </div>
      </div>

      <FilterRooms
        classes={{
          classNavbar: styles.navbar,
          classSelectflex: styles["select-flex"],
          classTitle: styles["title-under"],
          classFlex: styles["filter-flex"],
          classLine: styles.line,
        }}
        massive={[{ city: "Комнаты", index: 1 }]}
      />
      <Control />

      <h2 className={styles["title-h2"]}>Найдено 234 результата</h2>

      <ListArticles
        list={articles}
        classes={{
          classUl: styles["catalog-list"],
          classList: styles["catalog-item"],
        }}
      />

      <div className={styles["block-footer"]}>
        <PaginationNumbering
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
