import { render, screen } from "@testing-library/react";
import { Radio } from "..";
import { RadioGroup } from "../../RadioGroup";
import type { FC } from "react";

describe("<Radio />", () => {
  const Wrapper: FC = ({ children }) => {
    const name = "__NAME__";
    const selectedValue = "__SELECTED_VALUE__";
    const onSelectedValueChange = jest.fn();

    return (
      <RadioGroup
        name={name}
        selectedValue={selectedValue}
        onSelectedValueChange={onSelectedValueChange}
      >
        {children}
      </RadioGroup>
    );
  };

  it("renders the radio input", () => {
    const value = "__VALUE__";

    render(<Radio value={value} />, { wrapper: Wrapper });

    const input = screen.getByRole("radio");

    expect(input).toBeInTheDocument();
  });
});
