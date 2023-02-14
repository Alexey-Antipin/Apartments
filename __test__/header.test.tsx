import { render } from "@testing-library/react";
import { Header } from "../components/header";
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

describe("Header", () => {
  test("heading", () => {
    jest.mock(
      "next/link",
      () =>
        ({ children, ...rest }: { children: ReactElement }) =>
          React.cloneElement(children, { ...rest })
    );
    const { getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    let link = getByRole("link", { name: "Вход и регистрация" });
    expect(link).toBeInTheDocument();
  });
  test("button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    let button = getByRole("button", { name: "+ Разместить объявление" });
    expect(button).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
