import Authorization from "../pages/authorization";
import {render} from "@testing-library/react";

test("component authorization exist",()=>{
    const component = render(<Authorization/>);
    expect(component);
})