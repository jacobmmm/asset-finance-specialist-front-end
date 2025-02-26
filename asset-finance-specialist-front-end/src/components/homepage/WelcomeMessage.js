import React from "react";
import "../../css/WelcomeMessage.css";
import "../../css/NavBar.css" // Import external CSS file
import {useNavigate} from 'react-router-dom'

const WelcomeMessage = (props) => {

    console.log("email in welcome message",props.email)

    let navigate = useNavigate();

    function handleLoginClick(){
        console.log("Login clicked in welcome message")
        navigate('/login'); 
      }

    function handleSignUpClick(){
        console.log("Signup clicked")

        navigate('/signup');
        }

  if(!props.email){
    return (
      <div className="message-container">
        <p>Welcome To Asset Finance Specialists</p>
        <p>
          Please <a href="#" onClick={handleLoginClick} className="link">login</a> or <a href="#" onClick={handleSignUpClick} className="link">signup</a> to continue
        </p>
      </div>
    )
  
};
 
    return (
      <div className="message-container">
        <p>Welcome {props.email}!</p>
        <p>
        <a href="#"  className="link">Click here</a> to create your first finance application
        </p>
      </div>
    )
 }


export default WelcomeMessage;
