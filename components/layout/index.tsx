import { Footer } from "../footer";
import { Header } from "../header";
import { LayoutProps } from "../../ts";
import styles from "./Layout.module.scss";

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
