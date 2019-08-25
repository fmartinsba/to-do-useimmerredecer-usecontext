import React from "react";
import { render } from "@testing-library/react";
import { useEffectOnce } from "./useEffectOnce";

describe("useEffectOnce", () => {
    it("should not retrigger callback function when component is rerendered", () => {
        const callback = jest.fn();
        const Wrapper = () => {
            useEffectOnce(callback);
            return <div />
        }
        const { rerender } = render(<Wrapper />);
        rerender(<Wrapper />);
        rerender(<Wrapper />);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});