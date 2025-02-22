import React, { useState } from 'react';
import "../../css/LoginForm.css";

function LoginForm() { 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    // let navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        setErrors({});
    
        console.log("form submitted");
    }    

    return (
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
    
              {errors.message && <div style={{ color: "red" }}>{errors.message}</div>}
    
            </div>
            <button type="submit">Login</button>
          </form>
          </div>
    );




}

export default LoginForm;