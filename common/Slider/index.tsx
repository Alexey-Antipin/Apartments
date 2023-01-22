import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../../components";
import styles from "./Slider.module.scss";
import { Sprite } from "../../svg";

type SliderOfProps = {
  children: JSX.Element | JSX.Element[];
  classes?: {
    containerSlider: string;
    buttonDisabled: string;
    blockButton: string;
    button: string;
  };
  colourSliderDisabled?: string;
  colourSlider?: string;
  interval: number;
  step: number;
  id?: string;
};

export const Slider: React.FC<SliderOfProps> = ({
  colourSliderDisabled,
  colourSlider,
  children,
  interval,
  classes,
  step,
  id,
}) => {
  const [disabled, setDisabled] = useState<boolean | null>(true);
  const [positionRound, setPositionRound] = useState<number>(169);
  const [position, setPosition] = useState<number>(0);
  const context = useContext(Context);
  const slider = useRef<any>(null);

  useEffect(() => {
    if (position >= 0) {
      setDisabled(true);
    } else if (position <= -interval) {
      setDisabled(false);
    } else {
      setDisabled(null);
    }
    controller();
    controllerRounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, positionRound, context.colourSprite]);

  useEffect(() => {
    if (context.colourSprite) {
      setPositionRound(169);
    } else {
      setPositionRound(237);
    }
    setPosition(0);
  }, [context.colourSprite]);

  const controller = () => {
    if (slider.current !== null) {
      slider.current.childNodes.forEach((element: any) => {
        element.style = `transform: translateX(${position}px)`;
      });
    }
  };

  const controllerRounds = () => {
    let documentPosition = document.getElementById(`round-active-${id}`);
    if (documentPosition !== null) {
      documentPosition.style.left = `${positionRound}px`;
    }
  };

  const handleClickPrev = () => {
    if (position >= 0) return;
    setPosition((prev) => prev + step);
    setPositionRound((prev) => prev - 15);
  };

  const handleClickNext = () => {
    if (position <= -interval) return;
    setPosition((prev) => prev - step);
    setPositionRound((prev) => prev + 15);
  };

  return (
    <>
      <div className={classes?.containerSlider} ref={slider}>
        {children}
      </div>

      <div className={classes?.blockButton || styles["block-button"]}>
        {/* Слева */}
        <button
          className={
            (disabled ? classes?.buttonDisabled : classes?.button) ||
            (disabled ? styles["button-disabled"] : styles.button)
          }
          onClick={() => handleClickPrev()}
          id="button-left">
          <Sprite
            id="mark"
            colour={
              (disabled ? colourSliderDisabled : colourSlider) ||
              (disabled ? "#dcd6ff" : "#664EF9")
            }
            height="16"
            width="16"
          />
        </button>

        {/* Справа */}
        <button
          className={
            (disabled == false ? classes?.buttonDisabled : classes?.button) ||
            (disabled == false ? styles["button-disabled"] : styles.button)
          }
          onClick={() => handleClickNext()}
          id="button-right">
          <Sprite
            id="mark"
            colour={
              (disabled == false ? colourSliderDisabled : colourSlider) ||
              (disabled == false ? "#dcd6ff" : "#664EF9")
            }
            height="16"
            width="16"
          />
        </button>
      </div>

      {/* Кружочки */}
      {colourSlider && (
        <div className={styles["slider-block"]}>
          <div
            className={styles["slider-round-active"]}
            id={`round-active-${id}`}
          />
          {[0, 1, 2, 3, 4].map((_, index) => (
            <div className={styles["slider-rounds"]} key={index} />
          ))}
        </div>
      )}
    </>
  );
};
