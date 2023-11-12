import React from 'react'
import Auth from '../../Modules/Auth';

export default function Index() {
    let [email, setEmail] = React.useState("")

    const handleSubmit = () => {
        Auth.forgotPassword(email);
    }


    return (
        <div className='d-flex flex-column  w-50 m-auto mt-5' >
            <h1>Forgot Password</h1>
            <div className="form-group d-flex flex-column gap-2 mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <div className="form-text">You'll recieve a mail on this email address</div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Reset Password</button>
        </div>
    )
}