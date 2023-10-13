import React from 'react'
import Labs from '../../Modules/Labs';
import User from '../../Modules/User';
import { AiOutlineCloudDownload } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { toast } from 'react-toastify';
export default function Index() {

    let [reports, setReports] = React.useState<any[]>([]);
    let [open, setOpen] = React.useState<Boolean>(false);
    let [patients, setPatients] = React.useState<any[]>([]);
    let [selectedPatient, setSelectedPatient] = React.useState({});
    React.useEffect(() => {
        document.title = "Reports";
        fetchData()
    }, [])

    function fetchData() {
        let userType = User?.getUser()?.UserType;

        if (userType.toLowerCase() == "lab") {
            let id = User?.getUser()?.LabID

            Labs.getAllReports(id, (response) => {
                console.log(response)
                if (response?.response?.status === 401) {
                    window.location.reload();
                }
                if (response?.response?.status === 404) {
                    return;
                }
                setReports(response.data)
            })
            return
        }
        let id = User?.getUser()?.PatientID
        Labs.getReportByPatientId(id, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            if (response?.response?.status === 404) {
                return;
            }
            setReports(response.data)
        })
    }


    const handleSearch = (e) => {
        let value = e?.target?.value;
        if (value == "") return fetchData();
        let filtered = reports.filter((item) => item?.patientName?.toLowerCase().includes(value?.toLowerCase()))
        if (filtered.length === 0) {
            setReports([]);
            return;
        }
        setReports(filtered)
    }

    const closeDialog = () => {
        setOpen(false)
    }
    const openDialog = () => {
        setOpen(true)
        fetchPatients()
    }
    const handleAdd = (e) => {
        e.preventDefault();

        // Create a new FormData object and append the file input
        let formData = new FormData();
        console.log(formData)

        // Define the rest of the data
        let data = {
            PatientID: selectedPatient,
            LabID: User?.getUser()?.LabID,
            Status: "Sent",
            file: e.target.file.files[0]
        };

        // Append the data to the FormData object
        for (let key in data) {
            formData.append(key, data[key]);
        }
        // return;
        // return;
        // Make sure you're sending the formData in your request
        Labs.addReport(formData, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            if (response?.response?.status === 404) {
                return;
            }
            fetchData();
            closeDialog();
            toast.success("Report Added Successfully")
        });
    };

    function fetchPatients() {
        let id = User?.getUser()?.LabID
        Labs.getPatients(id, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            if (response?.response?.status === 404) {
                return;
            }
            setPatients(response.data)
        })
    }
    const handleSelectedPatient = (e) => {
        let value = e?.target?.value;
        setSelectedPatient(value);
    }
    const download = (id) => {
        console.log(id)
        Labs.downloadReport(id, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            if (response?.response?.status === 404) {
                return;
            }
            // receiving a pdf from a server
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'report.pdf'
            link.click()
            toast.success("Report Downloaded Successfully")
        })
    }
    const deleteReport = (id) => {
        let check = window.confirm("Are you sure you want to delete this report?")
        if (!check) return;
        Labs.deleteReport(id, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            }
            if (response?.response?.status === 404) {
                return;
            }
            fetchData();
            toast.success("Report Deleted Successfully")
        })
    }
    return (
        <>
            <div className='mx-4'>
                <h1>Reports</h1>

                {
                    User?.getUser()?.UserType.toLowerCase() == "lab" ? (

                        <div>
                            <input type='search' className='form-control' placeholder='Search' onChange={handleSearch} />
                            <button className='btn btn-outline-primary my-3' onClick={openDialog} >Add Report</button>
                        </div>
                    ) : null}
                <div className='my-3 row gap-5'>
                    {
                        reports?.length > 0 ? reports?.map((item, index) => (
                            <div className='card my-2 col-md-3 col-12' key={index}>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <h5 className='card-title'>{
                                                User.getUser()?.UserType.toLowerCase() == 'lab' ?
                                                    (item?.patientName) : null
                                            }</h5>
                                            <h6 className='card-subtitle mb-2 text-muted'>{item?.appType}</h6>
                                            {
                                                item?.labName ? (
                                                    <>
                                                        <p className='mb-0 fw-bold'>{item?.labName}</p>
                                                        <p className=''>{item?.labContactNumber}</p>
                                                    </>
                                                ) : null
                                            }

                                            <p className='card-text'>{item?.patientAddress}</p>
                                            <p className='card-text'>{item?.patientContactNumber}</p>
                                        </div>
                                        <div className='col-md-6'>
                                            <h5 className='card-title'>Status</h5>
                                            <h6 className='card-subtitle mb-2 text-muted'>{
                                                User.getUser().UserType.toLowerCase() == 'lab' ?

                                                    item?.reportStatus : "received"

                                            }</h6>
                                        </div>
                                        <div className="col">
                                            {
                                                User.getUser()?.UserType == "lab" ?
                                                    (
                                                        <button className="btn btn-outline-danger" onClick={() => deleteReport(item?.id)}><BsTrash /></button>
                                                    ) : null
                                            }
                                            <button className='btn btn-outline-info my-2 me-3' onClick={() => download(item?.id)}><AiOutlineCloudDownload /> &nbsp; Download</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : <h5>No Reports Found</h5>
                    }
                </div>
            </div>
            <AddDialog open={open} closeDialog={closeDialog} handleAdd={handleAdd} patients={patients} handleSelectedPatient={handleSelectedPatient} />
        </>
    )
}

const AddDialog = ({ open, closeDialog, handleAdd, patients, handleSelectedPatient }: { open: Boolean, closeDialog: (e) => void, handleAdd: () => void, patients: any[], handleSelectedPatient: (e) => void }) => (
    <div className="modal position-fixed justify-content-center align-items-center" style={{ display: open ? "flex" : "none", background: "rgba(0,0,0,0.4)", inset: 0 }}>
        <div className="modal-content modal-centered w-25 ">
            <div className="modal-body">
                <div className="modal-header">
                    <h3>Add Report</h3>
                    <button className="btn btn-danger" onClick={closeDialog}>X</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleAdd} encType="multipart/form-data">
                        <div>
                            <select className='form-control' onChange={handleSelectedPatient}>
                                <option selected disabled>Select a Patient</option>
                                {
                                    patients?.map((patient, index) => {
                                        return <option key={index} value={patient?.PatientID}>{patient?.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='my-2'>
                            <input type="file" name="file" className='form-control' accept='application/pdf' />
                        </div>
                        <div className="my-2 d-flex justify-content-end">
                            <button type='button' onClick={closeDialog} className="btn btn-outline-danger me-4">Close</button>
                            <button className="btn btn-primary w-25" type='submit'>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
)