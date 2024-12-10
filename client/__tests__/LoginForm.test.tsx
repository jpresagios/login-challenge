import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/app/(login)/LoginForm";
import { AuthProvider } from "@/app/context/AuthContext";
import { faker } from '@faker-js/faker';
import { handleLoginForm } from "@/app/(login)/actions";

afterEach(cleanup);

jest.mock('@/app/(login)/actions', () => ({
  handleLoginForm: jest.fn(),
}));

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
      await userEvent.type(input, "email");

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
      await userEvent.type(input, "pass");

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
      await userEvent.type(input, "pass");

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);

      expect(
        screen.getByText("Password must be at least 6 characters long")
      ).toBeInTheDocument();
    });
  });

  describe("Valid form", () => {
    it("should successfully submit the form and display the user's email", async () => {
      const email = faker.internet.email();
      const mockData = { success: true, data: { user: { email } } };
      (handleLoginForm as jest.Mock).mockResolvedValue(mockData);

      const user = userEvent.setup();
      render(
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      );

      const username = screen.getByRole("textbox", { name: "email" });
      await userEvent.type(username, email);

      const password = screen.getByRole("textbox", { name: "password" });
      await userEvent.type(password, "abcdedfgh1ttss");

      const submitButton = screen.getByRole("button", { name: "Login Now" });
      await user.click(submitButton);
      expect(screen.getByText(`Hi, ${email}`)).toBeInTheDocument();
    });
  });
});
