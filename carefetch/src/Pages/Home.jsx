import { Link } from "react-router-dom"
import User from "../Modules/User"
import { useEffect, useState } from "react"
/* eslint-disable react/prop-types */
export default function Home() {
    let user = User.getUser();

    return (
        user.UserType.toLowerCase() == "admin" ? (<Admin details={user} />) : user.UserType.toLowerCase() == "patient" ? (<UserDashboard details={user} type={user.UserType} />) : null
    )

}


function Admin({ details }) {
    const [dataLength, setDataLength] = useState([])

    useEffect(() => {
        (async function () {
            await User.getDataLength((response) => {
                setDataLength(response)
                console.log(response)
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
    console.log(dataLength)
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
                    <Link to="/appointments" style={{ textDecoration: "none" }}>
                        <div className="card p-4" style={{ background: "rgba(150, 100,255,0.2)" }}>
                            {dataLength?.totalAppointments} Hospital Appointments
                        </div>
                    </Link>
                </div>
                <div className="col-md-4 col-12">
                    <Link to="/appointments" style={{ textDecoration: "none" }}>
                        <div className="card p-4" style={{ background: "rgba(150, 100,255,0.2)" }}>
                            {dataLength.totalLabAppointments} Lab Appointments
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


// User
function UserDashboard({ details, type }) {
    return (
        <div>
            {type.toLowerCase() == "patient" ? (<div>Patinet</div>) : "User"}
            <h1>User {details.userType}</h1>
        </div>
    )

}




// Labs



// Hospitals