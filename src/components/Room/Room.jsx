import React from 'react'
import PhaserGame from '../../PhaserGame'
import { useSocket } from '../../context/Socket'

const Room = () => {
  const name = localStorage.getItem("Final-Name")
  let x= 200 
  let y = 400
  let a = 250
  let b = 450
  const {socket} = useSocket()
  socket.emit("new-player",{name,x,y})
  socket.on("User-joined",(data)=>{
   console.log("We got the player, Helloo",data,"!!")
   socket.emit("Adding-player",{a,b})
  })
  return (
    <>
    <PhaserGame x={x} y={y}/>
    </>
  )
}

export default Room
