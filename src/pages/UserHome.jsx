import React, { useEffect, useState } from 'react'
import Author from '../components/Author'
import CourseCard from '../components/CourseCard'
import { Link } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'animate.css';
import { getUserCoursesApi } from '../services/allApis';


function UserHome() {

  const[allCourses,setAllCourses]=useState([])

  const getUserCourses = async () => {
    try {
      const result = await getUserCoursesApi();
      if (result.status === 200) {
        console.log('Courses fetched successfully:', result.data);
        setAllCourses(result.data); // Update courses state
      } else {
        console.log('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    getUserCourses();
  }, []);
  return (
    <>
    <Header/>
   <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
  <div className="row align-items-center mt-5">
    <div className="col-md-6 mb-4 mb-md-0">
      <div className="text-center text-md-start">
        <h1 className="display-5 fw-bold mb-3 animate__animated animate__bounce" style={{ color: "#213555" }}>
          Learn Code with Ease  
          <br /> From Industry Experts
        </h1>
        <p className="fs-5" style={{ textAlign: "justify", color: "#555" }}>
          Discover why TechX is Kerala's top choice for online education!  
          Learn programming in Malayalam through expert-led tutorials and gain  
          practical skills to excel in the tech industry.
        </p>
      </div>
    </div>
    <div className="col-md-6">
      <div className="d-flex justify-content-center">
        <img 
          src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Ftotal-students.png&w=640&q=75" 
          alt="Learn Code" 
          className="img-fluid rounded shadow"
          style={{ maxWidth: "90%" }}
        />
      </div>
    </div>
  </div>
</div>
<Author/>

    <div className='text-center mt-5'>
    <h2>Our Courses</h2>
    </div>
    <div className="container-fluid p-4">
        <div className="row">
            {allCourses?.length>0 ?
            allCourses.map((item)=>(
              <div className="col-md-4">
              <CourseCard course={item} page={true}/>
          </div>
            ))
            
            :
            <h4>no courses</h4>
            }
        </div>
    </div>

    <div className='text-center mt-5'>
    <h6 className='mt-3'>Features</h6>
    <h3 className='mt-4'>What we Offer</h3>
    <p className='mt-4'>Whether you're a beginner or an experienced coder, our courses are designed to help you advance your skills with different learning strategies.</p>
    </div>

    <div className="container border border-2 border-secondary rounded p-0">
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6 text-center">
                    <h2 className='mb-5'>Project Based Learning</h2>
                    <p className='ms-2' style={{textAlign:"justify"}}>Enhance your web development skills through hands-on, project-based learning in malayalam. Our courses guide you in building fully functional websites and applications, reinforcing essential coding languages like HTML, CSS, and JavaScript. Whether you're a beginner or an aspiring developer, our practical projects help you gain real-world experience and create a portfolio that stands out.</p>
            </div>
            <div className="col-md-6">
                <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-1.png&w=640&q=75" alt="" />
            </div>
        </div>
    </div>

    <div className="container border border-2 border-secondary rounded p-0 mt-3">
        <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
                <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-2.png&w=640&q=75" alt="" />
            </div>
            <div className="col-md-6 text-center">
                    <h2 className='mb-5'>Mastering Software Development</h2>
                    <p className='me-2' style={{textAlign:"justify"}}>Advance your software development skills with our in-depth courses, crafted for Malayalam-speaking learners. Learn core programming languages like Python, Java, and JavaScript, along with essential frameworks and tools. From building dynamic web applications to creating scalable software solutions, our project-based approach helps you gain real-world experience. Elevate your career and stay ahead in the ever-evolving tech industry with practical coding skills and expert</p>
            </div>
            
        </div>
    </div>

    <div className="container border border-2 border-secondary rounded p-0 mt-3">
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6 text-center">
                    <h2 className='mb-5'>Interview Oriented Tasks</h2>
                    <p className='ms-2' style={{textAlign:"justify"}}>Prepare for your next tech interview with our curated collection of interview-oriented tasks. Designed for Malayalam-speaking learners, these tasks cover essential coding challenges, algorithm problems, and system design questions commonly asked by top tech companies. Gain hands-on practice, enhance problem-solving skills, and boost your confidence to crack technical interviews with ease.</p>
            </div>
            <div className="col-md-6">
                <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-3.png&w=640&q=75" alt="" />
            </div>
        </div>
    </div>

    <div className="container border border-2 border-secondary rounded p-0 mt-3">
        <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
                <img src="https://debugmedia.co/_next/image?url=%2Fimages%2Fhome%2Fwhat-we-offer-4.png&w=640&q=75" alt="" />
            </div>
            <div className="col-md-6 text-center">
                    <h2 className='mb-5'>24/7 Support</h2>
                    <p className='me-2' style={{textAlign:"justify"}}>At TechX, we are committed to providing round-the-clock support for all your coding and development needs. Whether you're learning new programming skills, tackling a challenging bug, or need assistance with your software projects, our dedicated team is here to help anytime, anywhere. With our 24/7 customer support, you can get the answers and guidance you need, quickly and efficiently, ensuring you never get stuck.</p>
            </div>
            
        </div>
    </div>

    <div className="container mt-5">
        <div className="row">
        <h4 className='text-center mt-3'>Frequently Asked Questions</h4>

        <Accordion className='mt-5' defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>What Courses Does TechX Offer?</Accordion.Header>
        <Accordion.Body>
        TechX offers a wide range of coding and interview/job related courses tailored for beginners and experienced professionals. From web development (HTML, CSS, JavaScript) to advanced topics like React, Node.js, Python, Git, Preparing for Interview, and more, we cover everything you need to kickstart or advance in your career. All courses are delivered in Malayalam to ensure ease of learning for the Kerala community.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How can I access TechX courses?</Accordion.Header>
        <Accordion.Body>
        You can access all our online courses through our website. Simply sign up, browse the course catalog, and start learning immediately. Our courses are designed to be self-paced, allowing you to learn at your convenience.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Do I need prior coding experience to start learning?</Accordion.Header>
        <Accordion.Body>
     No, you don"t need any prior coding experience! TechX offers beginner-friendly courses designed to teach you programming from scratch. Our step-by-step tutorials will help you build a solid foundation before advancing to more complex topics. 
    But we do offer Advance courses which is not beginner friendly and requires prior coding experience. This is mentioned in the course description.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Is there any 24/7 support available for students?</Accordion.Header>
        <Accordion.Body>
        Yes, Debug Media offers 24/7 support to assist you with any issues you encounter while learning. Whether it"s a technical problem, a question about a course topic, or personalized guidance, our team is always ready to help.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header> How long is the support available?</Accordion.Header>
        <Accordion.Body>
       Support is available for the entire duration of the course you enroll in. 
        For example, if the course lasts 3 months, personal support will be provided throughout that period. Similarly, if the course duration is 6 months, support will be available for the full 6 months.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>How to enroll if I'm outside India?</Accordion.Header>
        <Accordion.Body>
Unfortunally, we currently do not support international payments on our website, You can contact our support team support@debugmedia.co for further assistance on international payments. 

You can also reach out to us on our social media platforms to learn more about our services. 

We look forward to assisting you in your learning journey.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </div>
    </div>

<Footer/>
    </>
  )

}


export default UserHome

