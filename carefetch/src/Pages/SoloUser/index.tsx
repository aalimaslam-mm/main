import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs';
import User from '../../Modules/User';
import { toast } from 'react-toastify';

export default function Index() {
    const location = useLocation();
    const navigate = useNavigate();
    // let [open, setOpen] = React.useState(false)

    // function openDialog() {
    //     setOpen(true);
    // }

    function deleteUser() {
        let check = confirm("Are you sure you want to delete this user?")
        if (!check) return;
        User.deleteUserById(location?.state?.UserID, (response: any) => {
            if (response) {
                toast.success("User Deleted Successfully");
                navigate('/users');
            }
        }
        )
    }


    return (
        <div className='m-4'>
            <h2>Username : {location?.state?.Username}</h2>
            <p>Email : {location?.state?.Email}</p>
            <p>User ID : {location?.state?.UserID}</p>
            <p>User Type : {location?.state?.UserType}</p>
            <div className='flex gap-4 w-100'>
                {/* <button className="btn btn-primary me-4" onClick={openDialog}>Edit</button> */}
                <button className="btn btn-danger flex align-items-center justify-content-center" onClick={deleteUser}><BsTrash /> Delete</button>
            </div>
            {/* <Dialog open={open} closeDialog={() => setOpen(false)} /> */}
        </div>
    )
}

// function Dialog({ open, closeDialog }: { open: boolean, closeDialog: () => void }) {
//     return (
//         <div className='modal position-fixed' style={{ display: open ? "block" : "none", inset: "0", background: "rgba(0,0,0,0.4)" }} >
//             <div className='modal-dialog modal-dialog-centered'>
//                 <div className='modal-content'>
//                     <div className='modal-header'>
//                         <h5 className='modal-title'>Edit User</h5>
//                         <button className='btn-close' onClick={closeDialog}></button>
//                     </div>
//                     <div className='modal-body'>
//                         <form>
//                             <div className='mb-3'>
//                                 <label className='form-label'>Username</label>
//                                 <input type='text' className='form-control' />
//                             </div>
//                             <div className='mb-3'>
//                                 <label className='form-label'>Email</label>
//                                 <input type='email' className='form-control' />
//                             </div>
//                             <div className='mb-3'>
//                                 <label className='form-label'>User ID</label>
//                                 <input type='text' className='form-control' />
//                             </div>
//                             <div className='mb-3'>
//                                 <label className='form-label'>User Type</label>
//                                 <input type='text' className='form-control' />
//                             </div>
//                         </form>
//                     </div>
//                     <div className='modal-footer'>
//                         <button className='btn btn-primary'>Save</button>
//                         <button className='btn btn-secondary' onClick={closeDialog}>Close</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )

// }