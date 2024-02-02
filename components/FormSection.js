import { useState } from 'react';

const FormSection = ({ sectionNumber, title, children, isOpen, onToggle, onContinue }) => {
    const sectionStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent background
      };

      // Define buttonStyle as a constant object
  const buttonStyle = {
    border: 'none',
    background: 'none',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '0',
    margin: '0',
  };

    // Define badgeStyle as a constant object
    const badgeStyle = {
        display: 'inline-block',
        backgroundColor: 'blue',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '50%',
        marginRight: '10px',
      };

  return (
    <section>
 <div style={sectionStyle}>
      <button onClick={onToggle} style={buttonStyle}>
      <span style={badgeStyle}>{sectionNumber}</span> {/* Section number passed dynamically */}
        {isOpen ? '-' : '+'} {title}
      </button>
      {isOpen && (
        <div>
          {children}
          <button onClick={onContinue}>Siguente</button>
        </div>
      )}
    </div>
    </section>
   
  );
};

export default FormSection;
