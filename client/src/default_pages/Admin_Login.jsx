import { React, useState } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js'

const AdminLogin = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:3001/admin/login", { email, password })
            .then(res => {
                if(res.data == null || res.data == undefined)
                {
                    alert("Invaid username or password");
                }
                else
                {
                    console.log(res.data.type);
                    if(res.data.type == "admin")
                    {
                        localStorage.setItem('sessionData', CryptoJS.AES.encrypt(JSON.stringify(res.data), import.meta.env.VITE_SECRET_KEY).toString());
                        alert("Welcome to ELS Admin");
                        navigate("/Admin/");
                    }
                    else
                    {
                        alert("Access denied");
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className='h-100 bg-light py-3 px-4 mb-5'>
            <div className="card mt-3 mx-auto w-50 p-2 pb-0">
                <div className="card-body">
                    <hr className='mt-0' />
                    <div className="row">
                        <h2 className="py-3 text-center">
                            <i className='fa fa-user me-3'></i>
                            ELS Admin Login</h2>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="form-group mb-2">
                            <label htmlFor="s_email">Email Address</label>
                            <input type="email" id='s_email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_pass">Password</label>
                            <input type="password" id='s_pass' value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2 mt-2">
                            <button className='btn btn-primary w-100' onClick={login}>Sign In</button>
                        </div>
                        <div className="form-group mt-2">
                            <p>Don't have a account? <Link to={"/Signup"} className='text-decoration-none'>Create Account</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
