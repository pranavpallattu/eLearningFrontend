import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'


function Course() {
  return (
    <>
    <Header/>
    <div className="container-fluid p-5">
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
                <div className='d-flex justify-content-center align-items-center flex-column mt-5 ms-auto'>
                <h2>HTML & CSS For Beginners</h2>
                <p>This course is an introduction to Web Development. The most demanding Learn the basics of web development with "HTML & CSS for Beginners" in Malayalam. This course, designed for beginners in Kerala, covers how to create stunning and responsive websites using HTML and CSS. You'll master essential topics like page structure, styling, and layout techniques. Start your web development journey today with easy-to-follow lessons in Malayalam, tailored for aspiring developers in Kerala!</p>
                <h6>Created By Debug Media</h6>
                <p>Last updated 01-JAN-2025</p>
                </div>
            </div>
            <div className="col-md-5">
                <CourseCard/>
            </div>
            <div className="col-md-1"></div>
        </div>
    </div>
    <Footer/>

    </>
  )
}

export default Course