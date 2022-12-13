import React, { useState, useEffect, useRef } from "react";
import { ListArticles } from "../ListArticles";
import styles from "./Slider.module.scss";
import { ArticleRoom } from "../../ts";
import { Sprite } from "../../svg";

type SliderOfProps = {
  array: ArticleRoom[];
};

export const Slider: React.FC<SliderOfProps> = ({ array }) => {
  const [position, setPosition] = useState<number>(0);
  const slider = useRef<any>(null);

  useEffect(() => {
    controller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const controller = () => {
    if (slider.current !== null) {
      slider.current.childNodes.forEach((element: any) => {
        element.style = `transform: translateX(${position}px)`;
      });
    }
  };

  const handleClickPrev = () => {
    if (position >= 0) {
      return;
    }
    setPosition((prev) => prev + 1490);
  };

  const handleClickNext = () => {
    if (position <= -1490) {
      return;
    }
    setPosition((prev) => prev - 1490);
  };

  return (
    <div className={styles.slider}>
      <div ref={slider}>
        <ListArticles
          list={array}
          classes={{
            classUl: styles["block-list"],
            classList: styles["item-list"],
          }}
        />
      </div>

      <div className={styles["block-button"]}>
        <button
          className={styles.button}
          onClick={() => handleClickPrev()}>
          <Sprite id="mark" colour="#664EF9" height="16" width="16" />
        </button>

        <button
          className={styles.button}
          onClick={() => handleClickNext()}>
          <Sprite id="mark" colour="#664EF9" height="16" width="16" />
        </button>
      </div>
    </div>
  );
};
