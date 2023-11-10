/* eslint-disable react/prop-types */
import React from 'react'
import { useLocation } from 'react-router-dom'
import Labs from '../../Modules/Labs';
import { toast } from 'react-toastify';
import User from '../../Modules/User';
import src from "./dea295a0.svg"
export default function Index() {
    let location = useLocation();
    let [currentLab, setCurrentLab] = React.useState({})
    let [medicalTests, setMedicalTests] = React.useState([]);
    let [openHomeCollection, setOpenHomeCollection] = React.useState(false);
    let [openOfflineAppointment, setOpenOfflineAppointment] = React.useState(false);
    let [selectedMedicalTest, setSelectedMedicalTest] = React.useState({});
    let [bulkTests, setBulkTests] = React.useState([]);
    let [open, setOpen] = React.useState(false);
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

    function addToList(test) {
        setBulkTests([...bulkTests, test])
    }

    function removeFromList(testId) {
        let filtered = bulkTests.filter((item) => item?.TestID !== testId)
        setBulkTests(filtered)
    }

    return (
        <div className="mx-4">
            <h1>View Lab</h1>
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='my-5'>You are Currently Viewing {currentLab?.Name}</h3>
                <button className='btn btn-outline-success' onClick={() => setOpen(true)}>View <span className='badge text-bg-success'>{bulkTests?.length}</span></button>
            </div>
            <h5 className='mb-3'>Medical Tests</h5>
            <div className='d-flex flex-wrap gap-3 align-items-start
            '>

                {
                    medicalTests?.length > 0 ? medicalTests?.map((test, index) => (
                        <Card test={test} key={index} removeFromList={removeFromList} toggleHomeCollection={toggleHomeCollection} toggleOfflineAppointment={toggleOfflineAppointment} addToList={addToList} />
                    )) : <h6>No Medical Tests</h6>
                }
            </div>
            <HomeCollection open={openHomeCollection} closeDialog={() => setOpenHomeCollection(false)} handleHomeCollection={handleHomeCollection} />
            <SideDrawer bulkTests={bulkTests} open={open} setOpen={setOpen} removeFromList={removeFromList} />
        </div>
    )
}


function SideDrawer({ bulkTests, open, setOpen, removeFromList }) {
    let [openModal, setOpenModal] = React.useState(false)
    function handleBulkCreate(e) {
        e.preventDefault()
        let miss = {
            patientId: User.getUser()?.PatientID,
            contactNumber: e?.target?.contactNumber?.value,
            address: e?.target?.address?.value,
            date: e?.target?.date?.value,
        }
        let appointments = bulkTests;
        Labs.addBulkAppointment(miss, appointments, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            toast.success("Appointment Booked Successfully");
            setOpenModal(false);
            setOpen(false);
        })

    }
    const openModals = () => {
        setOpenModal(true)
    }

    const closeModals = () => {
        setOpenModal(false)
    }
    return (
        <div className="sidenav w-25 position-fixed h-100 bg-white" style={{ top: '80px', right: open ? 0 : "120%" }}>
            <div className='position-absolute end-0'>
                <button className='btn btn-outline-danger rounded-1' onClick={() => setOpen(false)}>X</button>
            </div>
            {
                bulkTests.map((test, index) => (
                    <>
                        <div className="card rounded-0" style={{ width: '25rem' }} key={index}>
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: '#00767a' }}>{test?.Name}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h6 style={{ color: '#00767a' }}>₹{test?.Cost}</h6></li>
                                </ul>
                                <div className="card-footer text-center">
                                    <div className="card-link btn" style={{ textDecoration: 'none', color: '#830000' }} onClick={() => removeFromList(test?.TestID)}>Remove</div>
                                </div>

                            </div>
                        </div>
                    </>
                ))
            }

            <div className="book-btn position-fixed w-25 bottom-0">
                <button className="btn btn-outline-success w-100 rounded-0" onClick={openModals}>Book Now</button>
            </div>
            <ModalForBulk open={openModal} closeDialog={closeModals} handleBulkCreate={handleBulkCreate} />
        </div>
    )
}

function Card({ test, toggleHomeCollection, toggleOfflineAppointment, addToList, removeFromList }) {
    return (
        <div className="card" style={{ width: '20rem' }} >
            <img src={src} className="card-img-top " alt="..." style={{ width: '50px', marginLeft: '20px' }} />
            <div className="card-body">
                <h5 className="card-title" style={{ color: '#00767a ' }}>{test?.Name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{test?.Description}</h6>
                <div className="d-flex justify-content-between my-2 ">
                    <h6 style={{ color: '#00767a' }}>₹{test?.Cost}</h6>
                    {
                        test?.homeCollection ? <div style={{ cursor: "pointer" }} className='text-success text-decoration-underline rounded-1 ms-3' onClick={() => toggleHomeCollection(test)}>Home Collection</div> : null
                    }
                </div>
                <div className="card-footer text-center">
                    <div href="#" className="card-link text-dark btn btn-outline-success" style={{ textDecoration: 'none', color: '#005f63' }} onClick={(e) => {
                        if (e.target.innerText.toLowerCase() == "add to list") {
                            addToList(test)
                            e.target.innerText = "Remove "
                            return
                        } else {
                            removeFromList(test?.TestID)
                            e.target.innerText = "Add to List"
                            return
                        }
                    }}>Add to List</div>
                    <div href="#" className="card-link text-white btn btn-success" style={{ textDecoration: 'none', color: '#005f63' }} onClick={() => toggleOfflineAppointment(test)}>Book Now</div>
                </div>
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
                                <button type='button' className='btn btn-outline-danger rounded-1' onClick={closeDialog}>Close</button>
                                <button className='btn btn-success rounded-1'>Request Home Collection</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ModalForBulk({ open, closeDialog, handleBulkCreate }) {
    return (
        <div className='modal' style={{ display: open ? "block" : "none", background: "rgba(0,0,0,0.3)" }}>
            <div className='modal-centered'>
                <div className='modal-content w-25' style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                    <div className='modal-header'>
                        <h4>Bulk Create</h4>
                        <button className='btn btn-danger' onClick={closeDialog}>X</button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={handleBulkCreate}>
                            <div className='mb-3'>
                                <label htmlFor='Address'>Address</label>
                                <input type='text' name='address' className='form-control' required placeholder='Nawakadal, Srinagar' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='ContactNumber'>Contact Number</label>
                                <input type='tel' name='contactNumber' maxLength={10} className='form-control' required placeholder='8888888888' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='date'>Date</label>
                                <input type='date' name='date' className='form-control' required />
                            </div>
                            <div className='d-flex gap-3 justify-content-between'>
                                <button type='button' className='btn btn-outline-danger rounded-1' onClick={closeDialog}>Close</button>
                                <button className='btn btn-success rounded-1'>Book Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}