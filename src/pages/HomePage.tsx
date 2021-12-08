import { useState } from "react";
import { Radio } from "../components/Radio";
import { RadioGroup } from "../components/RadioGroup";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Orange", value: "orange" },
];
export const HomePage = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  return (
    <section>
      <h1>React Radio Group</h1>

      <RadioGroup
        name="fruit"
        selectedValue={selectedValue}
        onSelectedValueChange={setSelectedValue}
      >
        {options.map(({ label, value }) => (
          <label htmlFor={value} key={value}>
            <Radio value={value} id={value} />

            {label}
          </label>
        ))}
      </RadioGroup>
    </section>
  );
};
