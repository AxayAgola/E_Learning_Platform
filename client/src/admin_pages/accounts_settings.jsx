import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import CryptoJS from 'crypto-js'

function account_settings() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
        const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
        setName(user.name);
        setPassword(user.password);
        setUser(user);
    }, []);

    const onSaveChanges = (e) => {
        e.preventDefault();
        axios.put("http://127.0.0.1:3001/admin/update/" + user._id, { name, password })
            .then(res => {
                console.log(res);
                alert("Record Updated Successfully.");
                const u_user = user;
                u_user.name = name;
                u_user.password = password; 
                localStorage.setItem('sessionData', CryptoJS.AES.encrypt(JSON.stringify(u_user), import.meta.env.VITE_SECRET_KEY));
                navigate("/Admin/");
            })
            .catch(err => {
                alert(err);
            });
    };

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="row">
                <div className="col-md">
                    <h1>Account Settings</h1>
                </div>
                <div className="col-md text-end">
                    <Link to="/Admin/" className="btn btn-secondary m-2">
                        <i className='fa fa-close me-2'></i>
                        Go Back To Home Page</Link>
                </div>
            </div>
            <div className="card mt-3 mx-auto w-50 p-2">
                <div className="card-body">
                    <div className="row">
                        <p>Account ID : {user._id}</p>
                    </div>
                    <div className="row">
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Full Name</label>
                            <input type="text" id='s_name' value={name} onChange={(e) => { setName(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_pass">Password</label>
                            <input type="password" id='s_pass' value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2 mt-2">
                            <button className='btn btn-primary w-100' onClick={onSaveChanges}>Save Account Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default account_settings