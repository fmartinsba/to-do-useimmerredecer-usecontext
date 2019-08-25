import React from "react";
import { render, fireEvent, waitForElement, cleanup } from "@testing-library/react";
import { CustomProvider } from "./customProvider";
import App from "./app";

const setup = (children, injectedState) => {
    return render(
        <CustomProvider injectedState={injectedState}>
            {children}
        </CustomProvider>
    )
};

afterEach(cleanup);

describe("<App />", () => {
    it("should load todos from localStorage", async () => {
        const todos = [{ title: "get milk", completed: false }];
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => JSON.stringify(todos));
        const { getAllByTestId } = setup(<App />);
        const items = await waitForElement(() => getAllByTestId("todo-title"));
        expect(items).toHaveLength(1);
        expect(items[0].textContent).toEqual(todos[0].title);
    });
});