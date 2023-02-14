import { render } from "@testing-library/react";
import { Error } from "../components/error";

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

describe("Error", () => {
  test("heading", () => {
    const { getByRole } = render(<Error />);
    let heading = getByRole("heading", { name: /Ошибка 404/i });
    expect(heading).toBeInTheDocument();
  });
  test("text", () => {
    const { getByText } = render(<Error />);
    let text = getByText(/Вернуться на главную/i);
    expect(text).toBeInTheDocument();
  });
  test("component snapshot", () => {
    const component = render(<Error />);
    expect(component).toMatchSnapshot();
  });
});
