import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import getProducts from "../../paginat/getData";
import { choiceCity } from "../../../redux";
import { ArticleRoom } from "../../../ts";
import { NextRouter } from "next/router";

// Перенаправление в каталог
export const redirectOfCatalog = (
  massive: ArticleRoom[],
  dispatch: ThunkDispatch<{}, undefined, AnyAction>,
  router: NextRouter
) => {
  const { articles, total } = getProducts({
    limit: 9,
    page: 1,
    array: massive,
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
