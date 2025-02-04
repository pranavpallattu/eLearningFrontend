import React, { useEffect, useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AddCourse from '../components/AddCourse';
import EnrolledCourse from '../components/EnrolledCourse';
import { getCourseApi } from '../services/allApis';

function AdminPage() {

  const [courseDetails, setCourseDetails] = useState([]);
  
  // Fetch course data
  const getCourse = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await getCourseApi(reqHeader);
        console.log("API Response:", result.data);

        // Log unique courses before setting state
        const uniqueCourses = result.data.filter(
          (course, index, self) => index === self.findIndex((c) => c._id === course._id)
        );
        console.log("Unique Courses:", uniqueCourses);
        setCourseDetails(uniqueCourses);

      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  };
  
  useEffect(() => {
    console.log('component mounted');
    getCourse();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="container-fluid mt-5">
        <AddCourse />

        <div className="row mt-5">
          {courseDetails.length > 0 ? (
            courseDetails.map((item) => (
              <div className="col-md-4" key={item._id}>
                <EnrolledCourse course={item} />
              </div>
            ))
          ) : (
            <p>No courses</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
