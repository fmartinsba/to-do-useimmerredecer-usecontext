import React, { useContext } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { TodoItem } from "./todoItem";
import { CustomProvider, StateContext } from "./customProvider";

const setup = injectedState => {
    const Wrapper = () => {
        const state = useContext(StateContext);
        const { todos } = state;
        return <div>{todos.map(item => <TodoItem key={item.title} title={item.title} completed={item.completed} />)}</div>
    }
    return render(
        <CustomProvider injectedState={injectedState}>
            <Wrapper />
        </CustomProvider>
    )
};

afterEach(cleanup);

describe("<TodoItem />", () => {
    describe("when user is not loged in", () => {
        let state;
        beforeEach(() => {
            jest.spyOn(window, "alert").mockImplementation(() => {});
            state = {
                isLoggedIn: false,
                todos: [
                    { title: "get milk", completed: false }
                ]
            };
        });
        it("should show alert if user tries to complete task", () => {
            const { getAllByTestId } = setup(state)
            fireEvent.click(getAllByTestId("complete-item")[0]);
            expect(window.alert).toBeCalledWith("Please login to click this!");
        });
        it("should show alert if user tries to delete task", () => {
            const { getAllByTestId } = setup(state);
            fireEvent.click(getAllByTestId("remove-item")[0]);
            expect(window.alert).toBeCalledWith("Please login to click this!");
        });
    });

    describe("when user is loged in", () => {
        let state;
        beforeEach(() => {
            state = {
                isLoggedIn: true,
                todos: [
                    { title: "get milk", completed: false }
                ]
            };
        });
        it("should complete task", () => {
            const { getAllByTestId } = setup(state);
            const itemCheckbox = getAllByTestId("complete-item")[0];
            expect(itemCheckbox.checked).toBe(false);
            fireEvent.click(itemCheckbox);
            expect(itemCheckbox.checked).toBe(true);
        });
        it("should delete task", () => {
            const { getAllByTestId, queryAllByTestId } = setup(state);
            const removeButton = getAllByTestId("remove-item")[0];
            expect(queryAllByTestId("remove-item")).toHaveLength(1);
            fireEvent.click(removeButton);
            expect(queryAllByTestId("remove-item")).toHaveLength(0);
        });
    });
});