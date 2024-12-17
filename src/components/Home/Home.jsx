import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.png";
import image1 from "../../assets/newImage1.png"
import image2 from "../../assets/newImage2.png"
import image3 from "../../assets/newImage3.png"
import image4 from "../../assets/newImage4.png"
import CharacterComponent from "./CharacterComponent";
import { Link } from "react-router-dom";
const Home = () => {
 const [credentials,setCredentials] = useState({name:""})
 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
  const [image, setImage] = useState(image1);
  const [phaserImage,setPhaserImage] = useState("src/assets/confirm1.png")
   
  const handleJoin =()=>{
    localStorage.setItem("Final-Image",phaserImage)
    localStorage.setItem("Final-Name",credentials.name)
  }
  useEffect(()=>{
    setCredentials({name:name})
  },[name])
 
  const SettingImage =async ()=>{
    if(localStorage.getItem("Image1")){
      setImage(localStorage.getItem("Image1"))
      setPhaserImage(localStorage.getItem("phaserImage1"))
    }
    if(localStorage.getItem("Image2")){
      setImage(localStorage.getItem("Image2"))
      setPhaserImage(localStorage.getItem("phaserImage2"))
    }
  }

  useEffect(() => {
    localStorage.setItem("Image1", image);
  }, []); 
  

  const images = [
    {
      id: 1,
      src: image1,
      phaserSrc: "src/assets/confirm1.png"
    },
    {
      id: 2,
      src: image2,
      phaserSrc: "src/assets/confirm2.png"
    },
    {
      id: 3,
      src: image3,
      phaserSrc: "src/assets/confirm3.png"
    },
    {
      id: 4,
      src: image4,
      phaserSrc: "src/assets/confirm4.png"
    }
  ];
  const videoRef = useRef();
  const handleEdit = () => {
    setEdit(true);
  };

  const handleBack =()=>{
    setImage("/src/components/Home/images/newImage1.png")
  }

  const handleSetCharacter =()=>{
    setEdit(false)
  }

  const onchange =(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const [edit, setEdit] = useState(false);
  const handleHome = async () => {
    const response = await fetch("http://localhost:4000/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("Token")}`,
      },
    });
    const json = await response.json();
    setName(json.name)
    setEmail(json.email)
  };
  const userMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log("Unable to get the stream");
    }
  };
  useEffect(()=>{
    userMedia();
  },[])
  handleHome();
  return (
    <>
      <div className="h-full w-full flex flex-col justify-between items-center bg-purple-1000 text-white overflow-hidden">
        <div className="h-28 w-full flex justify-between items-center">
          <img src={logo} className="h-[70%] w-[18rem] p-2" />
          <div className="p-6 text-xl font-medium">{`${email}`}</div>
        </div>
        <div className="h-1/6 w-full flex justify-center items-center text-6xl font-semibold">
          <p>Welcome to </p>
          <p className="text-purple-900 ml-3">YMetaVerse</p>!
        </div>
        <div className="h-1/2 w-full flex justify-between  p-4">
          <div className="h-full w-[47%] flex justify-end items-center">
            <video
              className="h-[18rem] w-[25rem] object-cover border-4 rounded-xl border-purple-900"
              ref={videoRef}
              autoPlay
              muted
            ></video>
          </div>
          <div className="h-full w-[47%]  flex justify-start items-center ">
            <div className="h-[50%] w-[50%] flex flex-col justify-between items-center ">
              <div className="flex justify-between items-center h-[11rem] w-full p-2">
                <div
                  className="h-full w-[8rem] rounded-2xl hover:cursor-pointer flex flex-col justify-around items-center hover:shadow-white hover:shadow-lg duration-300"
                  onClick={handleEdit}
                >
                  <img src={image} className="h-[7rem] w-[6rem]"></img>
                  <span className="text-sm">Edit</span>
                </div>
                <input className="flex justify-center items-center h-[3rem] w-[70%] text-center rounded-xl border-2 border-green-400 bg-purple-1000 text-white" name="name" value={credentials.name} onChange={onchange} />
                </div>
              <Link className="h-[3rem] w-full flex justify-center items-center rounded-xl bg-green-400 text-black font-medium hover:cursor-pointer hover:bg-green-600 duration-300" onClick={handleJoin} to="/room">
                Join
              </Link>
            </div>
          </div>
        </div>
        <div className="h-1/4 w-full flex justify-center items-end text-sm">
          <span className="p-6 text-center">
            {" "}
            By joining this space, you agree our Terms of Service and Privacy{" "}
            <br /> Policy and confirm that you're 18 years of age.{" "}
          </span>
        </div>
      </div>
      {edit && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity "
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
            <div className="h-[45rem] w-[30rem] bg-white rounded-2xl">
              <div className="h-[35%] bg-purple-900 rounded-t-2xl">
                <div className="h-[25%] w-full flex justify-between items-end">
                  <div className="border-2 border-purple-1000 bg-purple-1000 text-white p-2 rounded-xl ml-6 font-medium">{`${name}`}</div>
                  <div
                    className="hover:cursor-pointer mr-8 text-white"
                    onClick={() => {
                      handleBack()
                      setEdit(false);
                    }}
                  >
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </div>
                </div>
                <div className="h-[74%] w-full flex justify-center items-center">
                  <img src={image} className="h-[75%] w-[27%]" />
                </div>
              </div>
              <div className="h-[65%] w-full overflow-y-auto bg-purple-1000 rounded-b-2xl text-white">
                <div className="h-[13%] w-full flex justify-center">
                  <span className="font-medium w-[30%] h-full flex justify-center items-center  border-b-2 border-white">
                    Special Characters
                  </span>
                </div>
                <div className="h-[60%] scrollable-content overflow-y-auto flex justify-center items-center">
                  <div className="h-[75%] w-full" onClick={SettingImage}>
                    <CharacterComponent
                      image1={image1}
                      image1src={images[0].src}
                      phaser1Src = {images[0].phaserSrc}
                      image2={image2}
                      image2src={images[1].src}
                      phaser2Src = {images[1].phaserSrc}
                    />
                    <CharacterComponent
                      image1={image3}
                      image1src={images[2].src}
                      phaser1Src = {images[2].phaserSrc}
                      image2={image4}
                      image2src={images[3].src}
                      phaser2Src = {images[3].phaserSrc}
                    />
                  </div>
                </div>
                <div className="h-[27%] w-full text-black flex justify-center gap-5 items-center">
                  <div
                    className="border-2 border-purple-900 text-white font-medium px-5 bg-purple-900 py-3 hover:bg-purple-950 hover:cursor-pointer duration-300 rounded-2xl"
                    onClick={() => {
                      handleBack(),
                      setEdit(false);
                    }}
                  >
                    Back
                  </div>
                  <div className="border-2 border-green-400 bg-green-400 font-medium px-5 py-3 rounded-2xl hover:bg-green-600 duration-300 hover:cursor-pointer" onClick={handleSetCharacter}>
                    Set Character
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
