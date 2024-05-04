import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, json } from 'react-router-dom';

function home() {
  var i = 0;
  const [Course, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/courses/Published")
      .then((results) => setCourses(results.data))
      .catch((error) => console.log(error))
  });

  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div class="container">
        <div class="row">
          <div class="col-lg-9  mt-3 mb-4">
            <h2 class="text-dark ml-2">
              Suggested for you
            </h2>
          </div>
        </div>
      </div>
      <div class="container">
        {
          Course.map((Course, index) => {
            if (index <= 4) {
              return <div class="card p-4 py-2 mb-4">
                <div class="row g-4">
                  <div class="col-sm-12 col-md-8 d-flex align-items-center">
                    <img class="flex-shrink-0 img-fluid border rounded my-2" src={Course.c_image} alt="abcd" style={{ width: "150px", height: "120px" }} />
                    <div class="text-start ps-4">
                      <h4 class="mb-1">{Course.c_name}</h4>
                      <small class="text-truncate">
                        Course ID : {Course._id}
                      </small>
                      <br></br>
                      <span class="text-truncate me-3">
                        <i class="fa fa-user-alt text-primary me-2 my-3"></i>
                        By {Course.t_name}
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div class="d-flex mb-3">
                      <Link to={`/Student/ViewCourse/` + Course._id} class="btn btn-primary">
                        <i class="fa fa-book text-white me-2"></i>
                        View Course</Link>
                    </div>
                  </div>
                </div>
              </div>
            }
          })
        }
      </div>
    </div>
  )
}

export default home