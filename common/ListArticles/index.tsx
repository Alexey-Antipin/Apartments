import styles from "./ListArticles.module.scss";
import { ArticleProps } from "../../ts";
import Image from "next/image";
import { Sprite } from "../../svg";

export const ListArticles: React.FC<ArticleProps> = ({
  list,
  classes,
}) => {
  return (
    <ul className={classes?.classUl || styles.list}>
      {list.map((item, index) => {
        return (
          <li className={classes?.classList || styles.element} key={index}>
            {item.class == "Gold" && (
              <div className={styles.label}>Gold</div>
            )}

            <div className={styles["image-block"]}>
              <Image
                className={styles.image}
                height={226}
                width={item.width}
                priority
                src={item.photo}
                alt="home"
              />
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

                    <div className={styles["info-room"]}>
                      {item.square}
                    </div>
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
                <button className={styles["button-contacts"]}>
                  <Sprite id="mobile" colour="#664EF9" />
                  <div>Контакты</div>
                </button>

                <button className={styles["button-More"]}>
                  Подробнее
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
