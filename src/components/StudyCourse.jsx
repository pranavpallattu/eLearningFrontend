import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../services/serverUrl";
import { getLectureApi } from "../services/allApis";

function StudyCourse() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [token, setToken] = useState("");

  // Retrieve token from sessionStorage on component mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch lectures when token and courseId are available
  useEffect(() => {
    const getLectures = async () => {
      if (!token) return; // Ensure token exists before making API call

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await getLectureApi(courseId, reqHeader);
        setLectures(result.data.lectures); // Update the lectures state
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    getLectures();
  }, [token, courseId]);

  return (
    <div>
      <h2>Lectures for Course ID: {courseId}</h2>
      {lectures.length > 0 ? (
        <ul>
          {lectures.map((lecture) => (
            <li key={lecture._id} style={{ marginBottom: "20px" }}>
              <h4>{lecture.title}</h4>
              <p>{lecture.description}</p>
              <video
                controls
                src={`${serverUrl}/${lecture.lectureVideo}`}
                style={{ width: "100%", maxWidth: "600px" }}
                onError={(e) =>
                  console.error("Video failed to load:", e.target.src)
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No lectures available for this course.</p>
      )}
    </div>
  );
}

export default StudyCourse;
