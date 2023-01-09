import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // Fetch API call
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email, password})
          });
          const json = await response.json();
          console.log(json);
          
        // After getting success, in the above procedure, we will save the auth token in the local storage and will use the ‘UseNavigate’ hook to redirect the client to the Homepage. Otherwise, we will show an alert of ‘invalid credentials’ to the user 
          if(json.success){
            // Save the authtoken and redirect the client to homepage
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully","success");
          }
          else{
            alert("Invalid Credentials");
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} name="password"/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    </div>
  )
}

export default Signup
