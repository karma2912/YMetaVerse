import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Room from './components/Room/Room'
import { SocketProvider } from './context/Socket'

function App() {

  return (
    <>
    <SocketProvider>
    <Routes>
       <Route path='/' element={<><div className='h-[100vh] w-[100vw]'><Login/></div></>}/>
       <Route path='/signup' element={<><div className='h-[100vh] w-[100vw]'><SignUp/></div></>}/>
       <Route path='/home' element={<><div className='h-[100vh] w-[100vw]'><Home/></div></>}/>
       <Route path='/room' element={<><div className=''><Room/></div></>}/>
    </Routes> 
    </SocketProvider>
    </>
  )
}

export default App
