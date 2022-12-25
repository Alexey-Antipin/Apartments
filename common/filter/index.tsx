import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import styles from "./Filter.module.scss";
import { useRouter } from "next/router";
import { Select } from "../Select";
import { Sprite } from "../../svg";
import clsx from "clsx";
import {
  selectPriceMin,
  selectPriceMax,
} from "../../redux/reducers/selectReducer";

type ClassFilter = {
  classNavbar: string;
  classTitle: string;
  classFlex: string;
  classLine: string;
};

type FilterRoomsTypes = {
  classes?: ClassFilter;
  massive?: Massive[];
  option?: boolean;
};

type Massive = { city: string; index: number };

export const FilterRooms: React.FC<FilterRoomsTypes> = ({
  classes,
  massive,
  option,
}) => {
  const ref: any = useRef();
  const parameters = useAppSelector((state: RootState) => state.select);
  const main = useAppSelector((state: RootState) => state.main);

  const [activeSettings, setActiveSettings] = useState<number>(0);
  const [settings, setSettings] = useState<boolean>(false);
  const [valueMax, setValueMax] = useState<string>("");
  const [valueMin, setValueMin] = useState<string>("");
  const [zeroing, setZeroing] = useState<number>();
  const [active, setActive] = useState<number>(0);

  const cities = [
    { city: "Город", index: 0 },
    { city: "Комнаты", index: 1 },
  ];

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(selectPriceMin(valueMin));

    if (valueMin > valueMax) {
      dispatch(selectPriceMax(valueMin));
    } else {
      dispatch(selectPriceMax(valueMax));
    }

    if (parameters.city || parameters.rooms) {
      return router.push(
        `./catalog/?${parameters.city || parameters.rooms}`
      );
    }
    router.push(`./catalog/?${main.massiveList[0].massive[0]}`);
  };

  const handleClickOfClean = () => {
    setValueMax("");
    setValueMin("");
    setZeroing(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value.replace(/^[^0-9]{0,3}$/, "");
  };

  useEffect(() => {
    if (!settings) return;

    const handleClick = (e: any) => {
      if (!ref.current.contains(e.target)) {
        setSettings(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      <div className={clsx(classes?.classNavbar, styles.navbar)} ref={ref}>
        {/* Город && Комнаты */}
        {(massive || cities).map((el, index) => (
          <div className={styles["select-flex"]} key={index}>
            <div className={classes?.classFlex}>
              <h2 className={classes?.classTitle || styles["title-under"]}>
                {el.city}
              </h2>
              <Select
                massive={main.massive[el.index]}
                option_2v={true}
                category={el.city}
                setActive={setActive}
                active={active}
                setZeroing={setZeroing}
                zeroing={zeroing}
              />
            </div>
            <div className={clsx(classes?.classLine, styles.line)} />
          </div>
        ))}
        {/* Цена за сутки (BYN) */}
        <div className={classes?.classFlex}>
          <h2 className={classes?.classTitle || styles["title-under"]}>
            Цена за сутки (BYN)
          </h2>
          <div className={styles["filter-price-flex"]}>
            <input
              className={styles["filter-price"]}
              onChange={(event: any) => setValueMin(handleChange(event))}
              value={valueMin}
              placeholder="От"
              maxLength={5}
            />
            <div className={styles.trait}>-</div>
            <input
              className={styles["filter-price"]}
              onChange={(event) => setValueMax(handleChange(event))}
              value={valueMax}
              placeholder="До"
              maxLength={5}
            />
          </div>
        </div>
        {/* Больше опций */}
        <div className={styles["button-center"]}>
          <div className={clsx(classes?.classLine, styles.line)} />

          <div>
            <button
              className={styles.button}
              onClick={() => setSettings(!settings)}>
              Больше опций
            </button>
            <Sprite id="setting" />
          </div>

          <div className={clsx(classes?.classLine, styles.line)} />
        </div>
        {option ? (
          <>
            {/* На карте */}
            <div className={styles.padding}>
              <button className={styles.button}>На карте</button>
              <Sprite id="sign" colour="#664EF9" height="15" width="12" />
            </div>

            {/* Показать */}
            <button
              className={styles["button-main"]}
              onClick={() => handleClick()}>
              <span className={styles["text-padding"]}>Показать</span>
              <Sprite id="mark" colour="black" />
            </button>
          </>
        ) : (
          <>
            {/* Очистить параметры */}
            <button
              className={styles["button-clear"]}
              onClick={() => handleClickOfClean()}>
              Очистить
            </button>

            {/* Показать объекты */}
            <button
              className={clsx(
                styles["button-main"],
                styles["button-colour"]
              )}
              onClick={() => handleClick()}>
              <span className={styles["text-padding"]}>
                Показать объекты
              </span>
              <Sprite id="mark" colour="#FFFFFF" />
            </button>
          </>
        )}
        {settings && (
          <div className={styles["filter-block"]}>
            <div className={styles.filter}>
              {main.filterList.map((array, index) => (
                <div className={styles["filter-list"]} key={index}>
                  <h2
                    className={
                      classes?.classTitle || styles["title-under"]
                    }>
                    {array.title}
                  </h2>
                  <Select
                    massive={array}
                    option_3v={true}
                    setActive={setActiveSettings}
                    active={activeSettings}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
