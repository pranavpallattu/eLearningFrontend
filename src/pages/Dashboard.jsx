import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'
import EnrolledCourse from '../components/EnrolledCourse'

function Dashboard() {
  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <div className="text-center mb-4">
          <h2>Welcome User</h2>
          <h3>Enrolled Courses</h3>
        </div>
        <div className="row">
          <div className="col-md-4">
          <EnrolledCourse/>
          </div>
          <div className="col-md-4">
          <EnrolledCourse/>
          </div>
          <div className="col-md-4">
            <EnrolledCourse/>
          </div>
        </div>
      </div>

      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
            <img
              src="https://y.yarn.co/541256d1-2efa-4c00-9ad6-a524f29c4eba_text.gif"
              alt=""
              className="w-50 rounded"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <h1 className="mt-2 text-center">No Enrolled Courses</h1>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
