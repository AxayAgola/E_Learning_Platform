import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, NavLink, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'

function AdminLayout() {
  const [name, setName] = useState();
  const [count, setCount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    if (user == undefined) {
      navigate("/");
    }
    else {
      if (user.type != 'admin') {
        localStorage.clear();
        navigate("/");
      }
      setName(user.email);
    }

    axios.get("http://127.0.0.1:3001/admin/getcounts")
      .then((result) => {
        setCount(result.data);
      })
      .catch((err) => {
        alert(err);
      });

      console.log(count);

  }, []);

  const onLogout = () => {
    localStorage.removeItem('sessionData');
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: '#E5E4E2', minHeight: '100vh' }}>

      {/*Navigation Bar*/}
      <header class="navbar bg-dark sticky-top bg-light flex-md-nowrap px-3 py-3 pt-2 m-0">
        <a class="navbar-brand text-secondary col-md-3 col-lg-2 me-0 px-3 fs-3" href="#">
          <i className='fa fas fa-user-doctor text-white me-3'></i>
          <span className='text-white font-weight-bold'>ELS - Admin</span>
          <p className='h6 d-inline'>&nbsp; | E-Learning System</p>
        </a>
        <div className='text-white'>
          <NavDropdown title={<span className='h5'><i className='fa fa-user'></i>&nbsp;&nbsp;{name}&nbsp;</span>} id="profile-dropdown">
            <NavDropdown.Item>
              <Link to="/Admin/AdminProfile" className='text-decoration-none text-dark'>
                <i className="fa fa-user mx-1 me-2"></i> Admin Account
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={onLogout}>
              <Link className='text-decoration-none text-dark'>
                <i className="fa fa-power-off mx-1 me-2"></i> Logout
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </header>


      <Container fluid className="p-0 m-0 w-100 h-100" style={{ height: '100%' }}>
        <Row>
          {/*SideBar//////////////////////////////////////////////////// */}
          <div className="col col-2 text-center pt-4 ps-4" style={{ height: "10rem" }}>
            <div>
              <ul className="list-unstyled m-1">
                <li>
                  <Link to="/Admin" class="btn btn-outline-primary active w-100 text-start">
                    <i className="fa fa-home mx-1 me-2"></i>Home
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Admin/ManageCourses" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-book mx-1 me-2"></i>Manage Courses
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Admin/ManageTeachers" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-chalkboard-user mx-1 me-2"></i>Manage Teachers
                    <i class="fa-solid "></i>
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Admin/ManageStudents" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-users mx-1 me-2"></i>Manage Students
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Admin/Feedbacks" class="btn btn-outline-primary w-100 text-start">
                    <i className="fa fa-comment mx-1 me-2"></i>Feedbacks
                  </Link>
                </li>
                <br />
                <li>
                  <Link to="/Admin/AdminSettings" class="btn btn-outline-primary w-100 text-start">
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

          {/*Main - Body Part */}
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

export default AdminLayout;