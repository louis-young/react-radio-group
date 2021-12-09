import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Radio } from "../../Radio";
import { RadioGroup } from "../../RadioGroup";

describe("<RadioGroup />", () => {
  const defaultName = "fruit";
  const defaultSelectedValue = "apple";
  const defaultOnSelectedValueChange = jest.fn();

  const firstLabel = "Apple";
  const firstValue = "apple";

  const secondLabel = "Orange";
  const secondValue = "orange";

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

  describe("<RadioGroup />", () => {
    it("renders a radio input for each `Radio` component", () => {
      render(
        <RadioGroup
          name={defaultName}
          selectedValue={defaultSelectedValue}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <Radio value={firstValue} />
          <Radio value={secondValue} />
        </RadioGroup>,
      );

      const radios = screen.getAllByRole("radio");

      expect(radios).toHaveLength(2);
    });

    it("checks the selected radio input", () => {
      const selectedValue = firstValue;

      render(
        <RadioGroup
          name={defaultName}
          selectedValue={selectedValue}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <RadioWithLabel label={firstLabel} value={firstValue} />
          <RadioWithLabel label={secondLabel} value={secondValue} />
        </RadioGroup>,
      );

      const radio = screen.getByLabelText(firstLabel);

      expect(radio).toBeChecked();
    });

    it("calls `onSelectedValueChange` with the new value when clicking an unchecked radio input", () => {
      const selectedValue = firstValue;

      const onSelectedValueChange = jest.fn();

      render(
        <RadioGroup
          name={defaultName}
          selectedValue={selectedValue}
          onSelectedValueChange={onSelectedValueChange}
        >
          <RadioWithLabel label={firstLabel} value={firstValue} />
          <RadioWithLabel label={secondLabel} value={secondValue} />
        </RadioGroup>,
      );

      const firstRadio = screen.getByLabelText(firstLabel);

      expect(firstRadio).toBeChecked();

      const secondRadio = screen.getByLabelText(secondLabel);

      userEvent.click(secondRadio);

      expect(onSelectedValueChange).toHaveBeenCalledWith(secondValue);
    });

    it("does not call `onSelectedValueChange` when clicking the checked radio input", () => {
      const selectedValue = firstValue;

      const onSelectedValueChange = jest.fn();

      render(
        <RadioGroup
          name={defaultName}
          selectedValue={selectedValue}
          onSelectedValueChange={onSelectedValueChange}
        >
          <RadioWithLabel label={firstLabel} value={firstValue} />
          <RadioWithLabel label={secondLabel} value={secondValue} />
        </RadioGroup>,
      );

      const firstRadio = screen.getByLabelText(firstLabel);

      expect(firstRadio).toBeChecked();

      userEvent.click(firstRadio);

      expect(onSelectedValueChange).not.toHaveBeenCalled();
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
          <Radio value={firstValue} />
        </RadioGroup>,
      );

      const radio = screen.getByRole("radio");

      expect(radio).toHaveAttribute("name", name);
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

      const radio = screen.getByRole("radio");

      expect(radio).toHaveAttribute("value", value);
    });

    it("sets additional attributes", () => {
      const id = "__ID__";

      render(
        <RadioGroup
          name={defaultName}
          selectedValue={defaultSelectedValue}
          onSelectedValueChange={defaultOnSelectedValueChange}
        >
          <Radio value={firstValue} id={id} />
        </RadioGroup>,
      );

      const radio = screen.getByRole("radio");

      expect(radio).toHaveAttribute("id", id);
    });
  });
});
