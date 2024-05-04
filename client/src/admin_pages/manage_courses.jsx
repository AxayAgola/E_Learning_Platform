import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, json } from 'react-router-dom';

function manage_courses() {
    var i = 0;
    const [Course, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/courses/")
            .then((results) => setCourses(results.data))
            .catch((error) => console.log(error))
    });

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="row">
                <div className="col-md">
                    <h1>Course's List</h1>
                </div>
                <div className="col-md text-end">
                    <Link to="/Admin/AddCourse" className="btn btn-primary m-2">
                        <i className='fa fa-add me-2'></i>
                        Add New Course</Link>
                </div>
            </div>
            <div className="row py-4">
                <div className="col-md">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Course ID</th>
                                <th scope='col'>Course Image</th>
                                <th scope='col'>Course Name</th>
                                <th scope='col'>Teacher Name</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Manage Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Course.map((Course) => {
                                    return <tr key={Course._id}>
                                        <th scope='row'>{i+=1}</th>
                                        <td>{Course._id}</td>
                                        <td>
                                            <img src={Course.c_image} style={{width: "100px", height: "80px"}} />
                                        </td>
                                        <td>{Course.c_name}</td>
                                        <td>{Course.t_name}</td>
                                        <td>{Course.status}</td>
                                        <td>
                                            <Link to={`/Admin/ViewCourse/${Course._id}`} className='text-decoration-none'>Manage Course</Link>
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

export default manage_courses