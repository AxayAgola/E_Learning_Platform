import React, { useEffect, useState } from 'react'
import axios from 'axios'

function home() {
    const [count, setCount] = useState({});

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/admin/getcounts")
        .then(async (result) => {
            console.log(result.data);
            await setCount(result.data);
        })
        .catch((err) => {
            alert(err);
        });
    }, []);


    return (
        <div className='h-100 bg-light text-center px-3 py-3'>
            <div className="row mb-4 mt-1 text-start px-2">
                <h1>Welcome to ELS@Admin</h1>
            </div>
            <div class="row my-3">
                <div class="col-xl col-md mb-2 text-start">
                    <div class="card border-left-primary  h-100 pt-1">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-auto">
                                    <i class="fas fa-user fa-2x text-gray-300"></i>
                                </div>
                                <div class="col mr-2">
                                    <p className='h4'>Student's count: {count.studentcount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row my-3">
                <div class="col-xl col-md mb-2 text-start">
                    <div class="card border-left-primary  h-100 pt-1">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-auto">
                                    <i class="fas fa-chalkboard-user fa-2x text-gray-300"></i>
                                </div>
                                <div class="col mr-2">
                                    <p className='h4'>Teacher's count: {count.teachercount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row my-3">
                <div class="col-xl col-md mb-2 text-start">
                    <div class="card border-left-primary  h-100 pt-1">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-auto">
                                    <i class="fas fa-book fa-2x text-gray-300"></i>
                                </div>
                                <div class="col mr-2">
                                    <p className='h4'>Avalibale Courses : {count.coursecount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row my-3">
                <div class="col-xl col-md mb-2 text-start">
                    <div class="card border-left-primary  h-100 pt-1">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-auto">
                                    <i class="fas fa-message fa-2x text-gray-300"></i>
                                </div>
                                <div class="col mr-2">
                                    <p className='h4'>User Feedbacks : {count.feedbackcount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default home