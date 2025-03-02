import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const Register = () => {
  return (
    <Container className="mt-4">
      <h2>Đăng Ký</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control type="text" placeholder="Nhập họ tên" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Nhập email" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" />
        </Form.Group>
        <Button variant="success" className="mt-3">Đăng ký</Button>
      </Form>
    </Container>
  );
};

export default Register;
