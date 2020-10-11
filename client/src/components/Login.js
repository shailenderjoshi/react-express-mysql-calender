import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { getFetch } from '../utility/utility';

export default function Login() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [pwd, setPassword] = useState('');
    const [error, setError] = useState('');
    
    function login(){
        return getFetch('http://localhost:3001/api/login', 'POST', {
            username : username,
            pwd : pwd
        });
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();

        // Apply validation on frontend
        if(!username.trim()){
          setError("Username can not be empty !");
          return false;
        }  
        if(!pwd.trim()){
          setError("Password can not be empty !");  
          return false;  
        }  
        

        login().then( res => { 
            if(res.status === 'SUCCESS'){

                // Set loginStatus and token value in local storage
                localStorage.setItem('mylogin', JSON.stringify({ loginStatus: true, name: username, token: res.token }));

                // Redirect to calender page
                history.push("/dashboard");

            } else {
                setError(res.msg);
            }
        }).catch(error => console.log(error));
    }

    return ( 
        <div className="login">
            <center> <h1> Login Form </h1> </center>   
            <form onSubmit={handleSubmit}>  
                <div className="container">   
                    <label>Username : </label>   
                    <input type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value) } />  
                    <label>Password : </label>   
                    <input type="password" placeholder="Enter Password" value={pwd} onChange={e => setPassword(e.target.value) } />  
                    <span className="errorClass">{ error ? error : ""}</span>
                    <button type="submit" className="myButton">Login</button>   
                    <p>username : shail   | password : 123</p>
                    <p>username : admin   | password : admin</p>
                </div>   
            </form>   
        </div>
    )
}
