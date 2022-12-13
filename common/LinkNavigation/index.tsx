import styles from "./LinkNavigation.module.scss";
import { LinkProps } from "../../ts";
import { Sprite } from "../../svg";
import React from "react";

export const LinkNavigation: React.FC<LinkProps> = ({
  link,
  deeperLink,
}) => {
  return (
    <div className={styles.link}>
      {!deeperLink ? (
        <div className={styles.block}>
          <Sprite id="home" />
          <div className={styles.round}></div>
          <p>{link}</p>
        </div>
      ) : (
        <div className={styles.block}>
          <Sprite id="home" colour={"#4E64F9"} />
          <p className={styles["text-blue"]}>{link}</p>
          <div className={styles.round}></div>
          <p className={styles.text}>{deeperLink}</p>
        </div>
      )}

      <h1 className={styles.title}>{deeperLink || link}</h1>
    </div>
  );
};
