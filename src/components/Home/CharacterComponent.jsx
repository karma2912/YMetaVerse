import React from 'react'

const CharacterComponent = (props) => {
    const {image1,image2} = props
  return (
    <>
      <div className='h-full w-full flex justify-evenly mb-6'>
        <div className='h-full w-[40%] bg-purple-900 flex justify-center items-center rounded-2xl hover:cursor-pointer'><img src={image1} className='h-[9rem] w-[5.5rem]'/></div>
        <div className='h-full w-[40%] bg-purple-900 flex justify-center items-center rounded-2xl hover:cursor-pointer'><img src={image2} className='h-[9rem] w-[5rem]'/></div>
        </div>
    </>
  )
}

export default CharacterComponent
