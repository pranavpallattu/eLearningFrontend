import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Blog() {
  return (
    <>
    <Header/>
    <div className="container-fluid mt-5">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <img src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg"  alt="" className='rounded w-100'/>

                  <h4 className='mt-5'>Bridging the Gap in Online Education</h4>
                  <p style={{textAlign:"justify"}}>The online education landscape in Kerala faces a unique challenge. Many exceptional teachers excel in delivering textbook knowledge but lack industry experience. Conversely, professionals with extensive practical expertise often struggle to convey their knowledge effectively. TechX bridges this gap by combining the best of both worlds: the depth of industry experience with the clarity and effectiveness of top-notch teaching.</p>
               
                <p style={{textAlign:"justify"}}>This commitment to excellence ensures that TechX delivers content that is not only informative but transformative. Whether you are a beginner looking to start your programming journey or a professional aiming to refine your skills, Debug Media has something valuable to offer.</p>
                <h4>A Mission Rooted in Impact</h4>
                <p style={{textAlign:"justify"}}>TechX’s mission goes beyond education; it’s about empowerment. By focusing on project-based learning, the platform helps students build a portfolio that speaks volumes to potential employers. The courses are designed to simulate real-world scenarios, preparing learners to excel in competitive job markets.</p>
                <h4>Why Choose TechX?</h4>
                <p style={{textAlign:"justify"}}>1. Practical Learning: All courses are designed with real-world applications in mind, ensuring students gain skills they can immediately apply.</p>
                <p style={{textAlign:"justify"}}>2. Direct Access to Expertise: Students get to learn directly from an industry expert with years of hands-on experience.</p>
                <p style={{textAlign:"justify"}}>3. Affordable Excellence: Debug Media believes in making high-quality education accessible to everyone.</p>
                <p style={{textAlign:"justify"}}>4. Comprehensive Curriculum: From foundational programming to advanced concepts, Debug Media covers it all.</p>
                <p style={{textAlign:"justify"}}>5. Community Impact: With a track record of transforming lives, Debug Media continues to empower students to achieve their dreams.</p>

                <h6 className='my-5' style={{textAlign:"justify"}}>Join TechX today and become a part of a legacy that is shaping the future of online education in Kerala and beyond.</h6>
            </div>
            <div className="col-md-3"></div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Blog