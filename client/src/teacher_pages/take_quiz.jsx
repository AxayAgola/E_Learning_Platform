import { React, useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import CryptoJS from 'crypto-js';

function take_quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [c_banner, setCbanner] = useState();
  const [t_name, setTname] = useState();
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});

  useState(async () => {
    await axios.get("http://127.0.0.1:3001/courses/getcourse/" + id)
      .then(result => {
        setName(result.data.c_name);
        setCbanner(result.data.c_image);
        setTname(result.data.t_name);
      })
      .catch(err => console.log(err))


    await axios.get("http://127.0.0.1:3001/questions/" + id)
      .then((result) => {
        setQuestion(result.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);


  const handleAnswerChange = (qid, selectedOption) => {
    setAnswer((prevAnswer) => ({
      ...prevAnswer,
      [qid]: selectedOption,
    }));
  };


  const handleSubmit = () => {
    const totalQuestions = question.length;
    let correctAnswers = 0;

    question.forEach((ques) => {
      if (answer[ques._id] === ques.answer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / totalQuestions) * 100;

    var status = "PASS";

    if (score > 40) {
      alert("Conguratulations! You are eligible for the certificate");
      status = "PASS";
    }
    else {
      alert("Sorry! you are not eligible for certification.");
      status = "FAIL";
    }

    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));

    const course_id = id;
    const course_name = name;
    const user_id = user._id; 

    axios.post("http://127.0.0.1:3001/result/add_result/", { course_id, course_name, user_id, score, status })
      .then(result => {
        console.log(result);
        navigate("/Teacher/Certificates");
      }).catch(err => console.log(err));

  };



  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="card">
        <div className="card-body">
          <div class="row g-4">
            <div class="col-sm-12 col-md-8 d-flex align-items-center">
              <img class="flex-shrink-0 img-fluid border rounded" src={c_banner} alt="abcd" style={{ width: "150px", height: "120px" }} />
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
                <Link to={`/Teacher/ViewCourse/` + id} class="btn btn-danger">
                  <i class="fa fa-close me-3"></i>
                  Close this quiz</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <p className='ms-3'>
            <b>Note:</b>
            &nbsp;You need to score more than 40% to get a certificate.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <p className='h4 my-3'>Question</p>
        </div>
      </div>
      <div className="conatiner">
        {
          question.map((question, index) => {
            return <div className="card mt-2" key={question._id}>
              <div className="card-body pb-2">
                <div className="row">
                  <div className="col-md">
                    <p className='h5 mt-1 mb-4'>({index + 1}) {question.question}</p>
                    <div className="px-1">
                      <p><input type="radio" name={`option${index}`} value={question.optionA} onChange={() => handleAnswerChange(question._id, "A")} className="me-2" />{question.optionA}</p>
                      <p><input type="radio" name={`option${index}`} value={question.optionB} onChange={() => handleAnswerChange(question._id, "B")} className="me-2" />{question.optionB}</p>
                      <p><input type="radio" name={`option${index}`} value={question.optionC} onChange={() => handleAnswerChange(question._id, "C")} className="me-2" />{question.optionC}</p>
                      <p><input type="radio" name={`option${index}`} value={question.optionD} onChange={() => handleAnswerChange(question._id, "D")} className="me-2" />{question.optionD}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>
      <button onClick={() => handleSubmit()} className='btn btn-primary w-25 my-3 p-2'>Submit</button>
    </div>
  )
}

export default take_quiz