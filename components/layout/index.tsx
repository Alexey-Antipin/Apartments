import styles from "./Layout.module.scss";
import { useRouter } from "next/router";
import { LayoutProps } from "../../ts";
import { Footer } from "../footer";
import { Header } from "../header";
import Head from "next/head";

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const url = router.asPath;
  
  return (
    <div className={styles.wrapper}>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>

      {url !== "/registration" && url !== "/authorization" ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Layout;
