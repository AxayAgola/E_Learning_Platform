import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, NavLink, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'

function StudentLayout() {
  const navigate = useNavigate();
  const [Name, setName] = useState();
  
  useEffect(()=> {
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    
    if(user == undefined)
    {
      navigate("/");
    }
    else
    {
      if(user.type != 'student')
      {
        localStorage.clear();
        navigate("/");
     }
      setName(user.name);
    }
  },[])

  const onLogout = ()=> {
    localStorage.removeItem('sessionData');
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: '#E5E4E2', minHeight: '100vh' }}>
      <header class="navbar bg-dark sticky-top bg-light flex-md-nowrap px-3 py-3 pt-2 m-0">
        <a class="navbar-brand text-secondary col-md-3 col-lg-2 me-0 px-3 fs-3" href="#">
          <i className='fa fa-user-graduate text-white me-3'></i>
          <i class=""></i>
          <span className='text-white font-weight-bold'>E - Learning</span>
        </a>
        <div className='text-white'>
          <NavDropdown title={<span className='h5'><i className='fa fa-user'></i>&nbsp;&nbsp;{Name}&nbsp;</span>} id="profile-dropdown">
            <NavDropdown.Item>
              <Link to="/student/StudentProfile" className='text-decoration-none text-dark'>
                <i className="fa fa-user mx-1 me-2"></i> User Account
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogout}>
              <span className='text-decoration-none text-dark'>
                <i className="fa fa-power-off mx-1 me-2"></i> Logout
              </span>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </header>


      <Container fluid className="p-0 m-0 w-100 h-100" style={{ height: '100%' }}>
        <Row>
          <div className="col col-2 text-center pt-4 ps-4">
            <div>
              <ul className="list-unstyled m-1">
                <li>
                  <Link to="/Student" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-home mx-1 me-2"></i> Home
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Student/Courses" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-book mx-1 me-2"></i> Explore Courses
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Student/StudentProfile" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-user mx-1 me-2"></i> Profile
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Student/AccountSettings" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-gear mx-1 me-2"></i> Account Settings
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Student/GiveFeedback" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-message mx-1 me-2"></i> Give Feedback
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Student/Certificates/" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-file mx-1 me-2"></i>  Certificates
                  </Link>
                </li>
                <br />
                <li onClick={onLogout}>
                  <Link class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-power-off mx-1 me-2"></i> Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Col xs={12} md={10} lg={10} style={{ minHeight: '100vh', height: 'auto', marginTop: '0' }}>
            <Outlet />
          </Col>

        </Row>
      </Container>
      <footer class="py-3 text-center border-top border-black bg-dark">
        <span class="mb-3 mb-md-0 text-white">© 2024 - E Learning Platform | | All Rights Reserverd |
          <a href='../aboutus' className='mx-2 text-decoration-none'>About us</a> |
          <a href='./' className='mx-2 text-decoration-none'>Contact us</a>
        </span>
      </footer>
    </div>
  );
}

export default StudentLayout;