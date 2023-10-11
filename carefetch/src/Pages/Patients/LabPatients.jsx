import React from "react";
import Labs from "../../Modules/Labs";
import User from "../../Modules/User";
function LabPatients() {
    let [patients, setPatients] = React.useState([])
    React.useEffect(() => {
        Labs.getPatients(User.getUser().UserID, (response) => {
            if (response?.response?.status === 401) {
                window.location.reload();
            } else if (response?.response?.status === 404) {
                return;
            }
            setPatients(response.data)
        })
    })
    return (
        <>
            <h4>Patients</h4>
            <div className="my-4 d-flex justify-content-between flex-wrap">
                {
                    patients?.length > 0 ? patients?.map((patient, index) => (
                        <div className="card col-md-3 col-12" key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{patient?.name}</h5>
                                <small className="card-subtitle mb-2 text-muted">{patient?.Gender}</small>
                                <h6 className="card-subtitle mb-2 text-muted">{patient?.age}</h6>
                                <p className="card-text">{patient?.Address}</p>
                                <p className="card-text">{patient?.ContactNumber}</p>
                            </div>
                        </div>
                    )) : <h1>No Patients Found</h1>
                }
            </div>
        </>
    )
}

export default LabPatients