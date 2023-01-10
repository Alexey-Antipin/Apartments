import styles from "./Pagination.module.scss";
import { PaginationProps } from "../../../ts";
import { Logic } from "../Logic";
import Link from "next/link";

export const PaginationNumbering = ({
  classes,
  itemsPerPage = 9,
  currentPage,
  totalItems,
  link,
}: PaginationProps) => {
  const pages = Logic(totalItems, currentPage, itemsPerPage);

  return (
    <div className={classes?.wrapper || styles.wrapper}>
      {pages.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={index} className={styles.item}>
            {pageNumber}
          </span>
        ) : (
          <Link
            key={index}
            href={`/${link}/${pageNumber}`}
            className={
              pageNumber === currentPage
                ? styles["item-active"]
                : styles.item
            }>
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
};
