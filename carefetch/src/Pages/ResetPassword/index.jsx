import React from "react";
import Auth from "../../Modules/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Index() {
    let navigate = useNavigate();
    let token = window?.location?.search?.split('=')[1];
    let [password, setPassword] = React.useState("");
    let [confirmPassword, setConfirmPassword] = React.useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match")
            return;
        }
        Auth.resetPassword({ password, token });
        navigate("/login");
    }

    React.useEffect(() => {
        if (!token || token === "" || token === undefined || token === null || typeof token !== "string" || token.length < 10) {
            // alert("Invalid Token")
            // toast.error("Invalid Token");
            navigate("/login");
        }
        // Auth.resetPassword({ password, token })
    }, [])
    return (
        <div className='d-flex justify-content-center align-items-center flex-column gap-1' style={{ height: '80vh' }}>
            <h1>Reset Password</h1>
            {/* <p>Token: {token}</p> */}
            <form action="" onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
