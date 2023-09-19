/* eslint-disable react/prop-types */
import React from 'react'
import Hospitals from '../../Modules/Hospitals';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Index() {
    let [hospitals, setHospitals] = React.useState([]);
    let [open, setOpen] = React.useState(false);
    let [data, setData] = React.useState({})
    React.useEffect(() => {
        (async function () {
            await Hospitals.getAllHospitals((response) => {
                setHospitals(response)
            })
        })()
    }, [])
    const closeDialog = () => {
        setOpen(false);
        setData({});
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let data2 = {
            ...data,
            userType: "hospital"
        }

        Hospitals.addHospital(data2, (response) => {
            if (response.status == 200) {
                toast.success("Hospital Added Successfully");
                window.location.reload();
            }
        })

    }
    return (
        <>
            <div className="row">
                <div className='col-10'>
                    <div>{hospitals.data != "No Hospitals Found" ? (
                        <div className="p-4">
                            <div>
                                <h3>Hospitals</h3>
                                <div className='cards-container'>
                                    {hospitals?.data?.map((data, index) => {
                                        return <Card data={data} key={index} from="hospitals" />
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : ("No Hospitals Found")}</div>
                </div>
                <div className="col-2">
                    <button className='btn btn-info rounded-1' onClick={() => setOpen(true)}>Add Hospital</button>
                </div>
                <Dialog open={open} closeDialog={closeDialog} handleSubmit={handleSubmit} handleChange={handleChange} />
            </div>
        </>
    )
}
function Card({ data, from }) {
    return (
        <div className="card col-md-6 col-lg-3 col-12 mt-3 z-0">
            <div className="card-body">
                <h5 className="card-title">{data.Name ? data.Name : data.name}</h5>
                <h5 className="text-muted h6">{data.Specialization ? data.Specialization : null} Doctors</h5>
                {data.fee ? (<h5 className="text-muted h6">{data.fee} &#8377;</h5>) : null}
                {data?.Description ? <p className="text-muted">{data?.Description}</p> : null}
                <div>
                    {data?.ContactNumber ? (<p className="my-0">Phone Number : {data?.ContactNumber}</p>) : null}
                    {data?.speciality ? <p className="my-0">Speciality : {data?.speciality}</p> : null}
                    {data?.Address ? (<p className="mb-3">Address : {data?.Address}</p>) : null}
                </div>
                {from == "hospitals" ? (<Link to="/hospital" state={data} className="btn btn-primary px-4 rounded-1">Check out</Link>) : (<Link to="/" className="btn btn-primary rounded-1 px-4" state={data}>Book Appointment</Link>)}
            </div>
        </div>
    )
}


export { Card }

function Dialog({ open, closeDialog, handleChange, handleSubmit }) {
    return (
        <div className="contianer position-absolute" style={{ display: open ? "block" : "none", height: "80%", width: "91%" }}>
            <div className='row justify-content-center'>
                <div className="card col-6" style={{ boxShadow: "2px 2px 10px rgba(0,0,0,0.3)" }}>
                    <div className="card-body">
                        <h5 className="card-title">Add Hospital</h5>
                        <form className='row' onSubmit={handleSubmit}>
                            <div className="form-group my-1 col-12 col-md-6">
                                <label htmlFor="name">Name*</label>
                                <input type="text" className="form-control" minLength={4} id="name" onChange={handleChange} name="name" placeholder='ABC Hospital' required />
                            </div>
                            <div className="form-group my-1 col-12 col-md-6">
                                <label htmlFor="email">Email*</label>
                                <input type="email" className="form-control" id="email" name="email" onChange={handleChange} placeholder='info@abc.com' required />
                            </div>
                            <div className="form-group my-1 col-12 col-md-6">
                                <label htmlFor="password">Password*</label>
                                <input type="text" minLength={8} className="form-control" id="password" onChange={handleChange} name="password" placeholder='*******' required />
                            </div>
                            <div className="form-group my-1 col-12 col-md-6">
                                <label htmlFor="contactNumber">Contact Number*</label>
                                <input type="tel" maxLength={12} minLength={10} className="form-control" onChange={handleChange} id="contactNumber" name="contactNumber" placeholder='+919687123658' required />
                            </div>
                            <div className="form-group my-1">
                                <label htmlFor="address">Address*</label>
                                <input type="text" className="form-control" id="address" name="address" onChange={handleChange} placeholder='Batamaloo, Srinagar' required />
                            </div>
                            <div className="form-group my-1">
                                <label htmlFor="description">Description</label>
                                <textarea type="text" className="form-control" id="description" name="description" onChange={handleChange} placeholder='We are Specialized in Treating the Diseases of Heart, Eyes and Skin' />
                            </div>
                            <div className="form-group my-1">
                                <label htmlFor="speciality">Speciality*</label>
                                <input type="text" className="form-control" id="speciality" name="specialization" onChange={handleChange} placeholder='eye, heart and skin' required list="specialitys" />
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

                            <div className='my-3 d-flex col-12 gap-2'>
                                <button type="button" onClick={closeDialog} className='btn btn-outline-danger rounded-1 w-50'>Close</button>
                                <button type="submit" className="btn btn-primary rounded-1 w-50">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}