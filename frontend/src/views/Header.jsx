import { useState } from 'react';

import { Link } from  'react-router-dom';

import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

function Header() {
	const [active, setActive] = useState('games');

	return (
		<Navbar bg="primary" variant="dark" expand="sm" onSelect={(selectedKey) => setActive(selectedKey)}>
          <Container fluid>
            <Navbar.Brand as={ Link } to="/games/" href="/games/"><FontAwesomeIcon icon={faGamepad} size="lg" onClick={() => setActive("games")}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={ active }>
                <Nav.Link as={ Link } to="/games/" href="/games/" eventKey="games">Games</Nav.Link>
                <Nav.Link as={ Link } to="/tags/" href="/tags/" eventKey="tags">Tags</Nav.Link>
                  <NavDropdown title="Other" id="basic-nav-dropdown" menuVariant="dark">
                  <NavDropdown.Item as={ Link } to="/deleted-games/" href="/deleted-games/" eventKey="deleted-games">Show Deleted Games</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={ Link } to="/deleted-tags/" href="/deleted-tags/" eventKey="deleted-tags">Show Deleted Tags</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
	)
}

export default Header;