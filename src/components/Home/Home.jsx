import React, { useState } from 'react'
import logo from "./logo.png"
const Home = () => {
  console.log(logo)
  const [name,setName] = useState({name:""})
  const [email,setEmail] = useState({email:""})
  const handleHome =async()=>{
    console.log("Hello From home")
    const response = await fetch("http://localhost:4000/api/auth/getuser",{
     method:"GET",
     headers:{
      "Content-Type":"application/json",
      "auth-token":`${localStorage.getItem("Token")}`
     }
    })
    const json =await response.json()
    console.log(json.name)
    setName(json.name)
    setEmail(json.email)
  }
  handleHome()
  return (
    <>
    <div className='h-full w-full flex flex-col justify-between items-center bg-purple-1000 text-white overflow-hidden'>
      <div className='h-28 w-full flex justify-between items-center'>
        <img src={logo} className='h-[70%] w-[18rem] p-2'/>
        <div className='p-6 text-xl font-medium'>
          {`${email}`}
        </div>
      </div>
      <div className='h-1/6 w-full flex justify-center items-center text-6xl font-semibold'>
      Welcome to YMetaVerse!
      </div>
      <div className='h-1/2 w-full flex justify-between bg-green-300 p-4'>
        <div className='h-full w-[47%] bg-pink-300'>

        </div>
        <div className='h-full w-[47%] bg-pink-300'>

        </div>
      </div>
      <div className='h-1/4 w-full flex justify-center items-end text-sm'>
         <span className='p-6 text-center'> By joining this space, you agree our Terms of Service and Privacy <br/> Policy and confirm that you're 18 years of age. </span>
      </div>
    </div>
    </>
  )
}

export default Home
