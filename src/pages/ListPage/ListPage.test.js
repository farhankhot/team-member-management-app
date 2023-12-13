import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ListPage from "./ListPage";

// Mocking localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mocking teamMemberJson
const teamMemberJsonMock = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    admin: "true",
    phoneNumber: "123-456-7890",
    email: "john@instawork.com",
    profilePicture: "https://via.placeholder.com/150",
  },
];

beforeEach(() => {
  window.localStorage.clear();
  window.localStorage.setItem(
    "teamMembers",
    JSON.stringify(teamMemberJsonMock),
  );
});

describe("ListPage", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <ListPage />
      </Router>,
    );
  });

  test("displays the correct number of team members", () => {
    render(
      <Router>
        <ListPage />
      </Router>,
    );
    expect(screen.getByText("You have 1 team member.")).toBeInTheDocument();
  });

  test("renders team members from localStorage", async () => {
    render(
      <Router>
        <ListPage />
      </Router>,
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("123-456-7890")).toBeInTheDocument();
    expect(await screen.findByText("john@instawork.com")).toBeInTheDocument();
  });

  test("navigates to add page on add button click", () => {
    render(
      <Router>
        <ListPage />
      </Router>,
    );
    fireEvent.click(screen.getByLabelText("Add team member"));
  });
});
