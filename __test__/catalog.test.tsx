import { render } from "@testing-library/react";
import Catalog from "../pages/catalog";
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

let articles: any[] = [];
let totalData: number = 0;
let currentPage: number = 0;

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe("Catalog", () => {
  test("Head", () => {
    render(
      <Provider store={store}>
        <Catalog
          currentPage={currentPage}
          totalData={totalData}
          articles={articles}
        />
      </Provider>
    );
    expect(document.title).toBe("Каталог");
  });
  test("heading", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Catalog
          currentPage={currentPage}
          totalData={totalData}
          articles={articles}
        />
      </Provider>
    );
    let heading = getByRole("heading", { name: /Найдено 0 результата/i });
    expect(heading).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Catalog
          currentPage={currentPage}
          totalData={totalData}
          articles={articles}
        />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
