import React from "react";
import { GenderRadioAtom } from "../atoms/GenderRadioAtom";

export function GenderRadioMolecule({ name, index, handleChange, selection }) {
  return (
    <div className="field">
      <label className="label">Sexo</label>
      <div className="control">
        <GenderRadioAtom
          name={name}
          value="M"
          index={index}
          handleChange={handleChange}
          selection={selection}
        ></GenderRadioAtom>
        <GenderRadioAtom
          name={name}
          value="F"
          index={index}
          handleChange={handleChange}
          selection={selection}
        ></GenderRadioAtom>
      </div>
    </div>
  );
}
