import * as React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/app/(login)/LoginForm";
import { AuthProvider } from "@/app/context/AuthContext";
import { faker } from "@faker-js/faker";
import { handleLoginForm, removeSession } from "@/app/(login)/actions";

jest.mock("@/app/(login)/actions", () => ({
  handleLoginForm: jest.fn(),
  removeSession: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

afterEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
  cleanup();
});

describe("LoginForm", () => {
  describe("Invalid form", () => {
    it("should trigger invalid email validation", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const input = screen.getByRole("textbox", { name: "email" });
      await user.type(input, "email");

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);

      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });

    it("should show an invalid password error when password length is less than 6 characters", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const input = screen.getByRole("textbox", { name: "password" });
      await user.type(input, "pass");

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);

      expect(
        screen.getByText("Password must be at least 6 characters long")
      ).toBeInTheDocument();
    });

    it("should show error when password lacks a digit", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const input = screen.getByRole("textbox", { name: "password" });
      await user.type(input, "pass");

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);

      expect(
        screen.getByText("Password must be at least 6 characters long")
      ).toBeInTheDocument();
    });
  });

  describe("Valid form", () => {
    it("should successfully submit the form and back to login when logout", async () => {
      const user = userEvent.setup();
      const email = faker.internet.email();
      const mockData = { success: true, data: { user: { email } } };
      (handleLoginForm as jest.Mock).mockResolvedValue(mockData);
      (removeSession as jest.Mock).mockResolvedValue({});

      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const username = screen.getByRole("textbox", { name: "email" });
      await user.type(username, email);

      const password = screen.getByRole("textbox", { name: "password" });
      await user.type(password, "abcdedfgh1ttss");

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);
      expect(screen.getByText(`Hi, ${email}`)).toBeInTheDocument();

      const logoutButton = screen.getByRole("button", { name: "Logout" });
      await user.click(logoutButton);

      expect(screen.getByText("Login Now")).toBeInTheDocument();
    });

    it("should successfully submit the form and display the user's email", async () => {
      const user = userEvent.setup();
      const email = faker.internet.email();
      const mockData = { success: true, data: { user: { email } } };
      (handleLoginForm as jest.Mock).mockResolvedValue(mockData);

      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const username = screen.getByRole("textbox", { name: "email" });
      await user.type(username, email);

      const password = screen.getByRole("textbox", { name: "password" });
      await user.type(password, "abcdedfgh1ttss");

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);
      expect(screen.getByText(`Hi, ${email}`)).toBeInTheDocument();
    });
  });

  describe("AuthProvider - rememberMe logic", () => {
    it("should load the user from mocked localStorage if rememberMe is true", async () => {
      const email = faker.internet.email();
      jest.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
        return key === "rememberMe"
          ? JSON.stringify({ email, rememberMe: true })
          : null;
      });

      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const username = screen.getByRole("textbox", {
        name: "email",
      }) as HTMLInputElement;
      expect(username).toHaveValue(email);

      const rememberMeCheckbox = screen.getByRole("checkbox", {
        name: "Remember me",
      });
      expect(rememberMeCheckbox).toBeChecked();
    });

    it("should update localStorage when rememberMe checkbox is clicked", async () => {
      const user = userEvent.setup();
      const email = faker.internet.email();
      const rememberMeData = { email, rememberMe: true };
      const mockData = { success: true, data: { user: { email } } };
      (handleLoginForm as jest.Mock).mockResolvedValue(mockData);

      const setItemMock = jest
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {});

      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const emailInput = screen.getByRole("textbox", { name: "email" });
      const passwordInput = screen.getByRole("textbox", { name: "password" });
      const rememberMeCheckbox = screen.getByRole("checkbox", {
        name: "Remember me",
      });

      await user.type(emailInput, email);
      await user.type(passwordInput, "abcdedfgh1ttss");

      await user.click(rememberMeCheckbox);

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(setItemMock).toHaveBeenCalledWith(
          "rememberMe",
          JSON.stringify(rememberMeData)
        );
      });
    });
  });
});
