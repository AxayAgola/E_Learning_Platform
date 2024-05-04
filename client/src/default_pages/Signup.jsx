import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [type, setType] = useState("student");
    const [file, setFile] = useState([]);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            alert('Not Gonna Work.');
        } else {

            var isAccountCreationValid;

            await axios.post("http://127.0.0.1:3001/users/isaccountvalid", {email, password})
                .then((result) => {
                    isAccountCreationValid = result.data.valid
                }).catch((err) => {
                    isAccountCreationValid = false;
                });

            if(isAccountCreationValid)
            {
                const ImgFile = new FormData();
                ImgFile.append('ImgFile', file);
    
                var image = "";
    
                await axios.post("http://127.0.0.1:3001/files/uploadpic", ImgFile)
                .then(res => {
                    image = "http://localhost:5173/images/uploads/" + res.data;
                    alert(image);
                })
                .catch(err => {
                    c_banner = "coming soon";
                    alert(err);
                });

                axios.post("http://127.0.0.1:3001/users/signup", { name, email, password, image, type })
                .then(result => {
                    alert("Account Created Successfully.");
                    navigate("/");
                }).catch(err => console.log(err));
            }
            else
            {
                alert('Email is already registed with another account.');
            }
        }
    }

    return (
        <div className='h-100 bg-light py-3 px-4'>
            <div className="card mt-3 mx-auto w-50 p-2 pb-0">
                <div className="card-body">
                    <div className="row">
                        <h2 className="py-3">Create Account</h2>
                    </div>
                    <div className="row">
                        <div className="form-group mb-2">
                            <label htmlFor="s_name">Name</label>
                            <input type="text" id='s_name' value={name} onChange={(e) => { setName(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_email">Email Address</label>
                            <input type="email" id='s_email' value={email} onChange={(e) => { setEmail(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_profilepic">Profile Picture</label>
                            <input type="file" id='s_profilepic' onChange={(e) => { setFile(e.target.files[0]); }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_pass">Password</label>
                            <input type="password" id='s_pass' value={password} onChange={(e) => { setPassword(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_pass">Confirm Password</label>
                            <input type="password" id='s_pass' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className='form-control my-2' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="s_pass">Account Type</label>
                            <select id='s_pass' value={type} onChange={(e) => { setType(e.target.value) }} className='form-select my-2'>
                                <option value={"student"}>Student</option>
                                <option value={"teacher"}>Teacher</option>
                            </select>
                        </div>
                        <div className="form-group mb-2 mt-2">
                            <button className='btn btn-primary w-100' onClick={submit}>Create Account</button>
                        </div>
                        <div className="form-group mt-2">
                            <p>Already have a account? <Link to={"/Signin"} className='text-decoration-none'>Sign In</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
