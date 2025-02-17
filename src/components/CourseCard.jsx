import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PaymentButton from '../components/PaymentButton'; 
import { serverUrl } from '../services/serverUrl';
import { applyCouponApi, getCouponsForCourseApi, getUserDataApi } from '../services/allApis'; 
import { addPaymentContext } from '../context/ContextApi';

function CourseCard({ page, course }) {
  const user = JSON.parse(sessionStorage.getItem("existingUser"));
  const id = user?._id;
  const token = sessionStorage.getItem("token"); 

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { paymentResponse } = useContext(addPaymentContext);

  const [discountedPrice, setDiscountedPrice] = useState(course?.price);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]); 
  const [selectedCoupon, setSelectedCoupon] = useState('');

  const isEnrolled = enrolledCourses.includes(course._id);

  const reqHeader = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const getUserData = async () => {
    if (!id) return;
    try {
      const result = await getUserDataApi(id, reqHeader);
      setEnrolledCourses(result.data.enrolledCourses);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id, paymentResponse]); 

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCouponsForCourseApi(course._id, reqHeader);
        if (response.status === 200) {
          setAvailableCoupons(response.data); 
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    if (token) {
      fetchCoupons();
    }
  }, [course._id, token]);

  const applyCoupon = async () => {
    if (!selectedCoupon) {
      alert("Please select a coupon.");
      return;
    }

    try {
      const response = await applyCouponApi({ courseId: course._id, couponCode: selectedCoupon }, reqHeader);
      if (response.status === 200) {
        setDiscountedPrice(response.data.finalAmount);
        setDiscountAmount(response.data.discountAmount);
        setCouponApplied(true);
        alert("Coupon applied successfully!");
      } else if (response.status === 406) {
        alert('Coupon has expired');
      } else if (response.status === 401) {
        alert('Coupon not valid');
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      alert("Invalid or expired coupon.");
    }
  };

  return (
    <Card className='shadow mt-4' style={{ width: '100%', borderRadius: "10px", overflow: "hidden" }}>
      {page ? (
        <Card.Img 
          height={'300px'} 
          variant="top" 
          src={`${serverUrl}/uploads/${course.coverImage}`} 
          style={{ objectFit: "cover" }}
        />
      ) : (
        <video 
          controls 
          controlsList="nodownload" 
          style={{ display: "block", margin: "0 auto", maxWidth: "100%", borderRadius: "10px" }}
          src={`${serverUrl}/uploads/${course.introVideo}`}
        ></video>
      )}

      <Card.Body className='my-3'>
        <Card.Title className="text-center fw-bold" style={{ color: "#002147", fontSize: "1.5rem" }}>
          {course?.title}
        </Card.Title>
        
        <Card.Text style={{ textAlign: "justify", color: "#555", fontSize: "0.95rem" }}>
          {course?.description}
        </Card.Text>

        {!page && (
          <div className="mb-3">
            <h6 style={{ fontWeight: "600", color: "#343a40" }}>Tutor: <span style={{ fontWeight: "400" }}>{course?.instructor}</span></h6>
            <h6 style={{ fontWeight: "600", color: "#343a40" }}>Duration: <span style={{ fontWeight: "400" }}>{course?.duration}</span></h6>
            <h6 style={{ fontWeight: "600", color: "#343a40" }}>Skill Level: <span style={{ fontWeight: "400" }}>{course?.skill}</span></h6>
            <h6 style={{ fontWeight: "600", color: "#343a40" }}>Lectures: <span style={{ fontWeight: "400" }}>{course?.lectures?.length}</span></h6>
          </div>
        )}

        {/* Show Price and Coupon Options Only if User is Not Enrolled */}
        {!page && !isEnrolled && (
          <>
            <h3 className="fw-bold mt-3">
              <span style={{ color: "#28a745" }}>₹{discountedPrice}</span>  
              {couponApplied && <span className="text-danger fs-5"> (-₹{discountAmount} off)</span>}
            </h3>  

            {/* Coupon Dropdown */}
            {availableCoupons.length > 0 && (
              <div className="mb-3">
                <h6 style={{ fontWeight: "600", color: "#343a40" }}>Available Coupons:</h6>
                <select 
                  className="form-select"
                  style={{ border: "1px solid #ced4da", padding: "8px", borderRadius: "5px" }}
                  value={selectedCoupon} 
                  onChange={(e) => setSelectedCoupon(e.target.value)}
                >
                  <option value="">Select a Coupon</option>
                  {availableCoupons.map((coupon, index) => (
                    <option key={index} value={coupon.code}>
                      {coupon.code} - ₹{coupon.discount} off
                    </option>
                  ))}
                </select>
                
                <button onClick={applyCoupon} className='btn btn-success p-2 mt-2 w-100'>
                  Apply Coupon
                </button>
              </div>
            )}
            
            {/* Payment Button */}
            <PaymentButton 
              courseId={course?._id} 
              amount={discountedPrice} 
            />
          </>
        )}

{page && !isEnrolled && (
  token ? (
    <Link to={`/course/${course._id}`}>
      <button className="btn btn-primary p-2 enroll-btn">Enroll Now</button>
    </Link>
  ) : (
    <Link to={'/login'}><button className="btn btn-primary p-2 enroll-btn logintoenroll">Login to Enroll</button>
</Link>
  )
)}

        {isEnrolled && (
          <Link to='/dashboard'>
            <button className="btn btn-info p-2 text-light available-btn">Available</button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
