# React Radio Group

A set of React components to build declarative radio groups.

## Overview

### The problem

Rolling your own controlled radio groups can get verbose very quickly as you concern yourself with implementation details and wiring state.

### The solution

React Radio Group exposes two simple components that abstract all of this away and let you build simple, declarative radio groups.

## Examples

### Basic

```tsx
import { RadioGroup, Radio } from "react-radio-group";

// ...

const [selectedValue, setSelectedValue] = useState<string | undefined>();

// ...

<RadioGroup
  name="fruit"
  selectedValue={selectedValue}
  onSelectedValueChange={setSelectedValue}
>
  <Radio value="apple" /> Apple
  <Radio value="orange" /> Orange
</RadioGroup>;
```

### Realistic

```tsx
const options = [
  { label: "Apple", value: "apple" },
  { label: "Orange", value: "orange" },
];

// ...

const [selectedValue, setSelectedValue] = useState<string | undefined>();

// ...

<form>
  <fieldset>
    <legend>Fruit</legend>

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
  </fieldset>
</form>;
```
