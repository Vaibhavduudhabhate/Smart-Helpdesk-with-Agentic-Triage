import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "../../styles/AuthStyles.css";


const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(name,email,password)
    try {
      const res = await axios.post(`http://localhost:3000/api/signup`,{name ,password,email,role:"User"});
      console.log(res)
      if (res && res.data.success) {
        navigate("/login")
      }else{
        // toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      // toast.error("Something went wrong")
    }
  }

  return (
      <div className="register ">
        <form onSubmit={handleSubmit}>
          <h4 className='mt-2'>Register Form</h4>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          
          
          
          <button type="submit" className="btn btn-dark w-full" style={{width: "100%"}}>Submit</button>
        </form>
      </div>
  )
}

export default Signup;