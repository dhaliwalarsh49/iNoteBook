import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const createAccount = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            alert("Password in both field must match! Enter correct password");
            setCredentials({ ...credentials, password: "", cpassword: "" });
        }

        else {
            // **** Creating user in database by api call
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            })
            const user_json = await response.json();

            if (user_json.success) {
                localStorage.setItem('authToken', user_json.authToken);
                navigate("/");
            }
            else {
                alert(user_json.error)
                setCredentials({ ...credentials,name: "", email : "", password: "", cpassword: "" });
            }
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container topPosition'>
            <h2 className='text-center'>Create an Account on iNoteBook</h2>
            <form onSubmit={createAccount}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={credentials.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' minLength={4} value={credentials.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={4} value={credentials.cpassword} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Signup