import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import PhaserGame from './PhaserGame'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Room from './components/Room/Room'

function App() {

  return (
    <>
    <Routes>
       <Route path='/' element={<><div className='h-[100vh] w-[100vw]'><Login/></div></>}/>
       <Route path='/signup' element={<><div className='h-[100vh] w-[100vw]'><SignUp/></div></>}/>
       <Route path='/home' element={<><div className='h-[100vh] w-[100vw]'><Home/></div></>}/>
       <Route path='/room' element={<><div className=''><Room/></div></>}/>
    </Routes> 
    </>
  )
}

export default App
