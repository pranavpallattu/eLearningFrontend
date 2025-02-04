import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';


function Author() {
  return (
    <>
    <h5 className='text-center text-success mt-5'>Author</h5>
<div className="container-fluid">
  <div className="row d-flex justify-content-center align-items-center p-5">
    <div className="col-md-8 text-center">
      <h2 className="text-center mb-4">I'm TechX</h2>
      <p className="fs-5" style={{ textAlign: "center" }}>
        TechX is a transformative force in the world of online education.  
        Founded by an anonymous individual whose identity remains a mystery to this day,  
        Debug Media is not a team or a corporation but the vision and relentless effort of one person.
      </p>
    
    <Link>Read more...</Link>
    </div>
  </div>
  <div className="row">
    <div className="col-md-2"></div>
    <div className="col-md-2">
    <Card style={{ width: '100%' }}>
      <Card.Body className='p-4'>
        <Card.Text className='text-center'>
            <h1>3,000+</h1>
            <h5 className='mt-2'>Students Taught</h5>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div className="col-md-2">
    <Card style={{ width: '100%' }}>
      <Card.Body className='p-4'>
        <Card.Text className='text-center'>
            <h1>200K+</h1>
            <h5 className='mt-2'>Followers</h5>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div className="col-md-2">
    <Card style={{ width: '100%' }}>
      <Card.Body className='p-4'>
        <Card.Text className='text-center'>
            <h1>15 +</h1>
            <h5 className='mt-2'>Years of Experience</h5>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div className="col-md-2">
    <Card style={{ width: '100%' }}>
      <Card.Body className='p-4'>
        <Card.Text className='text-center'>
            <h1>2</h1>
            <h5 className='mt-2'>Courses</h5>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    <div className="col-md-2"></div>
  </div>
</div>


    </>
  )
}

export default Author