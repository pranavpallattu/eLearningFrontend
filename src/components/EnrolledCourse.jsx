import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl'; // Ensure the server URL is imported correctly

function EnrolledCourse({ course }) {
  const navigate = useNavigate();

  const handleStudy = () => {
    // Navigate to the study page with the course ID
    navigate(`/study/${course._id}`);
  };

  return (
    <div className="d-flex flex-wrap gap-3">
      {course ? (
        <Card style={{ width: '100%' }} key={course.id}>
        <Card.Img
  variant="top"
  src={`${serverUrl}/${course.coverImage}`} // No need to prepend "upload" here
  alt={course.title}
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
              <button
                className="btn btn-success p-2 text-center"
                onClick={handleStudy}
              >
                Study
              </button>
              <Link to={`/addlectures/${course._id}`}>
                <button className="btn btn-primary p-2">Add Lectures</button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>No course available.</p>
      )}
    </div>
  );
}

export default EnrolledCourse;
