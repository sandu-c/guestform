import { useState, useEffect, useRef } from "react";
import { continents, countries, languages } from "countries-list";
import "bulma/css/bulma.min.css";
import "bulma-calendar/dist/css/bulma-calendar.min.css";
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
// import SignatureCanvas from '../components/SignatureCanvas';
import FormSection from "../components/FormSection";
import React from "react";

import EncodingUtils from "../components/utils/encodingUtils";

import { useRouter } from "next/router";
import PdfWriter from "../components/PdfWriter";
// import 'react-phone-number-input/style.css';

import { GenderRadioMolecule } from "../components/form/molecules/GenderRadioMolecule";
import { CountrySelectionMolecule } from "../components/form/molecules/CountrySelectionMolecule";
import { TextInputAtom } from "../components/form/atoms/TextInputAtom";
import { IdSelectionMolecule } from "../components/form/molecules/IdSelectionMolecule";
import { PhoneInputMolecule } from "../components/form/molecules/PhoneInputMolecule";
import { DateInputAtom } from "../components/form/atoms/DateInputAtom";
import { SelectionAtom } from "../components/form/atoms/SelectionAtom";
import { AgreementCheckboxAtom } from "../components/form/atoms/AgreementCheckboxAtom";
import { EmailInputAtom } from "../components/form/atoms/EmailInputAtom";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [sections, setSections] = useState(
    new Array(selectedOption).fill(false)
  );
  const [currentSection, setCurrentSection] = useState(0);
  const [validSections, setValidSections] = useState(
    new Array(selectedOption).fill(false)
  );

  const handleOptionChange = (e) => {
    setSelectedOption(parseInt(e.target.value));
    setSections(new Array(parseInt(e.target.value)).fill(false));
    setForm(generateNewForm(selectedOption));
  };

  const handleSectionToggle = (index) => {
    const form = formRef.current;
    if (form.checkValidity()) {
      // setCurrentSection(index);
      // const newSections = [...sections];
      // newSections[index] = !newSections[index];
      // newSections[currentSection] = true;

      const newSections = sections.map((value, idx) => {
        return idx === index ? !value : false;
      });

      // Toggle the selected section
      setSections(newSections);
    } else {
      form.reportValidity();
    }
  };

  const generateRandomKey = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleNext = () => {
    const form = formRef.current;
    if (form.checkValidity()) {
      setValidSections((prevSections) => {
        const newSections = [...prevSections];
        newSections[currentSection] = true;
        return newSections;
      });

      const nextSection = currentSection + 1;
      if (nextSection < sections.length) {
        setSections((prevSections) => {
          const newSections = [...prevSections];
          newSections[currentSection] = false;
          newSections[nextSection] = true;
          return newSections;
        });
        setCurrentSection(nextSection);
      } else if (currentSection === sections.length - 1) {
        setSections((prevSections) => {
          const newSections = [...prevSections];
          newSections[currentSection] = false; // Collapse the last section
          return newSections;
        });
      }
    } else {
      setValidSections((prevSections) => {
        const newSections = [...prevSections];
        newSections[currentSection] = false;
        return newSections;
      });
      form.reportValidity();
    }
  };
  const areAllSectionsValid = () => {
    return validSections.every((section) => section === true);
  };

  const formRef = useRef(null);
  const router = useRouter();

  // Access the query object from the router
  const { d, m, p, c, x, z, fapi, ps } = router.query;

  // Now you can use parameter1 and parameter2 in your component
  console.log("Parameter 1:", fapi);
  // console.log('Parameter 2:', parameter2);

  // const [formData, setFormData] = useState({});
  const [prevFormData, setPrevFormData] = useState({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [sensitive, setSensitive] = useState({
    formApi: "",
    $confirmationCode: "XYZ8561",
  });

  const [buildingData, setBuildingData] = useState({
    buildingAddress: "",
    buildingMunicipality: "",
    buildingProvince: "",
    buildingPostalCode: "",
    buildingAppartment: "",
  });

  const [contractData, setContractData] = useState({
    contract: "",
    contractNumber: "",
    contractDate: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const [ownerData, setOwnerData] = useState({
    name: "",
    surname: "",
    id: "",
  });

  const initialFormState = {
    $name: "",
    $docu: "",
    $surname: "",
    $sex: "",
    $idtype: "",
    $idnum: "",
    $nationality: "",
    $birthdate: "",
    $homeCountry: "",
    $homeTown: "",
    $address: "",
    email: "",
    $phone: "",
    $agreement: "",
    subject: "",
    honeypot: "",
    message: "",
    replyTo: "@", // this will set replyTo of email to email address entered in the form
    accessKey: "",
  };

  const [form, setForm] = useState(initialFormState);

  // Function to generate a new form state with names concatenated with numbers
  const generateNewForm = (num) => {
    let newFormState = {};
    for (let i = 0; i <= num; i++) {
      for (const key in initialFormState) {
        if (initialFormState.hasOwnProperty(key)) {
          newFormState[`${key}${i}`] = ""; // Concatenate number with field name
        }
      }
    }
    console.log(newFormState);
    return newFormState;
  };

  // Whenever the name property changes, update the subject accordingly
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      subject: "Booking: " + prevForm["$name0"] + " " + prevForm["$surname0"], // Assign the value of name to subject
      $docu: p,
      accessKey: x,
      // $jsonifiedForm: JSON.stringify(form),
    }));
    console.log("aaaa", form);

    setSensitive((s) => ({
      ...s,
      formApi: fapi,
    }));

    setBuildingData((buildingData) => ({
      ...buildingData,
      buildingAddress: d,
      buildingMunicipality: m,
      buildingProvince: p,
      buildingPostalCode: c,
      buildingAppartment: ps,
    }));
  }, [
    sections,
    form["$name0"],
    form.$surname,
    form.$docu,
    form.accessKey,
    sensitive.formApi,
  ]);

  const [response, setResponse] = useState({
    type: "",
    message: "",
  });

  const handleContinue = () => {
    const form = formRef.current;

    // console.log('Form:', form); // Check the form reference
    // console.log(form.checkValidity()); // Check if form is valid
    if (form.checkValidity() && areAllSectionsValid()) {
      // Form is valid, continue with the next step
      setIsPreviewMode(true);
      console.log("Form is valid");
    } else {
      // Form is invalid, display
      setIsPreviewMode(false);
      console.log("Form is invalid");
      form.reportValidity();
    }
  };

  const handleEdit = () => {
    setIsPreviewMode(false);
  };

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    let updatedValue = value;

    const regex1 = new RegExp(`^$name`);
    const regex2 = new RegExp(`^$homeTown`);
    const regex3 = new RegExp(`^$address`);
    const regex4 = new RegExp(`^$surname`);

    if (
      regex1.test(name) ||
      regex2.test(name) ||
      regex3.test(name) ||
      regex4.test(name)
    ) {
      // Capitalize the first letter of each word
      updatedValue = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // setForm({ ...form, [name]: updatedValue });

    setForm((prevForm) => ({
      ...prevForm,
      [name]: updatedValue,
    }));
  };

  const handleReDownload = async () => {
    const mergedObj = { ...form, ...contractData, ...buildingData };
    const jsonString = JSON.stringify(mergedObj);
    console.log("Maravilloso ", jsonString);
    const pdfWriter = PdfWriter(mergedObj);
    const blob = await pdfWriter.handlePDF();
    const base64String = await EncodingUtils._arrayBufferToBase64(blob);
    // setForm({ ...form, $docu: "test 123456" }); // TODO: doesn't work.
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleReDownload();

      const jsonifiedForm = JSON.stringify(form);
      // const newForm = { ...form, $jsonifiedForm: jsonifiedForm };
      // setForm(newForm);
      

      const res = await fetch("https://" + sensitive.formApi + "/submit", {
        method: "POST",
        body: jsonifiedForm,
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: "success",
          confirmMessage1: "Hemos recibido sus datos para el check-in",
          confirmMessage2:
            "Les recordamos que todos los huespedes mayores de 16 deberan cumplimentar este formulario online",
          confirmMessage3:
            "El dia del check in por favor traiga documentacion que acredite los datos aportados para todos los huespedes",
          message: "Gracias por elejir nuestro apartamento.",
        });
      } else {
        setResponse({
          type: "error",
          message: json.message,
        });
      }
    } catch (e) {
      console.log("An error occurred", e);
      setResponse({
        type: "error",
        message: "An error occured while submitting the form",
      });
    }
  };
  return (
    <div className="background-container">
      <div className="background-img" />
      <div className="background-overlay" />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column" />
            <div className="column  is-two-thirds">
              <div
                className={
                  response.type === "success"
                    ? "box notification is-success "
                    : "is-hidden"
                }
              >
                <p>{response.confirmMessage1}</p>
                <br />
                <p>
                  <strong>Codigo de confirmacion:</strong>{" "}
                  {sensitive.$confirmationCode}
                </p>
              </div>

              <div
                className={
                  response.type === "success"
                    ? "box notification is-info is-multiline content is-small"
                    : "is-hidden"
                }
              >
                <em>
                  <p>{response.confirmMessage2}</p>
                  <p>{response.confirmMessage3}</p>
                  <p>{response.message}</p>
                </em>
                {/* <div className="form-preview-buttons">
                  <button className="button is-warning is-large" type="button" onClick={handleReDownload}>Bajar formulario de check-in</button>
                </div> */}
              </div>
              <button
                className={
                  response.type === "success"
                    ? "notification button is-warning is-large"
                    : "is-hidden"
                }
                type="button"
                onClick={handleReDownload}
              >
                Download PDF again
              </button>
              <br />
              <a
                className={
                  response.type === "success"
                    ? "notification button is-primary is-medium"
                    : "is-hidden"
                }
                href="/"
              >
                Start new
              </a>

              <div
                className={
                  response.type === "error"
                    ? "tile box notification is-danger"
                    : "is-hidden"
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={response.message !== "" ? "is-hidden" : "columns"}
              >
                <div className="column content form-container">
                  <h2>Formulario De Auto-Registro (Self Check-in)</h2>

                  {!isPreviewMode ? (
                    <div>
                      Huesped(es)
                      <SelectionAtom
                        selectionList={[1, 2, 3, 4]}
                        name="numhosts"
                        value={selectedOption}
                        handleChange={handleOptionChange}
                      />
                      <form
                        ref={formRef}
                        id="my-form"
                        action="https://api.staticforms.xyz/submit"
                        method="post"
                        onSubmit={handleSubmit}
                        autoComplete="on"
                      >
                        {sections.map((isOpen, index) => (
                          <FormSection
                            key={`Huesped ${index + 1}`}
                            title={`Huesped ${index + 1}`}
                            isOpen={isOpen}
                            onToggle={() => handleSectionToggle(index)}
                            onContinue={handleNext}
                            sectionNumber={index + 1}
                          >
                            <TextInputAtom
                              key={"$name" + index}
                              title="Nombre completo"
                              name={"$name" + index}
                              value={form["$name" + index]}
                              handleChange={handleChange}
                              placeholder="Maria Francisca Gomez"
                              maxLength="82"
                              required
                            ></TextInputAtom>
                            <TextInputAtom
                              key={"$surname" + index}
                              title="Apellido completo"
                              name={"$surname" + index}
                              value={form["$surname" + index]}
                              handleChange={handleChange}
                              placeholder="Garcia Jimenez del Hierro"
                              maxLength="82"
                              required
                            ></TextInputAtom>

                            <GenderRadioMolecule
                              key={"$sex" + index}
                              name={"$sex" + index}
                              selection={form["$sex" + index]}
                              handleChange={handleChange}
                              index={index}
                            ></GenderRadioMolecule>
                            <CountrySelectionMolecule
                              key={"$nationality" + index}
                              title="Nationality"
                              name={"$nationality" + index}
                              value={form["$nationality" + index]}
                              handleChange={handleChange}
                            ></CountrySelectionMolecule>
                            <IdSelectionMolecule
                              key={"$idtype" + index}
                              title="Tipo documento identidad"
                              name={"$idtype" + index}
                              value={form["$idtype" + index]}
                              handleChange={handleChange}
                            />

                            <TextInputAtom
                              key={"$idnum" + index}
                              title="Numero documento de identidad"
                              name={"$idnum" + index}
                              value={form["$idnum" + index]}
                              handleChange={handleChange}
                              placeholder={"X91561553M"}
                              maxLength="72"
                              required
                            ></TextInputAtom>

                            <DateInputAtom
                              key={"$birthdate" + index}
                              title="Fecha nacimiento"
                              name={"$birthdate" + index}
                              value={form["$birthdate" + index]}
                              handleChange={handleChange}
                              required
                            />

                            <CountrySelectionMolecule
                              key={"$homeCountry" + index}
                              title="Pais de residencia"
                              name={"$homeCountry" + index}
                              value={form["$homeCountry" + index]}
                              handleChange={handleChange}
                            ></CountrySelectionMolecule>

                            <TextInputAtom
                              key={"$homeTown" + index}
                              title="Localidad de residencia"
                              name={"$homeTown" + index}
                              value={form["$homeTown" + index]}
                              handleChange={handleChange}
                              placeholder="Paracuellos de Jarama"
                              maxLength="72"
                              required
                            ></TextInputAtom>
                            <TextInputAtom
                              key={"$address" + index}
                              title="Dirreccion de residencia"
                              name={"$address" + index}
                              value={form["$address" + index]}
                              handleChange={handleChange}
                              placeholder="C. de Arturo Soria, 327-325, Cdad. Lineal, 28033 Madrid"
                              maxLength="72"
                              required
                            ></TextInputAtom>

                            <PhoneInputMolecule
                              key={"$phone" + index}
                              title="Numero de telefono movil"
                              name={"$phone" + index}
                              value={form["$phone" + index]}
                              handleChange={handleChange}
                              required
                            ></PhoneInputMolecule>

                            <EmailInputAtom
                              key={"$email" + index}
                              title="E-mail"
                              name={"$email" + index}
                              value={form["$email" + index]}
                              handleChange={handleChange}
                              index={index}
                            ></EmailInputAtom>

                            <AgreementCheckboxAtom
                              key={"$agreement" + index}
                              title="Agreement"
                              name={"$agreement" + index}
                              value={form["$agreement" + index]}
                              handleChange={handleChange}
                              index={index}
                            ></AgreementCheckboxAtom>

                            <div className="field" style={{ display: "none" }}>
                              <label className="label">Title</label>
                              <div className="control">
                                <input
                                  type="text"
                                  name="honeypot"
                                  style={{ display: "none" }}
                                  onChange={handleChange}
                                />
                                <input
                                  type="hidden"
                                  name="subject"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div></div>
                          </FormSection>
                        ))}
                      </form>
                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            className="button is-primary"
                            type="button"
                            onClick={handleContinue}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    sections.map((isOpen, index) => (
                      <div className="form-preview-container">
                        <h3>Confirmar los datos {index + 1}</h3>
                        <div className="form-preview-content">
                          <p>
                            <strong>Nombre:</strong> {form["$name" + index]}
                          </p>
                          <p>
                            <strong>Apellido:</strong>{" "}
                            {form["$surname" + index]}
                          </p>
                          <p>
                            <strong>Genero:</strong> {form["$sex" + index]}
                          </p>
                          <p>
                            <strong>Tipo documento de identidad:</strong>{" "}
                            {form["$idtype" + index]}
                          </p>
                          <p>
                            <strong>Numero documento identidad:</strong>{" "}
                            {form["$idnum" + index]}
                          </p>
                          <p>
                            <strong>Nacionalidad:</strong>{" "}
                            {form["$nationality" + index]}
                          </p>
                          <p>
                            <strong>Fecha de nacimiento:</strong>{" "}
                            {form["$birthdate" + index]}
                          </p>
                          <p>
                            <strong>Pais de residencia:</strong>{" "}
                            {form["$homeCountry" + index]}
                          </p>
                          <p>
                            <strong>Ciudad de residencia:</strong>{" "}
                            {form["$homeTown" + index]}
                          </p>
                          <p>
                            <strong>Dirreccion de residencia:</strong>{" "}
                            {form["$address" + index]}
                          </p>
                          <p>
                            <strong>Email:</strong> {form["$email" + index]}
                          </p>
                          <p>
                            <strong>Telefono:</strong> {form["$phone" + index]}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {isPreviewMode ? (
                    <div className="form-preview-buttons">
                      <div className="control">
                        <button
                          className="button is-primary"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Confirm
                        </button>
                        <button
                          className="button"
                          type="button"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
            <div className="column" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .notification {
          z-index: 4;
        }

        .form-preview-container {
          padding: 20px;
          border: 1px solid #ccc; /* Add a 1px solid border */
          border-radius: 25px; /* Add some border radius for rounded corners */
          background-color: rgba(205, 215, 205, 0.4);
        }

        .form-preview-buttons {
          margin-top: 20px;
          display: flex;
          justify-content: space-between; /* Add space between buttons */
        }

        .form-preview-buttons button {
          flex: 1; /* Each button takes equal space */
          margin-right: 10px; /* Add right margin between buttons */
        }
        .form-preview-buttons button:last-child {
          margin-right: 0; /* Remove margin from the last button */
        }

        @media only screen and (max-width: 768px) {
          .background-container {
            overflow-x: hidden;
          }
        }

        .background-container {
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
          position: relative;
          width: 100vw;
          height: 100vh;
          left: 0;
          top: 0;
          margin: 0;
          padding: 0;
        }

        .background-overlay {
          filter: blur(8px); /* Adjust the blur value as needed */
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(205, 215, 205, 0.4); /* Adjust opacity here */
          z-index: 1; /* Ensure the overlay is behind the form */
        }

        .background-img {
          background-image: url("img/pool.jpg");
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
          filter: blur(8px); /* Adjust the blur value as needed */
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;

          z-index: 1; /* Ensure the overlay is behind the form */
        }

        .form-container {
          position: relative;
          z-index: 2; /* Ensure the form is above the overlay */
        }

        .form-container .content {
          max-height: calc(100vh - 100px); /* Adjust as needed */
          overflow-y: auto;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
