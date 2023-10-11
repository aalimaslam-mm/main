/* eslint-disable react/prop-types */
import React from 'react'
import Labs from '../../Modules/Labs';
import User from '../../Modules/User';
import { toast } from 'react-toastify';
export default function Index() {
    let [medicalTests, setMedicalTests] = React.useState([]);
    let [open, setOpen] = React.useState(false);
    let [changeReq, setChangeReq] = React.useState(true);
    React.useEffect(() => {
        fetchMedicalTests();
    }, []);
    function fetchMedicalTests() {
        Labs.getAllMedicalTests(User.getUser().LabID, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            } else if (response?.response?.status === 404) {
                return;
            }
            setMedicalTests(response.data);
        })
    }
    function toggleChangeReq(event, testId) {
        let inputs = event?.target?.parentElement?.parentElement?.querySelectorAll("input");
        setChangeReq(!changeReq);
        event.target.innerText = event.target.innerText === "Save" ? "Edit" : "Save";
        inputs.forEach((input) => {
            input.disabled = input.disabled ? false : true;
        })
        if (changeReq) return;
        let data = {
            name: inputs[0].value,
            cost: inputs[1].value,
            description: inputs[2].value
        }
        Labs.updateTest(testId, data, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            } else if (response?.response?.status === 404) {
                return;
            }
            fetchMedicalTests();
            toast.success("Test Updated Successfully");
        })

    }
    function openDialog() {
        setOpen(true)
    }
    function closeDialog() {
        setOpen(false);
    }
    function handleSubmit(e) {
        e.preventDefault();

        let name = e?.target?.TestName?.value;
        let cost = e?.target?.Cost?.value;
        let description = e?.target?.Description?.value;
        let data = {
            name,
            cost,
            description
        };
        let id = User.getUser().UserID;
        Labs.addMedicalTest(id, data, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            } else if (response?.response?.status === 404) {
                return;
            }
            fetchMedicalTests();
            closeDialog();
        })
    }

    function deleteTest(id) {
        let check = confirm("Are you sure you want to delete this test?");
        if (!check) return;
        Labs.deleteTest(id, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            } else if (response?.response?.status === 404) {
                return;
            }
            fetchMedicalTests();
            toast.success("Test Deleted Successfully");
        })
    }

    return (
        <>
            <div className='mx-4'>
                <div className='h3'>Tests</div>
                <div className="my-3">
                    <input type="search" className="form-control" placeholder="Search" />
                </div>
                <button className='btn btn-outline-info rounded-1 mt-2' onClick={openDialog}>Add a Test</button>
                <div className='my-4'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th>Cost</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                medicalTests?.length > 0 ? medicalTests?.map((test, index) => (
                                    <tr key={index}>
                                        <td><input data-key={test?.TestID} type="text" disabled={true} defaultValue={test?.Name} className='form-control' name="name" /></td>
                                        <td><input data-key={test?.TestID} type="number" disabled={true} defaultValue={test?.Cost} className='form-control' name="cost" /></td>
                                        <td><input data-key={test?.TestID} type='text' disabled={true} defaultValue={test?.Description} className='form-control' name="description" /></td>
                                        <td>
                                            <button type="submit" className='btn btn-outline-info rounded-1 me-2' onClick={(e) => toggleChangeReq(e, test.TestID)}>Edit</button>
                                            <button className='btn btn-outline-danger rounded-1' onClick={() => deleteTest(test.TestID)}>Delete</button>
                                        </td>
                                    </tr>
                                )) : <tr><td colSpan='4' className='text-center'>No Tests Found</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <AddDialog open={open} closeDialog={closeDialog} handleSubmit={handleSubmit} />
        </>
    )
}

function AddDialog({ open, closeDialog, handleSubmit }) {
    return (
        <div className='modal' style={{ display: open ? "block" : "none", background: "rgba(0,0,0,0.3)", }}>

            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='modal-title'>Add a Test</div>
                        <button className='btn btn-outline-danger rounded-1' onClick={closeDialog}>X</button>
                    </div>
                    <div className='modal-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="TestName">Test Name</label>
                                <input type="text" className="form-control" id="TestName" required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="Cost">Cost</label>
                                <input type="number" className="form-control" id="Cost" required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="Description">Description</label>
                                <input type="text" className="form-control" id="Description" />
                            </div>
                            <div className='form-group'>
                                <button type="button" className='btn btn-outline-danger rounded-1' onClick={closeDialog}>Close</button>
                                <button type='submit' className='btn btn-outline-info rounded-1'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}