import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import './navbar.scss';

// Images
import User from '../../assests/img/user.png';
import Notification from '../../assests/img/bell.png';
import Message from '../../assests/img/message.png';

const MenuBar = () => {

  const userName = localStorage.getItem("User_Name")

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className='align-items-center'>
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/dashboard">
                <img src={User} alt='notification' />
                <p>{userName}</p>
              </Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;