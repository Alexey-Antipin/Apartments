import Authorization from "../pages/authorization";
import { render } from "@testing-library/react";
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

describe("Authorization", () => {
  test("Head", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Authorization />
      </Provider>
    );
    let head = getByText(/Авторизация/i);
    expect(head).toBeInTheDocument();
  });
  test("button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Authorization />
      </Provider>
    );
    let button = getByRole("button", { name: /Войти/i });
    expect(button).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Authorization />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});