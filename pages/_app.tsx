import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout from "../components/layout";
import "../styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default App;
