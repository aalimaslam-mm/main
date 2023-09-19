/* eslint-disable react/prop-types */

function Dialog({ open, onClose, user, handleChange, handleSubmit, disabled }) {
    return (
        <div style={{ width: "50%", height: "60%", display: open ? "block" : "none", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: '2px 2px 10px rgba(0,0,0,0.2)' }} className='rounded'>
            <div style={{ width: "100%", height: "100%", background: "white", borderRadius: "1rem", padding: "1rem" }}>
                <div className="d-flex justify-content-end">
                    <button onClick={onClose} className="btn btn-danger">X</button>
                </div>
                <div>
                    <form action="" className='row' onSubmit={handleSubmit}>
                        <div className="form-group mb-2 col-md-6 col-12">
                            <label htmlFor="">Username</label>
                            <input type="text" name="Username" className="form-control" minLength={4} defaultValue={user?.Username} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-2 col-md-6 col-12">
                            <label htmlFor="">Email</label>
                            <input type="email" name="Email" className="form-control" defaultValue={user?.Email} disabled />
                        </div>
                        <div className="form-group mb-2 col-md-6 col-12">
                            <label htmlFor="ContactNumber">Contact Number</label>
                            <input type="number" name="ContactNumber" maxLength={12} minLength={10} className="form-control" defaultValue={user?.ContactNumber} onChange={handleChange} />
                        </div>
                        {user.UserType == "patient" ? (
                            <div className="form-group mb-2 col-md-6 col-12">
                                <label htmlFor="">DOB</label>
                                <input type="date" name="DateOfBirth" max="2005-12-30" className="form-control" defaultValue={user?.DateOfBirth?.split("T")[0]} onChange={handleChange} />
                            </div>

                        ) : null}
                        <div className="form-group mb-2 col-md-6 col-12">
                            <label htmlFor="">Gender</label>
                            <select name="Gender" className='form-control' onChange={handleChange}>
                                <option disabled defaultChecked>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="">Address</label>
                            <textarea name="Address" className="form-control" defaultValue={user?.Address} onChange={handleChange} />
                        </div>
                        {user?.UserType?.toLowerCase() == "hospital" || user?.UserType?.toLowerCase() == "lab" ? (
                            <div className="form-group mb-2">
                                <label htmlFor="">Description</label>
                                <textarea name="Description" className="form-control" defaultValue={user?.Description} onChange={handleChange} />
                            </div>
                        ) : null}
                        <div className="form-group mb-2">
                            <input type="submit" className="btn btn-success w-100" value="Update" disabled={disabled} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dialog