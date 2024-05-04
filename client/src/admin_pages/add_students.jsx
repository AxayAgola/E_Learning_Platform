import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


function add_students() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState([]);
  const navigate = useNavigate();

  const onSaveChanges = async (e) => {
    e.preventDefault();
    var isAccountCreationValid;

    await axios.post("http://127.0.0.1:3001/users/isaccountvalid", { email, password })
      .then((result) => {
        isAccountCreationValid = result.data.valid
      }).catch((err) => {
        isAccountCreationValid = false;
      });

    if (isAccountCreationValid) {
      const ImgFile = new FormData();
      ImgFile.append('ImgFile', file);

      var image = "";

      await axios.post("http://127.0.0.1:3001/files/uploadpic", ImgFile)
        .then(res => {
          image = "http://localhost:5173/images/uploads/" + res.data;
          alert(image);
        })
        .catch(err => {
          c_banner = "coming soon";
          alert(err);
        });

      var type = "student";

      axios.post("http://127.0.0.1:3001/users/signup", { name, email, password, image, type })
        .then(result => {
          alert("Account Created Successfully.");
          navigate("/");
        }).catch(err => console.log(err));
    }
    else {
      alert('Email is already registed with another account.');
    }
  };


  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="row">
        <div className="col-md">
          <h1>Add New Student</h1>
        </div>
        <div className="col-md text-end">
          <Link to="/Admin/ManageStudents" className="btn btn-secondary m-2">
            <i className='fa fa-close me-2'></i>
            Go back to Student's List</Link>
        </div>
      </div>
      <div className="card mt-3 mx-auto w-50 p-2">
        <div className="card-body">
          <div className="row">
            <p>Create New Student Account</p>
          </div>
          <div className="row">
            <div className="form-group mb-2">
              <label htmlFor="s_name">Name</label>
              <input type="text" id='s_name' value={name} onChange={(e) => { setName(e.target.value) }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_email">Email Address</label>
              <input type="email" id='s_email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_profilepic">Profile Picture</label>
              <input type="file" id='s_profilepic' onChange={(e) => { setFile(e.target.files[0]); }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_pass">Password</label>
              s            <input type="password" id='s_pass' value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2 mt-2">
              <button className='btn btn-primary w-100' onClick={onSaveChanges}>Create New Student Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default add_students