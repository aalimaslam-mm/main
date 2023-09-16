import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Sidebar from "./Components/Sidebar/Sidebar";
import React, { useState } from "react";
import protectRoute from "./Utils/protected";
import User from "./Pages/User";
function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate()
  React.useEffect(() => {
    let loggedInP = protectRoute();
    setLoggedIn(loggedInP);
    if (!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
        </Route>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}
export default App;