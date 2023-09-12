import React from 'react'
import axios from 'axios'
export default function Signup() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, dateOfBirth } = e.target.elements;
        const data = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            dateOfBirth: dateOfBirth.value,
            userType: 'patient'
        }
        await axios.post("http://localhost:5500/register", data)
    }
    const handlePasswordChange = (e) => {
        const confirmPassword = e.target.value;
        const password = document.querySelector('input[name="password"]').value;
        if (password != confirmPassword) {
            e.target.setCustomValidity('Passwords do not match');
        } else {
            e.target.setCustomValidity('');
        }
    }
    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-12">
                    <div className="card border-0">
                        <form className="box" onSubmit={handleSubmit}>
                            <h1 className='text-center'>Sign Up</h1>
                            <p className="text-muted text-center"> Please fill in this form to create an account!</p>
                            <input type="text" name="name" placeholder="Username" className="px-3 py-2 rounded outline-none form-control my-1" />
                            <input type="email" name="email" placeholder="Email" className="px-3 py-2 rounded outline-none form-control my-1" />
                            <input type="password" name="password" placeholder="Password" className="px-3 py-2 rounded outline-none form-control my-1" />
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="px-3 py-2 rounded outline-none form-control my-1" onChange={handlePasswordChange} />
                            {/* minimum age should be 16 */}
                            <div className="my-2 mb-4">
                                <label htmlFor="dob"> Date of Birth</label>
                                <input type="date" max="2006-12-30" name="dateOfBirth" placeholder="Date of Birth" id="dob" className="px-3 py-2 d-block" />
                            </div>
                            <input type="submit" className="btn btn-success w-100" name="" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
//this is just a test