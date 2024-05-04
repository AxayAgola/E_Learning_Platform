import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function add_module() {
    const { id } = useParams();
    const [m_name, setMname] = useState();
    const [m_content, setMcontent] = useState();
    const [status, setStatus] = useState("Published");
    const [file, setFile] = useState([]);
    const navigate = useNavigate();

    const onSaveChanges = async (e) => {
        e.preventDefault();

        const ImgFile = new FormData();
        ImgFile.append('ImgFile', file);

        var m_video = "NULL";

        await axios.post("http://127.0.0.1:3001/files/uploadpic", ImgFile)
            .then(res => {
                m_video = "http://localhost:5173/images/uploads/" + res.data;
                console.log(m_video);
            })
            .catch(err => {
                m_video = "coming soon";
                console.log(err);
            });


        const c_id = id;
        axios.post("http://127.0.0.1:3001/cmodule/createmodule", { c_id, m_name, m_content, status, m_video })
            .then(res => {
                console.log(res);
                alert('Module created successfully');
                navigate(`/Teacher/ManageCourse/` + id);
            })
            .catch(err => {
                alert(err);
            });
    };


    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="row">
                <div className="col-md">
                    <h1>Add New Module</h1>
                    <small>c_id : {id}</small>
                </div>
                <div className="col-md text-end">
                    <Link to={`/Teacher/ManageCourse/` + id} className="btn btn-secondary m-2">
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
                            <textarea value={m_content} rows={4} onChange={(e) => { setMcontent(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Status</label>
                            <select id='s_name' value={status} onChange={(e) => { setStatus(e.target.value) }} className='form-select my-2'>
                                <option value={"Published"}>Published</option>
                                <option value={"Unpublished"}>Unpublished</option>
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Upload Video (Optional)</label>
                            <input type="file" id='s_name' accept='video/*' onChange={(e) => { setFile(e.target.files[0]); }}  className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2 mt-2">
                            <button className='btn btn-primary w-100' onClick={onSaveChanges}>Create New Module</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default add_module