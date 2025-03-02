import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="mt-4">
      <h2>Đăng Nhập</h2>
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Nhập email" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" />
        </Form.Group>
        <Button variant="primary" className="mt-3">Đăng nhập</Button>
      </Form>
    </Container>
  );
};

export default Login;
