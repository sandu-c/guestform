import React from "react";

export function GenderRadioAtom({
  name,
  index,
  handleChange,
  selection,
  value,
}) {
  return (
    <label className="radio">
      {value}&nbsp;
      <input
        className="radio"
        type="radio"
        name={name + index}
        value={value}
        onChange={handleChange}
        checked={selection === value}
        required
      />
      &nbsp;
    </label>
  );
}
