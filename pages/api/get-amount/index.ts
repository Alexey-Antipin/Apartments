import { NextApiRequest, NextApiResponse } from "next";
import { cities, cottage } from "../../../mocks";

const GetAmount = (req: NextApiRequest, res: NextApiResponse) => {
  let { cottages, countryComplex, farmsteads, recreationCenters } = cottage;
  let amountCottages = [
    cottages,
    countryComplex,
    farmsteads,
    recreationCenters,
  ];
  let count: number[] = [];

  let { minsk, gomel, brest, vitebsk, grodno, mogilev } = cities;
  let amountRooms = [minsk, gomel, brest, vitebsk, grodno, mogilev];
  let amount: number[] = [];

  for (let i = 0; i < amountRooms.length; i++) {
    amount.push(amountRooms[i].length);
  }
  for (let i = 0; i < amountCottages.length; i++) {
    count.push(amountCottages[i].length);
  }

  res.json({ amount, count });
};

export default GetAmount;
