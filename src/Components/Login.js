import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // Fetch API call
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          
        // After getting success, in the above procedure, we will save the auth token in the local storage and will use the ‘UseNavigate’ hook to redirect the client to the Homepage. Otherwise, we will show an alert of ‘invalid credentials’ to the user 
          if(json.success){
            // Save the authtoken and redirect the client to homepage
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully","success");
            navigate("/");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
