import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { userLogout } from '../../Redux/Action/action';
import { IoMdHome } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { GoProjectSymlink } from 'react-icons/go';
import { MdRecentActors } from "react-icons/md"; 
import { IoSettingsSharp } from "react-icons/io5";
import { GrReactjs } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { HiMiniFlag } from "react-icons/hi2";
import { BsCartDash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../../Redux/action/action';

export const HOCUSER = (Component) =>{
    const NewComponent = () => {
        // const [check, setCheck] = useState();
         const dispatch = useDispatch() 
        // useEffect(() => {
        //   const loginObj = JSON.parse(localStorage.getItem('isLogin'))
        //   setCheck(loginObj?.data?.role)
        // }, []);

        const logOut = () =>{
            dispatch(logOutUser())
        }
        
        return (
          <>
           <div className="main-parent">
                <div className="dashboard">
                    <div className="logo">
                        <GrReactjs size={40}  color='#6362e7' className='circle'/>
                    </div>
                    <ul className='p-0'>
                    {/* {
                        (check == 'admin')?
                        <> */}
                             {/* <NavLink to='/addUser' className='link'> <li><h5 className="m-0"><CgProfile  className='main-icon-h5'/><span>User</span></h5> </li></NavLink> */}
                             {/* <NavLink to='/product' className='link'><li><h5 className="m-0"><BsCartDash  className='main-icon-h5'/><span>Product</span></h5> </li></NavLink> */}
                             {/* <NavLink to='/buyProduct' className='link'><li><h5 className="m-0"><BsCartDash  className='main-icon-h5'/><span>Product List</span></h5> </li></NavLink> */}
                           {/* <NavLink to='/Country' className='link'><li><h5 className="m-0"><HiMiniFlag  className='main-icon-h5'/><span>Country</span></h5> </li></NavLink>
                            <NavLink to='/Setting' className='link'><li><h5 className="m-0"><IoSettingsSharp  className='main-icon-h5'/><span>Setting</span></h5> </li></NavLink> */}
                        {/* </>
                        :
                        <> */}
                           <NavLink to='/userbuyProduct' className='link'><li><h5 className="m-0"><BsCartDash  className='main-icon-h5'/><span>User Buy Product</span></h5> </li></NavLink>
                           <NavLink to='/UserBuyProductList' className='link'> <li><h5 className="m-0"><BsCartDash  className='main-icon-h5'/><span>User Buy ProductList</span></h5> </li></NavLink>
                           <NavLink to='/wallte' className='link'> <li><h5 className="m-0"><BsCartDash  className='main-icon-h5'/><span>Wallet</span></h5> </li></NavLink>
                           <NavLink to='/transaction' className='link'> <li><h5 className="m-0"><BsCartDash  className='main-icon-h5'/><span>Transaction</span></h5> </li></NavLink>
                            {/* <NavLink to='/Profile' className='link'><li><h5 className="m-0"><CgProfile  className='main-icon-h5'/><span>Profile</span></h5> </li></NavLink> */}
                            {/* <NavLink to='/Setting' className='link'><li><h5 className="m-0"><IoSettingsSharp  className='main-icon-h5'/><span>Setting</span></h5> </li></NavLink> */}
                        {/* </>
                    } */}
                         <button className='btn btn-outline-danger ms-5' onClick={logOut}>Log Out</button>
                        </ul>
                    </div>

                    <div className="side-header">
                        <div className="child-header">
                            <div className="w-100 searchbar">
                                <div className="input-search">
                                    <span>  <FaSearch  className='search-icon-int' /></span>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className="info">
                            <img src="https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                 <div className="body">
                     <Component />
                </div>
          </div>
          </>
        )
      }

      return NewComponent
}