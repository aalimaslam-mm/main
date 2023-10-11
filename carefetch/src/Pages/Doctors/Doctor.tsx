import React, { FormEvent } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Doctors from '../../Modules/Doctors';
import { toast } from 'react-toastify';

interface DoctorProps {
    name: string;
    Specialization: string;
    fee: number;
    availibility: {
        available_days: string;
        daily_slots: number;
        fromTime: string;
        toTime: string;
    }
}

export default function Doctor() {
    let navigate = useNavigate();
    let location = useLocation();
    let doctorId = location?.state?.id;
    let [doctor, setDoctor] = React.useState<DoctorProps>()
    let [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        fetchDoctor()

    }, [doctorId]);

    function fetchDoctor() {
        Doctors.getDoctorById(doctorId, (response: any) => {
            if (response?.data) {
                setDoctor(response?.data);
            }
        });
    }

    function openDialog() {
        setOpen(true);
    }
    function closeDialog() {
        setOpen(false);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let name = e?.target?.name?.value;
        let Specialization = e?.target?.Specialization?.value;
        let fee = e?.target?.fee?.value;
        let available_days = e?.target?.available_days?.value;
        let daily_slots = e?.target?.daily_slots?.value;
        let fromTime = e?.target?.fromTime?.value;
        let toTime = e?.target?.toTime?.value;
        let data = {
            name,
            Specialization,
            fee,
            availibility: {
                available_days,
                daily_slots,
                fromTime,
                toTime
            }
        }
        Doctors.updateDoctor(doctorId, data, (response: any) => {
            if (response?.data) {
                setDoctor(response?.data);
                toast.success("Doctor Updated Successfully");
                closeDialog();
                fetchDoctor();
            }
        });

    }

    function deleteDoctor() {
        let check = confirm("Are you Sure?");
        if (!check) return;
        Doctors.softDeleteDoctor(doctorId, (response: any) => {
            if (response?.data) {
                toast.success("Doctor Deleted Successfully");
                navigate("/doctors")
            }
        })
    }

    return (
        <>
            <div className="px-4 w-full m-4 d-flex flex-wrap justify-content-around align-items-center rounded py-5" style={{ background: "rgba(130,120,180,0.2)" }}>
                <div>
                    <h4 className="mb-4">Details</h4>
                    <div>
                        Name : {doctor?.name}
                    </div>
                    <div>Speciality : {doctor?.Specialization}</div>
                    <div>Fee : &#8377; {doctor?.fee}</div>
                </div>
                <div>
                    <h4 className='mb-4'>Availibility</h4>
                    <div>
                        <div>Days: {doctor?.availibility?.available_days}</div>
                        <div>Daily Slots: {doctor?.availibility?.daily_slots}</div>
                        <div>From: {doctor?.availibility?.fromTime}</div>
                        <div>To: {doctor?.availibility?.toTime}</div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <button className='btn rounded-1 btn-outline-warning me-2' style={{ width: "30%" }} onClick={openDialog}>Edit</button>
                <button className='btn rounded-1 btn-outline-danger ms-5' style={{ width: "30%" }} onClick={deleteDoctor} >Delete</button>
            </div>
            <Dialog open={open} closeDialog={closeDialog} data={doctor} handleSubmit={handleSubmit} />
        </>
    )
}


function Dialog({ open, closeDialog, data, handleSubmit }: { open: Boolean, closeDialog: () => void, data: any, handleSubmit: any }) {
    return (
        <div className='modal' style={{ display: open ? "block" : 'none', background: "rgba(0,0,0,0.2)" }}>
            <div className='d-flex justify-content-center flex-column align-items-center w-50 bg-white p-4 rounded position-fixed' style={{ minHeight: "50vh", top: "50%", left: "50%", transform: "translate(-50%,-50%)", }}>
                <h1 className='modal-title'>Edit Doctor</h1>
                <div className='px-2'>
                    <form className='row' onSubmit={handleSubmit}>
                        <div className='form-group col-12 col-md-4 my-1'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' className='form-control' id='name' defaultValue={data?.name} disabled />
                        </div>
                        <div className='form-group col-12 col-md-4 my-1'>
                            <label htmlFor='Specialization'>Specialization</label>
                            <input type='text' className='form-control' id='Specialization' defaultValue={data?.Specialization} />
                        </div>
                        <div className='form-group col-12 col-md-4 my-1'>
                            <label htmlFor='fee'>Fee</label>
                            <input type='number' className='form-control' id='fee' defaultValue={data?.fee} />
                        </div>
                        <div className='form-group col-12 col-md-4 my-1'>
                            <label htmlFor='available_days'>Available Days</label>
                            <input type='text' className='form-control' id='available_days' defaultValue={data?.availibility?.available_days} />
                        </div>
                        <div className='form-group col-12 col-md-4 my-1'>
                            <label htmlFor='daily_slots'>Daily Slots</label>
                            <input type='number' className='form-control' id='daily_slots' defaultValue={data?.availibility?.daily_slots} />
                        </div>
                        <div className='form-group col-12 col-md-4 my-1'>
                            <label htmlFor='fromTime'>From Time</label>
                            <input type='time' className='form-control' id='fromTime' defaultValue={data?.availibility?.fromTime} />
                        </div>
                        <div className='form-group col-12 col-md-4 my-1'>
                            <label htmlFor='toTime'>To Time</label>
                            <input type='time' className='form-control' id='toTime' defaultValue={data?.availibility?.toTime} />
                        </div>
                        <div className='col-12 mt-4'>
                            <button type='button' className='btn rounded-1 btn-outline-danger me-2' style={{ width: "48%" }} onClick={closeDialog}>Close</button>

                            <button type='submit' className='btn w-50 rounded-1 btn-success' onClick={closeDialog}>Update</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
// "available_days": "Monday,Tuesday,Wednesday",
// "daily_slots": "2",
// "fromTime": "12:00:00",
// "toTime": "14:00:00"