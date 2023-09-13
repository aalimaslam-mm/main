import axios from 'axios';
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"
export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        const data = {
            email: email.value,
            password: password.value,
        }
        try {
            let response = await axios.post("http://localhost:5500/login", data);
            if (response.status === 200) {
                toast.success("Login Successfull")
            } else {
                console.log(response)
                toast.error("Login Failed")
            }
        } catch (e) {
            toast.error(e.response.data)
        }
    }
    return (
        <div id="bg-login">
            <div className="container my-5 p-4">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-12">
                        <div className="card border-0 p-4" id="login-card">
                            <form className="box" onSubmit={handleSubmit}>
                                <h1 className='text-center'>Login</h1>
                                <p className="text-muted text-center"> Please fill in this form to login!</p>
                                <input type="email" name="email" placeholder="Email" className="px-3 py-2 rounded outline-none form-control my-1" />
                                <input type="password" name="password" placeholder="Password" className="px-3 py-2 rounded outline-none form-control my-1" />
                                <input type="submit" className="btn btn-success w-100 mt-4" name="" value="Login" />
                            </form>
                            <div className='my-4 d-flex'>
                                <p className="text-center mx-1">Don&apos;t have an account? </p>
                                <Link to="/register">Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
