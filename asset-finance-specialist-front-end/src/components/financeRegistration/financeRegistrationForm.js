
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import "../../css/LoginForm.css";

function FinanceRegistrationForm(props) {
    const [income, setIncome] = useState('');
    const [assets, setAssets] = useState('');
    const [liabilities, setLiabilities] = useState('')
    const [expenses, setExpenses] = useState(''); 
   
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    const email = props.email;
    console.log("Email in finance registration form: ",email)

    const handleFinanceRegistration = async (event) => {
      event.preventDefault();

      try {
            const response = await fetch('http://localhost:5000/addFinanceApplication', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
               email, 
               income,
               assets,
               liabilities,
               expenses,
              })
            });
        
            if (response.ok) {
              const result = await response.json();
              console.log('Success:', result);
              navigate('/',{ state: { email: email } });
              // Handle actions after successful registration like redirecting to a login page or showing a success message
            } else {
              throw new Error('Failed to register');
              setErrors('Failed to register. Please try again.');
            }
          } catch (error) {
            
            console.error('Error:', error);
            setErrors('Failed to register. Please try again.');
          }  
    

    }

    // const handleRegistration = async (event) => {
    //   event.preventDefault();
    //   // Add your login logic here
    //   setErrors({});
      
    //   console.log("RegistrationDetails submitted");
      

    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    //   if (!emailRegex.test(email)) {
    //     setErrors(errors => ({ ...errors, email: "Please enter a valid email address." }));
    //     return; // Stop the form submission if email is invalid
    // }

    // // Checking if passwords match
    // if (password !== confPwd) {
    //     setErrors(errors => ({ ...errors, password: "Passwords do not match." }));
    //     return; // Stop the form submission if passwords do not match
    // }

    // console.log("RegistrationDetails submitted");


    //   try {
    //     const response = await fetch('http://localhost:5000/register', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         firstName,
    //         lastName,
    //         DOB,
    //         address1,
    //         address2,
    //         suburb,
    //         email,
    //         password,
    //         state,
    //         postcode
    //       })
    //     });
    
    //     if (response.ok) {
    //       const result = await response.json();
    //       console.log('Success:', result);
    //       navigate('/login');
    //       // Handle actions after successful registration like redirecting to a login page or showing a success message
    //     } else {
    //       throw new Error('Failed to register');
    //       setErrors('Failed to register. Please try again.');
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     setErrors('Failed to register. Please try again.');
    //   }  

      

      
    // };
  
    return (
      <div className="login-container">

{/* {errors && <p style={{ color: 'red' }}>{String(errors)}</p>} */}
        
        <form onSubmit={handleFinanceRegistration}>

        <div className="input-group">
            <label htmlFor="income">Income</label>
            <input
              type="text"
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
          </div>  

          <div className="input-group">
            <label htmlFor="assets">Asset</label>
            <input
              type="text"
              id="assets"
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="expenses">Expenses</label>
            <input
              type="text"
              id="expenses"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="liabilities">Liabilities</label>
            <input
              type="liabilities"
              id="liabilities"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Apply</button>
        </form>
        
      </div>
    );
  }
  
  export default FinanceRegistrationForm;