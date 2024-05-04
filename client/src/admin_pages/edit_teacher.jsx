import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function edit_teachers() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/users/getuser/" + id)
      .then(result => {
        setName(result.data.name);
        setEmail(result.data.email);
        setPassword(result.data.password);
      })
      .catch(err => console.log(err))
  }, []);

  const onSaveChanges = (e) => {
    e.preventDefault();
    
    axios.put("http://127.0.0.1:3001/users/updateuser/" + id, { name, email, password})
      .then((res) => {
          if(res.data.valid == false)
          {
            alert('Email is already linked to another account');
          }
          else
          {
            alert("Record Updated Successfullly.");
            navigate("/Admin/ManageTeachers");
          }
        })
      .catch(err => {
        alert(err);
      });
  };

  const onDelete = (e) => {
    e.preventDefault();

    if(confirm("Are you sure you want to delete this record?"))
    {
      console.log("Working");
      axios.delete("http://127.0.0.1:3001/users/deleteuser/" + id)
      .then(res => {
        console.log(res);
        alert("Record Deleted Successfully.");
        navigate("/Admin/ManageTeachers");
      })
      .catch(err => {
        alert(err)
      })
    }
  }

  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="row">
        <div className="col-md">
          <h1>Edit Teacher Record</h1>
        </div>
        <div className="col-md text-end">
          <Link to="/Admin/ManageTeachers" className="btn btn-secondary m-2">
            <i className='fa fa-close me-2'></i>
            Go Back To Teachers List</Link>
        </div>
      </div>
      <div className="card mt-3 mx-auto w-50 p-2">
        <div className="card-body">
          <div className="row">
            <p>Teacher ID : {id}</p>
          </div>
          <div className="row">
          <div className="form-group mb-2">
              <label htmlFor="s_name">Full Name</label>
              <input type="text" id='s_name' value={name} onChange={(e) => { setName(e.target.value) }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_email">Email Address</label>
              <input type="email" id='s_email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_pass">Password</label>
              <input type="password" id='s_pass' value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2 mt-2">
              <button className='btn btn-primary w-100' onClick={onSaveChanges}>Save Teacher Details</button>
              <button className='btn btn-danger w-100 mt-3' onClick={onDelete}>
                <i className='fa fa-close me-2'></i>
                Delete Teacher Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default edit_teachers