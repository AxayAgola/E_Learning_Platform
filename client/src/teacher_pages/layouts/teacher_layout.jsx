import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, NavLink, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'

function TeacherLayout() {
  const navigate = useNavigate();
  const [Name, setName] = useState();

  useEffect(() => {
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    if (user == undefined) {
      navigate("/");
    }
    else if (user.type != 'teacher') {
      localStorage.clear();
      navigate("/");
    }
    else
    {
      setName(user.name);
    }
  },[])

  const onLogout = () => {
    localStorage.removeItem('sessionData');
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: '#E5E4E2', minHeight: '100vh' }}>
      <header class="navbar bg-dark sticky-top bg-light flex-md-nowrap px-3 py-3 pt-2 m-0">
        <a class="navbar-brand text-secondary col-md-3 col-lg-2 me-0 px-3 fs-3" href="#">
          <i className='fa fa-chalkboard-user text-white me-3'></i>
          <span className='text-white font-weight-bold'>E - Teacher</span>
          <p className='h6 d-inline'>&nbsp; By E-Learning System</p>
        </a>
        <div className='text-white'>
          <NavDropdown title={<span className='h5'><i className='fa fa-user'></i>&nbsp;&nbsp;{Name}&nbsp;</span>} id="profile-dropdown">
            <NavDropdown.Item>
              <Link to="/Teacher/TeacherProfile" className='text-decoration-none text-dark'>
                <i className="fa fa-user mx-1 me-2"></i> User Account
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/Teacher/Certificates" className='text-decoration-none text-dark'>
                <i className="fa fa-file mx-1 me-2"></i> Certificates
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="../Signin" className='text-decoration-none text-dark'>
                <i className="fa fa-power-off mx-1 me-2"></i> Logout
              </Link>
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
                  <Link to="/Teacher" class="btn btn-outline-primary active w-100 text-start">
                    <i className="fa fa-home mx-1 me-2"></i> Home
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Teacher/ExploreCourses" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-book mx-1 me-2"></i> Explore Courses
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Teacher/AddCourses" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-plus mx-1 me-2"></i> Add Courses
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Teacher/CourseManage" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-calendar mx-1 me-2"></i> Your Courses
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Teacher/TeacherProfile" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-user mx-1 me-2"></i>  Profile
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Teacher/GiveFeedback" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-message mx-1 me-2"></i>  Feedback
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Teacher/TeacherSettings" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-gear mx-1 me-2"></i> Account Settings
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
        <span class="mb-3 mb-md-0 text-white">© 2024 - E Learning Platform - Teacher Panel | All Rights Reserverd |
          <a href='../aboutus' className='mx-2 text-decoration-none'>About us</a> |
          <a href='./' className='mx-2 text-decoration-none'>Contact us</a>
        </span>
      </footer>
    </div>
  );
}

export default TeacherLayout;