import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { addUserData } from '../../../Redux/action/action';

const UserSignUp = () => {
//   const [obj, setObj] = useState({fullName: "",email: "",mobileNumber: "",password:"",roleId: ""});
  const [obj, setObj] = useState({});
  const [blankObj, setblankObj] = useState({});
//   const [errorMsg, seterrorMag] = useState({});
//   let checkAlpabet = /^[A-Za-z\s]*$/;
//   const state = useSelector((state) => state.api);
  const dispatch = useDispatch();

  
  const getValue =async (e) =>{
        obj[e.target.name] = e.target.value;
        blankObj[e.target.name] = ""
        setObj({...obj});
        setblankObj({...blankObj});
  }

  const saveData = () =>{
    dispatch(addUserData(obj))
    setObj({...blankObj})
  }


  
  return (
    <>
     <div className="login-p">
    <div className="container-fluid">
        <div className="row">
          
            <div className="col-lg-6 bg-img">
                <div className="info clearfix align-self-center">
                    
                    {/* <h1>Welcome to My Web site </h1> */}
                   
                </div>
                
            </div>
            <div className="col-lg-6 form-section">
                <div className="form-inner">
                
                    <h3>Create An Account</h3>
                    <form action="#" method="GET">
                        <div className="form-group form-box">
                            <input name="userName" type="text" className="form-control" value={obj.userName ?? ''} onChange={getValue} placeholder="User Name"/>
                            {/* <span className='color'>{errorMsg?.fullName}</span> */}
                        </div>
                        <div className="form-group form-box">
                            <input name="email" type="email" className="form-control" value={obj.email ?? ''} onChange={getValue} placeholder="Email Address" />
                            {/* <span className='color'>{errorMsg?.email}</span> */}
                        </div>

                        <div className="form-group form-box clearfix">
                            <input name="mobileNo" type="tel" className="form-control" value={obj.mobileNo ?? ''} onChange={getValue}  placeholder="Mobile Number"/>
                            {/* <span className='color'>{errorMsg?.mobileNumber}</span> */}
                        </div>

                        <div className="form-group form-box clearfix">
                            <input name="password" type="password" className="form-control" value={obj.password ?? ''} onChange={getValue}  placeholder="Password"/>
                            {/* <span className='color'>{errorMsg?.password}</span> */}
                        </div>
                        <div className="form-group form-box clearfix">
                            <input name="confirmPassword" type="password" className="form-control" value={obj.confirmPassword ?? ''} onChange={getValue}  placeholder="Confirm Password"/>
                            {/* <span className='color'>{errorMsg?.password}</span> */}
                        </div>
                        {/* <div className="form-group form-box clearfix"> */}
  {/* <select
    name="roleId"
    value={obj.roleId ?? ''}
    onChange={getValue}
    className="form-control"
  >
    <option value="">Select Your Role</option>
    <option value="1">Admin</option>
    <option value="2">Client</option>
  </select>
  <span className="color">{errorMsg?.roleId}</span>
</div> */}
                        <div className="form-group form-box clearfix">
                        <select className="form-select" name='role' value={obj?.role ?? ''} onChange={getValue} aria-label="Default select example">
                            <option>Select Your Roll</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        {/* <span className='color'>{errorMsg?.roleId}</span> */}
                        </div>
                        {/* <div className="form-group form-box clearfix">
                            <label htmlFor="">Profile</label> <br />
                            <label htmlFor="img" className='btn btn-dark'>Select File</label> <br />
                            <input type="file" id='img' name='profileImageBase64' className='d-none' onChange={getValue} /> <br />
                            <img src={obj.profileImageBase64} alt="" style={{width: 'auto',height: 'auto',maxHeight: '100px',maxWidth: '100px'}} />
                            <span className='color'>{errorMsg?.profileImageBase64}</span>
                        </div> */}
                        
                        <div className="form-group checkbox clearfix mt-2">
                            <div className="clearfix float-start">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="rememberme"/>
                                    <label className="form-check-label" htmlFor="rememberme">
                                        I agree to the terms of service
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary btn-lg btn-theme" onClick={saveData}><span>Register</span></button>
                        </div>
                        <div className="extra-login form-group clearfix">
                            <span>Or Login With</span>
                        </div>
                    </form>
                    <div className="clearfix"></div>
                    <ul className="social-list clearfix">
                        <li><a className="facebook-bg">Facebook</a></li>
                        <li><a className="twitter-bg">Twitter</a></li>
                        <li><a className="google-bg">Google</a></li>
                    </ul>
                    <div className="clearfix"></div>
                    <p>Already a member?<Link to='/login' ><button type='button' className='btn-lh'>Login here</button></Link></p>
                </div>
            </div>
        </div>
    </div>
</div>
<ToastContainer />
    </>
  )
}

export default UserSignUp