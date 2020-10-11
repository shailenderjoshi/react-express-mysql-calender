import React from 'react';
import { useHistory } from "react-router-dom";
import { getDataFromLocalStorage } from '../utility/utility';

export default function Header(props) {

    const history = useHistory();

    // handle click event of logout button
    const handleLogout = () => {    
       localStorage.clear();  
       history.push("/");
    }

    return (
        <div className="Header">
            <span className="headerLeft">Welcome {getDataFromLocalStorage('name')} !</span>
            <span className="headerRight"><input type="button" onClick={handleLogout} value="Logout" /></span>
        </div>
    )
}
