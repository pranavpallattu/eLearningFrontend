import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Account from './Account';
function AdminHeader() {
  return (
   <>
         <Navbar className='p-3' style={{backgroundColor:"#213555"}} variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-start">
          <Nav.Link className='me-2' href="#home">Home</Nav.Link>
            <Nav.Link className='me-2' href="#home">Courses</Nav.Link>
            <Nav.Link className='me-2' href="#pricing">Users</Nav.Link>
            <button className='btn btn-warning me-2'>Logout</button>
            <Account/>
          </Nav>
        </Container>
      </Navbar>
    </>
   
  )
}

export default AdminHeader