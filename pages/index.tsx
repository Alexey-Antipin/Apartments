import { amountOfRoomsThunk } from "../redux/reducers/mainReducer";
import { articlesThunk } from "../redux/reducers/articlesReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LinkNavigation, List, ListArticles } from "../common";
import { ImageBlock } from "../common/ImageBlock";
import styles from "../styles/Main.module.scss";
import { FilterRooms } from "../common/filter";
import { MapBackground } from "../common/map";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { Select } from "../common/select";
import { Slider } from "../common/slider";
import parse from "html-react-parser";
import { Sprite } from "../svg";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<number>(0);

  const main = useAppSelector((state: RootState) => state.main);
  const rooms = useAppSelector((state: RootState) => state.articles);
  const select = useAppSelector((state: RootState) => state.select);
  const amount = [main.amountRooms.amount, main.amountRooms.cottage];

  useEffect(() => {
    let interval = 6;
    dispatch(articlesThunk(interval));
    dispatch(amountOfRoomsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterSlider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.metro, select.area]);

  // Фильтр
  const filterSlider = () => {
    if (!select.metro || !select.area) {
      return rooms.articles.items;
    }
    return rooms.articles.items.filter(
      (item) => select.metro == item.station && select.area == item.area
    );
  };

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
          <FilterRooms option={true} />
        </div>

        {/* Показ и выбор городов. */}
        <div className={styles.block}>
          {/* Картинки. */}
          <div className={styles["block-picture"]}>
            {main.pictureSize.map((el) => (
              <ImageBlock
                cl_title_2h={el.cl_title_2h}
                cl_title_3h={el.cl_title_3h}
                title_2h={el.title_2h}
                title_3h={el.title_3h}
                cities={main.cities}
                massive={el.massive}
                indexMap={el.index}
                width={el.width}
                key={el.index}
              />
            ))}
          </div>

          {/* Выбор городов. */}
          <div className={styles["city-block"]}>
            {[0, 1, 2, 3].map((el) => (
              <List
                key={el}
                array={main.massiveList[el].massive}
                header={main.massiveList[el]}
                classes={{
                  classDisabled: styles["city-disabled"],
                  classTitle: styles["city-title"],
                  classList: styles["city-list"],
                  classUl: styles["city-ul"],
                }}
                amount={amount[el]}
              />
            ))}
          </div>

          {/* Куб точек. */}
          <div className={styles["position-picture"]}>
            <Image src={"/points.png"} alt="points" height={61} width={61} />
          </div>
        </div>
      </div>

      {/* Квартиры и слайдер. */}
      <div className={styles["block-slider"]}>
        <div className={styles["slider-link"]}>
          <LinkNavigation
            deepLink="Аренда квартир в Минске"
            main="КВАРТИРЫ НА СУТКИ"
            option_v3={true}
          />
        </div>

        {/* Slider */}
        <div className={styles["slider-margin"]}>
          <Slider interval={1490} step={1490}>
            <ListArticles
              list={filterSlider()}
              useSquare={true}
              classes={{
                classUl: styles["block-list"],
                classList: styles["item-list"],
              }}
            />
          </Slider>
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
            className={clsx(styles["block-line-margin"], styles["block-line"])}
          />

          <Link href="./catalog" className={styles["button-watch-alles"]}>
            Посмотреть все
            <div className={styles["sprite-margin"]}>
              <Sprite id="mark" colour="#ffffff" />
            </div>
          </Link>
        </div>
      </div>

      <div>
        {/* Карта. */}
        <MapBackground>
          <>
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
                      <h4 className={styles["map-title-gold"]}>{el.title}</h4>
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
          </>
        </MapBackground>

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
                  На веб-сайте sdaem.by вас ждет масса выгодных предложений.
                  Каталог насчитывает
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
              условий аренды и заключить договор. Заметим, на сайте представлены
              исключительно квартиры на сутки без посредников, что избавляет
              посетителей от необходимости взаимодействовать с агентствами,
              тратя свое время и деньги. Также пользователи сайта могут
              совершенно бесплатно размещать объявления о готовности сдать
              квартиру на сутки.
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

                  {index !== 4 && <hr className={styles["description-line"]} />}
                </div>
              ))}
            </div>

            <Link
              className={styles["description-button"]}
              href="./news-detailed">
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
