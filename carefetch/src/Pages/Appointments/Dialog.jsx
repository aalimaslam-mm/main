import React from "react"
import Patient from "../../Modules/Patients"
import { toast } from "react-toastify";
import Doctors from "../../Modules/Doctors";
/* eslint-disable react/prop-types */
function Dialog({ open, closeDialog, doctors, handleChange, handleSubmit, handleSelectDoctor, selectedDoctor, dateChange }) {
    let [existing, setExisting] = React.useState(false);
    let [data, setData] = React.useState([]);
    let [message, setMessage] = React.useState("");
    const handleExisting = (e) => {
        if (e.target.value == "existing") {
            fetchPatients();
            setExisting(true);
        } else {
            setExisting(false);
        }
        handleChange(e);
    }
    const fetchPatients = () => {
        Patient.getAllPatients((response) => {
            if (response.status == 404) return toast.error("No Patients Found")
            setData(response?.data);
        })
    }
    const fetchAvailibility = async (e) => {
        let value = e.target.value;
        let data3 = {
            DoctorId: selectedDoctor.DoctorID,
            day: value
        }
        await Doctors.getAvailablity(data3, (response) => {
            setMessage(response?.data?.message);
            let date = response?.data?.message?.split(" ");
            date = date[date.length - 1];
            dateChange(date);
        });
    }
    return (
        <div className="position-absolute justify-content-center align-items-center" style={{ display: open ? "flex" : "none", background: "rgba(0,0,0,0.4)", inset: "0", zIndex: "1111" }}>
            <div className="card p-4 col-md-6 col-11">
                <div className="card-header">
                    <div className="card-title">
                        Add Appointment
                    </div>
                </div>
                <div className="card-body">
                    <h4>
                        Patient Details
                    </h4>
                    <label htmlFor="existing">Please Select an Option</label>
                    <select name="existing" id="existing" className="form-control" onChange={handleExisting}>
                        <option value="nothing" selected disabled>Select an Option</option>
                        <option value="existing">Existing Patient</option>
                        <option value="new">New Patient</option>
                    </select>
                    {!existing ? (
                        <>
                            <div className="row">
                                <div className="col-md-6 col-12 mt-2">
                                    <label htmlFor="patientName">
                                        Patient Name
                                    </label>
                                    <input type="text" className="form-control" name="patientName" id="patientName" placeholder="Ahmad Raza" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-12 mt-2">
                                    <label htmlFor="age">
                                        Age
                                    </label>
                                    <input type="number" className="form-control" name="age" id="age" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-12 mt-2">
                                    <label htmlFor="phoneNumber">
                                        Phone Number
                                    </label>
                                    <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="03001234567" onChange={handleChange} />
                                </div>
                                <div className="col-md-6 col-12 mt-2">
                                    <label htmlFor="Gender">
                                        Gender
                                    </label>
                                    <select name="gender" id="gender" className="form-control" onChange={handleChange}>
                                        <option value="male" disabled selected>Select an Option</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </>

                    ) : (
                        <select name="PatientId" className="form-control mt-2" onChange={handleChange}>
                            <option value="nothing" selected disabled>Select a Patient</option>
                            {data?.length > 0 ? data?.map((patient, index) => (
                                <option key={index} value={patient?.PatientId}>{patient?.PatientName} - {patient?.PatientContact}</option>
                            )) : ("No Patients Found")}
                        </select>
                    )
                    }

                    <h4 className="mt-4">
                        Doctor Details
                    </h4>
                    <div className="row">
                        <div className="col-12">
                            <select className="form-control" name="doctor" onChange={handleSelectDoctor}>
                                <option value="nothing" selected>Select an Option</option>
                                {doctors?.map((doctor, index) => (
                                    <option key={index} value={doctor.DoctorID}>{doctor.name} - {doctor?.Specialization} - &#8377; {doctor?.fee}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <label htmlFor="appointmentDate">
                                Appointment Day
                            </label>
                            <select name="appointmentDate" className="form-control" id="appointmentDate" onChange={fetchAvailibility}>
                                <option value="nothing" selected disabled>Select a Day</option>
                                {selectedDoctor?.available_days?.split(",").map((day, index) => (
                                    <option key={index} value={day}>{day}</option>
                                ))}
                            </select>
                            {message ? (
                                <div>
                                    <p className="text-warning">{message}</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-outline-danger w-25" onClick={closeDialog}>Close</button>
                    <button className="btn btn-new w-50" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog