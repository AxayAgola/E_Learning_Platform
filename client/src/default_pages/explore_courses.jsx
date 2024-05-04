import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, json } from 'react-router-dom';

function explore_courses() {
  const [Course, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/courses/Published")
      .then((results) => setCourses(results.data))
      .catch((error) => console.log(error))
  });

  const filteredCourses = Course.filter(course =>
    course.c_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div class="container">
        <div class="row">
          <div class="col-lg-9  mt-3 mb-4">
            <h2 class="text-dark ml-2">
              Explore Courses
            </h2>
          </div>
          <div class="col-lg-3 mt-3 mb-4 d-inline text-right">
            <input type="text" class="form-control" placeholder="Search" value={searchQuery}  onChange={(e)=> setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>
      <div class="container">
        {
          filteredCourses.map((Course) => {
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
                      <i class="fa fa-user-alt text-primary me-2 my-3"></i>
                      By {Course.t_name}
                    </span>
                    <span class="text-truncate me-3">
                      <i class="far fa-user text-primary me-2"></i>
                      Students : {Course.students_enrolled}
                    </span>
                    <span class="text-truncate me-0">
                      <i class="fa fa-book text-primary me-2"></i>
                      Modules : {Course.num_of_modules}
                    </span>
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                  <div class="d-flex mb-3">
                  <Link to={`/ViewCourse/` + Course._id} class="btn btn-primary">
                    <i class="fa fa-book text-white me-2"></i>
                      View Course</Link>
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

export default explore_courses