import React from "react";
import { IoIosChatbubbles } from "react-icons/io"; // Import texting/chat bubble icon

const TextingIcon = () => {
  const textingIconStyle = {
    position: "fixed",
    top: "7px",
    right: "7px",
    zIndex: 1000,
    width: "40px",
    height: "40px",
    borderRadius: "30%",
    backgroundColor: "#007AFF", // iPhone app blue
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textDecoration: "none",
    // boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
    cursor: "pointer",
  };

  return (
    <a
      href="sms:1234567890" // Replace with your desired phone number
      target="_blank"
      rel="noopener noreferrer"
      style={textingIconStyle}
    >
      <IoIosChatbubbles size={27} />
    </a>
  );
};

export default TextingIcon;
