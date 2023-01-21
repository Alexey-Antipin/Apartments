import { reset, toogleBox } from "../../redux/reducers/checkboxReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { choiceCity } from "../../redux/reducers/catalogReducer";
import { useEffect, useRef, useState } from "react";
import getProducts from "../pagination/getData";
import { RootState } from "../../redux/store";
import styles from "./Filter.module.scss";
import { useRouter } from "next/router";
import { Checkbox } from "../checkbox";
import { cities } from "../../mocks";
import { Select } from "../select";
import { Sprite } from "../../svg";
import clsx from "clsx";
import {
  selectPriceMin,
  selectPriceMax,
  defaultPrice,
} from "../../redux/reducers/selectReducer";
import { MassiveOfSelect, MoreCheckbox, ArticleRoom, Object } from "../../ts";

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

  const [cancelClosed, setCancelClosed] = useState<boolean>(false);
  const [activeSettings, setActiveSettings] = useState<number>(0);
  const [valueMax, setValueMax] = useState<string>("");
  const [valueMin, setValueMin] = useState<string>("");
  const [zeroing, setZeroing] = useState<number>();
  const [active, setActive] = useState<number>(0);
  const rooms: MassiveOfSelect = main.massive[1];

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Показать объекты
  const handleClick = () => {
    // Выбор города
    const newCity: ArticleRoom[] = optionCity();

    // Фильтр цен
    const arrayPrice = filterPrice(newCity);

    // Фильтр спальные места, район, метро
    const arrayRestOfElements = filterSelects(arrayPrice);

    // Дополнительные опции
    const options = additionalOptions(arrayRestOfElements);

    const { articles, total } = getProducts({
      limit: 9,
      page: 1,
      array: options,
    });

    dispatch(
      choiceCity({
        totalData: total,
        currentPage: 1,
        articles,
      })
    );

    if (router.pathname !== "/catalog") {
      router.push(`./catalog/`);
    }
  };

  // Выбор города
  const optionCity = () => {
    switch (select.filter.city) {
      case 0:
        return cities.minsk;
      case 1:
        return cities.gomel;
      case 2:
        return cities.brest;
      case 3:
        return cities.vitebsk;
      case 4:
        return cities.grodno;
      case 5:
        return cities.mogilev;
      default:
        return cities.minsk;
    }
  };

  // Выбор цен
  const optionPrice = () => {
    // Минимум цена
    if (valueMin) {
      dispatch(selectPriceMin(valueMin));
    } else {
      dispatch(selectPriceMin("0"));
    }

    // Максимум цена
    if (!valueMax) {
      dispatch(selectPriceMax("10000"));
      return;
    }

    if (valueMin >= valueMax) {
      dispatch(selectPriceMax(valueMin));
    } else {
      dispatch(selectPriceMax(valueMax));
    }
  };

  // Фильтр цен и комнат
  const filterPrice = (array: ArticleRoom[]) => {
    return array.filter(
      (item) =>
        +select.filter.priceMin <= +item.price &&
        +item.price <= +select.filter.priceMax &&
        (select.filter.rooms !== 0
          ? select.filter.rooms == item.room
          : item.room)
    );
  };

  // Фильтр спальные места, район, метро
  const filterSelects = (array: ArticleRoom[]) => {
    // Деструктуризация
    let { places, metro, area } = select.filter;

    // Если не выбрано ничего
    if (!places && !metro && !area) {
      return array;
    }

    // Если выбраны
    return array.filter((item) => {
      return (
        (places ? item.places == places : item.places) &&
        (metro ? item.station == metro : item.station) &&
        (area ? item.area == area : item.area)
      );
    });
  };

  // Дополнительные опции
  const additionalOptions = (array: ArticleRoom[]) => {
    // Ключи
    let keys = checkbox.checkboxForComparison;

    // Список
    let box: Object[] = [
      ...checkbox.checkboxMassive[0].list,
      ...checkbox.checkboxMassive[1].list,
    ];

    // Запись статусов
    let statuses: Array<boolean> = [];

    // Получение статусов
    box.forEach((item) => {
      return statuses.push(item.status);
    });

    // Если в statuses всё false
    if (statuses.includes(true)) {
      // Готовый объект для сравнивания
      let more: MoreCheckbox = {};

      // Создание: ключ - значение
      box.forEach((item, index: number) => {
        more[keys[index]] = item.status;
      });

      // Фильтруем массив
      return array.filter((item) => {
        return JSON.stringify(item.more) === JSON.stringify(more);
      });
    } else {
      // Иначе возвращаем нетронутый массив
      return array;
    }
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
    optionPrice();
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
          <Sprite id="setting" />

          <div className={clsx(classes?.classLine, styles.line)} />
        </div>

        {/* Остальное */}
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
              className={clsx(styles["button-main"], styles["button-colour"])}
              onClick={() => handleClick()}>
              <span className={styles["text-padding"]}>Показать объекты</span>
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
