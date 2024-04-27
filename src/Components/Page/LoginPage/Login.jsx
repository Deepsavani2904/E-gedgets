import React, { useEffect, useState } from "react";
import { AiFillFacebook,AiFillTwitterSquare,AiFillGoogleSquare } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { userLogin } from "../../../Redux/action/action";

const UserLogin = () => {
  // const [obj, setObj] = useState({email:"",password:""});
  const [obj, setObj] = useState({});
  const [blankObj, setblankObj] = useState({});
  // const [errorMsg, seterrorMsg] = useState({});
  const dispatch = useDispatch()
  // let checkAlpabet = /^[A-Za-z\s]*$/;

  const getValue = (e) =>{
       obj[e.target.name] = e.target.value;
       blankObj[e.target.name] = ""
      //  validationFunction(e.target.name);
       setObj({...obj});
       setblankObj({...blankObj})
  }

  const saveData = () =>{
    dispatch(userLogin(obj))
  }
  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row login-box">
            <div className="col-lg-5 bg-img align-self-center">
              <div className="title">
                <div className="bottom-container">Welcome To Buddy!</div>
                <div className="top-container">Welcome To Buddy!</div>
                {/* <div>Welcome To Buddy!</div> */}
              </div>
            </div>
            <div className="col-lg-7 form-section">
              <div className="form-inner">
                {/* <a className="logo">
                  <img src="assets/img/logos/logo-2.png" alt="logo"/>
                </a> */}
                <h3>Sign Into Your Account</h3>

                <form>
                  <div className="form-group form-box">
                    <input
                      type="email"
                      name="email"
                      value={obj.email ?? ""}
                      onChange={getValue}
                      className="form-control"
                      placeholder="Email Address"
                    />
                    {/* <span style={{ color: "red" }}>{errorMsg?.email}</span> */}
                  </div>
                  <div className="form-group form-box">
                    <input
                      type="password"
                      name="password"
                      value={obj.password ?? ""}
                      onChange={getValue}
                      className="form-control"
                      placeholder="Password"
                    />
                    {/* <span style={{ color: "red" }}>{errorMsg?.password}</span> */}
                  </div>
                  <div className="checkbox form-group clearfix">
                    <div className="form-check float-start">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberme"
                      />
                      <label className="form-check-label" htmlFor="rememberme">
                        Remember me
                      </label>
                    </div>
                    <a className="link-light float-end forgot-password">
                      Forgot your password?
                    </a>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      onClick={saveData}
                      className="btn btn-primary btn-lg btn-theme"
                    >
                      Login
                    </button>
                  </div>
                  <div className="extra-login form-group clearfix">
                    <span>Or Login With</span>
                  </div>
                </form>
                <div className="clearfix"></div>
                <div className="social-list">
                  <div className="buttons">
                    <a className="facebook-bg">
                      <AiFillFacebook />
                    </a>
                    <a className="twitter-bg">
                      <AiFillTwitterSquare />
                    </a>
                    <a className="google-bg">
                      <AiFillGoogleSquare />
                    </a>
                    <a className="dribbble-bg">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
                {/* <p>Don't have an account? <a href="register-8.html" className="thembo"> Register here</a></p> */}
                <p>
                  Don't have an account?
                  <Link to="/signUp">
                    <button type="button" className="r-btn">
                     
                      Register here
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserLogin;
