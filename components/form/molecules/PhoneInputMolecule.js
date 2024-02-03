import React from "react";
import PhoneInput from "../../PhoneInput";

export function PhoneInputMolecule({
  title,
  name,
  value,
  handleChange,
  required,
}) {
  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="control">
        <PhoneInput
          className="input dropdown dropdown-trigger dropdown-menu dropdown-content dropdown-item"
          type="tel"
          placeholder="Enter phone number"
          pattern="^(00|\+)(?:[0-9]●?){6,14}[0-9]$"
          name={name}
          value={value}
          onPhoneChange={handleChange}
          maxLength="30"
          required={required}
        />
        <br />
        <small>En formato: +34 123 456 789 o 0034 123 456 789</small>
      </div>
    </div>
  );
}
