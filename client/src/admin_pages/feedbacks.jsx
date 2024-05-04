import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, json } from 'react-router-dom';

function feedback() {
    var i = 0;
    const [feedback, setfeedbacks] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/feedback/")
            .then((results) => setfeedbacks(results.data))
            .catch((error) => console.log(error))
    });

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="row">
                <div className="col-md">
                    <h1>View Feedbacks</h1>
                </div>
            </div>
            <div className="row py-4">
                <div className="col-md">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Feedback ID</th>
                                <th scope='col'>User Email</th>
                                <th scope='col'>User ID</th>
                                <th scope='col'>Manage Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                feedback.map((feedback) => {
                                    return <tr key={feedback._id}>
                                        <th scope='row'>{i+=1}</th>
                                        <td>{feedback._id}</td>
                                        <td>{feedback.u_email}</td>
                                        <td>{feedback.u_id}</td>
                                        <td>
                                            <Link to={`/Admin/ManageFeedbacks/${feedback._id}`} className='text-decoration-none'>Manage Feedback</Link>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default feedback