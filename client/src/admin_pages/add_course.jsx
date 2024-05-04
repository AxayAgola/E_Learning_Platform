import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import CryptoJS from 'crypto-js'


function add_course() {
  const [c_name, setCname] = useState();
  const [t_id, setTid] = useState();
  const [t_name, setTname] = useState();
  const [c_desc, setCdesc] = useState();
  const [status, setStatus] = useState("Published");
  const [file, setFile] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));    setTid(user.id);
    setTname(user.email);
  },[]);

  const onSaveChanges = async (e) => {
    e.preventDefault();
    const ImgFile = new FormData();
    ImgFile.append('ImgFile', file);

    var c_banner = "";

    await axios.post("http://127.0.0.1:3001/files/uploadpic", ImgFile)
      .then(res => {
        c_banner = "http://localhost:5173/images/uploads/" + res.data;
        alert(c_banner);
      })
      .catch(err => {
        c_banner = "coming soon";
        alert(err);
      });

    axios.post("http://127.0.0.1:3001/courses/createcourse", { c_name, c_banner, c_desc, t_id, t_name, status })
      .then(res => {
        console.log(res);
        alert('Course created successfully');
        navigate("/Admin/ManageCourses");
      })
      .catch(err => {
        alert(err);
      });
  };


  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="row">
        <div className="col-md">
          <h1>Add New Course</h1>
        </div>
        <div className="col-md text-end">
          <Link to="/Admin/Managecourse" className="btn btn-secondary m-2">
            <i className='fa fa-close me-2'></i>
            Go back to Course's List</Link>
        </div>
      </div>
      <div className="card mt-3 mx-auto w-50 p-2">
        <div className="card-body">
          <div className="row">
            <p>Create New Course</p>
          </div>
          <div className="row">
            <div className="form-group mb-2">
              <label htmlFor="s_name">Course Name</label>
              <input type="text" id='s_name' value={c_name} onChange={(e) => { setCname(e.target.value) }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_email">Course Banner</label>
              <input type="file" id='s_profilepic' onChange={(e) => { setFile(e.target.files[0]); }} className='form-control my-2' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_name">Course Description</label>
              <input type="text" id='s_name' value={c_desc} onChange={(e) => { setCdesc(e.target.value) }} className='form-control my-2 p-3' placeholder='Write about your course in 200 words.' />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="s_name">Status</label>
              <select id='s_name' value={status} onChange={(e) => { setStatus(e.target.value) }} className='form-select my-2'>
                <option value={"Published"}>Published</option>
                <option value={"Unpublished"}>Unpublished</option>
              </select>
            </div>
            <div className="form-group mb-2 mt-2">
              <button className='btn btn-primary w-100' onClick={onSaveChanges}>Create New Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default add_course