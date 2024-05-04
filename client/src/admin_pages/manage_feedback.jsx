import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


function manage_feedback() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [feedback, setfeedback] = useState({});
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/feedback/getfeedback/` + id)
        .then((result) => {
            setfeedback(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const onDelete = (e) => {
        e.preventDefault();
        console.log("Delete");
        axios.delete(`http://127.0.0.1:3001/feedback/deletefeedback/` + id)
        .then((result) => {
            if(result.data.valid){
                alert("Record Deleted Successfully.");
                navigate("/Admin/");
            }else{
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
                    <Link to="/Admin/Feedbacks" className="btn btn-secondary m-2">
                        <i className='fa fa-close me-2'></i>
                        Go Back To Home Page</Link>
                </div>
            </div>
            <div className="card mt-3 mx-auto w-75 p-2">
                <div className="card-body">
                    <div className="row">
                        <p>Student ID : {feedback.u_id}</p>
                        <p>Student Email : {feedback.u_email}</p>
                    </div>
                    <div className="row">
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Feeback</label>
                            <textarea name="txtFeedback" id="txtFeedback" value={feedback.feedback} className='form-control my-2' cols="30" rows="10"></textarea>
                        </div>
                        <div className="form-group mb-2 mt-2">
                            <button className='btn btn-danger w-100' onClick={onDelete}>Delete Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default manage_feedback