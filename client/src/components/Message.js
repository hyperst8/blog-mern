import React from "react";

const Message = ({ success, message }) => {
  return (
    <div
      className={`message-box ${
        success ? "success" : success === false ? "failed" : ""
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Message;
