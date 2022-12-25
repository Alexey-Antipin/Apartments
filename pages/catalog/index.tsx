import { LinkNavigation } from "../../common/LinkNavigation";
import { useAppSelector } from "../../redux/hooks";
import { FilterRooms } from "../../common/filter";
import { MapBackground } from "../../common/map";
import { Control } from "../../common/control";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import { Sprite } from "../../svg";
import Link from "next/link";

const Catalog: React.FC = () => {
  const [city, setCity] = useState<string>("Квартиры в Минске");
  const [linkCity, setLinkCity] = useState<string>("Квартиры в Минске");

  const select = useAppSelector((state: RootState) => state.select);
  const tagRooms = useAppSelector((state: RootState) => state.catalog);

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
          classTitle: styles["title-under"],
          classFlex: styles["filter-flex"],
          classLine: styles.line,
        }}
        massive={[{ city: "Комнаты", index: 1 }]}
      />
      <Control />

      <h2 className={styles["title-h2"]}>Найдено 234 результата</h2>

      <div className={styles["block-footer"]}>
        <div>1,2,3,4,5,6,7,8</div>
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
