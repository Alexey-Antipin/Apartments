import { Footer } from "../footer";
import { Header } from "../header";
import { LayoutProps } from "../../ts";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
