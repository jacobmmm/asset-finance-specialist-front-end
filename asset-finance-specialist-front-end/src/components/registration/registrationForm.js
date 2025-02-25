
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import "../../css/LoginForm.css";

function RegistrationForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [DOB, setDOB] = useState('')
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confPwd, setConfPwd] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [suburb, setSuburb] = useState('');
    const [postcode, setPostcode] = useState('');
    const [state, setState] = useState('');
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    const handleRegistration = async (event) => {
      event.preventDefault();
      // Add your login logic here
      setErrors({});
      
      console.log("RegistrationDetails submitted");
      

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        setErrors(errors => ({ ...errors, email: "Please enter a valid email address." }));
        return; // Stop the form submission if email is invalid
    }

    // Checking if passwords match
    if (password !== confPwd) {
        setErrors(errors => ({ ...errors, password: "Passwords do not match." }));
        return; // Stop the form submission if passwords do not match
    }

    console.log("RegistrationDetails submitted");


      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            DOB,
            address1,
            address2,
            suburb,
            email,
            password,
            state,
            postcode
          })
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result);
          navigate('/login');
          // Handle actions after successful registration like redirecting to a login page or showing a success message
        } else {
          throw new Error('Failed to register');
          setErrors('Failed to register. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors('Failed to register. Please try again.');
      }  

      

      
    };
  
    return (
      <div className="login-container">

{/* {errors && <p style={{ color: 'red' }}>{String(errors)}</p>} */}
        
        <form onSubmit={handleRegistration}>

        <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>  

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="DOB">DOB</label>
            <input
              type="date"
              id="DOB"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confPassword"
              value={confPwd}
              onChange={(e) => setConfPwd(e.target.value)}
              required
            />

            {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}

          </div> 

          <div className="input-group">
            <label htmlFor="address1">Address 1</label>
            <input
              type="text"
              id="address1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
            />
          </div>  

          <div className="input-group">
            <label htmlFor="address2">Address 2 (Optional)</label>
            <input
              type="text"
              id="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              
            />
          </div>  

          <div className="input-group">
            <label htmlFor="suburb">Suburb </label>
            <input
              type="text"
              id="suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              required
            />
          </div> 

          <div className="input-group">
            <label htmlFor="postcode">Post Code</label>
            <input
              type="text"
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
          </div> 

          <div className="input-group">
            <label htmlFor="state">State </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div> 

          <button type="submit">Sign Up</button>
        </form>
        
      </div>
    );
  }
  
  export default RegistrationForm;