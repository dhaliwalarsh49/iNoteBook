import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../contexts/alerts/alertContext';

function Login() {

    const alertObj = useContext(alertContext);

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const loginAccount = async (e) => {
        e.preventDefault();

        // **** Login user in database by api call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })
        })
        const user_json = await response.json();

        if (user_json.success) {
            localStorage.setItem('authToken', user_json.authToken);
            alertObj.showAlert("Login Successful", "success")
            navigate("/");
        }
        else {
            alertObj.showAlert(user_json.error, "danger")
            setCredentials({ ...credentials, email: "", password : "" });
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container topPosition'>
            <h2 className='text-center'>Login to iNoteBook</h2>
            <form onSubmit={loginAccount}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login