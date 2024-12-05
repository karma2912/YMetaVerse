import React, { useState } from 'react'
import bg from './bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate()
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",confirmPass:""})
  localStorage.removeItem("Token")
  localStorage.removeItem("Option selected")
  const onchange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const {name,email,password} = credentials
  if(credentials.password===credentials.confirmPass){
    console.log("both passwords are same and can be forwarded")
  }
  else{
    console.log("Passwords are not same")
  }
  console.log(credentials)

  const [signup,setSignUp] = useState(false)
  const handleClick =async()=>{
    console.log("clicked")
    const response = await fetch("http://localhost:4000/api/auth/registeruser",{
      method : "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name,email,password})
    })
    const json = await response.json()
    console.log(json)
    if(json){
      setSignUp(true)
    }
  }
  return (
    <>
    <div
      className='h-screen w-full bg-cover flex justify-center items-center text-white'
      style={{ backgroundImage: `url(${bg})` }} 
    >
      <div className='md:h-[60vh] h-[55vh] w-[30rem] backdrop-blur-3xl flex flex-col justify-evenly items-center'>
      <div className='h-[15vh] flex justify-center items-center text-5xl'>SignUp</div>
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <div className='h-[6vh] w-9/12 mb-6  flex justify-between  border-b-4 border-white rounded-sm'>
        <input type='name' name="name" value={credentials.name} onChange={onchange} className='text-white border-none w-10/12 focus:outline-none focus:ring-0 bg-transparent placeholder:text-lg placeholder:text-white' placeholder='Name'/>
        <i className="fa-solid fa-user text-xl h-full flex justify-center items-center"></i>
        
        </div>
        <div className='h-[6vh] w-9/12 mb-6  flex justify-between  border-b-4 border-white rounded-sm'>
        <input type='email' name="email" value={credentials.email} onChange={onchange} className='text-white border-none w-10/12 focus:outline-none focus:ring-0 bg-transparent placeholder:text-lg placeholder:text-white' placeholder='Email'/>
        <i className="fa-solid fa-envelope text-xl h-full flex justify-center items-center"></i>
        
        </div>
        <div className='h-[6vh] w-9/12  mb-6 flex justify-between border-b-4 border-white rounded-sm'>
        <input type='password' name="password" value={credentials.password} onChange={onchange} className='text-white border-none w-10/12 focus:outline-none focus:ring-0 bg-transparent placeholder:text-lg placeholder:text-white' placeholder='Password'/>
        <i className="fa-solid fa-lock text-xl h-full flex justify-center items-center"></i>
        </div>
        <div className='h-[6vh] w-9/12 mb-6 flex justify-between border-b-4 border-white rounded-sm'>
        <input type='password' name="confirmPass" value={credentials.confirmPass} onChange={onchange} className='text-white border-none w-10/12 focus:outline-none focus:ring-0 bg-transparent placeholder:text-lg placeholder:text-white' placeholder='Confirm Password'/>
        <i className="fa-solid fa-lock text-xl h-full flex justify-center items-center"></i>
        </div>
        <button className='h-[5vh] w-9/12 bg-white mt-4 flex justify-center items-center text-black rounded-3xl' onClick={handleClick}>
          SignUp
        </button>
        <div className=' w-9/12 mt-4 text-center'> 
          Already have an account? <Link to="/" className='font-medium'>Login</Link>
        </div>
      </div>
      </div>
    </div>
    {signup && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
  
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
              <i className="fa-solid fa-circle-check text-2xl"></i>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className='flex justify-between'>
                <h3 className="text-base font-semibold text-gray-900" id="modal-title">Login account</h3>
                <i className="fa-solid fa-xmark" onClick={()=>{setSignUp(false)}}></i>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">You have created the account successfully! Now login with the same email and password from the login page.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>{navigate("/")}}>Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>}
  </>
  )
}

export default SignUp
