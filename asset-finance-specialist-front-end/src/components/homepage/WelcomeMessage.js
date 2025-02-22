import React from "react";
import "../../css/WelcomeMessage.css"; // Import external CSS file

const WelcomeMessage = () => {
  return (
    <div className="message-container">
      <p>Welcome To Asset Finance Specialists</p>
      <p>
        Please <a href="#" className="link">login</a> or <a href="#" className="link">signup</a> to continue
      </p>
    </div>
  );
};

export default WelcomeMessage;
