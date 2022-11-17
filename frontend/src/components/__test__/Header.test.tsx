import { Header } from "../header";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";

function TestComponent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const val = localStorage.getItem("dark-mode");
    if (val === "true") {
      setDarkMode(true);
    }
  }, [darkMode]);

  return (
    <>
      <p>Is it on? {JSON.stringify(darkMode)}</p>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
}
describe("test header component", () => {
  it("renders with correct header", () => {
    render(<Header darkMode={false} setDarkMode={() => {}} />);
    screen.getByText(/damp/i);
    screen.getByText(/darkmode/i);
    screen.getByText(/about/i);
  });

  it("about loads correctly", async () => {
    render(<Header darkMode={false} setDarkMode={() => {}} />);
    screen.getByText(/about/i).click();
    act(() => {
      screen.getByText(/darkmode/i).click();
    });
    const cont = await waitFor(() => screen.findByText(/how to use damp/i));

    fireEvent.keyDown(cont, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });

    const modal = screen.queryByText(/how to use damp/i)
    expect(modal).not.toBeInTheDocument()
  });

  it("handles darkmode toggle", async () => {
    localStorage.setItem("dark-mode", "false");
    render(<TestComponent />);
    screen.getByText(/false/i);
    act(() => {
      screen.getByText(/darkmode/i).click();
    });
    await waitFor(() => screen.findByText(/true/i));
    act(() => {
      screen.getByText(/darkmode/i).click();
    });
    await waitFor(() => screen.findByText(/false/i));
  });
});
