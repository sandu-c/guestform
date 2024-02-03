import { countries } from "countries-list";
import React from "react";
import { SelectionAtom } from "../atoms/SelectionAtom";

export function CountrySelectionMolecule({ title, name, value, handleChange }) {
  // Extract an array of country objects from the countries-list library
  const countryArray = Object.keys(countries).map((code) => ({
    code: code,
    name: countries[code].name,
    nativeName: countries[code].native,
  }));

  // Sort the country array by native country names
  const sortedCountries = countryArray.sort((a, b) => {
    return a.nativeName.localeCompare(b.nativeName);
  });

  // Extract an array of sorted native country names
  const sortedCountryNames = sortedCountries.map(
    (country) => country.nativeName
  );

  return (
    <SelectionAtom
      title={title}
      name={name}
      value={value}
      handleChange={handleChange}
      selectionList={sortedCountryNames}
    />
  );
}
