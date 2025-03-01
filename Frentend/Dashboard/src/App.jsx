import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
// import Home from './pages/Home'
import Login from './pages/Login'
// import ForgotPassword from './pages/ForgotPassword'
// import ResetPassword from './pages/ResetPassword'
// import ManageSkills from './pages/ManageSkills'
// import ManageTimeline from './pages/ManageTimeline'
// import ManageProjects from './pages/ManageProjects'
// import ViewProject from './pages/ViewProject'
// import UpdateProject from './pages/UpdateProject'
export default function App() {
  return (
    
    // <header/>
      <Router>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/password/forget' element={<ForgotPassword/>} />        
        <Route path='/password/reset/:token' element={<ResetPassword/>} />
        <Route path='/manage/skills' element={<ManageSkills/>} />
        <Route path='/manage/timline' element={<ManageTimeline/>} />
        <Route path='/manage/projects' element={<ManageProjects/>} />
        <Route path='/view/project/:id' element={<ViewProject />} />
        <Route path='/update/project/:id' element={<UpdateProject />} /> */}
      </Routes>
    </Router>
    
  )
}

