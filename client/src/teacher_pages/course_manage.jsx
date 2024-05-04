import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, json } from 'react-router-dom';
import CryptoJS from 'crypto-js'

function course_manage() {
  var i = 0;
  const [Course, setCourses] = useState([]);
  const [tid, setTid] = useState(0);

  useEffect(() => {
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const userobj = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    const user = userobj._id;
    axios.get("http://127.0.0.1:3001/courses/getteachercourse/"+ user)
      .then((results) => setCourses(results.data))
      .catch((error) => console.log(error))
  });

  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div class="container">
        <div class="row">
          <div class="col-lg-9  mt-3 mb-4">
            <h2 class="text-dark ml-2">
              Course managed by you
            </h2>
          </div>
          <div class="col-lg-3 mt-3 mb-4 d-inline text-right">
            <input type="text" class="form-control" placeholder="Search" />
          </div>
        </div>
      </div>
      <div class="container">
        {
          Course.map((Course) => {
            return <div class="card p-4 py-2 mb-4">
              <div class="row g-4">
                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                  <img class="flex-shrink-0 img-fluid border rounded my-2" src={Course.c_image} alt="abcd" style={{width: "150px", height: "120px"}}/>
                  <div class="text-start ps-4">
                    <h4 class="mb-1">{Course.c_name}</h4>
                  <small class="text-truncate">
                    Course ID : {Course._id}
                  </small>
                  <br></br>
                    <span class="text-truncate me-3">
                      <i class="fas fa-shield-alt text-primary me-2 my-3"></i>
                      {Course.status}
                    </span>
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                  <div class="d-flex mb-3">
                  <Link to={`/Teacher/ViewCourse/` + Course._id} class="btn btn-primary">
                    <i class="fa fa-book text-white me-2"></i>
                      View Course</Link>
                  </div>
                  <div class="d-flex mb-3">
                  <Link to={`/Teacher/ManageCourse/` + Course._id} class="btn btn-danger">
                    <i class="fa fa-edit text-white me-2"></i>
                      Manage Course</Link>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default course_manage