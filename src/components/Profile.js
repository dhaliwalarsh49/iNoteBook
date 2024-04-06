import React, { useEffect, useState, useContext } from 'react'
import alertContext from '../contexts/alerts/alertContext';

function Profile() {

    const [user, setUser] = useState({ name: "", email: "", date: "" });
    const alertObj = useContext(alertContext);

    const fetchUserProfile = async () => {
        // **** Fetch user profile from database by api call
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken")
            }
        })
        const user_json = await response.json();
        if (user_json.success) {
            const {name, email, date} = user_json.user;

            const currentDate = new Date(date);
            const monthName = currentDate.toLocaleString('default', { month: 'long' });
            const year = currentDate.getFullYear();
            const udate = currentDate.getDate();
            const simplifiedDate = `${monthName} ${udate < 10 ? '0' + udate : udate}, ${year}`;

            setUser({ name: name, email: email, date: simplifiedDate });
        }
        else {
            alertObj.showAlert(user_json.error, "danger")
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, [])

    return (
        <div className='container topPosition'>

            {!localStorage.getItem('authToken') ? <h1>Please Login to see your Profile</h1> :
                <div className="card border-light mb-3">
                    <h2 className="card-header">User Profile</h2>
                    <div className="card-body">
                        <h5 className="card-title">Name : {user.name}</h5>
                        <h5 className="card-title">Email : {user.email}</h5>
                        <h5 className="card-title">Registered on : {user.date}</h5>
                    </div>
                </div>}

        </div>
    )
}

export default Profile