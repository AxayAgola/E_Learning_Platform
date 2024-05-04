import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function edit_courses() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [c_desc, setCdesc] = useState();
  const [t_id, setTid] = useState();
  const [t_name, setTname] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/courses/getcourse/" + id)
      .then(result => {
        setName(result.data.c_name);
        setCdesc(result.data.c_desc);
        setTid(result.data.t_id);
        setTname(result.data.t_name);
        setStatus(result.data.status);
      })
      .catch(err => console.log(err))
  }, []);

  const onSaveChanges = (e) => {
    e.preventDefault();
    axios.put("http://127.0.0.1:3001/courses/updatecourse/" + id, { name, c_desc, t_id, t_name, status })
      .then(res => {
        console.log(res);
        alert("Record Updated Successfully.");
        navigate(`/Admin/ViewCourse/` + id);
      })
      .catch(err => {
        alert(err);
      });
  };

  const onDelete = (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this course?")) {
      console.log("Working");
      axios.delete("http://127.0.0.1:3001/courses/deletecourse/" + id)
        .then(res => {
          console.log(res);
          alert("Record Deleted Successfully.");
          navigate(`/Admin/ManageCourses/`);
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
          <h1>Edit Course Details</h1>
        </div>
        <div className="col-md text-end">
          <Link to={`/Admin/ViewCourse/` + id} className="btn btn-secondary m-2">
            <i className='fa fa-close me-2'></i>
            Go Back To Course Details</Link>
        </div>
      </div>
      <div className="card mt-3 mx-auto w-50 p-2">
        <div className="card-body">
          <div className="row">
            <p>Courses ID : {id}</p>
          </div>
          <div className="row">
            <div className="form-group mb-2">
              <label htmlFor="s_name">Course Name</label>
              <input type="text" id='s_name' value={name} onChange={(e) => { setName(e.target.value) }} className='form-control my-2' />
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
              <button className='btn btn-primary w-100' onClick={onSaveChanges}>Save Courses Details</button>
              <button className='btn btn-danger w-100 mt-3' onClick={onDelete}>
                <i className='fa fa-close me-2'></i>
                Delete Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default edit_courses