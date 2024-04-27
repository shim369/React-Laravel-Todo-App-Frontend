import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navs() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow">
        <Container>
          <Navbar.Brand href="/">React-Laravel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Tasks</Nav.Link>
              <Nav.Link href="/tasks/create">Tasks Create</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Navs;