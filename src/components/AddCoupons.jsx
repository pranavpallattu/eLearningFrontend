
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported
import { ToastContainer, toast } from "react-toastify";
import { addCouponApi } from '../services/allApis';


function AddCoupons({courseId}) {
    console.log(courseId);

    
    
    
  const [coupon, setCoupon] = useState({
    code:"",
    discountAmount:"",
    expiryDate:"",
  });


  
  const[token,setToken]=useState("")


  const handleCancel=()=>{
    setCoupon({
        code:"",
        discountAmount:"",
        expiryDate:"",  
        courseId,  
    })
  }

  const handleAdd=async()=>{
    const{code,discountAmount,expiryDate}=coupon
    if(!code || !discountAmount|| !expiryDate){
      toast.info("please fill the form")

    }
    else{
      const reqBody={
        code,
        discountAmount,
        expiryDate,    
        courseId,  
      }
    

        if(token){ 
         const reqHeader={
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
         const result=await addCouponApi(reqBody,reqHeader)
         console.log(result);
         if(result.status==200){
          toast.success(`coupon added successfully`)
          setTimeout(() => {
            handleClose()
          }, 2000);
        }
        else if(result.status==406){
          toast.error(result.response.data)
          handleCancel()
        }else{
          toast.error("something went wrong")
          handleClose()
        }
        }
        else{
          toast.warning("please login")
        }


      
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  
  

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    handleCancel()
  };
  const handleShow = () => setShow(true);

  return (
    <>
     <button className='btn btn-success  p-lg-2 p-1 me-2' onClick={handleShow}>Add Coupon</button>
      <Modal show={show} onHide={handleClose} className="animate__animated animate__fadeIn animate_ modal-lg">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Add Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <div className="container">
            <div className="row">
                <div className='mb-3'>
                  <input
                    type="text"
                    placeholder='Coupon code'
                    value={coupon.code}
                    onChange={(e) => setCoupon({ ...coupon, code: e.target.value })}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type="number"
                    placeholder='Discount Amount'
                    value={coupon.discountAmount}
                    onChange={(e) => setCoupon({ ...coupon, discountAmount: e.target.value })}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type="date"
                    placeholder='Expiry Date'
                    value={coupon.expiryDate}
                    onChange={(e) => setCoupon({ ...coupon, expiryDate: e.target.value })}
                    className='form-control'
                  />
                </div>
               
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={handleCancel} className="btn-custom">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd} className="btn-custom">
            Add Coupon
          </Button>
        </Modal.Footer>
      </Modal>
       <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default AddCoupons;











