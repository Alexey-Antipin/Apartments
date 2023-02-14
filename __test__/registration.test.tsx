import Registration from "../pages/registration";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Registration", () => {
  test("Head", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Registration />
      </Provider>
    );
    let head = getByText(/Регистрация/i);
    expect(head).toBeInTheDocument();
  });
  test("button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Registration />
      </Provider>
    );
    let button = getByRole("button", { name: /Зарегистрироваться/i });
    expect(button).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Registration />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});