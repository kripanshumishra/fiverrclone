import "./Popup.css";
import {  useState } from "react";
export default function Popup({ message, type }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`inline-spacing popup-container popup-open popup-${type} ${
        isOpen ? "" : "popup-d-none"
      }`}
    >
      <p>{message}</p>
      <span className="popup-close">
        <button
          onClick={(e) => {
            setIsOpen(false);
          }}
          aria-label="close the popup"
          className="popup-close__btn"
        >
          X
        </button>
      </span>
    </div>
  );
}
