import React from "react";
import { GenderRadioAtom } from "../atoms/GenderRadioAtom";

export function GenderRadioMolecule({ name, handleChange, selection }) {
  return (
    <div className="field">
      <label className="label">Sexo</label>
      <div className="control">
        <GenderRadioAtom
          name={name}
          value="M"
          handleChange={handleChange}
          selection={selection}
        ></GenderRadioAtom>
        <GenderRadioAtom
          name={name}
          value="F"
          handleChange={handleChange}
          selection={selection}
        ></GenderRadioAtom>
      </div>
    </div>
  );
}
