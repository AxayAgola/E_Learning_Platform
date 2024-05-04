import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'

function myprofile() {
  const [user, setUser] = useState({});
  useEffect(()=>{
    const data = CryptoJS.AES.decrypt(localStorage.getItem('sessionData'), import.meta.env.VITE_SECRET_KEY);
    const user = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    setUser(user);
  },[]);

  return (
    <div className='container bg-light p-4 h-100'>
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body text-center">
              <img src={user.image} alt="avatar" style={{width: 250, height:247}}
                class="rounded-circle img-fluid" className='mb-3'/>
              <h5 class="my-3">{user.name}</h5>
              <p class="text-muted mb-1">{user.email}</p>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-body">
              <hr className='p-0 m-0'/>
              <div class="row py-3">
                <div class="col-sm-3">
                  <p class="mb-0">User ID</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{user._id}</p>
                </div>
              </div>
              <hr/>
              <div class="row py-3">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{user.name}</p>
                </div>
              </div>
              <hr />
              <div class="row py-3">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{user.email}</p>
                </div>
              </div>
              <hr />
              <div class="row py-3">
                <div class="col-sm-3">
                  <p class="mb-0">Type</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{user.type}</p>
                </div>
              </div>
              <hr className='mb-1'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default myprofile