import styles from "./ImageBlock.module.scss";
import { Sprite } from "../../svg";
import Image from "next/image";
import React from "react";
import clsx from "clsx";

type ImagePropsBlock = {
  cl_title_2h: string;
  cl_title_3h: string;
  title_2h: string;
  title_3h: string;
  cities: string[];
  index: number;
  width: number;
};

export const ImageBlock: React.FC<ImagePropsBlock> = ({
  cl_title_2h,
  cl_title_3h,
  title_2h,
  title_3h,
  cities,
  index,
  width,
}) => {
  return (
    <div className={styles.block}>
      <h2 className={clsx(styles["title_2h"], cl_title_2h)}>{title_2h}</h2>
      <h3 className={clsx(styles["title_3h"], cl_title_3h)}>{title_3h}</h3>

      {cities && index === 1 && (
        <div className={styles["block-cities"]}>
          {cities.map((city, index) => (
            <button className={styles["block-cities-button"]} key={index}>
              {city}
            </button>
          ))}
        </div>
      )}

      <Image
        src={`/main/picture-${index}.png`}
        alt={`main-picture-${index}`}
        width={width}
        height={270}
      />
      {index !== 1 && (
        <button className={styles.button}>
          <Sprite id="mark" colour="#FFFFFF" height="13" width="13" />
        </button>
      )}
    </div>
  );
};
