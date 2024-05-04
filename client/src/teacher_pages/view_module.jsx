import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function view_module() {
  const { id } = useParams();
  const [m_name, setMname] = useState();
  const [m_content, setMcontent] = useState();
  const [c_id, setCid] = useState();
  const [m_video, setMvideo] = useState("NULL");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/cmodule/getmoduledetail/" + id)
      .then(async (result) => {
        setMname(result.data.m_name);
        setMcontent(result.data.m_content);
        setCid(result.data.c_id);
        await setMvideo(result.data.m_video);
        console.log(m_video);
      })
      .catch(err => {
        alert(err);
      });
  }, []);


  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="row">
        <div className="col-md">
          <h1>Module : {m_name}</h1>
        </div>
        <div className="col-md text-end">
          <Link to={`/Teacher/ViewCourse/` + c_id} className="btn btn-secondary m-2">
            <i className='fa fa-close me-2'></i>
            Go back to Course Details</Link>
        </div>
      </div>
      <div className="row my-2">
        {
          m_video != null && m_video != undefined && m_video != "NULL"
          ? <video controls src={m_video} className='w-100 mb-3' height={350}/>
          : <span></span>
        }
        <p>
          {
            m_content
          }
        </p>
      </div>
    </div>
  )
}

export default view_module