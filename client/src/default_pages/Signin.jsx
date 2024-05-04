import { React, useEffect, useState } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:3001/users/login", { email, password })
            .then(res => {
                console.log(res);
                if(res.data == null || res.data == undefined || res.data == {})
                {
                    alert("Invalid Username or Password.");
                }
                else
                {
                alert(
                    res != null || res.data != {} || res.data != undefined
                    ? `Welcome to E-Learning Platform : ${res.data.email}`
                    : "Invalid Username or Password.");
                localStorage.setItem('sessionData', CryptoJS.AES.encrypt(JSON.stringify(res.data), import.meta.env.VITE_SECRET_KEY).toString());
                res.data != null || res.data != {} ||res.data != undefined
                    ? res.data.type == "teacher"
                      ? navigate("/Teacher/")
                      : navigate("/Student/" + res.data.name)
                    : {}
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="card mt-3 mx-auto w-50 p-2 pb-0">
                <div className="card-body">
                    <div className="row">
                        <h2 className="py-3">Login</h2>
                    </div>
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

export default SignIn;
