// EditPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditPage from "./EditPage";
import * as crudOperations from "../../utils/crudOperations/crudOperations";

// Mock useParams and useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
  useNavigate: () => jest.fn(),
}));

// Mock CRUD operations
jest.mock("../../utils/crudOperations/crudOperations");

describe("EditPage", () => {
  // Mock team member data
  const mockTeamMember = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    admin: "false",
    email: "john@instawork.com",
    phoneNumber: "123-456-7890",
    profilePicture: "https://via.placeholder.com/150",
  };

  beforeEach(() => {
    // Setup localStorage mock
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([mockTeamMember]));
    Storage.prototype.setItem = jest.fn();
  });

  beforeEach(() => {
    crudOperations.getTeamMembers.mockReturnValue([mockTeamMember]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with pre-populated fields from localStorage", () => {
    render(
      <MemoryRouter>
        <EditPage />
      </MemoryRouter>,
    );
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@instawork.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123-456-7890")).toBeInTheDocument();
    const adminRadioButton = screen.getByLabelText(
      "Admin - Can delete members",
    );
    expect(adminRadioButton).toBeInTheDocument();
  });

  test("updates input fields on user input", () => {
    render(
      <MemoryRouter>
        <EditPage />
      </MemoryRouter>,
    );

    // Changing first name
    fireEvent.change(screen.getByDisplayValue("John"), {
      target: { value: "Alice" },
    });
    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    // Changing email
    fireEvent.change(screen.getByDisplayValue("john@instawork.com"), {
      target: { value: "alice@instawork.com" },
    });
    expect(screen.getByDisplayValue("alice@instawork.com")).toBeInTheDocument();
  });

  test("calls editTeamMember on save button click", () => {
    render(
      <MemoryRouter>
        <EditPage />
      </MemoryRouter>,
    );

    // Form submission
    fireEvent.click(screen.getByText("Save"));
    expect(crudOperations.editTeamMember).toHaveBeenCalledWith(
      1,
      "John",
      "Doe",
      "false",
      "john@instawork.com",
      "123-456-7890",
    );
  });

  test("calls deleteTeamMember on delete button click", () => {
    render(
      <MemoryRouter>
        <EditPage />
      </MemoryRouter>,
    );

    // Clicking delete button
    fireEvent.click(screen.getByText("Delete"));
    expect(crudOperations.deleteTeamMember).toHaveBeenCalledWith(1);
  });
});
