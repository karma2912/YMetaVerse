import React, { useRef, useState } from 'react'
import logo from "./logo.png"
import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import image5 from './images/image5.png'
import image6 from './images/image6.png'
import image7 from './images/image7.png'
import image8 from './images/image8.png'
import CharacterComponent from './CharacterComponent'
const Home = () => {
  const [name,setName] = useState({name:""})
  const [email,setEmail] = useState({email:""})
  const videoRef = useRef()
  const images = {
    image1: ""
  }
  const [edit,setEdit] = useState(false)
  const handleHome =async()=>{
    const response = await fetch("http://localhost:4000/api/auth/getuser",{
     method:"GET",
     headers:{
      "Content-Type":"application/json",
      "auth-token":`${localStorage.getItem("Token")}`
     }
    })
    const json =await response.json()
    setName(json.name)
    setEmail(json.email)
  }

  const userMedia = async()=>{
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        if(videoRef.current){
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.log("Unable to get the stream")
      }
  }
  handleHome()
  userMedia()
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
      <p>Welcome to </p><p className='text-purple-900 ml-3'>YMetaVerse</p>!
      </div>
      <div className='h-1/2 w-full flex justify-between  p-4'>
        <div className='h-full w-[47%] flex justify-end items-center' >
          <video className='h-[18rem] w-[25rem] object-cover border-2 rounded-xl border-white' ref={videoRef} autoPlay muted></video>
        </div>
        <div className='h-full w-[47%]  flex justify-start items-center '>
          <div className='h-[50%] w-[40%] flex flex-col justify-between items-center '>
            <div className='flex justify-between items-center h-[11rem] w-full p-2'>
              <div className='h-full w-[5rem] rounded-2xl hover:cursor-pointer flex flex-col justify-around items-center hover:shadow-white hover:shadow-lg duration-300' onClick={()=>{setEdit(true)}}>
                <img src={image1} className='h-[7rem]'></img>
                <span className='text-sm'>Edit</span>
              </div>
              <div className='flex justify-center items-center h-[3rem] w-[70%] rounded-xl border-2 border-green-400 '>{`${name}`}</div>
            </div>
            <div className='h-[3rem] w-full flex justify-center items-center rounded-xl bg-green-400 text-black font-medium hover:cursor-pointer hover:bg-green-600 duration-300'>Join</div>
        </div>
        </div>
      </div>
      <div className='h-1/4 w-full flex justify-center items-end text-sm'>
         <span className='p-6 text-center'> By joining this space, you agree our Terms of Service and Privacy <br/> Policy and confirm that you're 18 years of age. </span>
      </div>
    </div>
    {edit && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity " aria-hidden="true"></div>
  
    <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
      <div className='h-[45rem] w-[30rem] bg-white rounded-2xl'>
        <div className='h-[35%] bg-purple-900 rounded-t-2xl'>
           <div className='h-[25%] w-full flex justify-between items-end'>
           <div className='border-2 border-purple-1000 bg-purple-1000 text-white p-2 rounded-xl ml-6 font-medium'>{`${name}`}</div>
           <div className='hover:cursor-pointer mr-8 text-white' onClick={()=>{setEdit(false)}}><i className="fa-solid fa-xmark text-2xl"></i></div>
           </div>
           <div className='h-[74%] w-full flex justify-center items-center'>
             <img src={image1} className='h-[75%] w-[19%]'/>
           </div>
        </div>
        <div className='h-[65%] w-full overflow-y-auto bg-purple-1000 rounded-b-2xl text-white'>
           <div className='h-[13%] w-full flex justify-center'>
            <span className='font-medium w-[30%] h-full flex justify-center items-center  border-b-2 border-white'>Special Characters</span>
           </div>
           <div className='h-[60%] scrollable-content overflow-y-auto flex justify-center items-center'>
            <div className='h-[75%] w-full'>
              <CharacterComponent image1={image1} image2={image2}/>
              <CharacterComponent image1={image3} image2={image4}/>
              <CharacterComponent image1={image5} image2={image6}/>
              <CharacterComponent image1={image7} image2={image8}/>
            </div>
           </div>
           <div className='h-[27%] w-full text-black flex justify-center gap-5 items-center'>
            <div className='border-2 border-purple-900 text-white font-medium px-5 bg-purple-900 py-3 hover:bg-purple-950 hover:cursor-pointer duration-300 rounded-2xl' onClick={()=>{setEdit(false)}}>Back</div>
            <div className='border-2 border-green-400 bg-green-400 font-medium px-5 py-3 rounded-2xl hover:bg-green-600 duration-300 hover:cursor-pointer'>Set Character</div>
           </div>
        </div>
      </div>
    </div>
  </div>}
    </>
  )
}

export default Home
