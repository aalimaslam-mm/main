import React from "react";
import UserModule from "../../Modules/User";
import { Link } from "react-router-dom";
function User() {
    let [users, setUsers] = React.useState([])
    React.useEffect(() => {
        UserModule.getAllUsers((response) => {
            setUsers(response.data)
        });
    }, []);
    return (
        <div className="container-fluid">
            <div className='my-5'>

                <h1>Users</h1>
                <div className="row my-4">
                    {users && users.map((user, index) => {
                        return (
                            <Link to={`/solo-users`} state={user} className="col-md-3 col-12" key={index} style={{ textDecoration: "none" }}>
                                <div className="" key={index}>
                                    <div className="card p-4 text-center" style={{ background: "rgba(150, 100,255,0.2)" }}>
                                        <div className="fw-bold py-2">{user.userType}</div>
                                        <div className="card-title">{user.username}</div>
                                        <div className="card-title">{user.email}</div>
                                        <div className="card-title">{user.userId}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default User;