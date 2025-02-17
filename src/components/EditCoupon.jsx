import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { editCouponApi } from '../services/allApis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { editCouponContext } from '../context/ContextApi';




function EditCoupon({ couponData, courseId }) {
  const [editCoupon, setEditCoupon] = useState({
    code: couponData?.code || "",
    discountAmount: couponData?.discountAmount || "",
    expiryDate: couponData?.expiryDate ? couponData.expiryDate.split("T")[0] : "",
  });

  const{setEditCouponResponse}=useContext(editCouponContext)

  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleCancel = () => {
    setEditCoupon({
      code: couponData?.code || "",
      discountAmount: couponData?.discountAmount || "",
      expiryDate: couponData?.expiryDate ? couponData.expiryDate.split("T")[0] : "",
    });
    setShow(false);
  };

  const handleEdit = async () => {
    const { code, discountAmount, expiryDate } = editCoupon;
    if (!code || !discountAmount || !expiryDate) {
      return toast.info("Please fill out all fields.");
    }

    const reqBody = {
      code,
      discountAmount,
      expiryDate,
      courseId, // Ensure only ID is sent
    };

    if (!token) return toast.warning("Please login");

    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const id = couponData._id;
      const result = await editCouponApi(id, reqBody, reqHeader);
      console.log(id, reqBody, reqHeader);
      

      if (result.status === 200) {
        toast.success("Coupon edited successfully");
        setEditCouponResponse(result)
        setTimeout(() => setShow(false), 2000);
      } else {
        toast.error(result.response?.data || "Something went wrong");
        handleCancel();
      }
    } catch (error) {
      toast.error("Error updating coupon");
    }
  };

  return (
    <>
      <button className='btn btn-warning p-lg-2 p-1 text-light' onClick={() => setShow(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
      <Modal show={show} onHide={handleCancel} className="animate__animated animate__fadeIn modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className='mb-3'>
              <input
                type="text"
                placeholder='Coupon Code'
                value={editCoupon.code}
                onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <input
                type="number"
                placeholder='Discount Amount'
                value={editCoupon.discountAmount}
                onChange={(e) => setEditCoupon({ ...editCoupon, discountAmount: e.target.value })}
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <input
                type="date"
                placeholder='Expiry Date'
                value={editCoupon.expiryDate}
                onChange={(e) => setEditCoupon({ ...editCoupon, expiryDate: e.target.value })}
                className='form-control'
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleEdit}>Edit Coupon</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default EditCoupon;
