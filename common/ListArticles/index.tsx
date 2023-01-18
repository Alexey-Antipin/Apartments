import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../components/context";
import styles from "./ListArticles.module.scss";
import { ArticleProps } from "../../ts";
import { Sprite } from "../../svg";
import { Slider } from "../slider";
import Image from "next/image";
import clsx from "clsx";

export const ListArticles: React.FC<ArticleProps> = ({
  alternative,
  sliderTrue,
  useSquare,
  classes,
  list,
}) => {
  const [openContacts, setOpenContacts] = useState<number | null>(null);
  const [listHearts, setListHearts] = useState<Array<string>>([]);
  const ref = useRef<HTMLUListElement>(null);
  const context = useContext(Context);

  const handleClickOfButton = (elem: number) => {
    if (elem == openContacts) {
      setOpenContacts(null);
      return;
    }
    setOpenContacts(elem);
  };

  const handleClick = (id: string) => {
    let el = listHearts.filter((element) => element == id);
    if (el.length) {
      context.setHeart((prev: number) => prev - 1);
      setListHearts(listHearts.filter((element) => element !== id));
    } else {
      context.setHeart((prev: number) => prev + 1);
      setListHearts([...listHearts, id]);
    }
  };

  const handleChangeColour = (id: string) => {
    let res = listHearts.find((el) => el === id);
    if (res) return "#EB5757";
  };

  const changeWidth = (width: number) => {
    if (width == 406) return "542";
  };

  useEffect(() => {
    if (openContacts == null) return;
    console.log(ref);

    const handleClick = (event: MouseEvent) => {
      if (ref.current == null) {
        return;
      }
      if (
        !ref.current.childNodes[openContacts].contains(
          event.target as Element
        )
      ) {
        setOpenContacts(null);
        return;
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <ul className={classes?.classUl || styles.list} ref={ref}>
      {list.map((item, index: number) => {
        return (
          <li className={classes?.classList || styles.element} key={index}>
            {item.class == "Gold" && (
              <div
                className={clsx(
                  styles.label,
                  alternative && styles["alternative-label"]
                )}>
                Gold
              </div>
            )}

            {/* Картинка */}
            <div
              className={
                (alternative && styles["alternative-image-block"]) ||
                styles["image-block"]
              }>
              {sliderTrue ? (
                <Slider
                  interval={(alternative && 2168) || 1624}
                  step={(alternative && 542) || 406}
                  classes={{
                    containerSlider: styles["slider-container"],
                    buttonDisabled: styles["slider-button-disabled"],
                    blockButton:
                      (alternative &&
                        styles["alternative-slider-block"]) ||
                      styles["slider-block"],
                    button: styles["slider-button"],
                  }}
                  colourSliderDisabled={"#b4b4b4"}
                  colourSlider={"#FFFFFF"}
                  id={item.id}>
                  {[0, 1, 2, 3, 4].map((el, index) => (
                    <div
                      className={
                        (alternative &&
                          styles["alternative-slider-image"]) ||
                        styles["slider-image"]
                      }
                      key={index}>
                      <Image
                        className={styles.image}
                        height={(alternative && 300) || 226}
                        width={
                          (alternative &&
                            changeWidth(item.photoMassive[el].width)) ||
                          item.photoMassive[el].width
                        }
                        alt={item.photoMassive[el].photo}
                        src={item.photoMassive[el].photo}
                        priority
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <Image
                  className={styles.image}
                  height={226}
                  width={item.width}
                  priority
                  src={item.photo}
                  alt="home"
                />
              )}
            </div>

            {/* Контент */}
            <div
              className={
                (alternative && styles["alternative-block"]) || ""
              }>
              {item.price && (
                <div>
                  <div
                    className={clsx(
                      alternative && styles["alternative-room-block"],
                      styles["info-room-block"]
                    )}>
                    {alternative && (
                      <div className={styles["alternative-text"]}>
                        {item.room}-комн. апартаменты на {item.station}
                      </div>
                    )}

                    {/* Цена */}
                    <div
                      className={clsx(
                        alternative && styles["alternative-info-price"],
                        styles["info-price"]
                      )}>
                      {item.price}  BYN
                      <span className={styles["info-price-day"]}>
                        за сутки
                      </span>
                    </div>

                    {!alternative && (
                      <div className={styles["info-block"]}>
                        {/* Количество людей */}
                        <div className={styles["info-room"]}>
                          <Sprite
                            id="user"
                            height="15"
                            width="15"
                            colour="#686868"
                          />
                          {item.room_people}
                        </div>

                        {/* Комнаты */}
                        <div className={styles["info-room"]}>
                          {item.room} комн.
                        </div>

                        {/* кв метры */}
                        {useSquare && (
                          <div className={styles["info-room"]}>
                            {item.square}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className={!alternative ? styles["block-city"] : ""}>
                    {/* Улица */}
                    <div
                      className={clsx(
                        alternative && styles["alternative-street-colour"],
                        styles["block-street"]
                      )}>
                      <Sprite
                        id="sign"
                        colour="#BDBDBD"
                        height="15"
                        width="12"
                      />
                      <p>
                        {item.city}, {item.street}
                      </p>
                    </div>

                    {/* Блок */}
                    <div
                      className={
                        (alternative && styles["alternative-metro"]) ||
                        styles["block-metro"]
                      }>
                      {alternative && (
                        <>
                          {/* Количество людей */}
                          <div className={styles["alternative-info"]}>
                            <Sprite
                              id="user"
                              height="15"
                              width="15"
                              colour="#686868"
                            />
                            {item.room_people}
                          </div>

                          {/* Комнаты */}
                          <div className={styles["alternative-info"]}>
                            {item.room} комн.
                          </div>
                        </>
                      )}

                      {/* Метро */}
                      <div
                        className={
                          (alternative &&
                            clsx(
                              styles["alternative-info"],
                              styles["alternative-colour"]
                            )) ||
                          styles["block-flex"]
                        }>
                        <Sprite id="metro" />
                        <p>{item.station}</p>
                      </div>

                      {/* Район */}
                      <div
                        className={
                          (alternative && styles["alternative-info"]) ||
                          styles["block-flex"]
                        }>
                        {!alternative ? (
                          <div className={styles.point} />
                        ) : (
                          <div className={styles["alternative-point"]}>
                            район:
                          </div>
                        )}
                        <p>{item.area}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.title && (
                <h3 className={styles.title}>{item.title}</h3>
              )}

              {/* Описание */}
              <p
                className={
                  clsx(
                    item.price && styles["description-room"],
                    alternative && styles["alternative-room"]
                  ) || styles.description
                }>
                {item.description}
              </p>

              {/* Линия */}
              {!alternative && <hr className={styles.linier}></hr>}

              {/* Читать */}
              {!item.price && (
                <div className={styles.block}>
                  <time className={styles.date}>{item.time}</time>
                  <a className={styles.link} href={`/news-detailed/${item.id}`}>
                    Читать
                  </a>
                </div>
              )}

              {/* Кнопки */}
              {item.price && (
                <div
                  className={
                    (alternative && styles["alternative-button-block"]) ||
                    styles["button-block"]
                  }>
                  {/* В закладки */}
                  <button
                    className={
                      (alternative && styles["alternative-button"]) ||
                      styles["button-add"]
                    }
                    onClick={() => handleClick(item.id)}>
                    <Sprite
                      insideColour="#EB5757"
                      colour={handleChangeColour(item.id) || "#EB57571A"}
                      id="heart"
                    />
                    {alternative && (
                      <div className={styles["alternative-button-text"]}>
                        В закладки
                      </div>
                    )}
                  </button>

                  {/* Контакты */}
                  <button
                    className={
                      alternative
                        ? clsx(
                            styles["alternative-button-contacts"],
                            styles["alternative-order"]
                          )
                        : styles["button-contacts"]
                    }
                    onClick={() => handleClickOfButton(index)}>
                    <Sprite id="mobile" colour="#664EF9" />
                    <div>Контакты</div>
                  </button>

                  {/* Подробнее */}
                  <button
                    className={clsx(
                      alternative && styles["alternative-button-more"],
                      styles["button-More"]
                    )}>
                    Подробнее
                  </button>
                </div>
              )}
            </div>

            {/* Контакты владельца */}
            {openContacts === index && (
              <div
                className={clsx(
                  alternative && styles["alternative-contacts"],
                  styles.contacts
                )}>
                <div className={styles["contacts-face"]}></div>
                <h2 className={styles["contacts-title"]}>Владелец</h2>
                <div className={styles["contacts-data"]}>
                  {item.contacts.master}
                </div>
                {/* Телефон */}
                <a
                  className={styles["contacts-data"]}
                  href={`tel:${item.contacts.telefon}`}>
                  {item.contacts.telefon}
                </a>
                {/* Почта */}
                <a
                  className={styles["contacts-email"]}
                  href={`mailto:${item.contacts.email}`}>
                  {item.contacts.email}
                </a>
                {/* Ссылки */}
                <div className={styles["contacts-block"]}>
                  <a
                    className={styles["contacts-links"]}
                    href={`viber://chat?${item.contacts.link.viber}`}>
                    <Sprite id="viber" colour="#FFFFFF" />
                  </a>
                  <a
                    className={styles["contacts-links"]}
                    href={`https://wa.me/${item.contacts.link.whats_app}`}>
                    <Sprite id="whatsapp" colour="#FFFFFF" />
                  </a>
                  <a
                    className={styles["contacts-links"]}
                    href={`mailto:${item.contacts.link.email}`}>
                    <Sprite id="email" colour="#FFFFFF" />
                  </a>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
