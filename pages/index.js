import { useState, useEffect, useRef } from 'react';
import { continents, countries, languages } from 'countries-list'
import 'bulma/css/bulma.min.css';
import 'bulma-calendar/dist/css/bulma-calendar.min.css';
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
// import SignatureCanvas from '../components/SignatureCanvas';

import React from 'react';

import EncodingUtils from '../components/utils/encodingUtils';


import { useRouter } from 'next/router';
import PdfWriter from '../components/PdfWriter';
// import 'react-phone-number-input/style.css';

import PhoneInput from '../components/PhoneInput';


const Home = () => {

  const formRef = useRef(null);
  const router = useRouter();

  // Access the query object from the router
  const { d, m, p, c, x, z, fapi, ps } = router.query;

  // Now you can use parameter1 and parameter2 in your component
  console.log('Parameter 1:', fapi);
  // console.log('Parameter 2:', parameter2);

  // const [formData, setFormData] = useState({});
  const [prevFormData, setPrevFormData] = useState({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);


  const [sensitive, setSensitive] = useState({
    formApi: '',
    $confirmationCode: 'XYZ8561',

  });

  const [buildingData, setBuildingData] = useState({
    buildingAddress: '',
    buildingMunicipality: '',
    buildingProvince: '',
    buildingPostalCode: '',
    buildingAppartment: '',
  });

  const [contractData, setContractData] = useState({
    contract: '',
    contractNumber: '',
    contractDate: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const [ownerData, setOwnerData] = useState({
    name: '',
    surname: '',
    id: ''
  });

  const [form, setForm] = useState({
    name: '',
    $docu: '',
    $surname: '',
    $sex: '',
    $idtype: '',
    $idnum: '',
    $nationality: '',
    $birthdate: '',
    $homeCountry: '',
    $homeTown: '',
    $address: '',
    email: '',
    phone: '',
    $agreement: '',
    subject: '',
    honeypot: '',
    message: '',
    replyTo: '@', // this will set replyTo of email to email address entered in the form
    accessKey: ''
  });

  // Whenever the name property changes, update the subject accordingly
  useEffect(() => {
    setForm(prevForm => ({
      ...prevForm,
      subject: 'Booking: ' + prevForm.name + ' ' + prevForm.$surname, // Assign the value of name to subject
      $docu: p,
      accessKey: x
    }));

    setSensitive(s => ({
      ...s,
      formApi: fapi
    }));

    setBuildingData(buildingData => ({
      ...buildingData,
      buildingAddress: d,
      buildingMunicipality: m,
      buildingProvince: p,
      buildingPostalCode: c,
      buildingAppartment: ps
    }));


  }, [form.name, form.$surname, form.$docu, form.accessKey, sensitive.formApi]);

  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const generateCountryOptions = () => {
    // Sort country codes alphabetically
    const sortedCountryCodes = Object.keys(countries).sort((a, b) => {
      return countries[a].native.localeCompare(countries[b].native);
    });

    // Map over sorted country codes to generate options
    const countryOptions = sortedCountryCodes.map((code) => (
      <option key={code} value={code}>
        {countries[code].native}
      </option>
    ));

    // Add blank default option at the beginning
    countryOptions.unshift(
      <option key="blank" value="">
        -
      </option>
    );

    return countryOptions;

  };

  const handleSave = (dataURL) => {
    // Handle the saved signature data (dataURL)
    console.log('Saved Signature:', dataURL);
  };

  const handleContinue = () => {

    const form = formRef.current;
    console.log('Form:', form); // Check the form reference
    console.log(form.checkValidity()); // Check if form is valid
    if (form.checkValidity()) {
      // Form is valid, continue with the next step
      setIsPreviewMode(true);
      console.log('Form is valid');
    } else {
      // Form is invalid, display
      setIsPreviewMode(false);
      console.log('Form is invalid');
      form.reportValidity()
    }
  };

  const handleEdit = () => {
    setIsPreviewMode(false);
  };

  const handleChange = e => {
    console.log(e)
    const { name, value } = e.target;
    let updatedValue = value;


    if (name === 'name' || name === '$surname' || name === '$homeTown' || name === '$address') {
      // Capitalize the first letter of each word
      updatedValue = value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    setForm({ ...form, [name]: updatedValue });
  }

  const handleReDownload = () => {
    const mergedObj = { ...form, ...contractData, ...buildingData };
    const jsonString = JSON.stringify(mergedObj);
    console.log('Maravilloso ', jsonString);
    const blob = PdfWriter(mergedObj).handlePDF();
    const base64String = EncodingUtils._arrayBufferToBase64(blob);
    setForm({ ...form, $docu: base64String }); // TODO: doesn't work. How to assign string to form ?
  };

  const handleGoBack = () => {
    router.push('/');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {

      handleReDownload();

      const res = await fetch('https://' + sensitive.formApi + '/submit', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          confirmMessage1: 'Hemos recibido sus datos para el check-in',
          confirmMessage2: 'Les recordamos que todos los huespedes mayores de 16 deberan cumplimentar este formulario online',
          confirmMessage3: 'El dia del check in por favor traiga documentacion que acredite los datos aportados para todos los huespedes',
          message: 'Gracias por elejir nuestro apartamento.'
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'An error occured while submitting the form'
      });
    }

  };
  return (



    <div className="background-container" >
      {/* <h1>Your Next.js Page</h1>
      <a href="/Hoja_test.pdf" download>
        Download PDF
      </a> */}
      <div className="background-img" />
      <div className="background-overlay" />

      <div className='section'>

        <div className='container'>

          <div className='columns'>
            <div className='column' />
            <div className='column  is-two-thirds'>
              <div
                className={
                  response.type === 'success'
                    ? 'box notification is-success '
                    : 'is-hidden'
                }
              >
                <p>{response.confirmMessage1}</p>
                <br />
                <p><strong>Codigo de confirmacion:</strong> {sensitive.$confirmationCode}</p>

              </div>

              <div
                className={
                  response.type === 'success'
                    ? 'box notification is-info is-multiline content is-small'
                    : 'is-hidden'
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
                className={response.type === 'success'
                  ? "notification button is-warning is-large"
                  : 'is-hidden'
                }
                type="button"
                onClick={handleReDownload}>
                Download PDF again
              </button>
              <br />
              <a className={response.type === 'success'
                ? "notification button is-primary is-medium"
                : 'is-hidden'
              } href="/" >
                Start new
              </a>


              <div
                className={
                  response.type === 'error'
                    ? 'tile box notification is-danger'
                    : 'is-hidden'
                }
              >
                <p>{response.message}</p>
              </div>
              <div
                className={response.message !== '' ? 'is-hidden' : 'columns'}
              >
                <div className='column content form-container'>

                  <h2>Formulario De Auto-Registro (Self Check-in)</h2>
                  {!isPreviewMode ? (
                    <form
                      ref={formRef}
                      id='my-form'
                      action='https://api.staticforms.xyz/submit'
                      method='post'
                      onSubmit={handleSubmit}
                    >
                      <div className='field'>
                        <label className='label'>Nombre completo</label>
                        <div className='control'>
                          <input
                            className='input'
                            type='text'
                            placeholder='Maria Francisca Gomez'
                            name='name'
                            onChange={handleChange}
                            maxLength='82'
                            value={form.name}
                            required
                          />
                        </div>
                      </div>
                      <div className='field'>
                        <label className='label'>Apellido completo</label>
                        <div className='control'>
                          <input
                            className='input'
                            type='text'
                            placeholder='Garcia Jimenez del Hierro'
                            name='$surname'
                            value={form.$surname}
                            onChange={handleChange}
                            maxLength='82'
                            required
                          />
                        </div>
                      </div>
                      {/* <div className='field'>
                  <label className='label'>Segundo apellido</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      placeholder='Rodriguez'
                      name='surname2'
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div> */}
                      {/* <div className='field'>
                  <label className='label'>Sexo</label>
                  <div className='select'>
                    <select name="$sex" id="sex" onChange={handleChange} required>
                      <option value="">-</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                    </select>
                  </div>
                </div> */}
                      <div className='field'>
                        <label className='label'>Sexo</label>
                        <div className='control'>

                          <label className='radio'>M&nbsp;
                            <input
                              className='radio'
                              type='radio'
                              name='$sex'
                              value='M'
                              onChange={handleChange}
                              checked={form.$sex === 'M'}
                              required
                            />&nbsp;

                          </label>


                          <label className='radio'>F&nbsp;

                            <input
                              className='radio'
                              type='radio'
                              name='$sex'
                              value='F'
                              onChange={handleChange}
                              checked={form.$sex === 'F'}
                              required
                            />&nbsp;

                          </label>

                        </div>
                      </div>
                      <div className='field'>
                        <label className='label'>Nacionalidad</label>
                        <div className='select'>
                          <select className="form-select" id="nationality" name="$nationality" value={form.$nationality} onChange={handleChange} required>
                            {generateCountryOptions()}
                          </select>
                        </div>
                      </div>
                      <div className='field'>
                        <label className='label'>Tipo documento identidad</label>
                        <div className='select'>
                          <select name="$idtype" value={form.$idtype} id="idtype" onChange={handleChange} required>
                            <option value="">-</option>
                            <option value="DNI">DNI</option>
                            <option value="Passport">Pasaporte</option>
                            <option value="Driver's licence">Permiso de conducir</option>
                            <option value="Nacional ID">Documento ID nacional</option>
                            <option value="NIE">Permiso residencia español</option>
                          </select>
                        </div>
                      </div>
                      <div className='field'>
                        <label className='label'>Numero documento de identidad</label>
                        <div className='control'>
                          <input
                            className='input'
                            type='text'
                            placeholder='X91561553M'
                            name='$idnum'
                            value={form.$idnum}
                            onChange={handleChange}
                            maxLength='72'
                            required
                          />
                        </div>
                      </div>

                      <div className='field'>
                        <label className='label'>Fecha nacimiento</label>
                        <div className='control'>
                          <input
                            className='input'
                            type='date'
                            placeholder='12/10/1999'
                            name='$birthdate'
                            value={form.$birthdate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className='field'>
                        <label className='label'>Pais de residencia</label>
                        <div className='select'>
                          <select className="form-select" id="country" name="$homeCountry" value={form.$homeCountry} onChange={handleChange} required>
                            {generateCountryOptions()}
                          </select>
                        </div>
                      </div>
                      <div className='field'>
                        <label className='label'>Localidad de residencia</label>
                        <div className='control'>
                          <input
                            className='input'
                            type='text'
                            placeholder='Paracuellos de Jarama'
                            name='$homeTown'
                            value={form.$homeTown}
                            onChange={handleChange}
                            maxLength='72'
                          />
                        </div>
                      </div>
                      <div className='field'>
                        <label className='label'>Dirreccion de residencia</label>
                        <div className='control'>
                          <input
                            className='input'
                            type='text'
                            placeholder='C. de Arturo Soria, 327-325, Cdad. Lineal, 28033 Madrid'
                            name='$address'
                            value={form.$address}
                            onChange={handleChange}
                            maxLength='72'
                          />
                        </div>
                      </div>
                      {/* <div className='field'>
                  <label className='label'>Numero de telefono fijo</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='tel'
                      placeholder='+34123456789'
                      pattern="^\+(?:[0-9]●?){6,14}[0-9]$"
                      name='telf'
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
                      <div className='field'>
                        <label className='label'>Numero de telefono movil</label>
                        <div className='control'>
                          {/* <input
                            className='input'
                            type='tel'
                            placeholder='+34123456789'
                            pattern="^(00|\+)(?:[0-9]●?){6,14}[0-9]$"
                            name='phone'
                            value={form.phone}
                            onChange={handleChange}
                            maxLength='82'
                            required
                          /> */}
                          <PhoneInput
                            className='input dropdown dropdown-trigger dropdown-menu dropdown-content dropdown-item'
                            type='tel'
                            placeholder="Enter phone number"
                            pattern="^(00|\+)(?:[0-9]●?){6,14}[0-9]$"
                            name='phone'
                            value={form.phone}
                            onPhoneChange={handleChange}

                            maxLength='82'
                            required

                          // You can also pass additional props like className, etc.
                          />
                          <small>En formato: +34 123 456 789 o 0034 123 456 789</small>
                        </div>
                      </div>


                      <div className='field'>
                        <label className='label'>E-mail</label>
                        <div className='control'>
                          <input
                            className='input'
                            type='email'
                            placeholder='antonio.lopez@mibuzon.com'
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            maxLength='82'
                            required
                          />
                        </div>
                      </div>


                      <div className='field'>
                        <label className='checkbox'>Acuerdo</label>
                        <div className='control'>
                          <input
                            className='checkbox'
                            type='checkbox'
                            placeholder='antonio.lopez@mibuzon.com'
                            name='$agreement'
                            checked={form.$agreement}
                            onChange={handleChange}
                            required
                          />
                          <p /> Estoy de acurdo con Real Decreto 933/2021
                        </div>
                      </div>

                      {/* <div className='field'>
                  <label className='label'>Firma</label>
                  <div className='control'>
                    <SignatureCanvas onSave={handleSave} />
                  </div>
                </div> */}
                      {/* <h1>Next.js Signature Field</h1> */}

                      <div className='field' style={{ display: 'none' }}>
                        <label className='label'>Title</label>
                        <div className='control'>
                          <input
                            type='text'
                            name='honeypot'
                            style={{ display: 'none' }}
                            onChange={handleChange}
                          />
                          <input
                            type='hidden'
                            name='subject'
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* <div className='field'>
                        <label className='label'>Message</label>
                        <div className='control'>
                          <textarea
                            className='textarea'
                            placeholder='Your Message'
                            name='message'
                            type='hidden'
                            value='asdasd'
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div> */}
                      <div></div>
                      {/* <div className='field is-grouped'>
                  <div className='control'>
                    <button className='button is-primary' >
                      Continue
                    </button>
                  </div>
                </div> */}




                      <div className='field is-grouped'>
                        <div className='control'>
                          <button className='button is-primary' type="button" onClick={handleContinue}>Continue</button>
                        </div>
                      </div>
                    </form>

                  ) : (
                    <div className="form-preview-container">
                      <h3>Confirmar los datos</h3>
                      <div className="form-preview-content">
                        <p><strong>Nombre:</strong> {form.name}</p>
                        <p><strong>Apellido:</strong> {form.$surname}</p>
                        <p><strong>Genero:</strong> {form.$sex}</p>
                        <p><strong>Tipo documento de identidad:</strong> {form.$idtype}</p>
                        <p><strong>Numero documento identidad:</strong> {form.$idnum}</p>
                        <p><strong>Nacionalidad:</strong> {form.$nationality}</p>
                        <p><strong>Fecha de nacimiento:</strong> {form.$birthdate}</p>
                        <p><strong>Pais de residencia:</strong> {form.$homeCountry}</p>
                        <p><strong>Ciudad de residencia:</strong> {form.$homeTown}</p>
                        <p><strong>Dirreccion de residencia:</strong> {form.$address}</p>
                        <p><strong>Email:</strong> {form.email}</p>
                        <p><strong>Telefono:</strong> {form.phone}</p>
                      </div>
                      <div className="form-preview-buttons">
                        <div className='control'>
                          <button className="button is-primary" type="submit" onClick={handleSubmit}>Confirm</button>
                          <button className="button" type="button" onClick={handleEdit}>Edit</button>
                        </div>
                      </div>
                    </div>

                  )}

                </div>
              </div>
            </div>
            <div className='column' />
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

        .background-container{
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
          background-image: url('/img/pool.jpg');
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
