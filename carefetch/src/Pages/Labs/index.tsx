import React from 'react'
import Labs from '../../Modules/Labs';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';
import User from '../../Modules/User';
import { Link } from 'react-router-dom';

export default function Index() {
    const [labs, setLabs] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedLab, setSelectedLab] = React.useState({} as any);
    const [openEdit, setOpenEdit] = React.useState(false);
    React.useEffect(() => {
        fetchLabs()
    }, [])

    function openEditDialog(lab) {
        if (lab) {
            setSelectedLab(lab)
        }
        console.log(lab)
        setOpenEdit(true)
    }
    function closeDialogEdit() {
        setOpenEdit(false)
    }

    function openDialog() {
        setOpen(true)
    }
    function closeDialog() {
        setOpen(false)
    }
    function fetchLabs() {
        Labs.getAllLabs((response) => {
            if (response?.response?.status) {
                // toast.error("Something went wrong");
                return;
            }
            setLabs(response?.data);
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let data = {
            id: e?.target?.id?.value,
            name: e?.target?.name?.value,
            email: e?.target?.email?.value,
            password: e?.target?.password?.value,
            address: e?.target?.address?.value,
            phone: e?.target?.phone?.value,
            description: e?.target?.description?.value,
        }
        // console.log(data)
        // return;
        Labs.updateLab(data.id, data, (response) => {
            if (response?.status == 200) {
                toast.success("Lab Updated Successfully");
                closeDialog();
                fetchLabs();
            }
            else if (response?.response?.status == 400) {
                toast.error("Lab Already Exists")
                return;
            }
        })
        closeDialogEdit();
    }

    function searchLabs(e) {
        let value = e.target.value;
        if (value == "") {
            fetchLabs()
            return;
        }
        let filteredLabs = labs.filter((lab) => {
            return lab.Name.toLowerCase().includes(value.toLowerCase())
        })
        setLabs(filteredLabs);
    }
    function addLab(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let data = {
            name: e?.target?.name?.value,
            email: e?.target?.email?.value,
            password: e?.target?.password?.value,
            address: e?.target?.address?.value,
            phone: e?.target?.phone?.value,
            description: e?.target?.description?.value,
        }
        Labs.addLab(data, (response) => {
            if (response?.data && response?.status == 200) {
                fetchLabs();
                toast.success("Lab Added Successfully");
                closeDialog();
            }
            else if (response?.response?.status == 400) {
                toast.error("Lab Already Exists")
                return;
            }
        })

    }

    function deleteLab(id) {
        let check = confirm("Are you sure you want to delete this lab?");
        if (!check) return;
        Labs.deleteLab(id, (response) => {
            if (response.status == 200) {
                toast.success("Lab Deleted Successfully");
                fetchLabs();
            } else {
                toast.error("Something went wrong");
            }
        })
    }
    return (
        <>
            <div className='m-4'>
                <input type="text" placeholder="Search" onChange={searchLabs} className='form-control' />
                {User.getUser()?.UserType == "Admin" ? (
                    <button className='btn btn-primary my-4 rounded-1 d-flex justify-content-center align-items-center' onClick={openDialog}><BiPlusCircle style={{ fontSize: "18px" }} /> &nbsp;Add Lab</button>
                ) : null
                }
                <div className='row gap-4'>
                    {labs.length > 0 ? labs.map((lab, index) => (
                        <div className="col-12 col-md-3 card my-3" key={index}>
                            <div className='card-body'>
                                <h5 className='card-title'>{lab?.Name}</h5>
                                <p className='card-text my-0'>Contact Number : {lab?.ContactNumber}</p>
                                <p className='card-text my-0'>Email : {lab?.Email}</p>
                                <p className='card-text my-0'>Address : {lab?.Address}</p>
                                <p className='card-text my-0'>Description : {lab?.Description}</p>
                            </div>
                            {User.getUser()?.UserType != "Admin" ? (
                                <div className="card-footer">
                                    <Link to="/view-lab" state={lab} className='btn btn-outline-primary'>View</Link> &nbsp; &nbsp;
                                </div>
                            ) : null}
                            {
                                User.getUser()?.UserType == "Admin" ? (
                                    <div className="card-footer">
                                        <button className='btn btn-outline-primary' onClick={() => openEditDialog(lab)}>Edit</button> &nbsp; &nbsp;
                                        <button className='btn btn-outline-danger' onClick={() => deleteLab(lab?.UserID)}>Delete</button>
                                    </div>
                                ) : null
                            }
                        </div>
                    )) : null
                    }
                </div>
                {User.getUser()?.UserType == "Admin" ?
                    (
                        <>
                            <AddDialog open={open} closeDialog={closeDialog} addLab={addLab} />
                            <EditDialog open={openEdit} closeDialog={closeDialogEdit} labDetails={selectedLab} editLab={handleSubmit} />
                        </>
                    ) : null
                }
            </div>
        </>
    )
}

function EditDialog({ open, closeDialog, editLab, labDetails }: { open: Boolean, closeDialog: () => void, editLab: () => void, labDetails: any }) {
    return (
        <div className="modal position-fixed" style={{ display: open ? "block" : "none", background: "rgba(0,0,0,0.4)", inset: "0" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{"Edit Lab"}</h5>
                        <button type="button" className="btn-close" onClick={closeDialog}></button>
                    </div>
                    <div className="modal-body">
                        <form className='row' onSubmit={editLab}>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Lal Path Labs" defaultValue={labDetails?.Name} />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" name="email" placeholder='lalpathlabs@domain.com' disabled={true} defaultValue={labDetails?.Email} />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="text" className="form-control" id="password" name="password" placeholder='******' disabled={true} defaultValue={"*********"} />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" name="address" placeholder='Karan Nagar' defaultValue={labDetails?.Address} />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" name="phone" placeholder='8484852142' defaultValue={labDetails?.ContactNumber} />
                            </div>
                            <input type="hidden" name="id" value={labDetails?.UserID} />
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" placeholder='We are Specialized in giving the best Service.' defaultValue={labDetails?.Description} />
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className='btn btn-outline-danger me-2 rounded-1' onClick={closeDialog}>Close</button>
                                <button className='btn btn-primary rounded-1'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AddDialog({ open, closeDialog, addLab, from }: { open: Boolean, closeDialog: () => void, addLab?: (e: React.FormEvent<HTMLFormElement>) => void, from?: string }) {
    return (
        <div className="modal position-fixed" style={{ display: open ? "block" : "none", background: "rgba(0,0,0,0.4)", inset: "0" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{from == "add" ? "Add Lab" : "Edit Lab"}</h5>
                        <button type="button" className="btn-close" onClick={closeDialog}></button>
                    </div>
                    <div className="modal-body">
                        <form className='row' onSubmit={addLab}>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" placeholder="Lal Path Labs" />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="text" className="form-control" id="email" name="email" placeholder='lalpathlabs@domain.com' />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="text" className="form-control" id="password" name="password" placeholder='******' />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" name="address" placeholder='Karan Nagar' />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" name="phone" placeholder='8484852142' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" placeholder='We are Specialized in giving the best Service.' />
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className='btn btn-outline-danger me-2 rounded-1' onClick={closeDialog}>Close</button>
                                <button className='btn btn-primary rounded-1'>{"Add"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}