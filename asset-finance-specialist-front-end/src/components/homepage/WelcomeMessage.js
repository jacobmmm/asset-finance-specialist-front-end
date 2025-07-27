import React, { useEffect, useState } from "react";
import "../../css/WelcomeMessage.css";
import {useNavigate} from 'react-router-dom'
import FinanceTable from "./FinanceTable";

const WelcomeMessage = (props) => {

    console.log("email in welcome message",props.email)

    const userEmail = props.email;
    // let financeData = [];
    // let userData = {};

    const [financeData, setFinanceData] = useState([]);
    const [userData, setUserData] = useState(null);

    
    useEffect(() => {
    const fetchApplication = async () => {
      console.log("Fetching application")

      try {
        
        // Construct query parameters
        const queryParams = new URLSearchParams({
          userEmail,
        }).toString();
      
        const response = await fetch(`https://asset-finance-specialist-backend.onrender.com/getFinanceApplication?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log("Response in fetching finance data",response)
        const data = await response.json();
        console.log('Fetched data:', data.financials);

        setFinanceData(data.financials);
        //financeData.push(data.financials);
        console.log("Finance data after fetching: ", data.financials)
      
        // Handle the response as needed...
      } catch (error) {
        console.error("Error during GET request:", error);
      }
    }

    const fetchUserDetails = async () => {
      
      console.log("Fetching user details")

      try {
        
        // Construct query parameters
        const queryParams = new URLSearchParams({
          userEmail,
        }).toString();
      
        const response = await fetch(`https://asset-finance-specialist-backend.onrender.com/getUser?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        //console.log("Response in fetching finance data",response)
        const data = await response.json();
        console.log('Fetched user data:', data.userData);

        
        //financeData.push(data.financials);
        //userData = data.userData;
        //setUserData(data.userData);
        //console.log("User data after fetching: ",userData)

        function calculateAge(dobString) {
          const dob = new Date(dobString);       // Convert string to Date object
          const diff = Date.now() - dob.getTime(); 
          const ageDate = new Date(diff);        // Create a date object from the difference
          return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        
        // Add the calculated age to the user object
        data.userData.age = calculateAge(data.userData.dob);
        setUserData(data.userData);
        //console.log("New User data: ",userData)
        
      
        // Handle the response as needed...
      } catch (error) {
        console.error("Error during GET request:", error);
      }
    } 

     if(userEmail){
     fetchUserDetails();
     fetchApplication();
           } 

  }, [userEmail]);

  

   useEffect(() => {
    console.log("Finance data after update: ",financeData)

   }, [financeData]);

   useEffect(() => {
    console.log("User data after update: ",userData)

   }, [userData]);

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
        <p>Please continue to get started</p>
        <div className="button-container">
          <button onClick={handleLoginClick} className="welcome-button primary">
            Login
          </button>
          <button onClick={handleSignUpClick} className="welcome-button secondary">
            Sign Up
          </button>
        </div>
      </div>
    )
  
};

if(!financeData){
 
    return (
      <div className="message-container">
        <p>Welcome {props.email}!</p>
        <p>Ready to get started with your finance application?</p>
        <div className="button-container">
          <button onClick={createFinanceApplication} className="welcome-button primary">
            Create Finance Application
          </button>
        </div>
      </div>
    )
 }

 return (
  <div className="message-container">
    <br></br>
    <br></br>
    <p><h3>Welcome {props.email}!</h3></p>
    {/* <FinanceTable financeData={financeData} userData={userData} /> */}
    {/* <br></br> */}
    
    {userData ? (
        <FinanceTable financeData={financeData} userData={userData} userEmail={userEmail} />
      ) : (
        <p>Loading user data...</p>
      )}
    
  </div>
)

}


export default WelcomeMessage;
