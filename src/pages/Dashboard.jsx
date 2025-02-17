import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EnrolledCourse from "../components/EnrolledCourse";
import { getUserPurchasedCoursesApi } from "../services/allApis";

function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  console.log(enrolledCourses);

  const user=JSON.parse(sessionStorage.getItem('existingUser'))?.username
  console.log(user);
  

  useEffect(() => {
    fetchEnrolledCourses();
  },[]);

  const fetchEnrolledCourses = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      const response = await getUserPurchasedCoursesApi(reqHeader);
      console.log(response.data.courses);
      setEnrolledCourses(response.data.courses)
      

      // if (response.data) {
      //   setEnrolledCourses(response.data);
      // } else {
      //   console.error("Error fetching enrolled courses");
      // }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid p-3 my-4">
      <h2 className="text-center mt-4"> Welcome Back, <span  style={{color:'#213555'}}>{user}!</span> </h2>
<p className="text-center text-muted">
   "Every expert was once a beginner. Keep learning, keep growing!🚀"
</p>
<h3 className="my-4 text-center"  style={{color:'#213555'}}>Your Enrolled Courses</h3>


        {enrolledCourses.length > 0 ? (
          <div className="row">
            {enrolledCourses.map((course, index) => (
              <div className="col-md-4" key={index}>
                <EnrolledCourse course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="container-fluid py-3">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
                <img
                  src="https://y.yarn.co/541256d1-2efa-4c00-9ad6-a524f29c4eba_text.gif"
                  alt="No Enrolled Courses"
                  className="w-50 rounded"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <h1 className="mt-2 text-center">No Enrolled Courses</h1>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
