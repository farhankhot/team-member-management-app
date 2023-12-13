import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the ListPage component
jest.mock("./pages/ListPage/ListPage", () => () => <div>ListPage mock</div>);

test("renders ListPage component for root route", () => {
  render(<App />);
  expect(screen.getByText("ListPage mock")).toBeInTheDocument();
});
