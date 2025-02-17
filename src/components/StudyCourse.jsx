import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../services/serverUrl";
import { deleteLectureApi, getLectureApi } from "../services/allApis";
import "animate.css"; // Ensure Animate.css is included

function StudyCourse() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [token, setToken] = useState("");
  const [courseTitle,setCourseTitle]=useState("")

  const role=JSON.parse(sessionStorage.getItem('existingUser'))?.role
  console.log(role);
  

  // Retrieve token from sessionStorage on component mount
  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
   
  }, []);

  // Fetch lectures when token and courseId are available
  useEffect(() => {
    const getLectures = async () => {
      if (!token) return; // Ensure token exists before making API call

      const reqHeader = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };

      try {
        const result = await getLectureApi(courseId, reqHeader);
        console.log(result);
        setCourseTitle(result.data.course.title)
        
        
        setLectures(result.data.lectures); // Update the lectures state
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    getLectures();
  }, [token, courseId]);

  const handleDelete=async(id)=>{
    console.log(id);
    
    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

       
    console.log(reqHeader);
    

    const result=await deleteLectureApi(id,reqHeader)
    console.log(id);
    
    console.log(result);
    }
  
    

  }

  return (
    <div className="container my-5">
      {/* Course Title */}
      <div className="text-center mb-4 animate__animated animate__fadeInDown">
        <h2 className="fw-bold text-danger p-3 rounded" style={{backgroundColor:'#213555'}}>
        Lectures For {courseTitle}        </h2>
      </div>

      {/* Lectures List */}
      {lectures.length > 0 ? (
        <div className="row">
          {lectures.map((lecture) => (
            <div
              key={lecture._id}
              className="col-md-6 col-lg-4 mb-4 animate__animated animate__fadeInUp"
            >
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold">
                    {lecture.title}
                  </h5>
                  <p className="card-text text-muted">{lecture.description}</p>
                  <div className="ratio ratio-16x9">
                    <video
                      controls
                      src={`${serverUrl}/${lecture.lectureVideo}`}
                      className="w-100 rounded"
                      onError={(e) =>
                        console.error("Video failed to load:", e.target.src)
                      }
                    />
                  </div>
                  <div className="mt-2" >
                  { role=='admin' && <button className="btn btn-danger p-2 mt-2" onClick={()=>{handleDelete(lecture._id)}}>delete</button>
                }
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5 animate__animated animate__fadeIn">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
            alt="No Lectures"
            className="w-25"
          />
          <p className="text-muted mt-3">No lectures available for this course.</p>
        </div>
      )}
    </div>
  );
}

export default StudyCourse;
