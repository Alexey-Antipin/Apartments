import { Context } from "../components/context";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useState } from "react";
import "../styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const [heart, setHeart] = useState<number>(0);

  return (
    <Context.Provider value={{heart, setHeart}}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </Context.Provider>
  );
};

export default App;
