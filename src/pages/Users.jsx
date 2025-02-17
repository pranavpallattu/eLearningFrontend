import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import AdminHeader from "../components/AdminHeader";
import { deleteUserApi, getAllUsersApi } from "../services/allApis";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Footer from "../components/Footer";
import { removeUserContext } from "../context/ContextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Users() {
  const [token, setToken] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const{removeUserResponse,setRemoveUserResponse}=useContext(removeUserContext)

  const getAllUsers = async () => {
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await getAllUsersApi(reqHeader);
        setUsersData(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const result=await deleteUserApi(id, reqHeader);
     if(result.status==200){
      setUsersData(usersData.filter(user => user._id !== id)); // Update UI after delete
      setRemoveUserResponse(result)
     }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [token,removeUserResponse]);

  return (
    <>
      <AdminHeader />
      <div className="container my-4">
        {/* Table Header */}
        <h3 className="text-center fw-semibold text-primary mb-4 animate__animated animate__fadeInDown">
          <i className="bi bi-people-fill"></i> Users Data
        </h3>

        {/* Loader */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            {usersData?.length > 0 ? (
              <div className="table-responsive">
                <Table striped bordered hover responsive="md" className="text-center align-middle shadow-sm">
                  <thead className="table-dark text-white sticky-top">
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      {/* <th>Enrolled Courses</th> */}
                      <th>Total Paid (₹)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((user, index) => (
                      <tr key={user._id} className="table-row-hover">
                        <td className="fw-bold">{index + 1}</td>
                        <td className="text-wrap">{user.username}</td>
                        <td className="text-wrap">{user.email}</td>
                        {/* <td>
                          {user.enrolledCourses.length > 0 ? (
                            user.enrolledCourses.map((course, i) => (
                              <span key={i} className=" p-1 me-1 bg-info text-white rounded">
                                {course.title}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">No courses</span>
                          )}
                        </td> */}
                        <td className="fw-bold text-success">₹{user.totalPaid}</td>
                        <td>
                          <button className="btn btn-danger p-2" onClick={() => handleDelete(user._id)}>
                                             <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Alert variant="warning" className="text-center">
                <i className="bi bi-exclamation-circle"></i> No users found!
              </Alert>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Users;
