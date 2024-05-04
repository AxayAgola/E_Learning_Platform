import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function view_course() {
    const { id } = useParams();
    const [name, setName] = useState();
    const [c_banner, setCbanner] = useState();
    const [c_desc, setCdesc] = useState();
    const [t_name, setTname] = useState();
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/courses/getcourse/" + id)
            .then(result => {
                setName(result.data.c_name);
                setCbanner(result.data.c_image);
                setCdesc(result.data.c_desc);
                setTname(result.data.t_name);
            })
            .catch(err => console.log(err))

        axios.get("http://127.0.0.1:3001/cmodule/getcmodules/" + id + "/Published")
            .then(result => {
                console.log(result.data);
                setModules(result.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="card">
                <div className="card-body">
                    <div class="row g-4">
                        <div class="col-sm-12 col-md-8 d-flex align-items-center">
                            <img class="flex-shrink-0 img-fluid border rounded" src={c_banner} alt="abcd" style={{width: "150px", height: "120px"}} />
                            <div class="text-start ps-4">
                                <h4 class="mb-1">{name}</h4>
                                <small class="text-truncate">
                                    Course ID : {id}
                                </small>
                                <br></br>
                                <span class="text-truncate me-3">
                                    <i class="fa fa-user-alt text-primary me-2 my-3"></i>
                                    By {t_name}
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                            <div class="d-flex mb-3">
                                <Link to={`/Teacher/TakeQuiz/` + id} class="btn btn-primary">
                                    <i class="far fa-file me-3"></i>
                                    Get Certified</Link>
                            </div>
                        </div>
                        <div className="row mx-3 mt-2 p-0">
                            <p className='m-0 ps-0'><b>About : </b>{c_desc}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row p-0 my-3 px-1">
                <p className='h5'>Course Modules</p>
            </div>
            <div className="conatiner">
                {
                    modules.map((module, index) => {
                        return <div className="card mt-2">
                            <div className="card-body pb-2">
                                <div className="row">
                                    <div className="col-md-10">
                                        <p className='h5 mt-1'>({index += 1}) {module.m_name}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <Link to={`/Teacher/ViewModule/` + module._id} className='btn btn-primary w-100 mb-2'>
                                            <i className='far fa-eye me-2'></i>
                                            View Module</Link>
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

export default view_course