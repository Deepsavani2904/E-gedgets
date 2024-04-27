import React, { useEffect, useState } from "react";
import { HOC } from "./HOC";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductData,
  deleteProductData,
  getProductApi,
  updateProductData,
} from "../../../Redux/action/action";

const Product = () => {
  const [show, setShow] = useState(false);
  let [obj, setObj] = useState({});
  const [blankObj, setblankObj] = useState({});
  const [image, setImage] = useState();
  const [editObjImage, setEditObjImage] = useState();
  
  const [token, settoken] = useState();
  // const [errorMsg, seterrorMsg] = useState({})
  const state = useSelector((state) => state.product);
  const dispatch = useDispatch();

  //Get Login Data UseEffect and setToken
  useEffect(() => {
    let isLoginObj = JSON.parse(localStorage.getItem("isLogin"));
    const token = isLoginObj.token;
    dispatch(getProductApi(token));
    settoken(token);
  }, []);
  // console.log(state, "state");

  const getValue = async (e) => {
    if (e.target.type == "file") {
      let image = await toBase64(e.target.files[0]);
      if(image){
        setImage(image)
        setEditObjImage("")
      }
      else{
        setImage("")
        setEditObjImage("")
      }
      obj[e.target.name] = e.target.files[0];
      blankObj[e.target.name] = "";
    } else {
      obj[e.target.name] = e.target.value;
      blankObj[e.target.name] = "";
    }
    setObj({ ...obj });
    setblankObj({ ...blankObj });
  };

  const saveData = () => {
    const formData = new FormData();
    for (let key in obj) {
      formData.append(key, obj[key]);
    }
    if (obj._id == undefined) {
      dispatch(addProductData(token, formData));
      setImage("")
      setEditObjImage("")
    } else {
      dispatch(updateProductData(token, formData, obj._id));
      setImage("")
      setEditObjImage("")
    }
    handleClose();
  };

  // EditData Function
  const editData = (editObj) => {
    obj = { ...editObj };
    const editImage = editObj.image || ""
    setEditObjImage(editImage)
    obj.id = obj._id;
    setObj({ ...obj });
    handleShow();
  };

  //Delete Data Function
  const deleteData = (deleteId) => {
    dispatch(deleteProductData(token, deleteId));
  };

  //Model close Function
  const handleClose = () => {
    setObj({ ...blankObj });
    setEditObjImage('')
    setImage('')
    setShow(false);
  };

  //Model Show Function
  const handleShow = () => {
    document.querySelector('.main-parent .side-header').style.zIndex = "1"
    setShow(true);
  };
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });

  return (
    <>
      <div className="text-center" style={{ marginTop: "5rem" }}>
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {/* Form Start */}
          <Form>
            <Row className="mb-3">
              <Form.Group controlId="formGridText">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={obj.productName}
                  onChange={getValue}
                  name="productName"
                />
                {/* <span className='color'>{errorMsg.idNumber}</span> */}
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Product Price"
                  value={obj.productPrice}
                  onChange={getValue}
                  name="productPrice"
                />
                {/* <span className='color'>{errorMsg.email}</span> */}
              </Form.Group>

              <Form.Group controlId="formGridTel">
                <Form.Label>Product Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Type"
                  value={obj.productType}
                  onChange={getValue}
                  name="productType"
                />
                {/* <span className='color'>{errorMsg.artistName}</span> */}
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={obj.description}
                  onChange={getValue}
                  name="description"
                />
                {/* <span className='color'>{errorMsg.alternativeName}</span> */}
              </Form.Group>

              <Form.Group controlId="formGridConfirmPassword">
                <Form.Label>productColor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Color"
                  value={obj.productColor}
                  onChange={getValue}
                  name="productColor"
                />
                {/* <span className='color'>{errorMsg.chineseName}</span> */}
              </Form.Group>

              <Form.Group controlId="formGridConfirmPassword">
                <Form.Label>Product Image</Form.Label> 
                {/* <Form.Label htmlFor="img" className="btn btn-dark">
                  Select File
                </Form.Label> */}
                {/* <br /> */}
                <Form.Control
                  id="img"
                  type="file"
                  // className="d-none"
                  onChange={getValue}
                  name="image"
                />

                {
                  editObjImage ?
                  <>
                  <img src={`http://localhost:5000/api/images/${editObjImage}`} alt="Selected Product" style={{  marginTop: "10px", maxHeight: "100px", maxWidth: "100px",}}/>
                  </> 
                  :
                  <>
                  {
                    image ?
                    <>
                    <img src={image} alt="Selected Product" style={{ marginTop: "10px", maxHeight: "100px", maxWidth: "100px",}}/>
                    </>
                    :
                    <>
                    {/* <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThVUS9Xy7k3ddEcopWG7yJxw8Gg_99ybELx4kjDgF1eQ&s'} alt="Selected Product" style={{  marginTop: "10px", maxHeight: "100px", maxWidth: "100px",}}/> */}
                    </>
                  }
                  </>
                }

                {/* {
                console.log(obj.image,"obj.imageobj.image")}
                {obj.image && (
                <img src={obj.image} alt="Selected Product" style={{ width: "auto", height: "auto", maxHeight: "100px", maxWidth: "100px",}}/>
                 )} */}
                {/* <span className='color'>{errorMsg.chineseName}</span> */}
              </Form.Group>
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

      {/* product section  */}

      <div className="container mt-5">
        <div className="row">
          {state.map((x) => {
            return (
              <div className="col-4 mt-3">
                <div className="products_list-item shadow-lg" style={{borderRadius:"20px"}}>
                  <div className="products_list-item_wrapper d-flex flex-column">
                    <div className="media">
                      <a href="#">
                        <img
                          className="lazy preview entered loaded"
                          data-src="img/wishlist/04.jpg"
                          src={`http://localhost:5000/api/images/${x.image}`}
                          alt="Tangerine Dream"
                          data-ll-status="loaded"
                        />
                      </a>
                    </div>
                    <div className="main d-flex flex-column align-items-center justify-content-between">
                      <a
                        class="main_title"
                        href="product.html"
                        target="_blank"
                        rel="noopener norefferer"
                      >
                        {x.productName}
                      </a>

                      <ul class="main_table d-flex flex-column align-items-center p-0">
                        <li class="list-item">
                          <span class="property">Color: </span>
                          <span class="value">{x.productColor}</span>
                        </li>
                        <li class="list-item">
                          <span class="property">Type: </span>
                          <span class="value">{x.productType}</span>
                        </li>
                      </ul>
                      <div className="description">{x.description}</div>
                      <div class="main_price">
                        <span class="price">₹{x.productPrice}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-outline-warning me-2"
                        onClick={() => editData(x)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteData(x._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HOC(Product);
