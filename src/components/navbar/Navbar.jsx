import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './navbar.scss';

// Images
import FAQIcon from '../../assests/img/book.png';
import Notification from '../../assests/img/notification.png';

const MenuBar = () => {
  return (
    <Navbar bg="light" expand="xxl">
      <Container fluid>
      <Nav className='flex-row'>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Nav.Link href="#action1" className='ms-3'>Home</Nav.Link>
      </Nav>
        <Nav className='d-flex right-nav flex-row'>
            <Nav.Link href="#action1" className='px-2'>Tickets</Nav.Link>
            <Nav.Link href="#action1" className='px-2'><img src={FAQIcon} alt='faq-icon' /> FAQs</Nav.Link>
            <Nav.Link href="#action1" className='px-2'><img src={Notification} alt='notification-icon' /></Nav.Link>
        </Nav>
        
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;