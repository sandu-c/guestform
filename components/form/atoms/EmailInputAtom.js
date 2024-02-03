import React from "react";

export function EmailInputAtom({ title, name, value, handleChange, required }) {
  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="control">
        <input
          className="input"
          type="email"
          placeholder="benone.catacuzino@mibuzon.com"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          name={name}
          value={value}
          onChange={handleChange}
          maxLength="82"
          autoComplete={name}
          required={required}
        />
      </div>
    </div>
  );
}
