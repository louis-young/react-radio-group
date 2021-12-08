import { render, screen } from "@testing-library/react";
import { Radio } from "../../Radio";
import { RadioGroup } from "../../RadioGroup";

describe("<RadioGroup />", () => {
  const defaultName = "fruit";
  const defaultSelectedValue = "apple";
  const defaultOnSelectedValueChange = jest.fn();

  const RadioWithLabel = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => {
    return (
      <label htmlFor={value}>
        <Radio value={value} id={value} />

        {label}
      </label>
    );
  };

  const apple = {
    label: "Apple",
    value: "apple",
  };

  const orange = {
    label: "Orange",
    value: "orange",
  };

  const AppleRadioWithLabel = () => {
    return <RadioWithLabel label={apple.label} value={apple.value} />;
  };

  const OrangeRadioWithLabel = () => {
    return <RadioWithLabel label={orange.label} value={orange.value} />;
  };

  describe("<RadioGroup />", () => {
    it("renders an input for each `Radio` component", () => {
      render(
        <RadioGroup
          name={defaultName}
          selectedValue={defaultSelectedValue}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <AppleRadioWithLabel />
          <OrangeRadioWithLabel />
        </RadioGroup>,
      );

      const inputs = screen.getAllByRole("radio");

      expect(inputs).toHaveLength(2);
    });

    // Checks as in `checked`.
    it("checks the selected input", () => {
      render(
        <RadioGroup
          name={defaultName}
          selectedValue={apple.value}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <AppleRadioWithLabel />
          <OrangeRadioWithLabel />
        </RadioGroup>,
      );

      const input = screen.getByLabelText(apple.label);

      expect(input).toBeChecked();
    });
  });

  describe("<Radio />", () => {
    it("sets the `name` attribute", () => {
      const name = "__NAME__";

      render(
        <RadioGroup
          name={name}
          selectedValue={defaultSelectedValue}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <AppleRadioWithLabel />
        </RadioGroup>,
      );

      const input = screen.getByRole("radio");

      expect(input).toHaveAttribute("name", name);
    });

    it("sets the `value` attribute", () => {
      const value = "__VALUE__";

      render(
        <RadioGroup
          name={defaultName}
          selectedValue={defaultSelectedValue}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <Radio value={value} />
        </RadioGroup>,
      );

      const input = screen.getByRole("radio");

      expect(input).toHaveAttribute("value", value);
    });

    it("sets additional attributes", () => {
      const id = "__ID__";

      render(
        <RadioGroup
          name={defaultName}
          selectedValue={defaultSelectedValue}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <Radio value={apple.value} id={id} />
        </RadioGroup>,
      );

      const input = screen.getByRole("radio");

      expect(input).toHaveAttribute("id", id);
    });
  });
});
