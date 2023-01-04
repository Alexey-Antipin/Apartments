import { useEffect, useRef, useState } from "react";
import styles from "./ListArticles.module.scss";
import { ArticleProps } from "../../ts";
import { Sprite } from "../../svg";
import { Slider } from "../Slider";
import Image from "next/image";

export const ListArticles: React.FC<ArticleProps> = ({
  sliderTrue,
  useSquare,
  classes,
  list,
}) => {
  const ref = useRef<HTMLUListElement>(null);
  const [openContacts, setOpenContacts] = useState<number | null>(null);

  const handleClickOfButton = (elem: number) => {
    if (elem == openContacts) {
      setOpenContacts(null);
      return;
    }
    setOpenContacts(elem);
  };

  useEffect(() => {
    if (openContacts == null) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current == null) {
        return;
      }
      if (!ref.current.contains(event.target as Element)) {
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
              <div className={styles.label}>Gold</div>
            )}

            <div className={styles["image-block"]}>
              {sliderTrue ? (
                <Slider
                  interval={1624}
                  step={406}
                  classes={{
                    containerSlider: styles["slider-container"],
                    wrapperSlider: styles["slider-wrapper"],
                    buttonDisabled: styles["slider-button-disabled"],
                    blockButton: styles["slider-block"],
                    button: styles["slider-button"],
                  }}
                  colourSliderDisabled={"#b4b4b4"}
                  colourSlider={"#FFFFFF"}
                  id={item.id}>
                  {[0, 1, 2, 3, 4].map((el, index) => (
                    <div className={styles["slider-image"]} key={index}>
                      <Image
                        className={styles.image}
                        height={226}
                        width={item.photoMassive[el].width}
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

            {item.price && (
              <div>
                <div className={styles["info-room-block"]}>
                  <div className={styles["info-price"]}>
                    {item.price}
                    <span className={styles["info-price-day"]}>
                      за сутки
                    </span>
                  </div>

                  <div className={styles["info-block"]}>
                    <div className={styles["info-room"]}>
                      <Sprite
                        id="user"
                        height="15"
                        width="15"
                        colour="#686868"
                      />
                      {item.room_people}
                    </div>

                    <div className={styles["info-room"]}>
                      {item.room} комн.
                    </div>

                    {useSquare && (
                      <div className={styles["info-room"]}>
                        {item.square}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles["block-city"]}>
                  <div className={styles["block-street"]}>
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

                  <div className={styles["block-metro"]}>
                    <div className={styles["block-flex"]}>
                      <Sprite id="metro" />
                      <p>{item.station}</p>
                    </div>

                    <div className={styles["block-flex"]}>
                      <div className={styles.point} />
                      <p>{item.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {item.title && <h3 className={styles.title}>{item.title}</h3>}

            <p
              className={
                (item.price && styles["description-room"]) ||
                styles.description
              }>
              {item.description}
            </p>
            <hr className={styles.linier}></hr>
            {!item.price && (
              <div className={styles.block}>
                <time className={styles.date}>{item.time}</time>
                <a className={styles.link} href={`./${item.id}`}>
                  Читать
                </a>
              </div>
            )}

            {item.price && (
              <div className={styles["button-block"]}>
                <button className={styles["button-add"]}>
                  <Sprite
                    insideColour="#EB5757"
                    colour="#EB57571A"
                    id="heart"
                  />
                </button>

                <button
                  className={styles["button-contacts"]}
                  onClick={() => handleClickOfButton(index)}>
                  <Sprite id="mobile" colour="#664EF9" />
                  <div>Контакты</div>
                </button>

                <button className={styles["button-More"]}>
                  Подробнее
                </button>
              </div>
            )}

            {/* Контакты владельца */}
            {openContacts === index && (
              <div className={styles.contacts}>
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
