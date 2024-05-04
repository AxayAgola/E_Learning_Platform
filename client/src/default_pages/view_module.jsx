import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function view_module() {
  const { id } = useParams();
  const [m_name, setMname] = useState();
  const [m_content, setMcontent] = useState();
  const [c_id, setCid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/cmodule/getmoduledetail/" + id)
      .then(result => {
        setMname(result.data.m_name);
        setMcontent(result.data.m_content);
        setCid(result.data.c_id);
      })
      .catch(err => {
        alert(err);
      });
  }, []);


  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="container">
        <div className="row">
          <div className="col-md">
            <h1>Module : {m_name}</h1>
          </div>
          <div className="col-md text-end">
            <Link to={`/ViewCourse/` + c_id} className="btn btn-secondary m-2">
              <i className='fa fa-close me-2'></i>
              Go back to Course Details</Link>
          </div>
        </div>
        <div className="row my-2">
          <p>
            {
              m_content
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default view_module