import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddPage from "./AddPage";
import { addTeamMember } from "../../utils/crudOperations/crudOperations";

// Mock the addTeamMember function
jest.mock("../../utils/crudOperations/crudOperations", () => ({
  addTeamMember: jest.fn(),
}));

describe("AddPage", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <AddPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Add a Team Member/i)).toBeInTheDocument();
  });

  test("updates input fields correctly", () => {
    render(
      <MemoryRouter>
        <AddPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/Charlene/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Pham/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText(/char@instawork.com/i), {
      target: { value: "alice@instawork.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/415-310-1619/i), {
      target: { value: "123-456-7890" },
    });

    expect(screen.getByPlaceholderText(/Charlene/i).value).toBe("Alice");
    expect(screen.getByPlaceholderText(/Pham/i).value).toBe("Smith");
    expect(screen.getByPlaceholderText(/char@instawork.com/i).value).toBe(
      "alice@instawork.com",
    );
    expect(screen.getByPlaceholderText(/415-310-1619/i).value).toBe(
      "123-456-7890",
    );
  });

  test("calls addTeamMember on form submission", () => {
    render(
      <MemoryRouter>
        <AddPage />
      </MemoryRouter>,
    );

    // Fill out and submit the form
    fireEvent.change(screen.getByPlaceholderText(/Charlene/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Pham/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText(/char@instawork.com/i), {
      target: { value: "alice@instawork.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/415-310-1619/i), {
      target: { value: "123-456-7890" },
    });
    fireEvent.click(screen.getByText(/Save/i));

    expect(addTeamMember).toHaveBeenCalledWith(
      "Alice",
      "Smith",
      "false",
      "alice@instawork.com",
      "123-456-7890",
    );
  });
});
