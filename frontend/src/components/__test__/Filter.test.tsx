import { Filter } from "../filter";
import { render, screen, cleanup, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "mobx-react";
import { defaultContext, store } from "../../store";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  store.resetStores();
});

afterEach(cleanup);

describe("Filter test", () => {
  it("renders without crashing", () => {
    render(<Filter />);
  });

  it("clicking filters display filtercategories", () => {
    render(<Filter />);
    expect(screen.getByRole("button", { name: /filters/i })).toBeEnabled();
    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    screen.getByText(/all filters/i);

    screen.getByText(/genre/i);
    screen.getByText(/price/i);
    screen.getByText(/releasedate/i);
    screen.getByText(/achievements/i);
    screen.getByText(/tags/i);

    screen.getByText(/no filters added/i);
  });

  it("clicking filtercategory shows correct options, and is clickable", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/genre/i).click();
    });

    screen.getByText(/valve/i);
    screen.getByText(/gore/i);
    screen.getByText(/rpg/i);
    screen.getByText(/action/i);
  });

  it("renders checkboxes in genre correctly, and can be checked", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/genre/i).click();
    });

    expect(screen.getByRole("checkbox", { name: /valve/i })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: /gore/i })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: /rpg/i })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: /action/i })).not.toBeChecked();

    act(() => {
      screen
        .getByRole("checkbox", {
          name: /valve/i,
        })
        .click();
      screen
        .getByRole("checkbox", {
          name: /gore/i,
        })
        .click();
      screen
        .getByRole("checkbox", {
          name: /rpg/i,
        })
        .click();
      screen
        .getByRole("checkbox", {
          name: /action/i,
        })
        .click();
    });

    expect(screen.getByRole("checkbox", { name: /valve/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /gore/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /rpg/i })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /action/i })).toBeChecked();
  });

  it("render filterbuttons correctly", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/genre/i).click();
    });

    act(() => {
      screen
        .getByRole("checkbox", {
          name: /valve/i,
        })
        .click();
    });
  });

  it("can apply filter", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/achievements/i).click();
    });

    act(() => {
      screen
        .getByRole("radio", {
          name: /has achievements/i,
        })
        .click();
      screen
        .getByRole("button", {
          name: /add filter/i,
        })
        .click();
    });

    const button = screen.getByRole("button", {
      name: /filters achievements/i,
    });

    within(button).getByText(/achievements/i);

    act(() => {
      screen
        .getByRole("button", {
          name: /achievements \| has achievements/i,
        })
        .click();
    });
  });

  it("store testing", () => {
    render(
      <Provider {...defaultContext}>
        <Filter />
      </Provider>
    );

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/achievements/i).click();
    });

    act(() => {
      screen
        .getByRole("radio", {
          name: /has achievements/i,
        })
        .click();
      screen
        .getByRole("button", {
          name: /add filter/i,
        })
        .click();
    });

    const button = screen.getByRole("button", {
      name: /filters achievements/i,
    });

    within(button).getByText(/achievements/i);

    expect(store.filterStore.activeFilters.size).toEqual(1);

    store.filterStore.activeFilters.forEach((filter) => {
      expect(filter.name).toMatch(/achievements/i);
      expect(filter.data?.visualData).toMatch(/has achievements/i);
    });

    act(() => {
      screen.getByText(/genre/i).click();
    });

    act(() => {
      screen
        .getByRole("checkbox", {
          name: /action/i,
        })
        .click();
      screen
        .getByRole("button", {
          name: /add filter/i,
        })
        .click();
    });

    expect(store.filterStore.activeFilters.size).toEqual(2);

    store.filterStore.activeFilters.forEach((filter) => {
      expect(filter.name).toMatch(/achievements|genre/i);
      expect(filter.data?.visualData).toMatch(/has achievements|action/i);
    });

    act(() => {
      screen
        .getByRole("button", {
          name: /achievements \| has achievements/i,
        })
        .click();
    });

    expect(store.filterStore.activeFilters.size).toEqual(1);

    store.filterStore.activeFilters.forEach((filter) => {
      expect(filter.name).toMatch(/genre/i);
      expect(filter.data?.visualData).toMatch(/action/i);
    });
  });

  it.only("apply tags", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });
    
    act(() => {
      screen.getByText(/tags/i).click();
    });
    
    act(() => {
      screen.getByRole('combobox', {
        name: /tags/i
      }).click()
    })

    userEvent.type(screen.getByRole('combobox', {
      name: /tags/i
    }), "2d{arrowdown}{enter}");
    
    act(() => {
      screen
        .getByRole("button", {
          name: /add filter/i,
        })
        .click();
    });
 
  });

  it("apply achievements filter without choosing an option", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/achievements/i).click();
    });

    act(() => {
      screen
        .getByRole("button", {
          name: /add filter/i,
        })
        .click();
    });

    screen.getByText(/please select a value to filter/i);
  });

  it("apply genre filter without choosing an option", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/genre/i).click();
    });

    act(() => {
      screen
        .getByRole("button", {
          name: /add filter/i,
        })
        .click();
    });

    screen.getByText(/please select genre\(s\) to filter/i);
  });

  it("apply tags filter without choosing an option", () => {
    render(<Filter />);

    act(() => {
      screen.getByRole("button", { name: /filters/i }).click();
    });

    act(() => {
      screen.getByText(/tags/i).click();
    });

    act(() => {
      screen
        .getByRole("button", {
          name: /add filter/i,
        })
        .click();
    });

    screen.getByText(/please select a tag to filter/i);
  });
});

describe("Filter snapshot test", () => {
  it("render filter component", () => {
    const tree = renderer.create(<Filter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
