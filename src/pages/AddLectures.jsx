import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting courseId from the URL
import { addLectureApi } from "../services/allApis"; // Import your API function for adding a lecture
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure the CSS is imported

function AddLectures() {
  const { courseId } = useParams(); // Get courseId from URL
  const [lecture, setLecture] = useState({
    title: "",
    description: "",
    lectureVideo: "",
  });

  const [preview, setPreview] = useState(""); // Video preview
  const token = sessionStorage.getItem("token"); // Token from sessionStorage

  // Handle file change and preview generation
  const handleChange = (e) => {
    setLecture({ ...lecture, lectureVideo: e.target.files[0] });
  };

  // Generate preview when the lectureVideo changes
  useEffect(() => {
    if (lecture.lectureVideo) {
      setPreview(URL.createObjectURL(lecture.lectureVideo));
    }
  }, [lecture.lectureVideo]);

  // Submit the form and add the lecture
const handleAddLectures = async (e) => {
  e.preventDefault(); // Prevent default form submission

  const { title, description, lectureVideo } = lecture;

  if (!title || !description || !lectureVideo) {
    toast.error("Please fill out all the fields.");
    return;
  }

  try {
    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("description", description);
    reqBody.append("lectureVideo", lectureVideo);

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };

    // Send API request
    const response = await addLectureApi(courseId, reqBody, reqHeader);
    console.log(response);
    

    if (response.status==201) {
      toast.success("Lecture added successfully!");
      setLecture({ title: "", description: "", lectureVideo: "" });
      setPreview("");
    } else {
      toast.error(response.data || "Failed to add the lecture.");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while adding the lecture.");
  }
};


  return (
    <>
      <div className="container">
        <h3>Add Lecture to Course</h3>

        <form onSubmit={handleAddLectures}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={lecture.title}
              onChange={(e) =>
                setLecture({ ...lecture, title: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              value={lecture.description}
              onChange={(e) =>
                setLecture({ ...lecture, description: e.target.value })
              }
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="video" className="form-label">
              Upload Video
            </label>
            <input
              type="file"
              id="video"
              className="form-control"
              accept="video/*"
              onChange={handleChange}
              required
            />
          </div>

          {preview && (
            <div className="mt-3">
              <video width="300" controls>
                <source src={preview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-3">
            Add Lecture
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default AddLectures;
