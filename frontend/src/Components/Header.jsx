import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const state = useSelector((state) => state.userLogin);
  const { userInfo } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogOutHandler = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Login/Signup Task</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <LinkContainer to="/signin">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="userName">
                    <NavDropdown.Item onClick={LogOutHandler}>
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>

                ) : (
                  <Nav.Link>
                    <i className="fas fa-user">&nbsp;Sign In</i>
                  </Nav.Link>
                )}
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
