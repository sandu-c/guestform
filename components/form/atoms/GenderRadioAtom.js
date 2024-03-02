import React from "react";

export function GenderRadioAtom({
  name,
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
        name={name}
        value={value}
        onChange={handleChange}
        checked={selection === value}
        required
      />
      &nbsp;
    </label>
  );
}
