import { Sort } from "../sort";
import {
  render,
  screen,
  cleanup,
  act,
  fireEvent,
  within,
} from "@testing-library/react";

afterEach(cleanup);

describe("Test sort component", () => {
  it("render sort component", () => {
    render(<Sort />);
  });

  it("sort button should enable and disable", () => {
    render(<Sort />);
    expect(screen.getByTestId("sort-button")).toHaveAttribute("disabled");

    fireEvent.mouseDown(
      screen.getByRole("button", {
        name: /type none/i,
      })
    );

    const listbox = within(screen.getByRole("listbox"));

    fireEvent.click(screen.getByText(/name/i));

    expect(screen.getByTestId("sort-button")).not.toHaveAttribute("disabled");
  });

  it("test ascending and descending", () => {
    render(<Sort />);
    expect(screen.getByTestId("sort-button")).toHaveAttribute("disabled");

    fireEvent.mouseDown(
      screen.getByRole("button", {
        name: /type none/i,
      })
    );

    const listbox = within(screen.getByRole("listbox"));

    fireEvent.click(screen.getByText(/name/i));

    expect(screen.getByTestId("sort-button")).not.toHaveAttribute("disabled");
  });
});
