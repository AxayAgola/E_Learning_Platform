import { React, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

function manage_quiz() {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  var i = 0;

  useState(()=>{
    axios.get("http://127.0.0.1:3001/questions/" + id)
      .then((result) => {
        setQuestion(result.data);
      })
      .catch((err) => {
          alert(err);
      });
  },[]);

  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="row">
        <div className="col-md">
          <h1>Manage Quiz</h1>
          <small>Course ID : {id}</small>
        </div>
        <div className="col-md text-end">
          <Link to={`/Teacher/ManageCourse/` + id} className="btn btn-secondary m-2">
            <i className='fa fa-close me-2'></i>
            Go back to Course Details</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <p className='h4 my-3'>Question</p>
        </div>
        <div className="col-md text-end">
          <Link to={`/Teacher/AddQuestion/` + id} className="btn btn-primary m-2">
            <i className='fa fa-add me-2'></i>
            Add Question</Link>
        </div>
      </div>
      <div className="conatiner">
        {
          question.map((question) => {
            return <div className="card mt-2">
              <div className="card-body pb-2">
                <div className="row">
                  <div className="col-md-10">
                    <p className='h5 mt-1 mb-4'>({i += 1}) {question.question}</p>
                    <p>Option ( A ) : {question.optionA}</p>
                    <p>Option ( B ) : {question.optionB}</p>
                    <p>Option ( C ) : {question.optionC}</p>
                    <p>Option ( D ) : {question.optionD}</p>
                    <p>Answer : {question.answer}</p>
                  </div>
                  <div className="col-md-2">
                    <Link to={`/Teacher/Editquestion/` + question._id} className='btn btn-primary w-100 mb-2'>
                      <i className='fa fa-edit me-2'></i>
                      Edit question</Link>
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

export default manage_quiz