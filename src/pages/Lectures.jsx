import React from 'react';
import Header from '../components/Header';
import AddLectures from './AddLectures';

function Lectures() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            {/* Video section */}
            <div>
              <p>Select a lecture to view the video.</p>
              <video width="100%" controls>
                <source src="" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="col-md-4">
            {/* Add lectures form */}
            <AddLectures />
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            {/* Placeholder for additional content if needed */}
          </div>
          <div className="col-md-4">
            {/* Lecture list */}
            <div>
              <h4>Lecture 1</h4>
            </div>
            <div>
              <h4>Lecture 2</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lectures;
