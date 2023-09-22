/* eslint-disable react/prop-types */
import React from "react"
import Appointments from "../../Modules/Appointments/index"
import "./index.css"
import Doctors from "../../Modules/Doctors";
import Dialog from "./Dialog";
import { toast } from "react-toastify";
export default function Index() {
    let [appointments, setAppointments] = React.useState([]);
    let [open, setOpen] = React.useState(false);
    let [doctors, setDoctors] = React.useState([]);
    let [selectedDoctor, setSelectedDoctor] = React.useState({});
    let [data, setData] = React.useState({});
    let [selectedPatient, setSelectedPatient] = React.useState({});
    let [completed, setCompleted] = React.useState([]);
    let [toShow, setToShow] = React.useState("all");
    const closeDialog = () => {
        setOpen(false);
    }
    const openDialog = () => {
        setOpen(true);
        fetchDoctors()
    }

    function fetchDoctors() {
        Doctors.getAllDoctors((response) => {
            setDoctors(response?.data);
        })
    }

    function fetchData() {
        Appointments.getAllAppointments((response) => {
            if (response.status == 404) {
                setAppointments([])
                return;
            }
            let filteredData = response?.data?.filter((data) => data.Status.trim() == "Completed");
            setCompleted(filteredData);
            setAppointments(response?.data);
        })
    }
    React.useEffect(() => {
        fetchData()
    }, [])
    const handleSearchChange = (e) => {
        if (e.target.value == "") {
            fetchData();
            return;
        }
        let filteredData = appointments.filter((data) => {
            return data?.PatientName?.toLowerCase()?.includes(e?.target?.value.toLowerCase())
        })
        setAppointments(filteredData)
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSelectDoctor = async (e) => {
        let selectedDoctor = await doctors.find((doctor) => doctor.DoctorID == e.target.value)
        Doctors.getAvailibility(selectedDoctor.DoctorID, (response) => {
            selectedDoctor = { ...selectedDoctor, ...response?.data }
            setSelectedDoctor(selectedDoctor);
        })
    }
    const handleSubmit = () => {
        let data2 = {
            ...data,
            DoctorId: selectedDoctor.DoctorID,
            HospitalId: selectedDoctor.HospitalId,
        }
        if (data.existing == "new") {
            if (!data?.appointmentDate || !data?.patientName || !data?.age || !data?.gender || !data?.phoneNumber) {
                toast.error("Please fill all the fields");
                return
            }
        }
        Appointments.addAppointmentByHospital(data2, (response) => {
            if (response?.status == 200) {
                toast.success("Appointment Added Successfully")
                fetchData();
                closeDialog();
            } else {
                toast.error("Something went wrong")
                closeDialog();
            }
        })

    }
    const handleStatusChange = (e, id) => {
        let data = {
            AppointmentID: id,
            Status: e.target.value
        }
        Appointments.updateAppointment(data, (response) => {
            if (response?.status == 200) {
                toast.success("Status Updated Successfully")
            } else {
                toast.error("Something went wrong")
            }
        });
        fetchData();
    }
    function handleToShow(e) {
        if (e.target.innerText.toLowerCase() == "all") {
            fetchData();
            return;
        } else {
            setAppointments(completed)
        }
        setToShow(e.target.innerText.toLowerCase());
    }
    return (
        <>
            <App appointments={appointments} handleChange={handleSearchChange} openDialog={openDialog} closeDialog={closeDialog} open={open} handleStatusChange={handleStatusChange} handleToShow={handleToShow} />
            <Dialog open={open} closeDialog={closeDialog} doctors={doctors} handleSelectDoctor={handleSelectDoctor} selectedDoctor={selectedDoctor} handleChange={handleChange} handleSubmit={handleSubmit} setSelectedPatient={setSelectedPatient} selectedPatient={selectedPatient} />

        </>

    )
}



const App = ({ appointments, handleChange, openDialog, handleStatusChange, handleToShow }) => (
    <>
        <h1 style={{ marginLeft: "20px", color: "#339999", padding: "12px" }}>List of Appointments</h1>

        <div className="row justify-content-between mt-4" style={{ padding: "0px 40px" }}>

            <input className=" me-2 col-8 form-control search" onChange={handleChange} type="search" placeholder="Search" aria-label="Search" />

            <button className="btn btn-new col-2" onClick={openDialog}>Add Appointment</button>
        </div>

        <div className="btns my-5 ms-4">
            <button className="btn btn-new me-4" type="submit" onClick={handleToShow}>All</button>
            <button className="btn btn-new" type="submit" onClick={handleToShow}>Completed</button>
        </div>

        <table className="table mt-4 me-5">
            <thead className="table-dark">
                <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Appointment Date</th>
                    <th scope="col">Status</th>

                </tr>
            </thead>
            <tbody>
                {appointments ? appointments.map((data, index) => (<TableRow data={data} index={index} key={index} handleStatusChange={handleStatusChange} />)) : ("No Appointments Found")}
            </tbody>
        </table>
    </>
)

function TableRow({ data, index, handleStatusChange }) {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{data.PatientName}</td>
            <td>{data.DoctorName}</td>
            <td>{data.AppointmentDate}</td>
            <td>
                <select defaultValue={data?.Status} onChange={(e) => handleStatusChange(e, data.AppointmentID)} className="form-control w-50" name="Status" id="status">
                    <option value="First Visit" selected={data?.Status.toLowerCase() == "first visit"}>First Visit</option>
                    <option value="Second Visit" selected={data?.Status.toLowerCase() == "second visit"} >Second Visit</option>
                    <option value="Completed" selected={data?.Status.toLowerCase() == "completed"}>Completed</option>
                </select>
            </td>
        </tr>
    )
}