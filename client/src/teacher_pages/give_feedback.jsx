import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import CryptoJS from 'crypto-js'


function give_feedback() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [feedback, setFeedback] = useState();

    useEffect(() => {
        const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
        const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
        setUser(user);
    }, []);

    const onSubmitFeedback = (e) => {
        e.preventDefault();
        const uid = user._id;
        const uemail = user.email; 
        axios.post("http://127.0.0.1:3001/feedback/insertfeedback/", { uid, uemail, feedback })
            .then((result) => {
                if (result.data.valid) {
                    navigate("/Teacher/");
                    alert("Thanks for submitting your feedback");
                }
                else {
                    alert("Something went wrong.");
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="row">
                <div className="col-md">
                    <h1> <i className='fa fa-messsage me-2'></i>  Give Feedback</h1>
                </div>
                <div className="col-md text-end">
                    <Link to="/Teacher/" className="btn btn-secondary m-2">
                        <i className='fa fa-close me-2'></i>
                        Go Back To Home Page</Link>
                </div>
            </div>
            <div className="card mt-3 mx-auto w-75 p-2">
                <div className="card-body">
                    <div className="row">
                        <p>Student ID : {user._id}</p>
                        <p>Student Email : {user.email}</p>
                    </div>
                    <div className="row">
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Feeback</label>
                            <textarea name="txtFeedback" id="txtFeedback" onChange={(e) => { setFeedback(e.target.value) }} className='form-control my-2' cols="30" rows="10"></textarea>
                        </div>
                        <div className="form-group mb-2 mt-2">
                            <button className='btn btn-primary w-100' onClick={onSubmitFeedback}>Submit Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default give_feedback