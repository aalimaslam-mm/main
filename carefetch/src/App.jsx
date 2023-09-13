import React from 'react';
import { Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
export default App;