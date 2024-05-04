import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, json } from 'react-router-dom';

function manage_students() {
    var i = 0;
    const [student, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/users/student")
            .then((results) => setStudents(results.data))
            .catch((error) => console.log(error))
    });

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="row">
                <div className="col-md">
                    <h1>Student's List</h1>
                </div>
                <div className="col-md text-end">
                    <Link to="/Admin/AddStudent" className="btn btn-primary m-2">
                        <i className='fa fa-add me-2'></i>
                        Add New Student</Link>
                </div>
            </div>
            <div className="row py-4">
                <div className="col-md">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Student ID</th>
                                <th scope='col'>Student Image</th>
                                <th scope='col'>Student Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Edit Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                student.map((student) => {
                                    return <tr key={student._id}>
                                        <th scope='row'>{i+=1}</th>
                                        <td>{student._id}</td>
                                        <td>
                                            <img src={student.image} style={{width: "80px", height: "80px"}} />
                                        </td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>
                                            <Link to={`/Admin/EditStudents/${student._id}`} className='text-decoration-none'>Edit Student Details</Link>
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

export default manage_students