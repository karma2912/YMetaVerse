import React, { useState } from 'react';
import bg from './bg.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [credentials,setCredentials] = useState({email:"",password:""})
  const [checked,setChecked] = useState(false)
  const onchange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const {email,password} = credentials
  const handleClick =async ()=>{
    console.log("Clicked")
      const response = await fetch("http://localhost:4000/api/auth/login",{
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email,password})
      })
    
    const json =await response.json()
    console.log(json)
    if(json.token){
      localStorage.setItem("Token",json.token)
      navigate('/home')
    }
  }
  const handleCheckbox =()=>{
    setChecked(!checked)
  }
  console.log(credentials)
  return (
    <div
      className='h-screen w-full bg-cover flex justify-center items-center text-white'
      style={{ backgroundImage: `url(${bg})` }} 
    >
      <div className='md:h-[55vh] h-[50vh] w-[30rem] backdrop-blur-lg flex flex-col justify-evenly items-center'>
      <div className='h-[15vh] flex justify-center items-center text-5xl'>Login</div>
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <div className='h-[6vh] w-9/12 mb-6  flex justify-between  border-b-4 border-white rounded-sm'>
        <input type='email' name="email" value={credentials.email} onChange={onchange} className='text-white border-none w-10/12 focus:outline-none focus:ring-0 bg-transparent placeholder:text-lg placeholder:text-white' placeholder='Email'/>
        <i className="fa-solid fa-envelope text-xl h-full flex justify-center items-center"></i>
        
        </div>
        <div className='h-[6vh] w-9/12 mt-6 mb-3 flex justify-between border-b-4 border-white rounded-sm'>
        <input type='password' name="password" value={credentials.password} onChange={onchange} className='text-white border-none w-10/12 focus:outline-none focus:ring-0 bg-transparent placeholder:text-lg placeholder:text-white' placeholder='Password'/>
        <i className="fa-solid fa-lock text-xl h-full flex justify-center items-center"></i>
        </div>
        <div className='w-9/12 flex justify-between mt-4'>
        <div className='flex justify-between items-center'>
          <input type='checkbox' onClick={handleCheckbox}/>Remember Me
        </div>
        <div>
          Forgot Password ?
        </div>
        </div>
        <button className='h-[5vh] w-9/12 bg-white mt-6 flex justify-center items-center text-black rounded-3xl' onClick={handleClick}>
          Login
        </button>
        <div className=' w-9/12 mt-4 text-center'> 
          Don't have an account? <Link to="/signup" className='font-medium'>Register</Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;