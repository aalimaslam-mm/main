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
import Logout from "./Pages/Logout";
import Profile from "./Pages/Profile";
import Hospitals from "./Pages/Hospitals";
import Labs from "./Pages/Labs";
import Patients from "./Pages/Patients";
import Appointments from "./Pages/Appointments";
import Doctors from "./Pages/Doctors";
import Hospital from "./Pages/Hospital";
import Doctor from "./Pages/Doctors/Doctor"
import SoloUser from "./Pages/SoloUser";
import ViewLab from "./Pages/ViewLab";
import CreateTest from "./Pages/CreateTests"
import LabPatients from "./Pages/Patients/LabPatients";
import LabAppointments from "./Pages/Appointments/LabAppointment";
import Reports from "./Pages/Reports"
function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate()
  React.useEffect(() => {
    let loggedInP = protectRoute();
    setLoggedIn(loggedInP);
    if (!loggedIn) {
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/logout") {
        navigate("/login");
      }
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="hospital" element={<Hospital />} />
          <Route path="hospital/doctor" element={<Doctor />} />
          <Route path="labs" element={<Labs />} />
          <Route path="patients" element={<Patients />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="solo-users" element={<SoloUser />} />
          <Route path="view-lab" element={<ViewLab />} />
          <Route path="create-test" element={<CreateTest />} />
          <Route path="lab-patients" element={<LabPatients />} />
          <Route path="lab-appointments" element={<LabAppointments />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  )
}
export default App;