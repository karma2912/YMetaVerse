import React, { useState } from 'react'

const Home = () => {
  const [name,setName] = useState({name:""})
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
  }
  handleHome()
  return (
    <>
    <div className='h-full w-full flex justify-center items-center bg-yellow-50'>
      Hiii {`${name}`} <br/>
    </div>
    </>
  )
}

export default Home
