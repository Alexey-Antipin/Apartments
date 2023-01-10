import styles from "./Layout.module.scss";
import { LayoutProps } from "../../ts";
import { Footer } from "../footer";
import { Header } from "../header";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
