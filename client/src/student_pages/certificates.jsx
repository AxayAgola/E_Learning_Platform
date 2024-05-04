import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import CryptoJS from 'crypto-js';

function certificates() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    axios.get("http://127.0.0.1:3001/result/" + user._id)
      .then((result) => {
        console.log(result.data);
        setResults(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='h-100 bg-light py-3 px-4'>
      <div className="row">
        <div className="col-md">
          <h1>Certificates</h1>
        </div>
      </div>
      <div className="row py-4">
        <div className="col-md">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Result ID</th>
                <th scope='col'>Course Name</th>
                <th scope='col'>Course ID</th>
                <th scope='col'>Status</th>
                <th scope='col'>Download PDF</th>
              </tr>
            </thead>
            <tbody>
              {
                results.map((Result, index) => {
                  return <tr key={Result._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{Result._id}</td>
                    <td>{Result.course_name}</td>
                    <td>{Result.course_id}</td>
                    <td>{Result.status}</td>
                    <td>
                      { 
                        Result.status == "PASS"
                        ? <Link to={`/Student/GetCertificate/${Result._id}`} className='text-decoration-none'>Download PDF</Link>
                        : <span className='text-danger'>Option Not Available</span>  
                      }
                      </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default certificates