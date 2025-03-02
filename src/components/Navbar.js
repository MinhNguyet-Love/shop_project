import React, { useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [activeKey, setActiveKey] = useState("/");

  return (
    <Container className="mt-3">
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={Link} to="/" eventKey="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/products" eventKey="/products">Products</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/cart" eventKey="/cart">Cart</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about" eventKey="/about">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/contact" eventKey="/contact">Contact</Nav.Link>
          </Nav.Item>
        </Nav>
      </Tab.Container>
    </Container>
  );
};

export default NavigationBar;
