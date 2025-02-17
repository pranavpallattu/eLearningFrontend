import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { useParams } from 'react-router-dom';
import { getSpecificCourseApi } from '../services/allApis';

function Course() {
  const { courseId } = useParams(); // Get courseId from URL
  console.log(courseId);

  const [course, setCourse] = useState(null);
  console.log(course);

  const getCourse = async () => {
    try {
      // Pass courseId to API to fetch the specific course
      const result = await getSpecificCourseApi(courseId);
      if (result.status === 200) {
        console.log('Course fetched successfully:', result.data);
        setCourse(result.data); // Update course state with the fetched data
      } else {
        console.log('Failed to fetch course');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  // Convert Date to "DD MMM YYYY" format
  const formatDate = (dateString) => {
    if (!dateString) return "Loading...";
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Fetch the specific course data when component mounts
  useEffect(() => {
    getCourse();
  }, [courseId]);

  return (
    <>
      <Header />
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className='d-flex justify-content-center align-items-center flex-column mt-5 ms-auto'>
              <h2 className="fw-bold text-primary">{course?.title || 'Loading...'}</h2>
              <p style={{textAlign:'justify'}} className="text-muted fs-5">{course?.description || 'Loading...'}</p>
              <h6 className="fw-semibold">Created by <span className="text-dark">TechX</span></h6>
              <p className="text-secondary">Last updated: {formatDate(course?.updatedAt)}</p>
            </div>
          </div>
          <div className="col-md-5">
            {/* Pass the fetched course to CourseCard */}
            {course && <CourseCard page={false} course={course} />}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Course;
