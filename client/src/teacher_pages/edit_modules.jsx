import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function edit_module() {
    const { id } = useParams();
    const [m_name, setMname] = useState();
    const [m_content, setMcontent] = useState();
    const [status, setStatus] = useState();
    const [c_id, setCid] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://127.0.0.1:3001/cmodule/getmoduledetail/" + id)
            .then(result => {
                setMname(result.data.m_name);
                setMcontent(result.data.m_content);
                setCid(result.data.c_id);
                setStatus(result.data.status);
            })
            .catch(err => {
                alert(err);
            });
    }, []);

    const onSaveChanges = async (e) => {
        e.preventDefault();

        axios.put("http://127.0.0.1:3001/cmodule/updatemodule", { id, m_name, m_content, status })
            .then(res => {
                console.log(res);
                alert('Module updated successfully');
                navigate(`/Teacher/ManageCourse/` + c_id);
            })
            .catch(err => {
                alert(err);
            });
    };

    
  const onDelete = (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this course?")) {
      console.log("Working");
      axios.delete("http://127.0.0.1:3001/cmodule/deletemodule/" + id)
        .then(res => {
          console.log(res);
          alert("Module Deleted Successfully.");
          navigate(`/Teacher/ManageCourse/` + c_id);
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
                    <h1>Edit Module</h1>
                    <small>c_id : {id}</small>
                </div>
                <div className="col-md text-end">
                    <Link to={`/Teacher/ManageCourse/` + c_id} className="btn btn-secondary m-2">
                        <i className='fa fa-close me-2'></i>
                        Go back to Course Details</Link>
                </div>
            </div>
            <div className="card mt-4 mx-auto w-100 p-2">
                <div className="card-body">
                    <div className="row">
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Module Name</label>
                            <input type="text" id='s_name' value={m_name} onChange={(e) => { setMname(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Content</label>
                            <textarea id='s_name' value={m_content} onChange={(e) => { setMcontent(e.target.value) }} className='form-control my-2' rows={10}/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Status</label>
                            <select id='s_name' value={status} onChange={(e) => { setStatus(e.target.value) }} className='form-select my-2'>
                                <option value={"Published"}>Published</option>
                                <option value={"Unpublished"}>Unpublished</option>    
                            </select>
                        </div>
                        <div className="form-group mb-2 mt-2">
                            <button className='btn btn-primary w-100' onClick={onSaveChanges}>Update Module</button>
                            <button className='btn btn-danger w-100 mt-3' onClick={onDelete}>
                            <i className='fa fa-close me-2'></i>
                            Delete Module</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default edit_module