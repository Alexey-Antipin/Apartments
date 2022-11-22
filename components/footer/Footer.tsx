import Link from "next/link";
import Image from "next/image";
import { Sprite } from "../../svg";
import { FooterOfArrayList, Network } from "../../ts";
import styles from "./Footer.module.scss";
import { List } from "../../common/List/List";

export const Footer: React.FC = () => {
  const socialNetwork: Network[] = [
    { name: "instagram", href: "https://www.instagram.com/" },
    { name: "vk", href: "https://vk.com/" },
    { name: "facebook", href: "https://ru-ru.facebook.com/" },
  ];
  const arraysList: FooterOfArrayList = {
    a: ["Коттеджи и усадьбы", "Бани и сауны", "Авто на прокат"],
    b: [
      "Квартиры",
      "Квартиры в Минске",
      "Квартиры в Гомеле",
      "Квартиры в Бресте",
    ],
    c: [
      "",
      "",
      "Квартиры в Витебске",
      "Квартиры в Гродно",
      "Квартиры в Могилеве",
    ],
    d: [
      "Новости",
      "Размещение и тарифы",
      "Объявления на карте",
      "Контакты",
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <Link href="./">
          <Image src="/logo.png" height="20" width="134" alt="logo" />
        </Link>
        <h4 className={styles["title-address"]}>СДАЁМ БАЙ</h4>
        <address className={styles.address}>
          ИП Шушкевич Андрей Викторович
          <br /> УНП 192602485 Минским горисполкомом
          <br />
          <time>10.02.2016</time>
          <br /> 220068, РБ, г. Минск, ул. Осипенко, 21, кв.23
          <br />
          <Link className={styles.telefon} href="tel:+375296214833">
            +375 29 621 48 33,
          </Link>
          <Link className={styles.colour} href="mailto:sdaem@sdaem.by">
            sdaem@sdaem.by
          </Link>
          <br /> Режим работы: <time>08:00-22:00</time>
        </address>
      </div>

      <div className={styles.container}>
        <nav className={styles.navigation}>
          <List
            classes={{
              classUl: styles["list-black"],
              classList: styles.item,
            }}
            usuallyArray={arraysList.a}
            usuallyList={true}
          />
          <List
            classes={{
              classUl: styles.list,
              classList: styles["item-second-block"],
            }}
            usuallyArray={arraysList.b}
            usuallyList={true}
          />
          <List
            classes={{
              classUl: styles.list,
              classList: styles.item,
            }}
            usuallyArray={arraysList.c}
            usuallyList={true}
          />
          <List
            classes={{
              classUl: styles.list,
              classList: styles.item,
            }}
            usuallyArray={arraysList.d}
            usuallyList={true}
          />
        </nav>

        <div className={styles.block}>
          <ul className={styles["social-network"]}>
            <h3 className={styles.title}>Мы в соцсетях</h3>
            {socialNetwork.map((elem, index) => (
              <li key={index}>
                <Link href={elem.href}>
                  <Sprite id={elem.name} />
                </Link>
              </li>
            ))}
          </ul>

          <ul className={styles.card}>
            {[
              { h: 13, w: 42 },
              { h: 13, w: 86 },
              { h: 16, w: 38 },
              { h: 20, w: 26 },
              { h: 16, w: 46 },
              { h: 30, w: 22 },
            ].map((elem, index) => (
              <li key={index}>
                <Image
                  src={`/card/i${index + 1}.png`}
                  height={elem.h}
                  width={elem.w}
                  alt="card"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
