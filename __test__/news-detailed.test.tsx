import { render } from "@testing-library/react";
import News from "../pages/news-detailed/[id]";
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

describe("News-detailed", () => {
  test("Head", () => {
    const { getByText } = render(
      <Provider store={store}>
        <News />
      </Provider>
    );
    let head = getByText(/Новости/i);
    expect(head).toBeInTheDocument();
  });
  test("heading", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <News />
      </Provider>
    );
    let button = getByRole("heading", { name: /Читайте также/i });
    expect(button).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <News />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
