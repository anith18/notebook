import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate=useNavigate ();
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
      const handleSubmit=async (e)=>{
          e.preventDefault();
          const {name,email,password}=credentials;
              const response = await fetch("http://localhost:5000/api/auth/createuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({name,email,password})
          });
          const json=await response.json();   
          console.log(json);
          if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/"); 
            props.showalert("successfully created","success");
        }
        else{
            props.showalert("Invalid credentials","danger");
        }
        }
        const onChange=(e)=>{
          setCredentials({...credentials,[e.target.name]:e.target.value});
        }

  return (
    <div className='container mt-3'>
      <h2>Create an account to use Inotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} name="password" minLength={5} required id="password"/>
  </div>
  <div className="mb-3">
    <label htmlhtmlFor="cpassword" className="form-label">ConfirmPassword</label>
    <input type="password" className="form-control" onChange={onChange} name="cpassword" minLength={5} required id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
