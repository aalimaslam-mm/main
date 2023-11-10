/* eslint-disable react/prop-types */
import React from 'react'
import Doctors from '../../Modules/Doctors'
import { toast } from 'react-toastify';
import User from '../../Modules/User';
import { Link } from 'react-router-dom';
import "./Card.css"

export default function Index() {
    let [doctors, setDoctors] = React.useState([]);
    let [open, setOpen] = React.useState(false);
    let [selectedDoctor, setSelectedDoctor] = React.useState({});
    let [data, setData] = React.useState({});
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const handleSubmit = () => {
        let data2 = {
            ...data,
            hospitalId: JSON.parse(localStorage.getItem("user")).HospitalID,
        }
        Doctors.addDoctor(data2, (response) => {
            if (response.data == "Doctor Added Successfully") {
                setOpen(false);
                toast.success("Doctor Added Successfully");
                window.location.reload();
            } else {
                toast.error("Something Went Wrong");
            }
        })
    }

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        if (value == "") {
            fetchAllDoctors()
            return;
        }
        let filtered = doctors.filter((data) => {
            return data.name.toLowerCase().includes(value) || data.Specialization.toLowerCase().includes(value);
        })
        setDoctors(filtered);
    }

    function fetchAllDoctors() {
        Doctors.getAllDoctors((response) => {
            if (response?.data.length > 0) {
                setDoctors(response?.data);
            }
        })
    }

    React.useEffect(() => {
        fetchAllDoctors()
    }, [])

    const closeDialog = () => {
        setOpen(false);
    }


    return (
        <div className='p-4'>
            <div className='row'>
                <div className='col-12 p-4 rounded-2'>
                    <div className="row d-flex justify-content-center align-items-center gap-2">
                        <input type="text" id="search" placeholder='Search by Name | Speciality' onChange={handleSearch} className='form-control my-0 rounded-' />
                        <button className='btn rounded-1 fw-bold text-uppercase' style={{ background: "#339999", color: "#fff" }} onClick={() => setOpen(true)}>Add a Doctor</button>
                    </div>
                </div>
            </div>
            <div className='row mt-5 gap-1 justify-content-around'>
                {
                    doctors?.length > 0 ? (
                        doctors.map((data, index) => {
                            return <Card data={data} key={index} from="doctors" />
                        })
                    ) : (
                        <div className='col-12'>
                            <div className="alert alert-danger">No Doctors Found</div>
                        </div>
                    )

                }
            </div>
            <DoctorDialog open={open} closeDialog={closeDialog} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}

function Card({ data }) {
    let user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <div className="card mt-5" style={{ width: "18rem" }} >
                <div className="card-body">
                    <h5 className="card-title" style={{ color: '#00767a' }}>Dr {data?.name}</h5>
                    <h6 className="card-subtitle mb-2">{data?.Specialization}</h6>
                    <h6 style={{ color: "#00767a" }}>₹{data?.fee}</h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{data?.available_days}</li>
                        <li className="list-group-item">{data?.fromTime.split(":")[0]}:{data?.fromTime.split(":")[1]} - {data?.toTime.split(":")[0]}:{data?.toTime.split(":")[1]}</li>

                    </ul>
                    {
                        user?.UserType == "hospital" ? (
                            <div className="card-footer text-center">
                                <Link to={`/hospital/doctor`} state={{ id: data?.DoctorID }} className="card-link" style={{ textDecoration: 'none' }}>View Details</Link>
                            </div>
                        ) : ""
                    }
                    {
                        user?.UserType == "patient" ? (
                            <div className="card-footer text-center">
                                <a href="#" className="card-link" style="text-decoration: none; ">Book an Appointment</a>
                            </div>
                        ) : ""
                    }
                </div>
            </div>

        </>
    )
}



function BookAppointment({ data, open }) {
    return (
        <div className="position-absolute top-0 start-0 modal modal-backdrop"
            style={{ display: open ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content d-flex flex-column">
                    <div className="modal-header">
                        <div className="modal-title h3" id="exampleModalLabel">
                            Book an Appointment
                        </div>
                    </div>
                    <div className="modal-body">
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>
        </div>
    )
}


function DoctorDialog({ open, closeDialog, handleChange, handleSubmit }) {
    return (
        <div
            className="position-absolute top-0 start-0 modal modal-backdrop"
            style={{ display: open ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content d-flex flex-column">
                    <div className="modal-header">
                        <div className="modal-title h3" id="exampleModalLabel">
                            Add a Doctor
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="form-group my-2 col-12 col-md-6">
                                        <label htmlFor="name">Name*</label>
                                        <input type="text" id="name" name="name" placeholder='Abdul Aziz' className="form-control" onChange={handleChange} required />
                                    </div>
                                    <div className="form-group my-2 col-12 col-md-6">
                                        <label htmlFor="speciality">Speciality*</label>
                                        <input type="text" id="speciality" placeholder='General' name="speciality" className="form-control" onChange={handleChange} required />
                                        <small>Seperate by Commas (,)</small>
                                    </div>
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="fee">Fee*</label>
                                    <input type="number" id="fee" placeholder='500' name="fee" className="form-control" onChange={handleChange} required />
                                </div>
                                <div>
                                    <label htmlFor="available_days">Available Days*</label>
                                    <input type="text" placeholder='sunday,monday,tuesday' name="available_days" id="available_days" className='form-control' onChange={handleChange} required />
                                    <small>Seperate by Commas (,)</small>
                                </div>
                                <div className="row">

                                    <div className="form-group my-2 col-12 col-md-6">
                                        <label htmlFor="from">From*</label>
                                        <input type="time" id="from" name="from" className="form-control" onChange={handleChange} required />
                                    </div>
                                    <div className='form-group my-2 col-12 col-md-6'>
                                        <label htmlFor='to'>To*</label>
                                        <input type="time" id="to" name="to" className="form-control" onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="daily_slots">Daily Slots*</label>
                                    <input type="number" placeholder='10' name='daily_slots' id="daily_slots" className="form-control" onChange={handleChange} required />
                                </div>
                                <div className="form-group my-2 row justify-content-between" style={{ marginLeft: "2px", marginRight: "0px" }}>
                                    <button type="button" className="btn btn-outline-danger col-5" onClick={closeDialog}>Close</button>
                                    <button type='submit' className="btn btn-primary col-6" onClick={handleSubmit}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}