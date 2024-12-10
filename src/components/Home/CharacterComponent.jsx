import React from 'react'

const CharacterComponent = (props) => {
    const {image1,image1src,image2,image2src} = props
    const handleImage1  =()=>{
      localStorage.removeItem("Image2")
      localStorage.setItem("Image1",image1src)
    }
    const handleImage2  =()=>{
      localStorage.removeItem("Image1")
      localStorage.setItem("Image2",image2src)
    }
  return (
    <>
      <div className='h-full w-full flex justify-evenly mb-6'>
        <div className='h-full w-[40%] bg-purple-900 flex justify-center items-center hover:border-2 hover:border-white hover:shadow-md hover:shadow-white rounded-2xl hover:cursor-pointer duration-150' onClick={handleImage1}><img src={image1} className='h-[9rem] w-[5.5rem]'/></div>
        <div className='h-full w-[40%] bg-purple-900 flex justify-center items-center hover:border-2 hover:border-white hover:shadow-md hover:shadow-white rounded-2xl hover:cursor-pointer' onClick={handleImage2}><img src={image2} className='h-[9rem] w-[5rem]'/></div>
        </div>
    </>
  )
}

export default CharacterComponent
