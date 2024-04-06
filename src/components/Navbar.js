import React, {useContext} from 'react'
import { Link, useLocation } from 'react-router-dom';
import alertContext from '../contexts/alerts/alertContext';

export default function Navbar() {

    let location = useLocation();

    const alertObj = useContext(alertContext);

    const handleLogOut = () => {
        localStorage.removeItem('authToken')
        alertObj.showAlert("Logged Out Successfully", "success");
    }

    const handleProfile = () => {
        
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('authToken') ? 
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-light mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-light mx-1" to="/signup" role="button">SignUp</Link>
                    </form> :
                    <div>
                        <Link style={{borderRadius : "50%"}} className="btn btn-light mx-3 btn-sm" to="/profile" role="button" onClick={handleProfile}> <i className="fa-solid fa-user"></i></Link> 
                        <Link className="btn btn-outline-light mx-1" to="/login" role="button" onClick={handleLogOut}> <i className="fa-solid fa-right-from-bracket"></i> LogOut</Link>
                    </div>}
                </div>
            </div>
        </nav>
    )
}