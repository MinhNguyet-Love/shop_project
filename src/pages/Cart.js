import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Sản phẩm A", price: "200.000đ", quantity: 1 },
  ];

  return (
    <Container className="mt-4">
      <h2>Giỏ Hàng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{parseInt(item.price.replace(/\D/g, "")) * item.quantity}đ</td>
              <td>
                <Button variant="danger">Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary">Thanh toán</Button>
    </Container>
  );
};

export default Cart;
