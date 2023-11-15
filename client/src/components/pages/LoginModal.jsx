import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });
  const {email, password} = formData;

  const handleInputChange = (e) => {
  setFormData((prevState) =>({
    ...prevState,
    [e.target.name]: e.target.value,
  }) )

  
  }




  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  // const handleInputChange = (event) => {
  //   if (event.target.name === 'email') {
  //     setEmail(event.target.value);
  //   } else if (event.target.name === 'password') {
  //     setPassword(event.target.value);
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(email){
      toast.error('email is bad');
  }
  };

  return (
    <div className="modal fade" id="login-popup">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <a href="#" className="modal-close" data-bs-dismiss="modal" aria-label="Close">
            <em className="ti ti-close"></em>
          </a>
          <div className="ath-container m-0">
            <div className="ath-body">
              <h5 className="ath-heading title">Login in <small className="tc-default">with your Account</small></h5>
              <form action="#" onSubmit={handleSubmit}>
                <div className="field-item">
                  <div className="field-wrap">
                    <input type="text" name="email" className="input-bordered" placeholder="Email" value={email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="field-item">
                  <div className="field-wrap">
                    {/* <input type="password" className="input-bordered" placeholder="Password" /> */}
                    <input type="password" name="password" className="input-bordered" placeholder="Password" value={password} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="text-center">
                  <button  className="btn btn-primary btn-block btn-md">Sign In</button>
                </div>
              </form>
              <div className="sap-text"><span>---</span></div>

              <div className="ath-note text-center">
                Don’t have an account?{' '}Contact ICT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
