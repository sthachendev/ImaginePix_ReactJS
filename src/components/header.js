import React, {useState} from "react";
import { Navbar, Nav, Form, FormControl, Dropdown } from "react-bootstrap";

const Header = ({isLoggedIn, setIsLoggedIn}) => {

    const [user, setUser] = useState(null);

    const handleLogout = () => {
    // Remove authentication tokens or cookies
    // For example, using local storage:
    localStorage.removeItem('authToken');

    // Update state or context to reflect user is no longer logged in
    setUser(null);
    setIsLoggedIn(false); // set the isLoggedIn state to false
    }

    return (
    <>
      <Navbar bg="light" expand="lg" className="shadow fixed-top">
        <Navbar.Brand href="#">
          <h5 className="ms-3">ImaginePix</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mx-auto">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          <Nav className="ml-auto">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="profile-dropdown">
                <img
                  src="/logo192.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Profile"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{marginLeft:'-95px'}}>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
