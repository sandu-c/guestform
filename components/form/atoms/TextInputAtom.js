import React from "react";

export function TextInputAtom({
  title,
  name,
  value,
  handleChange,
  placeholder,
  maxLength,
  required,
}) {
  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          maxLength={maxLength}
          value={value}
          autoComplete={name}
          required={required}
        />
      </div>
    </div>
  );
}
