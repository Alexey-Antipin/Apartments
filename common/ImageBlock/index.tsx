import { useAppDispatch, selectCity } from "../../redux";
import React, { useRef, useState } from "react";
import styles from "./ImageBlock.module.scss";
import { useRouter } from "next/router";
import { Sprite } from "../../svg";
import Image from "next/image";
import clsx from "clsx";

type ImagePropsBlock = {
  cl_title_2h: string;
  cl_title_3h: string;
  title_2h: string;
  title_3h: string;
  massive: string[];
  indexMap: number;
  cities: string[];
  width: number;
};

export const ImageBlock: React.FC<ImagePropsBlock> = ({
  cl_title_2h,
  cl_title_3h,
  title_2h,
  title_3h,
  indexMap,
  massive,
  cities,
  width,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [count, setCount] = useState<number>(4);
  const slider = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = (index: number) => {
    dispatch(selectCity(index));
    router.push("catalog");
  };

  const handleClickOfSlider = () => {
    if (slider.current == null || disabled) return;

    // Заблокировать кнопку
    setDisabled(true);

    let positionImage = slider.current.childNodes as NodeListOf<HTMLElement>;
    positionImage[count].classList.add(styles["shift-image"]);

    // Возвращаем в начальное состояние
    if (count == 1) {
      setTimeout(() => {
        positionImage.forEach((element) => {
          element.classList.remove(styles["shift-image"]);
        });
      }, 800);
      setCount(4);
    } else {
      setCount((prev) => prev - 1);
    }

    // Разблокировать кнопку
    setTimeout(() => {
      setDisabled(false);
    }, 800);
  };

  return (
    <div className={styles.block}>
      <h2 className={clsx(styles["title_2h"], cl_title_2h)}>{title_2h}</h2>
      <h3 className={clsx(styles["title_3h"], cl_title_3h)}>{title_3h}</h3>

      {/* Кнопки переходов в catalog*/}
      {cities && indexMap === 1 && (
        <div className={styles["block-cities"]}>
          {cities.map((city, index) => (
            <button
              className={styles["block-cities-button"]}
              key={index}
              onClick={() => handleClick(index)}>
              {city}
            </button>
          ))}
        </div>
      )}

      {/* slider */}
      <div
        className={styles["block-image"]}
        style={{ width: width }}
        ref={slider}>
        {massive.map((elem, index) => (
          <Image
            key={`${index}-slider`}
            className={styles.image}
            src={`/main/${elem}.png`}
            alt={`picture-${index + 1}`}
            width={width}
            height={270}
          />
        ))}
      </div>

      {/* Кнопка slider */}
      {indexMap !== 1 && (
        <button
          className={styles.button}
          onClick={() => handleClickOfSlider()}
          disabled={disabled}>
          <Sprite id="mark" colour="#FFFFFF" height="13" width="13" />
        </button>
      )}
    </div>
  );
};
