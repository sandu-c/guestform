import React from "react";

export function AgreementCheckboxAtom({
  title,
  name,
  value,
  handleChange,
  required,
}) {
  return (
    <div className="field">
      <label className="checkbox">{title}</label>
      <div className="control">
        <input
          className="checkbox"
          type="checkbox"
          placeholder="antonio.lopez@mibuzon.com"
          name={name}
          checked={value}
          onChange={handleChange}
          autoComplete={name}
          required={required}
        />
        <small>Estoy de acurdo con Real Decreto 933/2021</small>
      </div>
    </div>
  );
}
