import React from "react";
import { render, fireEvent, waitForElement, waitForDomChange, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { LoginForm } from "./loginForm";
import { CustomProvider } from "./customProvider";
import * as utils from "./utils";

const setup = (children, injectedState) => {
    return render(
        <CustomProvider injectedState={injectedState}>
            {children}
        </CustomProvider>
    )
};

afterEach(cleanup);

describe("<LoginForm />", () => {
    it("should change submit button content to Logging in... on click", () => {
        const { getByTestId } = setup(<LoginForm />);
        const submitButton = getByTestId("submit-button");
        expect(submitButton.textContent).toEqual("Log In");
        expect(submitButton.disabled).toBe(false);
        fireEvent.click(submitButton);
        expect(submitButton.textContent).toEqual("Logging in...");
        expect(submitButton.disabled).toBe(true);
    });

    it("should show error message and clear input fields when submitting incorrect credentials", async () => {
        jest.spyOn(utils, "login").mockImplementation(() => Promise.reject());
        const { getByTestId } = setup(<LoginForm />);
        const usernameInput = getByTestId("username-input");
        const passwordInput = getByTestId("password-input");
        const submitButton = getByTestId("submit-button");
        usernameInput.value = "wrongUser";
        passwordInput.value = "wrongPassword";
        fireEvent.click(submitButton);
        const errorMessage = await waitForElement(() => getByTestId("error-message"));
        expect(errorMessage.textContent).toEqual("Incorrect username or password!");
        expect(usernameInput.textContent).toEqual("");
        expect(passwordInput.textContent).toEqual("");
    });

    it("should remove login form and show welcome and log out button when submiting correct credentials", async () => {
        jest.spyOn(utils, "login").mockImplementation(() => Promise.resolve());
        const { getByTestId, queryByTestId, queryByText } = setup(<LoginForm />);
        const usernameInput = getByTestId("username-input");
        const passwordInput = getByTestId("password-input");
        const submitButton = getByTestId("submit-button");
        usernameInput.value = "correctUser";
        passwordInput.value = "correctPassword";
        fireEvent.click(submitButton);
        await waitForElement(() => getByTestId("welcome-user"));
        const logoutButton = getByTestId("logout-button");
        expect(logoutButton).toBeInTheDocument();
        expect(queryByText("Incorrect username or password!")).not.toBeInTheDocument();
        expect(submitButton).not.toBeInTheDocument();
        expect(usernameInput).not.toBeInTheDocument();
        expect(passwordInput).not.toBeInTheDocument();
    });

    it("should remove welcome and log out button and show login form when logging out", async () => {
        const { getByTestId, queryByTestId, queryByText } = setup(<LoginForm />, { isLoggedIn: true });
        const logoutButton = getByTestId("logout-button");
        const welcomeTitle = getByTestId("welcome-user");
        fireEvent.click(logoutButton);
        await waitForElement(() => getByTestId("submit-button"));
        const usernameInput = getByTestId("username-input");
        const passwordInput = getByTestId("password-input");
        const submitButton = getByTestId("submit-button");
        expect(submitButton).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(logoutButton).not.toBeInTheDocument();
        expect(welcomeTitle).not.toBeInTheDocument();
        
    });
});