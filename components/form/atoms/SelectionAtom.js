import { countries } from "countries-list";
import React from "react";

export function SelectionAtom({
  title,
  name,
  value,
  handleChange,
  selectionList,
}) {
  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="select">
        <select
          className="form-select"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required
        >
          <option key="blank" value="">
            -
          </option>
          {selectionList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
