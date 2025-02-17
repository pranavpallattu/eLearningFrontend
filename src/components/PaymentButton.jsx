import React, { useContext, useEffect, useState } from 'react';
import { createOrderApi, capturePaymentApi, verifyPaymentApi, storePaymentApi } from '../services/allApis';
import { addPaymentContext } from '../context/ContextApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported


const PaymentButton = ({ courseId, amount }) => {
    console.log(courseId, amount);

    const{setPaymentResponse}=useContext(addPaymentContext)

    const navigate=useNavigate()

    
    const [token, setToken] = useState("");

    // Fetch token from sessionStorage on component mount
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []); // Empty dependency array ensures this runs only once

    const handlePayment = async () => {
        try {
            if (!token) {
                alert("User is not authenticated. Please log in.");
                return;
            }

            if (!courseId || !amount) {
                alert("Invalid course details. Please try again.");
                return;
            }

            // Request headers
            const reqHeader = {
                "Content-Type": "application/json", // Changed to JSON for API consistency
                "Authorization": `Bearer ${token}`
            };

            // Request body
            const reqBody = { 
                amount: amount,
                courseId: courseId,
                currency: "INR"
            };

            console.log('Request Body:', reqBody);  // Add this line to log the request body

            // API call to create an order
            const result = await createOrderApi(reqBody, reqHeader);
            console.log(result);
            
            if (!result?.data) {
                throw new Error("Invalid response from server");
            }

            const { id: order_id, amount: orderAmount, currency } = result.data.order;

            // Set up Razorpay options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Vite environment variable
                amount: orderAmount,
                currency,
                name: "E-learning Platform",
                description: "Course Enrollment",
                order_id,
                handler: async (response) => {
                    console.log("Razorpay Response:", response); 
                
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                
                    // alert(`Payment Successful! Payment ID: ${razorpay_payment_id}`);
                
                    try {
                        // Send payment details to backend for verification
                        const verifyResponse = await verifyPaymentApi({ 
                            paymentId: razorpay_payment_id, 
                            orderId: razorpay_order_id, 
                            signature: razorpay_signature 
                        }, reqHeader);
                
                        console.log("Verification API Response:", verifyResponse);
                
                        if (verifyResponse.data.success) {
                            // alert("Payment verified successfully!");
                            const user = JSON.parse(sessionStorage.getItem("existingUser")); // ✅ Parse user
                            const userId = user?._id; // ✅ Extract userId
                            console.log(userId);
                            
                                
                            // ✅ Store payment details in database
                            const storePaymentResponse = await storePaymentApi({
                                userId,
                                paymentId: razorpay_payment_id,
                                orderId: razorpay_order_id,
                                courseId,
                                amount,
                                currency: "INR"
                            }, reqHeader);
                
                            console.log("Store Payment Response:", storePaymentResponse);
                            setPaymentResponse(storePaymentResponse)
                            toast.success('Payment successfully completed');
                           setTimeout(() => {
                            navigate("/payment");
                           }, 4000);
                        } else {
                            toast.error("Payment failed.");
                        }
                    } catch (error) {
                        console.error("Error during payment verification:", error);
                        alert("Payment verification failed. Please try again.");
                    }
                },
                

                
                
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#3399cc" },
                method: {
                    upi: true,  // ✅ Ensure UPI is enabled
                    card: true,
                    netbanking: true,
                    wallet: true,
                  },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
            alert("Payment failed. Please try again.");
        }
    };

    // Function to capture the payment on the backend
    const capturePayment = async (paymentId, orderId) => {
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    
        const reqBody = { paymentId, orderId };
        console.log("Capture Payment Request Body:", reqBody);  // Log request body
    
        try {
            const captureResponse = await capturePaymentApi(reqBody, reqHeader); 
            console.log("Capture Response:", captureResponse); // Log response
    
            return captureResponse.data;
        } catch (error) {
            console.error("Error during payment capture:", error);
            throw new Error("Error capturing payment: " + error.message);
        }
    };
    

    return (
    <>
            <button onClick={handlePayment} className="btn btn-success p-2">
            Pay Now
        </button>
              <ToastContainer position="top-center" autoClose={3000} theme="colored" />

    </>        
    );
};

export default PaymentButton;
