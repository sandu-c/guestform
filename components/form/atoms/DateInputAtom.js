import React from "react";

export function DateInputAtom({ title, name, value, handleChange, required }) {
  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="control">
        <input
          className="input"
          type="date"
          placeholder="12/10/1999"
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
        />
      </div>
    </div>
  );
}
