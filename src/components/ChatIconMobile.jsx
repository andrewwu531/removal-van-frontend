import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon from react-icons

const ChatIcon = () => {
  const chatIconStyle = {
    position: "fixed",
    top: "12px",
    right: "12px",
    zIndex: 1000,
    width: "33px",
    height: "33px",
    borderRadius: "25%",
    backgroundColor: "#25D366", // Official WhatsApp green
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textDecoration: "none",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
    cursor: "pointer",
  };

  return (
    <a
      href="https://api.whatsapp.com/send?phone=07943059792"
      target="_blank"
      rel="noopener noreferrer"
      style={chatIconStyle}
    >
      <FaWhatsapp size={25} />
    </a>
  );
};

export default ChatIcon;
