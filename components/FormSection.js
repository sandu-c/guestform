import { useState } from "react";

const FormSection = ({
  sectionNumber,
  title,
  children,
  isOpen,
  onToggle,
  onContinue,
}) => {
  const sectionStyle = {
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "rgba(205, 215, 205, 0.4)", // Transparent background
  };

  // Define buttonStyle as a constant object
  const buttonStyle = {
    border: "none",
    background: "none",
    color: "blue",

    cursor: "pointer",
    padding: "0",
    margin: "0",
  };

  // Define badgeStyle as a constant object
  const badgeStyle = {
    display: "inline-block",
    backgroundColor: "blue",
    color: "white",
    padding: "5px 10px",
    borderRadius: "50%",
    marginRight: "10px",
  };

  return (
    <section>
      <div style={sectionStyle}>
        <button type="button" onClick={onToggle} style={buttonStyle}>
          <span style={badgeStyle}>{sectionNumber}</span>{" "}
          {/* Section number passed dynamically */}
          {isOpen ? "-" : "+"} {title}
        </button>
        {isOpen && (
          <div>
            {children}
            <button type="button" onClick={onContinue}>
              Siguente
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FormSection;
