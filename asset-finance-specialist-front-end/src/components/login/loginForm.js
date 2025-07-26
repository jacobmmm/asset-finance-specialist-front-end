import React, { useState } from 'react';
import "../../css/LoginForm.css";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

function LoginForm() { 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        setErrors({});
        setIsLoading(true);
    
        console.log("form submitted");

        console.log('Email:', email);
        console.log('Password:', password);
    
        try {
          
          const response = await fetch('https://asset-finance-specialist-backend.onrender.com/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              
              email,
              password,
              
            })
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log('Login successful:', result);
            console.log("Navigating with email:", email);
            navigate('/',{ state: { email: email } })
            // Handle actions after successful registration like redirecting to a login page or showing a success message
          } else {
            setErrors(errors => ({ ...errors, message: "Invalid Credentials" }));
            throw new Error('Login Failed');
          }
        } catch (error) {
          setErrors(errors => ({ ...errors, message: "Invalid Credentials" }));
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }  
    }    

    return (
        <>
        {isLoading && <LoadingSpinner />}
        <div className="login-container">
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
    
              {errors.message && <div style={{ color: "red" }}>{errors.message}</div>}
    
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>
          </div>
        </>
    );




}

export default LoginForm;