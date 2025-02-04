import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserHome from './pages/UserHome'
import AdminPage from './pages/AdminPage'
import Course from './pages/Course'
import Dashboard from './pages/Dashboard'
import PaymentSuccess from './pages/PaymentSuccess'
import Auth from './pages/Auth'
import Blog from './pages/Blog'
import Users from './pages/Users'
import Lectures from './pages/Lectures'
import StudyCourse from './components/StudyCourse'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<UserHome/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register={true}/>}/>
      <Route path='/adminPage' element={<AdminPage/>}/>
      <Route path='/Course' element={<Course/>}/>
      <Route path="/study/:courseId" element={<StudyCourse />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/userdetails' element={<Users/>}/>
      <Route path='/payment' element={<PaymentSuccess/>}/>
      <Route path='/blog' element={<Blog/>}/>
      <Route path='/addlectures/:courseId' element={<Lectures/>}/>

    </Routes>
    </>
  )
}

export default App
