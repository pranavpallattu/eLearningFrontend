import React, { useContext, useEffect, useState } from "react";
import { deleteCouponApi, getCouponsApi } from "../services/allApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import EditCoupon from "../components/EditCoupon";
import Footer from "../components/Footer";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteCouponContext, editCouponContext } from "../context/ContextApi";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [token, setToken] = useState("");

  const { editCouponResponse } = useContext(editCouponContext);
  const { deleteCouponResponse, setDeleteCouponResponse } = useContext(deleteCouponContext);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCoupons();
    }
  }, [token, editCouponResponse, deleteCouponResponse]);

  const fetchCoupons = async () => {
    if (!token) return;

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getCouponsApi(reqHeader);

      if (result.status === 200) {
        setCoupons(result.data);
      } else {
        toast.error("Failed to fetch coupons");
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error("Server error while fetching coupons");
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;

    const reqHeader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await deleteCouponApi(id, reqHeader);
      if (result.status === 200) {
        setDeleteCouponResponse(result);
        toast.success("Coupon deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container my-4">
        <Card className="shadow-lg animate__animated animate__fadeIn">
          <Card.Body>
            <h2 className="text-center text-primary fw-bold mb-4 animate__animated animate__fadeInDown fs-4">
              Manage Coupons
            </h2>
            <div className="row">
              <div className="col-12">
                {/* Ensuring table does not overflow */}
                <div className="table-responsive" style={{ overflowX: "auto", maxWidth: "100%" }}>
                  <Table className="table table-hover table-bordered text-center align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th className="p-2">Code</th>
                        <th className="p-2">Course</th>
                        <th className="p-2">Discount</th>
                        <th className="p-2">ExpiryDate</th>
                        <th className="p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.length > 0 ? (
                        coupons.map((coupon) => (
                          <tr key={coupon._id}>
                            <td className="p-2 text-break" style={{ maxWidth: "100px", whiteSpace: "normal" }}>
                              {coupon.code}
                            </td>
                            <td className="p-2 text-break" style={{ maxWidth: "200px", whiteSpace: "normal" }}>
                              {coupon.courseId?.title || "N/A"}
                            </td>
                            <td className="fw-bold text-success p-2">₹{coupon.discountAmount}</td>
                            <td className="p-2">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                            <td className="p-2">
                              <div className="d-flex justify-content-center gap-2">

                              <EditCoupon couponData={coupon} courseId={coupon._id} />

                                  <button  className="btn btn-danger p-lg-2 p-1"onClick={() => handleDelete(coupon._id)}><FontAwesomeIcon icon={faTrashCan} />
                                  </button>
                         

                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted p-3">
                            No coupons available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      </div>
      <Footer />
    </>
  );
}

export default AdminCoupons;
