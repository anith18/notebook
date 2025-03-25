import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    let navigate=useNavigate ();
    //const host = "https://backend2-tw3m.onrender.com";
  const host = "http://localhost:5000";
    const [credentials,setCredentials]=useState({email:"",password:""});
    const handleSubmit=async (e)=>{
        e.preventDefault();
            const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();   
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authToken);
            props.showalert("successfully Logged in","success");
            navigate("/"); 
        }
        else{
          props.showalert("Invalid details","danger");
        }

    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
      }
    
  return (
    <div className='mt-3'>
      <h2>Login to continue to Inotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" name='password' value={credentials.password} onChange={onChange} id="password"/>
  </div>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
