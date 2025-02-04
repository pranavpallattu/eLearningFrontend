import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/allApis";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported
import { ToastContainer, toast } from "react-toastify";


function Auth({ register }) {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  console.log(userDetails);
  

  const handleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info("Please fill the form");
    } else {
      const reqBody = {
        username,
        email,
        password,
      };
      // api
      try {
        const result = await registerApi(reqBody);
        if (result.status >= 200 && result.status <= 299) {
          toast.success("User registered successfully");
          setUserDetails({
            username: "",
            email: "",
            password: "",
          })
          setTimeout(()=>{
            navigate('/login')
          },2000)
        } else if (result.status === 400) {
          toast.warning(result.response?.data || "Bad request");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("An error occurred");
        console.error(error);
      }
    }
  };

  const handleLogin =async() => {
    const{email,password,role}=userDetails
    // console.log(email,password,role);
    if(!email || !password || !role){
      toast.info("please fill the form")
    }
    try{
      const reqBody={
        email,
        password,
        role
      }  
      const result=await loginApi(reqBody)
      console.log(result);
      if(result.status==200){
        toast.success("login successfull")
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setUserDetails({
          username: "",
          email: "",
          password: "",
        })
        const role=result.data.existingUser.role
        setTimeout(()=>{
          if(role=="user"){
            navigate('/')
          }
          else if(role=="admin"){
            navigate('/adminPage')
          }
          
        },2000)
       
      }
     
    }
    
    catch(error){
      console.log(error);
    }
     
    }
    
  

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2E5077",
          padding: "20px",
          margin: "0",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="text-center">
            <h4>
              Tech<span className="fs-3 text-danger">X</span>
            </h4>
            {!register ? (
              <p>Sign In to Your Account</p>
            ) : (
              <p>Sign Up to Your Account</p>
            )}
          </div>
          {register && (
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                value={userDetails.role}
                className="form-control"
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email ID"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            {!register && (
              <select
                className="form-control"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, role: e.target.value })
                }
                value={userDetails.role}
                id="role"
                name="role"
                required
              >
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            )}
          </div>
          {!register ? (
            <div className="mb-3">
              <button
                className="text-white w-100 btn p-2 mb-2"
                style={{ backgroundColor: "#213555" }}
                onClick={handleLogin}
              >
                Login
              </button>
              <p>
                New User? Click Here to <Link to="/register">Register</Link>
              </p>
            </div>
          ) : (
            <div className="mb-3">
              <button
                className="text-white w-100 btn p-2 mb-2"
                style={{ backgroundColor: "#213555" }}
                onClick={handleRegister}
              >
                Register
              </button>
              <p>
                Already a User? Click Here to <Link to="/login">Login</Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default Auth;
