import React, { useState } from "react";
import PhaserGame from "../../PhaserGame";
import { useSocket } from "../../context/Socket";

const Room = () => {
  const [newName, setNewName] = useState("");
  const [x, setX] = useState(200);
  const [y, setY] = useState(400);
  
  const name = localStorage.getItem("Final-Name");
  const { socket } = useSocket();
  socket.emit("new-player", { name, x, y });
  socket.on("User-joined", (data) => {
    const { name, x, y } = data;
    console.log("We got the player, Helloo", name, x, y, "!!");
    setX(x);
    setY(y);
    socket.emit("Adding-player", { name, x, y });
    console.log("This is name of Adding-player",name)
  });
  return (
    <>
      <PhaserGame x={x} y={y} newName={newName} />
    </>
  );
};

export default Room;
