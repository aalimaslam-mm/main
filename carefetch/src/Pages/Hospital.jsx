/* eslint-disable react/prop-types */
import React from 'react'
import { useLocation } from 'react-router-dom';
import HospitalModule from "../Modules/Hospitals"
import User from '../Modules/User';
import { toast } from 'react-toastify';

export default function Hospital() {
    let [open, setOpen] = React.useState(false);
    let location = useLocation();
    let [hospital, setHospital] = React.useState(null);
    let [data, setData] = React.useState({});
    React.useLayoutEffect(() => {
        HospitalModule.getHospitalById(location.state.HospitalID, (response) => {
            setHospital(response.data);
        })
    }, [location.state.HospitalID]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };
    const closeDialog = () => {
        setOpen(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let data2 = {
            ...data,
            HospitalID: hospital?.HospitalID
        };
        HospitalModule.updateHospital(data2, (response) => {
            if (response.status == 200) {
                toast.success("Hospital Updated Successfully")
                window.location.reload();
            } else if (response?.response?.status == 401) {
                toast.error("You are not Authorized to Update Hospital")
            }
            closeDialog();
        })
    }

    return (
        <div className='p-4'>
            <div className="row p-4 rounded-1" style={{ backgroundColor: "rgba(255,100,200,0.2)", }}>

                <div className='col-10'>

                    <div className='h1'>{hospital?.Name}</div>
                    <div className='h3'>{hospital?.speciality} Hospital</div>
                    <div className='text-muted'>{hospital?.Description}</div>
                    <div className="my-4">
                        <div className="h4">Address</div>
                        <div className="text-muted">{hospital?.Address}</div>
                    </div>
                    <div className="my-4">
                        <div className="h4">Contact</div>
                        <div className="text-muted">{hospital?.ContactNumber}</div>
                    </div>
                    <div className="my-4">
                        <div className="h4">Email</div>
                        <div className="text-muted">{hospital?.Email}</div>
                    </div>
                </div>
                {
                    User?.getUser()?.UserType.toLowerCase() == "admin" ? (<div className='col-2'>
                        <button className='btn btn-outline-dark' onClick={() => setOpen(true)}>Edit Hospital</button>
                    </div>) : null
                }
            </div>
            <EditDialog open={open} closeDialog={() => setOpen(false)} data={hospital} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    )
}


function EditDialog({ open, closeDialog, handleChange, handleSubmit, data }) {
    return (
        <div className="contianer position-absolute" style={{ display: open ? "block" : "none", top: "15%", height: "80%", width: "91%" }}>
            <div className='row justify-content-center'>
                <div className="card col-6" style={{ boxShadow: "2px 2px 10px rgba(0,0,0,0.3)" }}>
                    <div className="card-body">
                        <h5 className="card-title">Edit Hospital</h5>
                        <form className='row' onSubmit={handleSubmit}>
                            <div className="form-group my-1 col-12 col-md-6">
                                <label htmlFor="name">Name*</label>
                                <input type="text" className="form-control" minLength={4} id="name" onChange={handleChange} name="Name" placeholder='ABC Hospital' defaultValue={data?.Name} required />
                            </div>

                            <div className="form-group my-1 col-12 col-md-6">
                                <label htmlFor="contactNumber">Contact Number*</label>
                                <input type="tel" maxLength={12} minLength={10} className="form-control" onChange={handleChange} id="ContactNumber" defaultValue={data?.ContactNumber} name="contactNumber" placeholder='+919687123658' required />
                            </div>
                            {data?.Address ? (
                                <>
                                    <div className="form-group my-1">
                                        <label htmlFor="address">Address*</label>
                                        <input type="text" className="form-control" defaultValue={data?.Address} id="address" name="Address" onChange={handleChange} placeholder='Batamaloo, Srinagar' required />
                                    </div>
                                    <div className="form-group my-1">
                                        <label htmlFor="description">Description</label>
                                        <textarea type="text" className="form-control" defaultValue={data?.Description} id="description" name="Description" onChange={handleChange} placeholder='We are Specialized in Treating the Diseases of Heart, Eyes and Skin' />
                                    </div>
                                    <div className="form-group my-1">
                                        <label htmlFor="speciality">Speciality*</label>
                                        <input type="text" className="form-control" id="speciality" name="Speciality" onChange={handleChange} placeholder='eye, heart and skin' required list="specialitys" defaultValue={data?.speciality} />
                                        <small className='text-muted'>Seperate the Specialities By Commas (,)</small>
                                        <datalist id="specialitys">
                                            <option value="General" />
                                            <option value="Eye" />
                                            <option value="Heart" />
                                            <option value="Skin" />
                                            <option value="Kidney" />
                                            <option value="Lungs" />
                                        </datalist>
                                    </div>
                                </>
                            ) : null}

                            <div className='my-3 d-flex col-12 gap-2'>
                                <button type="button" onClick={closeDialog} className='btn btn-outline-danger rounded-1 w-50'>Close</button>
                                <button type="submit" className="btn btn-info rounded-1 w-50">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}