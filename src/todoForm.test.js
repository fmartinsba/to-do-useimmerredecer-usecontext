import React, { useContext } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { TodoForm } from "./todoForm";
import { CustomProvider, StateContext } from "./customProvider";

const setup = (children) => {
    const Todos = () => {
        const state = useContext(StateContext);
        const { todos } = state;
        return <div>{todos.map(item => <div key={item.title} data-testid="new-item">{item.title}</div>)}</div>
    }
    return render(
        <CustomProvider>
            {children}
            <Todos />
        </CustomProvider>
    )
};

afterEach(cleanup);

describe("<TodoForm />", () => {
    it("should dispatch addTodo when user clicks add button", () => {
        const { getByTestId } = setup(<TodoForm />);
        const addButton = getByTestId("add-item");
        const inputText = getByTestId("input-item");
        inputText.value = "get milk";
        expect(inputText.value).toBe("get milk");
        fireEvent.click(addButton);
        expect(inputText.value).toBe("");
        expect(getByTestId("new-item").textContent).toEqual("get milk");
    });
});