import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Account from './Account';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar className='p-3' style={{backgroundColor:"#213555"}} variant="dark">
        <Container>
          <Navbar.Brand href="#home">Tech<span className='fs-3 text-danger'>X</span></Navbar.Brand>
          <Nav className="me-start">
            <Nav.Link className='me-2' href="#home">Courses</Nav.Link>
            <Link to={'/blog'}><Nav.Link className='me-2' href="#blog">Blog</Nav.Link></Link>
            <button className='btn btn-success me-2'>Login</button>
            <button className='btn btn-warning me-2'>Logout</button>
            <Account/>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
