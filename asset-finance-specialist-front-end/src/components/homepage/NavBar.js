import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'



function NavBar(props) {


  console.log("email navbar",props.email)  

  

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        padding: '10px 20px',
        borderBottom: '2px solid black',
        marginBottom: '20px',
        backgroundColor: 'black'
      };
    
      const titleStyle = {
        fontWeight: 'bold',
        fontSize: '24px',
        color: 'white',
        cursor: 'pointer',
        paddingRight: '420px'
      };
    
      const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer'
        
      };

      const logOutStyle = {

        position: 'absolute', 
        top: '100%',
        left: 1300,
        backgroundColor: 'black', 
        border: '1px solid #ccc', 
        width: '200px', 
        padding: '8px', 
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        color: 'white',
       };

      const logOutText = {

        color: 'white'
      };

      

      const [isOpen, setIsOpen] = useState(false);  // State to control the visibility of the dropdown

      
      let navigate = useNavigate();

      function handleLoginClick(){
        console.log("Login clicked")
        navigate('/login'); 
      }

      function handleSignUpClick(){
        console.log("Signup clicked")

        navigate('/signup');
        }

      function handleTitleClick(){
        console.log("Login clicked")
        navigate('/',{ state: { email: props.email } }); 
      }

      function handlePlans(){
        console.log("Available Plans clicked")
        // navigate('/muscleplan',{ state: { email: props.email } }); 
      }

      function toggleDropdown(){
        console.log("isOpen is, ",isOpen)
        setIsOpen(!isOpen); 
      }

      function handleLogout(){
        //console.log("isOpen is, ",isOpen)
        
        navigate('/');
      }



  

  if(!props.email){

     return(<div style={navStyle}>
      <div onClick={handleTitleClick} style={titleStyle}>ASSET FINANCE SPECIALISTS</div>

      <div onClick={handleSignUpClick} style={linkStyle}>Signup</div>
     
      <div onClick={handleLoginClick} style={linkStyle} >Login</div>
      
    </div> )

  }

  
    
  return (
    <div style={navStyle}>
      <div onClick={handleTitleClick}  style={titleStyle}>ASSET FINANCE SPECIALISTS</div>


      
      <div onClick={toggleDropdown}  style={linkStyle} >{props.email}</div>

      {isOpen && (
  <div style={logOutStyle}>
    <a onClick={handleLogout} style={logOutText}>Logout</a>
  </div>
)}
    
      
    </div> 




  )
}

export default NavBar;
