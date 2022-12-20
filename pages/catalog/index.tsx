import { useEffect, useState } from "react";
import { LinkNavigation } from "../../common/LinkNavigation";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const Catalog: React.FC = () => {
  const select = useAppSelector((state: RootState) => state.select);
  const [city, setCity] = useState<string>("Квартиры в Минске");
  const [linkCity, setLinkCity] = useState<string>("Квартиры в Минске");

  useEffect(() => {
    const town = select.city.replace(/на сутки/gi, "");
    const linkTown = select.city.replace(/квартиры/gi, "Аренда квартир");

    setLinkCity(linkTown);
    setCity(town);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.city]);

  return (
    <>
      <LinkNavigation option_v1={true} main={city} deepLink={linkCity} />
      <h3>Рекомендуем посмотреть</h3>
    </>
  );
};

export default Catalog;
