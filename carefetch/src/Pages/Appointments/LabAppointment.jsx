import React from 'react'
import Labs from '../../Modules/Labs';
import { toast } from 'react-toastify';

export default function LabAppointment() {
    let [appointments, setAppointments] = React.useState([]);
    React.useEffect(() => {
        document.title = "Lab Appointments";
        fetchData()
    }, [])

    function handleToShow(e) {

        if (e.target.innerText.toLowerCase() === "all") return fetchData();
        let filteredAppointments = appointments.filter((item) => item.Status.toLowerCase() === e.target.innerText.toLowerCase())
        if (filteredAppointments.length === 0) {
            toast.error("No Appointments Found");
            setAppointments([]);
            return;
        }
        setAppointments(filteredAppointments)
    }
    function fetchData() {
        Labs.getAllAppointments((response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            if (response?.response?.status === 404) {
                return;
            }
            setAppointments(response.data)
        })
    }
    function handleStatusChange(id, e) {
        Labs.updateAppointments(id, { status: e?.target?.value }, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            if (response?.response?.status === 404) {
                return;
            }
            toast.success("Status Updated Successfully")
            fetchData();
        })
    }
    const handleSearch = (e) => {
        let value = e?.target?.value;
        if (value == "") return;
        let filtered = appointments.filter((item) => item?.name?.toLowerCase().includes(value?.toLowerCase()))
        if (filtered.length === 0) {
            setAppointments([]);
            return;
        }
        setAppointments(filtered)
    }
    return (
        <div className="mx-4">
            <h1>LabAppointment</h1>
            <div>
                <input type="search" className="form-control" placeholder="Search" onChange={handleSearch} />
                {/* <button className='btn btn-outline-primary'>Add Appointment</button> */}
            </div>
            <div className="d-flex gap-3 my-3">
                <button className="btn btn-outline-info rounded-1" onClick={handleToShow}>All</button>
                <button className="btn btn-outline-info rounded-1" onClick={handleToShow}>Approved</button>
                <button className="btn btn-outline-info rounded-1" onClick={handleToShow}>Pending</button>
                <button className="btn btn-outline-info rounded-1" onClick={handleToShow}>Rejected</button>
                <button className="btn btn-outline-info rounded-1" onClick={handleToShow}>Completed</button>
            </div>
            <table className="table table-striped mt-5 me-5">
                <thead className="table-dark">
                    <tr>
                        <td>Sno.</td>
                        <td>Patient Name</td>
                        <td>Contact Number</td>
                        <td>Address</td>
                        <td>Test Name</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>  
                        <td className='align-middle'>1</td>
                        <td className='align-middle'>Ghulam</td>
                        <td className='align-middle'>95555</td>
                        <td className='align-middle'>Lal Chowk</td>
                        <td className='align-middle'>KFT</td>
                        <td className='align-middle'>
                            <select className='form-control'>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </td>
                    </tr> */}
                    {
                        appointments.length > 0 ? appointments.map((item, index) => (
                            <>
                                <tr key={index}>
                                    <td className='align-middle'>{index + 1}</td>
                                    <td className='align-middle'>{item.name}</td>
                                    <td className='align-middle'>{item?.contactNumber}</td>
                                    <td className='align-middle'>{item?.address}</td>
                                    <td className='align-middle'>{item.Name}</td>
                                    <td className='align-middle'>
                                        <select className='form-control' onChange={(e) => handleStatusChange(item?.TestAppointmentID, e)}>
                                            <option value="Pending" selected={item?.Status.toLowerCase() == "pending"}>Pending</option>
                                            <option value="Approved" selected={item?.Status.toLowerCase() == "approved"}>Approved</option>
                                            <option value="Rejected" selected={item?.Status.toLowerCase() == "rejected"}>Rejected</option>
                                            {/* <option value="Completed" selected={item?.Status.toLowerCase() == "completed"}>Completed</option> */}
                                        </select>
                                    </td>
                                </tr>
                            </>
                        )) : <h5>No Appointments Found</h5>
                    }
                </tbody>
            </table>
        </div>
    )
}


// "TestAppointmentID": 2,
// "PatientID": 5,
// "LabID": 6,
// "TestID": 2,
// "AppointmentDate": "2022-12-30T18:30:00.000Z",
// "Status": "Pending",
// "appType": "Home Collection",
// "address": "nawakdadl",
// "contactNumber": "`1234567",
// "UserID": 20,
// "DateOfBirth": "2000-07-30T18:30:00.000Z",
// "Gender": null,
// "ContactNumber": null,
// "Address": null,
// "name": "Patient 1",
// "deleted": 0,
// "age": null



























