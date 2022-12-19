import { articlesThunk } from "../redux/reducers/articlesReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ImageBlock } from "../common/ImageBlock";
import { LinkNavigation, List } from "../common";
import styles from "../styles/Main.module.scss";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { Select } from "../common/Select";
import { Slider } from "../common/Slider";
import parse from "html-react-parser";
import { Sprite } from "../svg";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const main = useAppSelector((state: RootState) => state.main);
  const rooms = useAppSelector((state: RootState) => state.articles);
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    let interval = 6;
    dispatch(articlesThunk(interval));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <Head>
          <title>Главная</title>
        </Head>

        {/* Фильтр городов. */}
        <div className={styles["block-filter"]}>
          <h1 className={styles.title}>
            Sdaem.by - у нас живут
            <span className={styles["title-colour"]}>ваши объявления</span>
          </h1>

          <List
            array={main.array}
            beginNumber={1}
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
                    massive={main.massive[0]}
                    setActive={setActive}
                    option_2v={true}
                    active={active}
                  />
                </div>
                <div className={styles["block-line"]} />
              </div>
            ))}

            {/* Цена за сутки (BYN) */}
            <div>
              <h2 className={styles["title-under"]}>
                Цена за сутки (BYN)
              </h2>
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

        {/* Показ и выбор городов. */}
        <div className={styles.block}>
          {/* Картинки. */}
          <div className={styles["block-picture"]}>
            {main.pictureSize.map((el) => (
              <ImageBlock
                title_2h={el.title_2h}
                title_3h={el.title_3h}
                cl_title_2h={el.cl_title_2h}
                cl_title_3h={el.cl_title_3h}
                cities={main.cities}
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

          {/* Куб точек. */}
          <div className={styles["position-picture"]}>
            <Image
              src={"/points.png"}
              alt="points"
              height={61}
              width={61}
            />
          </div>
        </div>

        {/* Квартиры и слайдер. */}
        <div className={styles["block-slider"]}>
          <LinkNavigation
            deepLink="Аренда квартир в Минске"
            main="КВАРТИРЫ НА СУТКИ"
            option_v3={true}
          />

          {/* Slider */}
          <div className={styles["slider-margin"]}>
            <Slider array={rooms.articles.items} />
          </div>

          {/* Фон. */}
          <div className={styles.background} />

          {/* Внутри фона. */}
          <div className={styles["background-select"]}>
            {/* Метро && Район */}
            {[0, 1].map((_, index) => (
              <div key={index}>
                <Select
                  massive={main.metroAndArea[index]}
                  setActive={setActive}
                  option_3v={true}
                  active={active}
                />
              </div>
            ))}
          </div>

          {/* Под slider'ом */}
          <div className={styles["block-under-slider"]}>
            <div>
              <div className={styles["articles-length"]}>
                {rooms.articles.lengthItems}
                <span className={styles["articles-plus"]}>+</span>
              </div>
              <p className={styles["under-text"]}>Предложений по Минску</p>
            </div>

            <div
              className={clsx(
                styles["block-line-margin"],
                styles["block-line"]
              )}
            />

            <Link href="./" className={styles["button-watch-alles"]}>
              Посмотреть все
              <div className={styles["sprite-margin"]}>
                <Sprite id="mark" colour="#ffffff" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div>
        {/* Карта. */}
        <div className={styles["map-wrapper"]}>
          <h2 className={styles["map-title-h2"]}>
            Поиск квартир на карте
          </h2>

          <h3 className={styles["map-title-h3"]}>
            Ищите квартиры на сутки в центре города,
            <br /> возле парка или в живописном районе
          </h3>

          <button className={styles["map-button"]}>
            <Sprite id="sign" height="15" width="15" colour="#FFD54F" />
            Открыть карту
          </button>

          <Image
            className={styles["map-image"]}
            src="/white-points.png"
            height={61}
            width={61}
            alt="points"
          />

          <div className={styles["map-block"]}>
            {main.card.map((el, index) => (
              <div
                className={clsx(
                  styles["map-item"],
                  index === 2 && styles["map-item-yellow"]
                )}
                key={index}>
                {el.sprite ? (
                  <div className={styles["map-sprite-and-text"]}>
                    <div className={styles["map-sprite"]}>
                      <Sprite id={el.sprite} />
                    </div>
                    <h4 className={styles["map-title-h4"]}>{el.title}</h4>
                  </div>
                ) : (
                  <div>
                    <h4 className={styles["map-title-gold"]}>
                      {el.title}
                    </h4>
                  </div>
                )}

                <div>
                  <p className={styles["map-paragraph"]}>
                    {parse(el.paragraph)}
                  </p>
                  <br />

                  {el.paragraph_2 && (
                    <p className={styles["map-paragraph"]}>
                      {parse(el.paragraph_2)}
                    </p>
                  )}
                </div>

                {index === 0 ? (
                  <button className={styles["map-button-white"]}>
                    {el.button}
                  </button>
                ) : (
                  <button
                    className={
                      (index === 1 && styles["map-button-white"]) ||
                      styles["map-button-violet"]
                    }>
                    {el.button}
                    <div className={styles["map-sprite-mark"]}>
                      <Sprite
                        id="mark"
                        height="10"
                        width="10"
                        colour={(index === 1 && "black") || "white"}
                      />
                    </div>
                  </button>
                )}

                {el.cross && (
                  <div className={styles["map-image-background"]}>
                    <Image
                      src={el.cross}
                      alt="block"
                      height={230}
                      width={270}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Описание. */}
        <div className={styles["description-wrapper"]}>
          {/* Левый блок. */}
          <div className={styles["description-block"]}>
            <div className={styles["description-block-info"]}>
              <div className={styles["description-position"]}>
                <h3 className={styles["description-title"]}>
                  ЧТО ТАКОЕ SDAEM.BY
                </h3>

                <h4 className={styles["description-title-under"]}>
                  Квартира на сутки в Минске
                </h4>

                <Image
                  className={styles["description-point"]}
                  src="/points.png"
                  height={61}
                  width={61}
                  alt="picture"
                />

                <Image
                  className={styles["description-city"]}
                  src="/minsk.png"
                  height={230}
                  width={405}
                  alt="city"
                />
              </div>

              <div className={styles["description-block-paragraph"]}>
                <p className={styles["description-paragraph"]}>
                  <strong>Нужна квартира на сутки в Минске?</strong>
                  <br />
                  На веб-сайте sdaem.by вас ждет масса выгодных
                  предложений. Каталог насчитывает
                  <strong> более 500 квартир.</strong>
                  <br />
                  Благодаря удобной навигации вы быстро найдете подходящий
                  вариант.
                </p>
                <br />
                <p className={styles["description-paragraph"]}>
                  В каталоге представлены комфортабельные <br />
                  однокомнатные квартиры на сутки и квартиры с большим
                  <br />
                  количеством комнат в разных районах города, с
                  <br />
                  различной степенью удобства от дешевых до VIP
                  <br /> с джакузи.
                </p>
              </div>
            </div>

            <p className={styles["description-paragraph"]}>
              Чтобы снять квартиру на сутки в Минске, вам достаточно
              определиться с выбором и связаться с владельцем для уточнения
              условий аренды и заключить договор. Заметим, на сайте
              представлены исключительно квартиры на сутки без посредников,
              что избавляет посетителей от необходимости взаимодействовать
              с агентствами, тратя свое время и деньги. Также пользователи
              сайта могут совершенно бесплатно размещать объявления о
              готовности сдать квартиру на сутки.
            </p>
          </div>

          {/* Правый блок. */}
          <div className={styles["description-block-right"]}>
            <Image
              className={styles["description-point-news"]}
              src="/points.png"
              height={61}
              width={61}
              alt="picture"
            />

            <h3 className={styles["description-title-under"]}>Новости</h3>

            {/* Список новостей. */}
            <div className={styles["description-list"]}>
              {rooms.articles.news.map((el: any, index) => (
                <div key={index}>
                  <p className={styles["description-paragraph-news"]}>
                    {el.title}
                  </p>

                  <time
                    className={styles["description-time"]}
                    dateTime="2023-01-15">
                    {el.date}
                  </time>

                  {index !== 4 && (
                    <hr className={styles["description-line"]} />
                  )}
                </div>
              ))}
            </div>

            <Link className={styles["description-button"]} href="./">
              Посмотреть все
              <div className={styles["description-sprite"]}>
                <Sprite id="mark" colour="#664ef9" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
