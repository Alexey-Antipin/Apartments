import { render } from "@testing-library/react";
import { Footer } from "../components/footer";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "./",
      pathname: "",
      query: "",
      asPath: "/",
      push: jest.fn(),
    };
  },
}));

describe("Footer", () => {
  test("heading", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    let heading = getByRole("heading", { name: /Мы в соцсетях/i });
    expect(heading).toBeInTheDocument();
  });
  test("telefon", () => {
    jest.mock(
      "next/link",
      () =>
        ({ children, ...rest }: { children: ReactElement }) =>
          React.cloneElement(children, { ...rest })
    );
    const { getByRole } = render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    let telefon = getByRole("link", { name: "+375 29 621 48 33," });
    expect(telefon).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
