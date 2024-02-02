import React, { useState, useEffect, useRef } from 'react';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

function PhoneInput({ onPhoneChange, name, required }) {
    const inputRef = useRef();
    let iti;
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        iti = intlTelInput(inputRef.current, {
            initialCountry: 'ES',
            separateDialCode: false,
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/19.2.16/js/utils.js',
        });

        // Listen for the country change event
        inputRef.current.addEventListener('countrychange', function (e) {
            // Get the selected country's dial code
            const dialCode = iti.getSelectedCountryData().dialCode;
            // Prefill the input with the dial code
            iti.setNumber('+' + dialCode);
        });

        // Add event listener for input changes
        inputRef.current.addEventListener('input', handleChange);

        return () => {
            // Clean up event listeners and destroy the intlTelInput instance
            //   inputRef.current.removeEventListener('input', handleChange);
            iti.destroy();
        };
    }, []);

    const handleChange = () => {
        if (!iti) return;
        const phoneNumber = iti.getNumber();

        setPhoneNumber(phoneNumber);
        const event = { target: { name, value: phoneNumber } };
        onPhoneChange(event);
    };

    const handleKeyPress = (event) => {
        const allowedKeys = /^[0-9+]*$/;
        if (!(event.key.match(allowedKeys) || event.keyCode === 8)) {
            event.preventDefault();
        }
    };

    // Expose the phone number value to the parent component
    useEffect(() => {
        onPhoneChange({ target: { name, value: phoneNumber } });
    }, [phoneNumber]);


    return (
        <input
            ref={inputRef}
            type="tel"
            className='input dropdown'
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            name={name}
            required
        />
    );
}

export default PhoneInput;
