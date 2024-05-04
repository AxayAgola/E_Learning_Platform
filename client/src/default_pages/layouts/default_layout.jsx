import React, { useState, ReactNode, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const DefaultLayout = ({to}) => {
    const location = useLocation().pathname;
    
    return (
        <>
            <header class="p-3 text-bg-Light">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <h1 className='h2'>
                            <i className='fa fas fa-user-graduate text-dark me-3'></i>
                            <b>E-Learning</b>
                        </h1>
                        <ul class="nav col-12 col-lg-3 me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className={(location) == '/' ? "nav-link px-2 text-secondary" : "nav-link px-2 text-dark"}>Home</Link></li>
                            <li><Link to="/aboutus" class={(location) == '/aboutus' ? "nav-link px-2 text-secondary" : "nav-link px-2 text-dark"}>About us</Link></li>
                            <li><Link to="/ExploreCourses" class={(location) == '/ExploreCourses' ? "nav-link px-2 text-secondary" : "nav-link px-2 text-dark"}>Explore Courses</Link></li>
                        </ul>
                        <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            
                        </div>
                        <Link to="/Signin" class="btn btn-outline-dark me-2 px-5">Login</Link>
                        <Link to="/Signup" class="btn btn-warning me-2 px-5">Sign Up</Link>
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer class="bg-light  text-secondary py-3">
                <div class="container">
                    <strong class="text-secondary fs-3">E-Learning Platform</strong>
                    <p class="text-secondary">Empowering learning through technology.</p>
                    <ul class="list-inline">
                        <li class="list-inline-item"><a href="#">Terms & Conditions</a></li>
                    </ul>
                    <p>© 2024 E-Learning Platform</p>
                </div>
            </footer>
        </>
    );
};

export default DefaultLayout;
