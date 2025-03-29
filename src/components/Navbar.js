import React, { useState } from "react";
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const NavigationBar = () => {
  const location = useLocation();

  return (
    <>
      {/* Thanh thông báo khuyến mãi */}
      <div className="bg-dark text-white text-center">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <strong>ShopNow</strong>
        <Dropdown align="end" className="d-inline ms-3">
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            English
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">English</Dropdown.Item>
            <Dropdown.Item href="#">Vietnamese</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Navbar chính */}
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            Exclusive
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "fw-bold" : ""}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className={location.pathname === "/contact" ? "fw-bold" : ""}>
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className={location.pathname === "/about" ? "fw-bold" : ""}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className={location.pathname === "/login" ? "fw-bold" : ""}>
                Login
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl type="search" placeholder="What are you looking for?" className="me-2" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </Form>
            <Nav className="ms-3">
              <Nav.Link as={Link} to="/wishlist">
                <FaHeart size={20} />
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart size={20} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
