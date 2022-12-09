import styles from "../styles/Main.module.scss";
import { ImageBlock } from "../common/ImageBlock";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Select } from "../common/Select";
import { useState } from "react";
import { List } from "../common";
import { Sprite } from "../svg";
import Image from "next/image";

const Home: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const main = useAppSelector((state: RootState) => state.main);
  const pictureSize = [
    {
      index: 1,
      width: 516,
      title_2h: "СНЯТЬ КВАРТИРУ",
      title_3h: "Квартиры на сутки",
      cl_title_2h: styles["title_2h-1"],
      cl_title_3h: styles["title_3h-1"],
    },
    {
      index: 2,
      width: 407,
      title_2h: "СНЯТЬ КОТТЕДЖ НА ПРАЗДНИК",
      title_3h: "Коттеджи и усадьбы",
      cl_title_2h: styles["title_2h-1"],
      cl_title_3h: styles["title_3h-2"],
    },
    {
      index: 3,
      width: 407,
      title_2h: "ПОПАРИТЬСЯ В БАНЕ С ДРУЗЬЯМИ",
      title_3h: "Бани и сауны",
      cl_title_2h: styles["title_2h-1"],
      cl_title_3h: styles["title_3h-2"],
    },
    {
      index: 4,
      width: 516,
      title_2h: "ЕСЛИ СРОЧНО НУЖНА МАШИНА",
      title_3h: "Авто на прокат",
      cl_title_2h: styles["title_2h-2"],
      cl_title_3h: styles["title_3h-3"],
    },
  ];
  const cities = [
    "Минск",
    "Витебск",
    "Гродно",
    "Гомель",
    "Брест",
    "Могилев",
  ];

  return (
    <div className={styles.wrapper}>
      {/* Фильтр городов. */}
      <div className={styles["block-filter"]}>
        <h1 className={styles.title}>
          Sdaem.by - у нас живут
          <span className={styles["title-colour"]}>ваши объявления</span>
        </h1>

        <List
          array={main.array}
          active={true}
          classes={{
            classUl: styles["list-ul"],
          }}
        />
        <div className={styles.navbar}>
          {/* Город && Комнаты */}
          {["Город", "Комнаты"].map((el, index) => (
            <div className={styles["select-flex"]} key={index}>
              <div>
                <h2 className={styles["title-under"]}>{el}</h2>
                <Select
                  classItemActive={styles["select-list-active"]}
                  classUnderList={styles["select-underList"]}
                  classSprite={styles["select-sprite"]}
                  classText={styles["select-text"]}
                  classItem={styles["select-list"]}
                  classHover={styles["select-hover"]}
                  massive={main.massive[0]}
                  setActive={setActive}
                  underlining={false}
                  active={active}
                  ban={true}
                />
              </div>
              <div className={styles["block-line"]} />
            </div>
          ))}

          {/* Цена за сутки (BYN) */}
          <div>
            <h2 className={styles["title-under"]}>Цена за сутки (BYN)</h2>
            <div className={styles["filter-price-flex"]}>
              <input
                className={styles["filter-price"]}
                type="number"
                placeholder="От"
              />
              <div className={styles.trait}>-</div>
              <input
                className={styles["filter-price"]}
                type="number"
                placeholder="До"
              />
            </div>
          </div>
          <div className={styles["block-line"]} />

          {/* Больше опций */}
          <div className={styles["button-center"]}>
            <button className={styles.button}>Больше опций</button>
            <Sprite id="setting" />
          </div>
          <div className={styles["block-line"]} />

          {/* На карте */}
          <div className={styles["block-padding"]}>
            <button className={styles.button}>На карте</button>
            <Sprite id="sign" colour="#664EF9" height="15" width="12" />
          </div>

          {/* Показать */}
          <button className={styles["button-main"]}>
            <span className={styles["text-padding"]}>Показать</span>
            <Sprite id="mark" colour="black" />
          </button>
        </div>
      </div>

      {/* Показ и выбор городов */}
      <div className={styles.block}>
        {/* Картинки */}
        <div className={styles["block-picture"]}>
          {pictureSize.map((el) => (
            <ImageBlock
              title_2h={el.title_2h}
              title_3h={el.title_3h}
              cl_title_2h={el.cl_title_2h}
              cl_title_3h={el.cl_title_3h}
              cities={cities}
              width={el.width}
              index={el.index}
              key={el.index}
            />
          ))}
        </div>

        {/* Выбор городов. */}
        <div className={styles["city-block"]}>
          {[0, 1, 2].map((el) => (
            <List
              key={el}
              title={main.massiveList[el].title}
              array={main.massiveList[el].massive}
              classes={{
                classList: styles["city-List"],
                classTitle: styles["city-title"],
                classUl: styles["city-ul"],
              }}
            />
          ))}
        </div>
      </div>
      
      <div className={styles["position-picture"]}>
        <Image src={"/points.png"} alt="points" height={61} width={61} />
      </div>
    </div>
  );
};

export default Home;
