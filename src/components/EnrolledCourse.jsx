import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl'; // Ensure the server URL is imported correctly
import { deleteCourseApi } from '../services/allApis';
import AddCoupons from './AddCoupons';
import EditCourse from './EditCourse';
import { deleteCourseContext } from '../context/ContextApi';
import { toast } from 'react-toastify';

function EnrolledCourse({ course }) {
  const navigate = useNavigate();
  const [token, setToken] = useState("")

  const{setDeleteCourseResponse}=useContext(deleteCourseContext)


  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  const role = existingUser?.role;
  console.log("User Role:", role);



  const handleStudy = () => {
    // Navigate to the study page with the course ID
    navigate(`/study/${course._id}`);
  };

  const handleDelete = async (id) => {
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }

      const result = await deleteCourseApi(id, reqHeader)
      if(result.status==200){
        toast.success('course deleted successfully')
        setDeleteCourseResponse(result)
      }
      console.log(id);

      console.log(result);


    }
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      {course ? (
        <Card style={{ width: '100%' }} key={course._id}>
          <Card.Img
            variant="top"
            src={`${serverUrl}/uploads/${course.coverImage}`} // No need to prepend "upload" here
            alt={course.title}
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '5px' }}
            onError={(e) => {
              e.target.src = "/default-image.jpg"; // Fallback in case of error
            }}
          />

          <Card.Body>
            <Card.Title className="text-center">{course.title}</Card.Title>
            <Card.Text style={{ textAlign: 'justify' }}>
              {course.description || 'No description available.'}
            </Card.Text>
            <div className="d-flex justify-content-between">
            {role=='admin' &&  <button
                className="btn text-light  p-lg-2 p-1 me-2 text-center"
                style={{backgroundColor:'#213555'}}
                onClick={handleStudy}
              >
                Study
              </button>}

             {role=='user' && <button
                className="btn text-light w-100  p-lg-2 p-1 me-2 text-center"
                style={{backgroundColor:'#213555'}}
                onClick={handleStudy}
              >
                Study
              </button>}
              {role == 'admin' && <Link to={`/addlectures/${course._id}`}>
                <button className="btn btn-primary  p-lg-2 p-1 me-2">Add Lectures</button>
              </Link>}

              {/* <Link to={`/admin/addcoupons/${course._id}`}><AddCoupons/></Link> */}
              {role == 'admin' && <AddCoupons courseId={course._id} />
              }

              {role == 'admin' && <EditCourse course={course} />}

              {role == 'admin' && <button className='btn btn-2 btn-danger  p-lg-2 p-1 me-2' onClick={() => { handleDelete(course._id) }} >Delete</button>
              }            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>No course available.</p>
      )}
    </div>
  );
}

export default EnrolledCourse;
