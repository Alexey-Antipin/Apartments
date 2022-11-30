import Link from "next/link";
import { Logic } from "../Logic";
import { PaginationProps } from "../../../ts";
import styles from "./Pagination.module.scss";

export const PaginationNumbering = ({
  totalItems,
  currentPage,
  itemsPerPage = 9,
}: PaginationProps) => {
  const pages = Logic(totalItems, currentPage, itemsPerPage);

  return (
    <div className={styles.wrapper}>
      {pages.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span key={index} className={styles.item}>
            {pageNumber}
          </span>
        ) : (
          <Link
            key={index}
            href={`/news-detailed/${pageNumber}`}
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
