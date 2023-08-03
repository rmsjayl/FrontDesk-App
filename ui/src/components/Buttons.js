import React from "react";
import BUTTONSTYLE from "styles/button.module.css";

export const Buttons = ({ children, onClick, buttonStyle, type }) => {
  const BTNSTYLE = ["btn-primary", "btn-secondary", "btn-danger"];

  const checkButtonStyle = BTNSTYLE.includes(buttonStyle)
    ? buttonStyle
    : BTNSTYLE[0];

  return (
    <button
      className={`${BUTTONSTYLE.btn} ${BUTTONSTYLE[checkButtonStyle]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
