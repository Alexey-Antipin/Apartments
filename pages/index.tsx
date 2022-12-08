import styles from "../styles/Main.module.scss";
import { Select } from "../common/Select";
import { useState } from "react";
import { List } from "../common";
import { Sprite } from "../svg";

const Home = () => {
  const [active, setActive] = useState<number>(0);

  const massive = {
    id: 10,
    text: "Выберите",
    sprite: "mark",
    list: [
      { id: 1, text: "Минске" },
      { id: 2, text: "Гомеле" },
      { id: 3, text: "Бресте" },
      { id: 4, text: "Витебске" },
      { id: 5, text: "Гродно" },
      { id: 6, text: "Могилеве" },
    ],
  };

  const array = [
    "Квартиры на сутки",
    "Коттеджи и усадьбы",
    "Бани и сауны",
    "Авто напрокат",
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles["block-filter"]}>
        <h1 className={styles.title}>
          Sdaem.by - у нас живут
          <span className={styles["title-colour"]}>ваши объявления</span>
        </h1>

        <List
          array={array}
          active={true}
          classes={{
            classUl: styles["list-ul"],
          }}
        />
        <div className={styles.navbar}>
          {/* Город */}
          <div>
            <h2 className={styles["title-under"]}>Город</h2>
            <Select
              active={active}
              massive={massive}
              underlining={false}
              setActive={setActive}
              classItem={styles["select-list"]}
              classSprite={styles["select-sprite"]}
              classUnderList={styles["select-underList"]}
            />
          </div>
          <div className={styles["block-line"]} />

          {/* Комнаты */}
          <div>
            <h2 className={styles["title-under"]}>Комнаты</h2>
            <Select
              active={active}
              massive={massive}
              underlining={false}
              setActive={setActive}
              classItem={styles["select-list"]}
              classSprite={styles["select-sprite"]}
              classUnderList={styles["select-underList"]}
            />
          </div>
          <div className={styles["block-line"]} />

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
            <Sprite id="mark" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
