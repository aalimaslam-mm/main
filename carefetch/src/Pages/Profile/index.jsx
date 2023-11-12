/* eslint-disable react/prop-types */
import React from 'react'
import User from '../../Modules/User';
import { BsPencil } from 'react-icons/bs';
import Dialog from './ProfileDialog';
import { toast } from 'react-toastify';
import { RxAvatar } from "react-icons/rx"
import axios from 'axios';
export default function Index() {
    let [user, setUser] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const [disabled, setDisabled] = React.useState(true);
    const [password, setPassword] = React.useState({});
    let [changePasswordDialogS, setChangePasswordDialogS] = React.useState(false);

    React.useEffect(() => {
        setUser(User.getUser());
        if (User.getUser().UserType == "hospital") {
            fetchSubscriptionDetails()
        }
    }, [])

    function fetchSubscriptionDetails() {
        let userId = User.getUser().UserID;
        let data = axios.get(`http://localhost:5503/get-subscription/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log(response)
        })
    }

    const onClose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setDisabled(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let data2 = { ...data, UserType: user.UserType, UserId: user.UserID };
        if (!data2.Username) {
            data2.Username = user?.Username
        }
        if (!data2.ContactNumber) {
            data2.ContactNumber = user?.ContactNumber
        }
        if (!data2.DateOfBirth) {
            data2.DateOfBirth = user?.DateOfBirth?.split("T")[0];
        }
        if (data2.Gender == "Select") {
            data2.Gender = user?.Gender
        }
        if (!data2.Address) {
            data2.Address = user?.Address
        }
        if (!data2.Description) {
            data2.Description = user?.Description
        }
        setDisabled(true);
        User.updateUser(data2, (response) => {
            if (response.message == "User Updated Successfully") {
                toast.success(response.message);
                User.getUserById(user.UserID, (response) => {
                    localStorage.setItem("user", JSON.stringify(response));
                })
                onClose();
                setUser(User.getUser());
                setDisabled(false)
            }
        })
    }

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        User.changePassword(password, (response) => {
            if (response.status == 200) {
                toast.success(response.data);
                setChangePasswordDialogS(false);
            }
            else {
                toast.error(response?.response?.data);
            }
        })
    }


    return (
        <section>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white d-flex flex-column justify-content-center align-items-center"
                                    style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                                    <RxAvatar style={{ fontSize: '5rem ', color: "black", marginBottom: "30px" }} />
                                    <div className='d-flex justify-content-center align-items-center'>

                                        <h5 style={{ color: "black" }}>{user?.Username}</h5>
                                        <BsPencil className='text-black ms-3' style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Information</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{user?.Email}</p>
                                            </div>
                                            {user.ContactNumber ? (
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{user?.ContactNumber}</p>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="row pt-1">
                                            {user.Address ? (
                                                <div className="col-6 mb-3">
                                                    <h6>Address</h6>
                                                    <p className="text-muted">{user?.Address}</p>
                                                </div>
                                            ) : null}

                                            {user.UserType == "patient" && user.DateOfBirth ? (
                                                <div className="col-6 mb-3">
                                                    <h6>DOB</h6>
                                                    <p className="text-muted">{user?.DateOfBirth?.split("T")[0]}</p>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="row pt-1">
                                            {user.Gender ? (
                                                <div className="col-6 mb-3">
                                                    <h6>Gender</h6>
                                                    <p className="text-muted">{user?.Gender}</p>
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                            <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={onClose} user={user} handleChange={handleChange} handleSubmit={handleSubmit} disabled={disabled} />

            <div className="p-4 d-flex justify-content-center">
                <button className='btn btn-warning' onClick={() => setChangePasswordDialogS(true)}>Change Password</button>
            </div>
            {
                user.UserType == "hospital" ? (
                    <div className='position-absolute bottom-2'>
                        <div className="card mb-3" style={{ borderRadius: ".5rem" }}>

                        </div>
                    </div>
                ) : null
            }


            <ChangePasswordDialog open={changePasswordDialogS} closeDialog={() => setChangePasswordDialogS(false)} handleChange={handlePasswordChange} handleSubmit={handlePasswordSubmit} />
        </section>
    )
}

function ChangePasswordDialog({ open, closeDialog, handleChange, handleSubmit }) {
    return (
        <div className='position-fixed justify-content-center align-items-center' style={{ display: open ? "flex" : "none", top: '0', left: "0", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.4)" }}>
            <div className='card p-4 col-md-4 col-12 m-auto mt-5' >
                <div className="card-heading">Change Password</div>
                <div className="card-body">
                    <form className='row' onSubmit={handleSubmit}>
                        <div className="form-group mb-2 col-12">
                            <label htmlFor="">Old Password</label>
                            <input type="password" className="form-control" onChange={handleChange} name='oldPassword' />
                        </div>
                        <div className="form-group mb-2 col-12">
                            <label htmlFor="">New Password</label>
                            <input type="password" className="form-control" name="newPassword" onChange={handleChange} />
                        </div>
                        <div className="form-group mb-2  gap-4 row" style={{ margin: "12px 0" }}>
                            <input type="button" onClick={closeDialog} className="btn btn-outline-danger rounded-1 col-5" value="Close" />
                            <input type="submit" className="btn btn-success col-6 rounded-1" value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}