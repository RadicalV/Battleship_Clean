import React from "react";
import Cell from "./Cell";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Cell component", () => {
  it("renders grid cell with transparent color when grid value is 0 correctly", () => {
    render(<Cell onCellClick={jest.fn} gridValue={0} testId={""} />);

    expect(screen.getByTestId("cell-item")).toBeInTheDocument();
    expect(screen.getByTestId("cell-text")).toHaveStyle("color: transparent");
  });
  it("renders grid cell with black color when grid value is 1 correctly", () => {
    render(<Cell onCellClick={jest.fn} gridValue={1} testId={""} />);

    expect(screen.getByTestId("cell-item")).toBeInTheDocument();
    expect(screen.getByTestId("cell-text")).toHaveStyle("color: black");
    expect(screen.getByTestId("cell-text")).toHaveTextContent("X");
  });
  it("renders grid cell with red color when grid value is 2 correctly", () => {
    render(<Cell onCellClick={jest.fn} gridValue={2} testId={""} />);

    expect(screen.getByTestId("cell-item")).toBeInTheDocument();
    expect(screen.getByTestId("cell-text")).toHaveStyle("color: red");
    expect(screen.getByTestId("cell-text")).toHaveTextContent("X");
  });
  it("renders grid cell with red color when grid value is 3 correctly", () => {
    render(<Cell onCellClick={jest.fn} gridValue={3} testId={""} />);

    expect(screen.getByTestId("cell-item")).toBeInTheDocument();
    expect(screen.getByTestId("cell-text")).toHaveStyle("color: red");
    expect(screen.getByTestId("cell-text")).toContainElement(
      screen.getByTestId("destroyed-icon")
    );
  });
  it("calls cellClick function when clicked", () => {
    const cellClickMock = jest.fn();

    render(<Cell onCellClick={cellClickMock} gridValue={0} testId={""} />);

    fireEvent.click(screen.getByTestId("cell-text"));

    expect(cellClickMock).toHaveBeenCalledTimes(1);
  });
});