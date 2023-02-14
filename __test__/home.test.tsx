import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { Home } from "../components/home";
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

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("Home", () => {
  test("heading", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(document.title).toBe("Главная");
  });
  test("link-catalog", () => {
    jest.mock(
      "next/link",
      () =>
        ({ children, ...rest }: { children: ReactElement }) =>
          React.cloneElement(children, { ...rest })
    );
    const { getAllByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    let link = getAllByText("Посмотреть все");
    expect(link[0]).toHaveAttribute("href", "./catalog");
  });
  test("link-news", () => {
    jest.mock(
      "next/link",
      () =>
        ({ children, ...rest }: { children: ReactElement }) =>
          React.cloneElement(children, { ...rest })
    );
    const { getAllByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    let link = getAllByText("Посмотреть все");
    expect(link[1]).toHaveAttribute("href", "./news");
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
