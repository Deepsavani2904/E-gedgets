import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { HOC } from "./HOC";
import { Button, Form, Modal, Row,Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { addUserApi, deleteApiData, getProfileApi, updateUserData } from "../../../Redux/action/action";

const AddUser = () => {
    const [show, setShow] = useState(false);
    const [check, setCheck] = useState(false);
    let [obj, setObj] = useState({});
    const [blankObj, setblankObj] = useState({});
    const [token, settoken] = useState()
    // const [errorMsg, seterrorMsg] = useState({})
    const state = useSelector(state => state.user);
    const dispatch = useDispatch();
  
          //Get Login Data UseEffect and setToken
          useEffect(() => {
            let isLoginObj = JSON.parse(localStorage.getItem('isLogin'));
            const token = isLoginObj.token;
            dispatch(getProfileApi(token))
            settoken(token)
          }, [])
  
  
          //Data Get Function
          const getValue = async (e) =>{
              obj[e.target.name] = e.target.value;
              blankObj[e.target.name] = "";
  
              setObj({...obj});
              setblankObj({...blankObj})
          }
  
  
        //   //Save Data Function 
          const saveData =async () =>{
                if(obj._id == undefined){
                  dispatch(addUserApi(token,obj))
                }
                else{
                  dispatch(updateUserData(token,obj,obj._id))
                }
                handleClose()
               setCheck(false)
          }
  
  
        // EditData Function
          const editData = (editObj) => {
            delete editObj.password;
            delete editObj.createdAt;
            delete editObj.updatedAt;
            obj = {...editObj};
            obj.id = obj.id;
            console.log(obj)
            setObj({...obj});
            setCheck(true)
            handleShow();
          }


           //Delete Data Function
         const deleteData = (deleteId) =>{
            dispatch(deleteApiData(token,deleteId))
          }
  
  
          //Model close Function
          const handleClose = () => {
            setObj({...blankObj})
            setShow(false);
          }
  
          //Model Show Function
          const handleShow = () => {
            document.querySelector('.main-parent .side-header').style.zIndex = "1"
            setShow(true);
          }    
  return (
        <>
        <div className='text-center mt-4'>
            <Button variant="primary"  onClick={handleShow}>
                Add Profile
            </Button>
         </div>

         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            {/* Form Start */}
        <Form>
            <Row className="mb-3">
            {
              !check?
              <>
              <Form.Group controlId="formGridText">
                <Form.Label>Referral Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Referral Code" onChange={getValue} name="referralCode"/>
                {/* <span className='color'>{errorMsg.idNumber}</span> */}
              </Form.Group>
              <Form.Group  controlId="formGridText">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your userName" value={obj.userName} onChange={getValue} name='userName'/>
                {/* <span className='color'>{errorMsg.idNumber}</span> */}
              </Form.Group> 
              <Form.Group  controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" value={obj.email} onChange={getValue} name='email' />
                {/* <span className='color'>{errorMsg.email}</span> */}
              </Form.Group>

              <Form.Group  controlId="formGridTel">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control type="tel" placeholder="Enter Mobile No" value={obj.mobileNo} onChange={getValue} name='mobileNo'/>
                {/* <span className='color'>{errorMsg.artistName}</span> */}
              </Form.Group> 

              <Form.Group  controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Your Password" value={obj.password} onChange={getValue} name='password'/>
                {/* <span className='color'>{errorMsg.alternativeName}</span> */}
              </Form.Group> 

              <Form.Group  controlId="formGridConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Your Confirm Password" value={obj.confirmPassword} onChange={getValue} name='confirmPassword'/>
                {/* <span className='color'>{errorMsg.chineseName}</span> */}
              </Form.Group> 
              </>
              :
              <>
              <Form.Group  controlId="formGridText">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your userName" value={obj.userName} onChange={getValue} name='userName'/>
                {/* <span className='color'>{errorMsg.idNumber}</span> */}
              </Form.Group> 
              <Form.Group  controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" value={obj.email} onChange={getValue} name='email' />
                {/* <span className='color'>{errorMsg.email}</span> */}
              </Form.Group>

              <Form.Group  controlId="formGridTel">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control type="tel" placeholder="Enter Mobile No" value={obj.mobileNo} onChange={getValue} name='mobileNo'/>
                {/* <span className='color'>{errorMsg.artistName}</span> */}
              </Form.Group> 
              </>
            }
            </Row>
        </Form>

            {/* Form End */}
        </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={saveData}>
            Save & Close
            </Button>
            </Modal.Footer>
      </Modal>
      {/* Modal section End */}

           {/*Table section  */}
       <Table responsive className='mt-5' hover variant='white'>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Mobile No</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
         {
          state.map((x,i) =>{
            return (
              (x.role == 'user')?
              <>
              <tr key={i}>
                      <td>{x.userName}</td>
                      <td>{x.email}</td>
                      <td>{x.mobileNo}</td>
                      <td className='d-flex'>
                      <button className='btn border-0 p-0' onClick={() => editData(x)}><FaEdit size={20} color='#F7DC6F'/></button>
                      <button className='btn border-0'onClick={() => deleteData(x._id)}><MdDelete size={25} color='#EE0808 '/></button>
              </td>
            </tr>
              </>
              :
              <>
              </>
            )
           
          })
         }
      </tbody>
    </Table> 
    <ToastContainer />
        </>
  )
};

export default HOC(AddUser);

//  <>
//     {/* Modal section start */}
//     <div className='text-center mt-5'>
//     <Button variant="primary"  onClick={handleShow}>
//         Add Profile
//       </Button>
//     </div>

    //   <Modal
    //     show={show}
    //     onHide={handleClose}
    //     backdrop="static"
    //     keyboard={false}
    //   >
    //     <Modal.Header closeButton>
    //     </Modal.Header>
    //     <Modal.Body>
    //         {/* Form Start */}
    //     <Form>
    //         <Row className="mb-3">
    //         {
    //           !check?
    //           <>
    //           <Form.Group  controlId="formGridText">
    //             <Form.Label>User Name</Form.Label>
    //             <Form.Control type="text" placeholder="Enter your userName" value={obj.userName} onChange={getValue} name='userName'/>
    //             {/* <span className='color'>{errorMsg.idNumber}</span> */}
    //           </Form.Group> 
    //           <Form.Group  controlId="formGridEmail">
    //             <Form.Label>Email</Form.Label>
    //             <Form.Control type="email" placeholder="Enter your email" value={obj.email} onChange={getValue} name='email' />
    //             {/* <span className='color'>{errorMsg.email}</span> */}
    //           </Form.Group>

    //           <Form.Group  controlId="formGridTel">
    //             <Form.Label>Mobile No</Form.Label>
    //             <Form.Control type="tel" placeholder="Enter Mobile No" value={obj.mobileNo} onChange={getValue} name='mobileNo'/>
    //             {/* <span className='color'>{errorMsg.artistName}</span> */}
    //           </Form.Group> 

    //           <Form.Group  controlId="formGridPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control type="password" placeholder="Enter Your Password" value={obj.password} onChange={getValue} name='password'/>
    //             {/* <span className='color'>{errorMsg.alternativeName}</span> */}
    //           </Form.Group> 

    //           <Form.Group  controlId="formGridConfirmPassword">
    //             <Form.Label>Confirm Password</Form.Label>
    //             <Form.Control type="password" placeholder="Enter Your Confirm Password" value={obj.confirmPassword} onChange={getValue} name='confirmPassword'/>
    //             {/* <span className='color'>{errorMsg.chineseName}</span> */}
    //           </Form.Group> 
    //           </>
    //           :
    //           <>
    //           <Form.Group  controlId="formGridText">
    //             <Form.Label>User Name</Form.Label>
    //             <Form.Control type="text" placeholder="Enter your userName" value={obj.userName} onChange={getValue} name='userName'/>
    //             {/* <span className='color'>{errorMsg.idNumber}</span> */}
    //           </Form.Group> 
    //           <Form.Group  controlId="formGridEmail">
    //             <Form.Label>Email</Form.Label>
    //             <Form.Control type="email" placeholder="Enter your email" value={obj.email} onChange={getValue} name='email' />
    //             {/* <span className='color'>{errorMsg.email}</span> */}
    //           </Form.Group>

    //           <Form.Group  controlId="formGridTel">
    //             <Form.Label>Mobile No</Form.Label>
    //             <Form.Control type="tel" placeholder="Enter Mobile No" value={obj.mobileNo} onChange={getValue} name='mobileNo'/>
    //             {/* <span className='color'>{errorMsg.artistName}</span> */}
    //           </Form.Group> 
    //           </>
    //         }
    //         </Row>
    //   </Form>

    //         {/* Form End */}
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={saveData}>
    //        Save & Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    //   {/* Modal section End */}

    //  {/*Table section  */}
    //   {/* <Table responsive className='mt-5' hover variant='white'>
    //   <thead>
    //     <tr>
    //       <th>User Name</th>
    //       <th>Email</th>
    //       <th>Mobile No</th>
    //       <th>Action</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //      {
    //       state.data?.map((x,i) =>{
    //         return (
    //           (x.role == 'user')?
    //           <>
    //           <tr key={i}>
    //                   <td>{x.userName}</td>
    //                   <td>{x.email}</td>
    //                   <td>{x.mobileNo}</td>
    //                   <td className='d-flex'>
    //                   <button className='btn border-0 p-0' onClick={() => editData(x)}><FaEdit size={20} color='#F7DC6F'/></button>
    //                   <button className='btn border-0'onClick={() => deleteData(x._id)}><MdDelete size={25} color='#EE0808 '/></button>
    //           </td>
    //         </tr>
    //           </>
    //           :
    //           <>
    //           </>
    //         )
           
    //       })
    //      }
    //   </tbody>
    // </Table> */}
    // <ToastContainer />
//     </> */}