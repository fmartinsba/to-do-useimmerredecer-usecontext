import { renderHook, act } from "@testing-library/react-hooks";
import { useImmerReducer } from "use-immer";
import { stateReducer, initialState } from "./stateReducer";

describe("stateReducer", () => {
    it("case todos: should update todos with action payload", () => {
        const todos = [{ title: "get milk", completed: false }];
        const action = { type: "todos", payload: todos };
        const { result } = renderHook(() => useImmerReducer(stateReducer, initialState));
        let [state, dispatch] = result.current;
        expect(state.todos).toEqual([]);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.todos).toEqual(todos);
    });

    it("case field: should update fields (username, passwors) with action payload", () => {
        const form = [{
            type: "field",
            fieldName: "username",
            payload: "happyuser"
        },
        {
            type: "field",
            fieldName: "password",
            payload: "p@ssw0rd"
        }];
        const { result } = renderHook(() => useImmerReducer(stateReducer, initialState));
        let [state, dispatch] = result.current;
        expect(state.username).toEqual("");
        expect(state.password).toEqual("");
        act(() => {
            const [state, dispatch] = result.current;
            form.forEach(field => dispatch(field));
        });
        [state, dispatch] = result.current;
        expect(state.username).toEqual(form[0].payload);
        expect(state.password).toEqual(form[1].payload);
    });

    it("case login: should clear error and set isLoading to true", () => {
        const action = { type: "login" };
        const { result } = renderHook(() => useImmerReducer(stateReducer, { ...initialState, error: "some error" }));
        let [state, dispatch] = result.current;
        expect(state.error).toEqual("some error");
        expect(state.isLoading).toEqual(false);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.error).toEqual("");
        expect(state.isLoading).toEqual(true);
    });

    it("case success: should set isLoggedIn to true, isLoading to false and clear fields (username, passwors)", () => {
        const action = { type: "success" };
        const currentState = { ...initialState, username: "happyuser", password: "p@ssw0rd", isLoading: true };
        const { result } = renderHook(() => useImmerReducer(stateReducer, currentState));
        let [state, dispatch] = result.current;
        expect(state.username).toEqual("happyuser");
        expect(state.password).toEqual("p@ssw0rd");
        expect(state.isLoggedIn).toEqual(false);
        expect(state.isLoading).toEqual(true);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.username).toEqual("");
        expect(state.password).toEqual("");
        expect(state.isLoggedIn).toEqual(true);
        expect(state.isLoading).toEqual(false);
    });

    it("case error: should set error to 'Incorrect username or password!', isLoggedIn to false, isLoading to false and clear fields (username, passwors)", () => {
        const action = { type: "error" };
        const currentState = { ...initialState, username: "happyuser", password: "p@ssw0rd", isLoading: true };
        const { result } = renderHook(() => useImmerReducer(stateReducer, currentState));
        let [state, dispatch] = result.current;
        expect(state.error).toEqual("");
        expect(state.username).toEqual("happyuser");
        expect(state.password).toEqual("p@ssw0rd");
        expect(state.isLoggedIn).toEqual(false);
        expect(state.isLoading).toEqual(true);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.error).toEqual("Incorrect username or password!");
        expect(state.username).toEqual("");
        expect(state.password).toEqual("");
        expect(state.isLoggedIn).toEqual(false);
        expect(state.isLoading).toEqual(false);
    });

    it("case logOut: should set isLoggedIn to false", () => {
        const action = { type: "logOut" };
        const currentState = { ...initialState, username: "happyuser", password: "p@ssw0rd", isLoggedIn: true };
        const { result } = renderHook(() => useImmerReducer(stateReducer, currentState));
        let [state, dispatch] = result.current;
        expect(state.isLoggedIn).toEqual(true);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.isLoggedIn).toEqual(false);
    });

    it("case toggleTodoCompleted: should set toggled todo item from payload to opposite value", () => {
        const action = { type: "toggleTodoCompleted", payload: "get milk" };
        const currentState = { ...initialState, todos: [{ title: "get milk", completed: false }] };
        const { result } = renderHook(() => useImmerReducer(stateReducer, currentState));
        let [state, dispatch] = result.current;
        expect(state.todos[0].completed).toEqual(false);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.todos[0].completed).toEqual(true);
    });

    it("case addTodo: should add new todo item from payload to todos", () => {
        const action = { type: "addTodo", payload: { title: "get milk", completed: false } };
        const { result } = renderHook(() => useImmerReducer(stateReducer, initialState));
        let [state, dispatch] = result.current;
        expect(state.todos).toHaveLength(0);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.todos).toHaveLength(1);
        expect(state.todos[0]).toEqual(action.payload);
    });

    it("case removeTodo: should remove selected todo item from payload from todos", () => {
        const action = { type: "removeTodo", payload: "get milk" };
        const currentState = { ...initialState, todos: [{ title: "get milk", completed: false }] };
        const { result } = renderHook(() => useImmerReducer(stateReducer, currentState));
        let [state, dispatch] = result.current;
        expect(state.todos).toHaveLength(1);
        expect(state.todos[0].title).toEqual(action.payload);
        act(() => {
            const [state, dispatch] = result.current;
            dispatch(action);
        });
        [state, dispatch] = result.current;
        expect(state.todos).toHaveLength(0);
        
    });
});