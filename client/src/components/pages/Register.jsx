import { useState, useEffect, CSSProperties } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../../features/auth/authSlice';
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from './spinner';

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        password2: '',
    
      });

      const {name, email, password, password2, role} = formData;
    
      const dispatch = useDispatch()
      const navigate = useNavigate()

      const {user, isLoading, isError, isSuccess, message} = 
      useSelector(
        (state) => state.auth
        )

        useEffect(() => {
            if(isError) {
                toast.error(message)
            }

            //redirect when logged in
            if(isSuccess || user) {
                navigate('/certificates')
            }

            dispatch(reset())


        }, [user, isError, isSuccess, message, isLoading, navigate, dispatch])

        
      const handleInputChange = (e) => {
      setFormData((prevState) =>({
        ...prevState,
        [e.target.name]: e.target.value,
      }) )
      
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        if(password !== password2) {
            toast.error('Password do not match')
        }else{
            const userData = {
                name,
                email,
                password,
                role
            }

            dispatch(register(userData))
        }
        // console.log(formData);
      };
    
    //   const { email, password } = formData;

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");


    if(isLoading){
        return <Spinner/>
    }
  return (
    <div className="ath-container">
      <div className="ath-header text-center">
        <a href="index.html" className="ath-logo">
          <img
            src="images/logo-full-white.png"
            srcSet="images/logo-full-white2x.png 2x"
            alt="logo"
          />
        </a>
      </div>
      <div className="ath-body">
        <h5 className="ath-heading title">
          Sign in {user}<small className="tc-default">with your ICO Account</small>
        </h5>
        <form action="#" onSubmit={handleSubmit}>
          <div className="field-item">
            <div className="field-wrap">
            <input type="text" name="name" className="input-bordered" placeholder="Name" value={name} onChange={handleInputChange} />
              {/* <input type="text" className="input-bordered" placeholder="Your Email" /> */}
            </div>
          </div>
          <div className="field-item">
            <div className="field-wrap">
            <input type="email" name="email" className="input-bordered" placeholder="Email" value={email} onChange={handleInputChange} />
              {/* <input type="text" className="input-bordered" placeholder="Your Email" /> */}
            </div>
          </div>
          <div className="field-item">
            <div className="field-wrap">
            <input type="password" name="password" className="input-bordered" placeholder="Password" value={password} onChange={handleInputChange} />
              {/* <input type="text" className="input-bordered" placeholder="Your Email" /> */}
            </div>
          </div>
          <div className="field-item">
            <div className="field-wrap">
                
            <input type="password" name="password2" className="input-bordered" placeholder="Confirm Password" value={password2} onChange={handleInputChange} />
              
            </div>
          </div>
          <div className="field-item">
            <div className="field-wrap">
            <input type="text" name="role" className="input-bordered" placeholder="Role" value={role} onChange={handleInputChange} />
                
              {/* <input type="password" className="input-bordered" placeholder="Password" /> */}
            </div>
          </div>
   
          <button className="btn btn-primary btn-block btn-md">Sign In</button>
        </form>
        <div className="sap-text">
          <span>Or Sign In With</span>
        </div>
        <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    {/* <div className="preloader" style="display: none;"><span className="spinner spinner-round load-done" style="display: none;"></span></div> */}

      </div>
      <div className="ath-note text-center tc-light">
        Don’t have an account? <a href="page-register.html"><strong>Sign up here</strong></a>
      </div>
    </div>
  );
};

export default Register;
