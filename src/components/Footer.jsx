import { faFacebook, faInstagram, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'



function Footer() {
  return (
    <>
    <div className="container-fluid p-4">
        <div className="row">
            <div className="col-md-3 d-flex justify-content-center align-items-center">
                <div>
                <FontAwesomeIcon icon={faYoutube}  className='fs-3 me-2'/>
                <FontAwesomeIcon icon={faInstagram} className='fs-3 me-2'/>
                <FontAwesomeIcon icon={faFacebook} className='fs-3 me-2'/>
                <FontAwesomeIcon icon={faTelegram} className='fs-3 me-2'/>
                </div>
            </div>
            <div className="col-md-3">
                <h3>Explore</h3>
                <p>Courses</p>
                <p>Blog</p>
                <p>Book 1:1</p>
            </div>
            <div className="col-md-3">
            <h3>Legal</h3>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
                <p>Refund Policy</p>
            </div>
            <div className="col-md-3">
            <h3>Support</h3>
                <p>support@gmail.com</p>
             
            </div>
        </div>
    </div>

    </>
  )
}

export default Footer