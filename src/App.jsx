import { useState } from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import { AuthProvider } from './context/authContext';
import TaskPage from './pages/TaskPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TaskContext';
import Navbvar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {



  return (
    <>
    {/* Creaando el router */}
    <AuthProvider>
    <TaskProvider>
    <BrowserRouter>
    <Navbvar></Navbvar>
    <Routes>
    <Route path='/' element={<HomePage></HomePage>}></Route>
    <Route path='/login' element={<LoginPage></LoginPage>}></Route>
    <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
    <Route element={<ProtectedRoute></ProtectedRoute>}>
      <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
      <Route path='/add-task' element={<TaskFormPage></TaskFormPage>}></Route>
      <Route path='/tasks' element={<TaskPage></TaskPage>}></Route>
      <Route path='/tasks/:id' element={<TaskFormPage></TaskFormPage>}></Route>
    </Route>
    </Routes>

    </BrowserRouter>
    </TaskProvider>
    </AuthProvider>


    </>
  )
}

export default App
