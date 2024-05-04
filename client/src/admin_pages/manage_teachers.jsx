import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, json } from 'react-router-dom';

function manage_teachers() {
    var i = 0;
    const [teacher, setTeachers] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/users/teacher")
            .then((results) => setTeachers(results.data))
            .catch((error) => console.log(error))
    });

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="row">
                <div className="col-md">
                    <h1>Teacher's List</h1>
                </div>
                <div className="col-md text-end">
                    <Link to="/Admin/AddTeacher" className="btn btn-primary m-2">
                        <i className='fa fa-add me-2'></i>
                        Add New Teacher</Link>
                </div>
            </div>
            <div className="row py-4">
                <div className="col-md">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Teacher ID</th>
                                <th scope='col'>Teacher Image</th>
                                <th scope='col'>Teacher Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Course Published</th>
                                <th scope='col'>Edit Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                teacher.map((teacher) => {
                                    return <tr key={teacher._id}>
                                        <th scope='row'>{i+=1}</th>
                                        <td>{teacher._id}</td>
                                        <td>
                                            <img src={teacher.image} style={{width: "80px", height: "80px"}} />
                                        </td>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>
                                            <Link to={`/Admin/EditTeachers/${teacher._id}`} className='text-decoration-none'>View Course List</Link> 
                                        </td>
                                        <td>
                                            <Link to={`/Admin/EditTeachers/${teacher._id}`} className='text-decoration-none'>Edit Teacher's Details</Link>
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

export default manage_teachers