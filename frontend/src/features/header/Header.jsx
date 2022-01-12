import React, { useEffect } from 'react';

import { Link } from  'react-router-dom';

import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { selectActive } from './headerSlice';

import { useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation();
  const active = useSelector(selectActive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'header/setActive', payload: location.pathname });
  }, [location, dispatch]);
  

	return (
		<Navbar className='mb-3' bg="primary" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand as={ Link } to="/games/" href="/games/"><FontAwesomeIcon icon={faGamepad} size="lg" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={ active }>
            <Nav.Link as={ Link } to="/games/" href="/games/" eventKey="/games/">Games</Nav.Link>
            <Nav.Link as={ Link } to="/categories/" href="/categories/" eventKey="/categories/">Categories</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	)
}

export default Header;