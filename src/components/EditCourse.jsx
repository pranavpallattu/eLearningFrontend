import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import { editCourseApi } from '../services/allApis';
import { serverUrl } from '../services/serverUrl';
import { editCourseContext } from '../context/ContextApi';
import "react-toastify/dist/ReactToastify.css"; 

function EditCourse({ course }) {
  const [editCourseDetails, setEditCourseDetails] = useState({
    title: "",
    instructor: "",
    price: "",
    skill: "",
    duration: "",
    description: "",
    coverImage: "",
    introVideo: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);

  const { setEditCourseResponse } = useContext(editCourseContext);

  // Load initial course details when modal opens
  useEffect(() => {
    if (show) {
      setEditCourseDetails({
        title: course.title,
        instructor: course.instructor,
        price: course.price,
        skill: course.skill,
        duration: course.duration,
        description: course.description,
        coverImage: course.coverImage,
        introVideo: course.introVideo,
      });

      setPreviewImage(`${serverUrl}/uploads/${course.coverImage}`);
      setPreviewVideo(`${serverUrl}/uploads/${course.introVideo}`);
    }
  }, [show, course]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  // Handle Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setEditCourseDetails({ ...editCourseDetails, coverImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle Video Upload
  const handleVideo = (e) => {
    const file = e.target.files[0];
    setEditCourseDetails({ ...editCourseDetails, introVideo: file });
    setPreviewVideo(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleUpdate = async () => {
    const { title, instructor, price, skill, duration, description, coverImage, introVideo } = editCourseDetails;

    if (!title || !instructor || !price || !skill || !duration || !description) {
      toast.info("Please fill out all fields.");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("instructor", instructor);
    reqBody.append("price", price);
    reqBody.append("skill", skill);
    reqBody.append("duration", duration);
    reqBody.append("description", description);
    coverImage instanceof File ? reqBody.append("coverImage", coverImage) : reqBody.append("coverImage", course.coverImage);
    introVideo instanceof File ? reqBody.append("introVideo", introVideo) : reqBody.append("introVideo", course.introVideo);

    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      const id = course._id;
      const result = await editCourseApi(id, reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Course updated successfully!");
        setEditCourseResponse(result);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      } else {
        toast.error("Something went wrong.");
      }
    } else {
      toast.warning("Please log in.");
    }
  };

  return (
    <>
      <button onClick={() => setShow(true)} className='btn btn-primary p-lg-2 p-1 me-2'>
        Edit
      </button>

      <Modal show={show} onHide={handleCancel} className="animate__animated animate__fadeIn modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              {/* Video Preview Section */}
              <div className="col-md-6 d-flex flex-column align-items-center">
                {previewVideo ? (
                  <video width="100%" controls src={previewVideo} />
                ) : (
                  <p>No video uploaded</p>
                )}
                <label htmlFor="videoUpload" className="btn btn-primary my-2">
                  Change Video
                </label>
                <input type="file" accept="video/*" id="videoUpload" className="d-none" onChange={handleVideo} />
              </div>

              {/* Form Fields */}
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Title"
                  value={editCourseDetails.title}
                  onChange={(e) => setEditCourseDetails({ ...editCourseDetails, title: e.target.value })}
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  placeholder="Instructor"
                  value={editCourseDetails.instructor}
                  onChange={(e) => setEditCourseDetails({ ...editCourseDetails, instructor: e.target.value })}
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={editCourseDetails.price}
                  onChange={(e) => setEditCourseDetails({ ...editCourseDetails, price: e.target.value })}
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  placeholder="Skill Level"
                  value={editCourseDetails.skill}
                  onChange={(e) => setEditCourseDetails({ ...editCourseDetails, skill: e.target.value })}
                  className="form-control mb-3"
                />

                {/* Image Upload */}
                <label htmlFor="photoUpload" className="form-label">Upload Cover Image</label>
                <input type="file" id="photoUpload" className="form-control" accept="image/*" onChange={handleImage} />
                {previewImage && <img src={previewImage} alt="Cover Preview" className="mt-3 w-100" />}

                <input
                  type="text"
                  placeholder="Duration"
                  value={editCourseDetails.duration}
                  onChange={(e) => setEditCourseDetails({ ...editCourseDetails, duration: e.target.value })}
                  className="form-control mt-3"
                />
                <textarea
                  rows={5}
                  placeholder="Description"
                  value={editCourseDetails.description}
                  onChange={(e) => setEditCourseDetails({ ...editCourseDetails, description: e.target.value })}
                  className="form-control mt-3"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Edit Course
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}

export default EditCourse;
