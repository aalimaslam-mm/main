import React from 'react'
import Doctors from '../../Modules/Doctors'
import { Card } from '../Hospitals'

export default function Index() {
    let [doctors, setDoctors] = React.useState([])
    React.useEffect(() => {
        Doctors.getAllDoctors((response) => {
            if (response?.data?.toLowerCase() == "no doctors found") {
                setDoctors([]);
                return;
            }
            setDoctors(response?.data)
        })
    }, [])

    return (
        <div className='p-4'>
            <div className='row'>
                {/* <div className='col-5 col-md-3'>
                    <button className='btn btn-outline-primary px-5 rounded-1'>Filter</button>
                </div> */}
                <div className='col-12 p-4 rounded-2 bg-primary'>
                    <input type="text" id="search" placeholder='Search by Name | Speciality' className='form-control my-0 rounded-' />
                </div>
            </div>
            <div className='row mt-5'>
                {
                    doctors.length > 0 ? (
                        doctors.map((data, index) => {
                            return <Card data={data} key={index} />
                        })
                    ) : (
                        <div className='col-12'>
                            <div className="alert alert-danger">No Doctors Found</div>
                        </div>
                    )

                }
            </div>
        </div>
    )
}
