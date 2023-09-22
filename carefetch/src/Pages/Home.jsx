import { Link, useNavigate } from "react-router-dom"
import User from "../Modules/User"
import { useEffect, useState } from "react";
import PatientModule from "../Modules/Patients";
import { toast } from "react-toastify";
import Doctors from "../Modules/Doctors";
import HospitalModule from "../Modules/Hospitals";
/* eslint-disable react/prop-types */
export default function Home() {
    let user = User.getUser();
    let navigate = useNavigate()

    return (
        user?.UserType.toLowerCase() == "admin" ? (<Admin details={user} />) : user?.UserType.toLowerCase() == "patient" ? (<UserDashboard details={user} type={user?.UserType} />) : user?.UserType.toLowerCase() == "hospital" ? (<Hospitals details={user} />) : user?.UserType.toLowerCase() == "lab" ? (<UserDashboard details={user} type={user?.UserType} />) : null
    )

}


function Admin({ details }) {
    const [dataLength, setDataLength] = useState([])

    useEffect(() => {
        (async function () {
            await User.getDataLength((response) => {
                setDataLength(response)
            })

        })()
    }, []);

    return (
        <div className="container-fluid">
            <h1>Admin Dashboard</h1>
            <Stats dataLength={dataLength} />
            <Appointments dataLength={dataLength} />
        </div>
    )
}

function Stats({ dataLength }) {
    return (
        <div className="row my-5">
            <h3>Stats</h3>
            <div className="col-md-3 col-12">
                <Link to="/users" style={{ textDecoration: "none" }}>
                    <div className="card p-4" style={{ background: "rgba(150, 100,255,0.2)" }}>
                        {dataLength?.totalUsers} Users
                    </div>
                </Link>
            </div>
            <div className="col-md-3 col-12">
                <Link to="/hospitals" style={{ textDecoration: "none" }}>
                    <div className="card p-4" style={{ background: "rgba(150, 100,255,0.2)" }}>
                        {dataLength?.totalHospitals} Hospitals
                    </div>
                </Link>
            </div>

            <div className="col-md-3 col-12">
                <Link to="/labs" style={{ textDecoration: "none" }}>
                    <div className="card p-4" style={{ background: "rgba(150, 100,255,0.2)" }}>
                        {dataLength?.totalLabs} Labs
                    </div>
                </Link>
            </div>
        </div>
    )
}

function Appointments({ dataLength }) {
    return (
        <div className="my-5">
            <h3>Appointments</h3>
            <div className="row">
                <div className="col-md-4 col-12">
                    <Link to="/appointments" style={{ textDecoration: "none" }} state={{ from: "hospital" }}>
                        <div className="card p-4" style={{ background: "rgba(150, 100,255,0.2)" }}>
                            {dataLength?.totalAppointments} Hospital Appointments
                        </div>
                    </Link>
                </div>
                <div className="col-md-4 col-12">
                    <Link to="/appointments" style={{ textDecoration: "none" }} state={{ from: "lab" }}>
                        <div className="card p-4" style={{ background: "rgba(150, 100,255,0.2)" }}>
                            {dataLength?.totalLabAppointments} Lab Appointments
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


// User
function UserDashboard({ details, type }) {
    let navigate = useNavigate()
    let [appointments, setAppointments] = useState([])
    useEffect(() => {
        PatientModule.getAllAppointments((response) => {
            if (response?.response?.status == 401) return navigate("/logout");
            setAppointments(response?.data)
        })
    }, [navigate]);
    return (
        <div className="p-4">
            <h1>{type} Dashboard</h1>
            {type.toLowerCase() == 'patient' ? (<Appointments />) : null}
        </div>
    )

}



// Labs



// Hospitals

function Hospitals({ details }) {
    let [doctors, setDoctors] = useState([]);
    let [hospitalsDataLen, setHospitalsDataLen] = useState({});
    useEffect(() => {
        HospitalModule.getDataLength((response) => {
            setHospitalsDataLen(response?.data?.count);
        })
    }, [])
    return (
        <div className="p-4">
            <h1>{details.Username}</h1>
            <div className="mt-5 h2">
                Stats
            </div>
            <div
                className="row gap-4"
            >
                <div className="card col-12 col-md-6 col-lg-3 rounded-1 p-3">
                    <div className="h5">Total Doctors</div>
                    <div className="h1">{hospitalsDataLen?.totalDoctors}</div>
                </div>
                <div className="card col-12 col-md-6 col-lg-3 rounded-1 p-3">
                    <div className="h5">Total Appointments</div>
                    <div className="h1">{hospitalsDataLen?.totalAppointments}</div>
                </div>
            </div>
        </div>
    )
}