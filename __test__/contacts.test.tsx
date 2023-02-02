import { render } from "@testing-library/react";
import Contacts from "../pages/contacts";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("Contacts", () => {
  test("Head", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Contacts />
      </Provider>
    );
    let head = getByText(/Контакты/i);
    expect(head).toBeInTheDocument();
  });
  test("button", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Contacts />
      </Provider>
    );
    let button = getByRole("button", { name: /Отправить/i });
    expect(button).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Contacts />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
