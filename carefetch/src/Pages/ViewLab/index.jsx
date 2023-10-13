import React from 'react'
import { useLocation } from 'react-router-dom'
import Labs from '../../Modules/Labs';
import { toast } from 'react-toastify';
import User from '../../Modules/User';
export default function Index() {
    let location = useLocation();
    let [currentLab, setCurrentLab] = React.useState({})
    let [medicalTests, setMedicalTests] = React.useState([]);
    let [openHomeCollection, setOpenHomeCollection] = React.useState(false);
    let [openOfflineAppointment, setOpenOfflineAppointment] = React.useState(false);
    let [selectedMedicalTest, setSelectedMedicalTest] = React.useState({});
    React.useEffect(() => {
        setCurrentLab(location.state);
        fetchData();
    }, [])

    function fetchData() {
        Labs.getAllMedicalTests(location.state.LabID, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            } else if (response?.response?.status === 404) {
                return;
            }
            setMedicalTests(response.data);
        })
    }

    function handleHomeCollection(e) {
        e.preventDefault();
        // let check = confirm("Are you sure you want to request home collection for this test?");
        // if (!check) return;
        let data = {
            labId: currentLab?.LabID,
            testID: selectedMedicalTest?.TestID,
            patientId: JSON.parse(localStorage.getItem("user")).PatientID,
            status: "Pending",
            address: e.target.Address.value,
            contactNumber: e.target.ContactNumber.value,
            date: e.target.date.value,
            type: "Home Collection"
        }
        // return;
        Labs.addHomeCollection(data, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            toast.success("Home Collection Requested Successfully");
            fetchData();
            setOpenHomeCollection(false);
        })
    }

    function toggleHomeCollection(test) {
        setOpenHomeCollection(!openHomeCollection);
        setSelectedMedicalTest(test);
    }
    function toggleOfflineAppointment(test) {
        setOpenOfflineAppointment(!openOfflineAppointment);
        setMedicalTests(test)

        let check = confirm("Are you sure you want to request offline appointment for this test?");
        if (!check) return;

        let data = {
            labId: currentLab?.LabID,
            testID: test?.TestID,
            patientId: User.getUser().PatientID,
            status: "Pending",
            type: "Offline Appointment"
        }

        Labs.addHomeCollection(data, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            toast.success("Offline Appointment Requested Successfully");
            fetchData()
        })


    }

    return (
        <div className="mx-4">
            <h1>View Lab</h1>
            <h3 className='my-5'>You are Currently Viewing {currentLab?.Name}</h3>
            <h5 className='mb-3'>Medical Tests</h5>
            <div className='d-flex flex-wrap gap-3
            '>

                {
                    medicalTests?.length > 0 ? medicalTests?.map((test, index) => (
                        <div key={index} className='card col-md-3 col-12 p-3'>
                            <div className='card-title'>{test?.Name}</div>
                            <div className='fw-bold'>{test?.Cost}</div>
                            <div className='card-body text-muted'>{test?.Description}</div>
                            <div className='card-footer d-flex gap-3 flex-wrap'>
                                <button className='btn btn-outline-info w-100' onClick={() => toggleHomeCollection(test)}>Home Collection</button>
                                <button className='btn btn-outline-success w-100' onClick={() => toggleOfflineAppointment(test)}>Offline Appointment</button>
                            </div>
                            <HomeCollection open={openHomeCollection} closeDialog={() => setOpenHomeCollection(false)} handleHomeCollection={handleHomeCollection} />
                        </div>
                    )) : <h6>No Medical Tests</h6>
                }
            </div>
        </div>
    )
}

function HomeCollection({ open, closeDialog, handleHomeCollection }) {
    return (
        <div className='modal' style={{ display: open ? "block" : "none", background: "rgba(0,0,0,0.3)" }}>
            <div className='modal-centered'>
                <div className='modal-content w-25' style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                    <div className='modal-header'>
                        <h4>Home Collection</h4>
                        <button className='btn btn-danger' onClick={closeDialog}>X</button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={handleHomeCollection}>
                            <div className='mb-3'>
                                <label htmlFor='Address'>Address</label>
                                <input type='text' name='Address' className='form-control' required placeholder='Nawakadal, Srinagar' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='ContactNumber'>Contact Number</label>
                                <input type='tel' name='ContactNumber' className='form-control' required placeholder='8888888888' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='date'>Date</label>
                                <input type='date' name='date' className='form-control' required />
                            </div>
                            <div className='d-flex gap-3 justify-content-between'>
                                <button className='btn btn-outline-danger rounded-1' onClick={closeDialog}>Close</button>
                                <button className='btn btn-success rounded-1'>Request Home Collection</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}