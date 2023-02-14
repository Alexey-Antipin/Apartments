import { render } from "@testing-library/react";
import PaginatedPage from "../pages/news/";
import { Provider } from "react-redux";
import { store } from "../redux/store";

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

describe("News", () => {
  test("Head", () => {
    render(
      <Provider store={store}>
        <PaginatedPage
          currentPage={currentPage}
          totalData={totalData}
          articles={articles}
        />
      </Provider>
    );
    expect(document.title).toBe("Новости");
  });
  test("Class", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <PaginatedPage
          currentPage={currentPage}
          totalData={totalData}
          articles={articles}
        />
      </Provider>
    );
    let classButton = getByRole("button");
    expect(classButton).toHaveClass("button");
  });
  test("component snapshot", () => {
    const component = render(
      <Provider store={store}>
        <PaginatedPage
          currentPage={currentPage}
          totalData={totalData}
          articles={articles}
        />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
