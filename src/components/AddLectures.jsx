import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For getting courseId from the URL
import { addLectureApi } from "../services/allApis"; // API function for adding a lecture
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

  // Handle file change and generate preview
  const handleChange = (e) => {
    const file = e.target.files[0];
    setLecture({ ...lecture, lectureVideo: file });

    // Generate video preview
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setPreview(videoUrl);
    }
  };

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

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      // Send API request
      const response = await addLectureApi(courseId, reqBody, reqHeader);
      console.log(response);

      if (response.status === 201) {
        toast.success("Lecture added successfully!");
        setLecture({ title: "", description: "", lectureVideo: "" });
        setPreview(""); // Clear preview
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
    
      <div className="container p-4 shadow-lg rounded bg-white">
        <h4 className="text-center  fw-bold mb-4" style={{color:'#213555'}}>Add New Lecture</h4>

        <form onSubmit={handleAddLectures} className="p-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Lecture Title
            </label>
            <input
              type="text"
              id="title"
              className="form-control border-primary"
              placeholder="Enter lecture title"
              value={lecture.title}
              onChange={(e) =>
                setLecture({ ...lecture, title: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              id="description"
              className="form-control border-primary"
              placeholder="Enter a brief description"
              value={lecture.description}
              onChange={(e) =>
                setLecture({ ...lecture, description: e.target.value })
              }
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="video" className="form-label fw-semibold">
              Upload Lecture Video
            </label>
            <input
              type="file"
              id="video"
              className="form-control border-primary"
              accept="video/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Video Preview */}
          {preview && (
            <div className="mb-3 text-center">
              <h6 className="text-muted">Video Preview</h6>
              <video width="75%" height="75%" controls className="rounded shadow-sm">
                <source src={preview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" style={{backgroundColor:'#213555'}}>
              Upload Lecture
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default AddLectures;
