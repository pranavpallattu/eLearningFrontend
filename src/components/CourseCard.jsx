import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Payment from './Payment';

function CourseCard({page}) {
  return (
    <>
     <Card style={{ width: '100%' }}>
      <Card.Img  variant="top" src="https://wallpaperbat.com/img/820081-powerful-technologies-in-1-mern-stack.jpg" />
      <Card.Body>
        <Card.Title className='text-center'>Course Title</Card.Title>

        <Card.Text style={{textAlign:"justify"}}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil esse dolores, quam facilis aperiam ipsam tempora, eligendi magni ipsum architecto porro officiis repudiandae quaerat accusantium unde in. Ullam, velit esse.
        </Card.Text>
       {!page && <h5>Instructor: Anand </h5>}
       {!page && <h5>Duration: 120 min </h5>} 
    <h3>₹4999 <span style={{textDecorationLine:"line-through"}}>₹10000</span> <span className='text-success fs-5'>54% off</span></h3>     
{page && <Link to={'/course'}><button className='btn btn-primary p-2'>Enroll Now</button></Link>
}       {!page && <Payment/>}
      </Card.Body>
    </Card>
    </>
  )
}

export default CourseCard