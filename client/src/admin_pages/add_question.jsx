import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function add_question() {
    const { id } = useParams();
    const [question, setQuestion] = useState();
    const [optionA, setOptionA] = useState();
    const [optionB, setOptionB] = useState();
    const [optionC, setOptionC] = useState();
    const [optionD, setOptionD] = useState();
    const [answer, setAnswer] = useState("A");
    const [status, setStatus] = useState("Published");
    const navigate = useNavigate();

    const onSaveChanges = async (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:3001/questions/addquestion", {
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            answer,
            id,
            status
        })
            .then((result) => {
                alert("Question Added Successfully.")
                navigate(`/Admin/ManageQuiz/` + id);
            })
            .catch((err) => {
                alert(err);
            });
    };


    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <h1>Add New question</h1>
                        <small>c_id : {id}</small>
                    </div>
                    <div className="col-md text-end">
                        <Link to={`/Admin/ManageQuiz/` + id} className="btn btn-secondary m-2">
                            <i className='fa fa-close me-2'></i>
                            Go back to Manage Quiz</Link>
                    </div>
                </div>
                <div className="card mt-4 mx-auto w-100 p-2">
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group mb-2">
                                <label htmlFor="s_name">Question</label>
                                <input type="text" id='s_name' value={question} onChange={(e) => { setQuestion(e.target.value) }} className='form-control my-2' required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="s_name">Option ( A )</label>
                                <input type="text" id='s_name' value={optionA} onChange={(e) => { setOptionA(e.target.value) }} className='form-control my-2' required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="s_name">Option ( B )</label>
                                <input type="text" id='s_name' value={optionB} onChange={(e) => { setOptionB(e.target.value) }} className='form-control my-2' required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="s_name">Option ( C )</label>
                                <input type="text" id='s_name' value={optionC} onChange={(e) => { setOptionC(e.target.value) }} className='form-control my-2' required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="s_name">Option ( D )</label>
                                <input type="text" id='s_name' value={optionD} onChange={(e) => { setOptionD(e.target.value) }} className='form-control my-2' required/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="s_name">Answer</label>
                                <select id='s_name' value={answer} onChange={(e) => { setAnswer(e.target.value) }} className='form-select my-2'>
                                    <option value={"A"}>A</option>
                                    <option value={"B"}>B</option>
                                    <option value={"C"}>C</option>
                                    <option value={"D"}>D</option>
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="s_name">Status</label>
                                <select id='s_name' value={status} onChange={(e) => { setStatus(e.target.value) }} className='form-select my-2'>
                                    <option value={"Published"}>Published</option>
                                    <option value={"Unpublished"}>Unpublished</option>
                                </select>
                            </div>
                            <div className="form-group mb-2 mt-2">
                                <button className='btn btn-primary w-100' onClick={onSaveChanges}>Create New question</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default add_question