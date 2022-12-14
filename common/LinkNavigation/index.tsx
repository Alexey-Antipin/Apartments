import styles from "./LinkNavigation.module.scss";
import { LinkProps } from "../../ts";
import { Sprite } from "../../svg";
import React from "react";
import clsx from "clsx";

export const LinkNavigation: React.FC<LinkProps> = ({
  option_v1,
  option_v2,
  option_v3,
  deepLink,
  main,
}) => {
  return (
    <div>
      <div className={styles.block}>
        {option_v1 && (
          <>
            <Sprite id="home" />
            <div className={styles.round}></div>
            <div className={clsx(styles.main, styles.option_v1_main)}>
              {main}
            </div>
          </>
        )}

        {option_v2 && (
          <>
            <Sprite id="home" />
            <div className={clsx(styles.main, styles["option_v2_main"])}>
              {main}
            </div>
            <div className={styles.round}></div>
            <div
              className={clsx(styles.main, styles["option_v2_deepLink"])}>
              {deepLink}
            </div>
          </>
        )}

        {option_v3 && (
          <div className={clsx(styles.main, styles["option_v3_main"])}>
            {main}
          </div>
        )}
      </div>

      <h2
        className={clsx(
          option_v3 && styles["deepLink-margin"],
          styles.deepLink
        )}>
        {deepLink}
      </h2>
    </div>
  );
};
