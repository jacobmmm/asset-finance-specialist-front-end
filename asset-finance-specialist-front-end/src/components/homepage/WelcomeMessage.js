import React, { useEffect, useState } from "react";
import "../../css/WelcomeMessage.css";
import "../../css/NavBar.css" // Import external CSS file
import {useNavigate} from 'react-router-dom'

const WelcomeMessage = (props) => {

    console.log("email in welcome message",props.email)

    const userEmail = props.email;

    const [financeData, setFinanceData] = useState([]);
    useEffect(() => {
    const fetchApplication = async () => {
      console.log("Fetching application")

      try {
        
        // Construct query parameters
        const queryParams = new URLSearchParams({
          userEmail,
        }).toString();
      
        const response = await fetch(`http://localhost:5000/getFinanceApplication?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setFinanceData(response.data)
      
        // Handle the response as needed...
      } catch (error) {
        console.error("Error during GET request:", error);
      }
    }
     if(userEmail){
     fetchApplication();
     }

  }, [userEmail]);

    let navigate = useNavigate();

    function handleLoginClick(){
        console.log("Login clicked in welcome message")
        navigate('/login'); 
      }

    function handleSignUpClick(){
        console.log("Signup clicked")

        navigate('/signup');
        }

    function createFinanceApplication(){
        console.log("Create finance application clicked")
        console.log("Navigating to finance registration with email:", userEmail)

        //navigate('/financeRegistration',{ state: { email: userEmail } });
        navigate(`/financeRegistration?email=${encodeURIComponent(userEmail)}`);
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

if(!financeData){
 
    return (
      <div className="message-container">
        <p>Welcome {props.email}!</p>
        <p>
        <a href="#" onClick={createFinanceApplication}  className="link">Click here</a> to create your first finance application
        </p>
      </div>
    )
 }

 return (
  <div className="message-container">
    <p>Welcome {props.email}!</p>
    <p>Table to be implemented</p>
    
  </div>
)

}


export default WelcomeMessage;
