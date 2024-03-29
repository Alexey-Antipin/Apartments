import { additionalOptions, redirectOfCatalog, selectionPrice } from "../";
import { MassiveOfSelect, ArticleRoom } from "../../../ts";
import { useEffect, useRef, useState } from "react";
import styles from "./Filter.module.scss";
import { Checkbox } from "../../checkbox";
import { useRouter } from "next/router";
import { Select } from "../../select";
import { Sprite } from "../../../svg";
import axios from "axios";
import clsx from "clsx";
import {
  useAppDispatch,
  useAppSelector,
  defaultPrice,
  RootState,
  toogleBox,
  reset,
} from "../../../redux";

type ClassFilter = {
  classSelectflex: string;
  classSettings?: string;
  classNavbar: string;
  classList?: string;
  classTitle: string;
  classFlex: string;
  classLine: string;
};

type FilterRoomsTypes = {
  classes?: ClassFilter;
  component?: JSX.Element;
  arrayRooms?: boolean;
  option?: boolean;
};

export const FilterRooms: React.FC<FilterRoomsTypes> = ({
  arrayRooms,
  component,
  classes,
  option,
}) => {
  const checkbox = useAppSelector((state: RootState) => state.checkbox);
  const select = useAppSelector((state: RootState) => state.select);
  const main = useAppSelector((state: RootState) => state.main);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [cancelClosed, setCancelClosed] = useState<boolean>(false);
  const [activeSettings, setActiveSettings] = useState<number>(0);
  const [valueMax, setValueMax] = useState<string>("");
  const [valueMin, setValueMin] = useState<string>("");
  const [zeroing, setZeroing] = useState<number>();
  const [active, setActive] = useState<number>(0);
  const rooms: MassiveOfSelect = main.massive[1];

  // Показать объекты
  const handleClick = async () => {
    const statuses = additionalOptions(checkbox);

    // Запрос города
    let { data } = await axios.get<ArticleRoom[]>(
      process.env.NEXT_PUBLIC_SITE_GET_CITY,
      {
        params: {
          city: select.filter.city,
          priceMin: select.filter.priceMin,
          priceMax: select.filter.priceMax,
          rooms: select.filter.rooms,
          places: select.filter.places,
          metro: select.filter.metro,
          area: select.filter.area,
          statuses: statuses,
        },
      }
    );

    // Перенаправление в каталог, деление на страницы
    redirectOfCatalog(data, dispatch, router);
  };

  // Больше опций
  const handleClickSettings = () => {
    dispatch(toogleBox(!checkbox.settings));
  };

  // Очистить всё
  const handleClickOfClean = () => {
    dispatch(defaultPrice());
    dispatch(reset());
    setValueMax("");
    setValueMin("");
    setZeroing(0);
  };

  // Только числа
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value.replace(/^[^0-9]{0,3}$/, "");
  };

  useEffect(() => {
    selectionPrice(valueMin, valueMax, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueMin, valueMax]);

  useEffect(() => {
    if (!checkbox.settings) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current == null) return;

      if (!ref.current.contains(e.target as Element) && !cancelClosed) {
        dispatch(toogleBox(false));
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className={clsx(classes?.classNavbar, styles.navbar)} ref={ref}>
      {/* Фильтр блок */}
      <div className={classes?.classSelectflex || styles["select-flex"]}>
        {/* Город && Комнаты */}
        {((arrayRooms && [rooms]) || main.massive).map((item, index) => (
          <div className={styles["select-map"]} key={index}>
            <div
              className={classes?.classFlex}
              onClick={() => dispatch(toogleBox(false))}>
              <h2 className={classes?.classTitle || styles["title-under"]}>
                {item.element}
              </h2>
              <Select
                setZeroing={setZeroing}
                setActive={setActive}
                zeroing={zeroing}
                option_2v={true}
                active={active}
                massive={item}
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
        <div
          className={styles["button-center"]}
          onClick={() => handleClickSettings()}>
          <div className={clsx(classes?.classLine, styles.line)} />

          <button className={styles.button}>Больше опций</button>
          <div className={styles["sprite-button"]}>
            <Sprite id="setting" />
          </div>

          <div className={clsx(classes?.classLine, styles.line)} />
        </div>

        {/* Остальное */}
        {option ? (
          <>
            {/* На карте */}
            <div className={styles.padding}>
              <button className={styles.button}>На карте</button>
              <div className={styles["sprite-button"]}>
                <Sprite id="sign" colour="#664EF9" height="15" width="12" />
              </div>
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
              <span className={styles["close-text-adaptive"]}>Очистить</span>
              <div className={styles["button-clear-svg"]}>
                <Sprite id="brush" />
              </div>
            </button>

            {/* Показать объекты */}
            <button
              className={styles["button-main-catalog"]}
              onClick={() => handleClick()}>
              <span
                className={clsx(
                  styles["text-padding"],
                  styles["turn-off-text"]
                )}>
                Показать объекты
              </span>
              <Sprite id="mark" colour="#FFFFFF" />
            </button>
          </>
        )}
      </div>

      {/* Открывающийся блок */}
      {checkbox.settings && (
        <div className={classes?.classSettings || styles["filter-block"]}>
          {/* Спальные места, Район, Метро */}
          <div className={styles.filter}>
            {main.filterList.map((array, index) => (
              <div
                className={classes?.classList || styles["filter-list"]}
                key={index}>
                <h2 className={classes?.classTitle || styles["title-under"]}>
                  {array.title}
                </h2>
                <Select
                  cancelClosed={setCancelClosed}
                  setActive={setActiveSettings}
                  active={activeSettings}
                  setZeroing={setZeroing}
                  zeroing={zeroing}
                  option_3v={true}
                  massive={array}
                />
              </div>
            ))}
          </div>

          {/* Флажки */}
          <div className={styles["checkbox-block"]}>
            <Checkbox
              massive={checkbox.checkboxMassive[0].list}
              numberling={0}
            />
            <Checkbox
              massive={checkbox.checkboxMassive[1].list}
              numberling={1}
            />
          </div>
        </div>
      )}

      {/* Компонент любой */}
      {component}
    </div>
  );
};
