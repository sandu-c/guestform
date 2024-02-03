import { countries } from "countries-list";
import React from "react";
import { SelectionAtom } from "../atoms/SelectionAtom";

export function IdSelectionMolecule({ title, name, value, handleChange }) {
  // Extract an array of sorted native country names
  const docuTypes = [
    "DNI",
    "Passaporte",
    "Permiso de conducir",
    "Documento ID nacional",
    "Permiso de residencia español",
  ];

  return (
    <SelectionAtom
      title={title}
      name={name}
      value={value}
      handleChange={handleChange}
      selectionList={docuTypes}
    />
  );
}
