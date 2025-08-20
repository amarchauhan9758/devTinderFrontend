import Navbar from "../components/Navbar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../components/utils/strore/appStore";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, test } from "vitest";

test("Navbar renders correctly", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Navbar />
      </Provider>
    </BrowserRouter>
  );

  const logo = screen.getByRole("textbox");

  expect(logo).toBeInTheDocument();
  //
  // Check if the Navbar is in the document
  // expect(screen.getByRole("heading")).toBeInTheDocument();

  //   // Check if the logo is present
  //   expect(screen.getByAltText("Logo")).toBeInTheDocument();

  //   // Check if the links are present
  //   expect(screen.getByText("Home")).toBeInTheDocument();
  //   expect(screen.getByText("Profile")).toBeInTheDocument();
  //   expect(screen.getByText("Feeds")).toBeInTheDocument();
});
