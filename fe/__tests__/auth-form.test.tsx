import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SessionProvider } from "../src/hooks/use-session"; // Adjust the import path as per your project structure
import Login from "../src/component/Login";

describe("Login Component", () => {
  let usernameInput: any, passwordInput: any, submitInput: any;
  it("renders login form", async () => {
    render(
      <SessionProvider>
        <Login />
      </SessionProvider>
    );

    await waitFor(async () => {
      expect(await screen.getByPlaceholderText("Id")).toBeInTheDocument();
      expect(await screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        await screen.getByRole("button", { name: "Login" })
      ).toBeInTheDocument();
    });
  });

  it("handles login form validations", async () => {
    render(
      <SessionProvider>
        <Login />
      </SessionProvider>
    );

    await waitFor(async () => {
      usernameInput = await screen.getByPlaceholderText("Id");
      passwordInput = await screen.getByPlaceholderText("Password");
      submitInput = await screen.getByRole("button", { name: "Login" });

      await userEvent.type(usernameInput, "0");
      await userEvent.type(passwordInput, "testPassword");
      await fireEvent.click(submitInput);
    });

    await waitFor(() => {
      expect(
        screen.getByText("username should not be less than 3")
      ).toBeDefined();
    });

    await waitFor(async () => {
      await userEvent.clear(passwordInput);
      await userEvent.type(usernameInput, "ExtraLongUsername");
      await userEvent.type(passwordInput, "0");
      await fireEvent.click(submitInput);
    });

    await waitFor(async () => {
      expect(
        screen.getByText("password should not be less than 3")
      ).toBeDefined();
    });
  });
});
